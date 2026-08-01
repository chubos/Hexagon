import re

from typing import Literal

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI
from pydantic import BaseModel, Field

from app.config import settings
from app.graph.state import AgentState
from app.leads.save_summary import save_lead_summary
from app.rag.retrieve import retrieve_context

REQUIRED_FIELDS = ("project_type", "budget", "email", "description")

FIELD_HINTS = {
    "project_type": "ogólna kategoria projektu (wystarczy np. strona, aplikacja, AI — bez doprecyzowania)",
    "budget": "planowany budżet na projekt",
    "email": "adres e-mail, na który można wysłać propozycję",
    "description": "krótki opis tego, co projekt ma zawierać",
}

PROJECT_TYPE_CATEGORIES = (
    "Strona WWW",
    "Aplikacja webowa",
    "Aplikacja mobilna",
    "AI / automatyzacja",
    "Integracja / backend",
    "Inne",
)

FIELD_LABELS = {
    "project_type": "Rodzaj projektu",
    "budget": "Budżet",
    "email": "E-mail",
    "description": "Opis projektu",
}

def missing_fields(state: AgentState) -> list[str]:
    missing = []
    for field in REQUIRED_FIELDS:
        if not state.get(field):
            missing.append(field)
    return missing

def all_fields_collected(state: AgentState) -> bool:
    return len(missing_fields(state)) == 0

EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

class Extracted(BaseModel):
    intent: Literal["faq", "intake", "unknown"]
    project_type: str | None = None
    budget: str | None = None
    email: str | None = None
    description: str | None = None

def get_llm(temperature: float = 0):
    return ChatOpenAI(
        model="gpt-4o-mini",
        api_key=settings.openai_api_key,
        temperature=temperature,
    )

def format_collected_fields(state: AgentState) -> str:
    collected = []
    for field in REQUIRED_FIELDS:
        value = state.get(field)
        if value:
            collected.append(f"- {FIELD_LABELS[field]}: {value}")
    if not collected:
        return "Na razie nic nie zebrano."
    return "\n".join(collected)

def latest_user_message(state: AgentState) -> str:
    for msg in reversed(state["messages"]):
        if isinstance(msg, HumanMessage):
            return msg.content.strip()
    return ""

def apply_field_updates(extracted: Extracted) -> dict[str, str]:
    updates: dict[str, str] = {}
    for field in REQUIRED_FIELDS:
        value = getattr(extracted, field)
        if value:
            updates[field] = value.strip()
    return updates

def extract_node(state: AgentState) -> dict:
    user_text = latest_user_message(state)
    updates: dict = {"last_intent": "intake"}
    email_match = re.search(r"[\w.+-]+@[\w.-]+\.\w+", user_text)
    if email_match and EMAIL_RE.match(email_match.group(0)):
        updates["email"] = email_match.group(0)
    llm = get_llm().with_structured_output(Extracted)
    categories = ", ".join(PROJECT_TYPE_CATEGORIES)
    prompt = f"""
Wyciągnij dane leada z OSTATNIEJ wiadomości użytkownika (po polsku).

Zebrane dotychczas:
{format_collected_fields(state)}

intent:
- faq = WYŁĄCZNIE pytanie o freelancera, usługi, doświadczenie, lokalizację, sposób współpracy
- intake = podaje dane projektu, budżet, e-mail, opis LUB odpowiada na pytania z briefu
- unknown = traktuj jak intake

Zasady pól:
- Zwróć TYLKO pola, które użytkownik podaje lub POPRAWIA w tej wiadomości. Pozostałe zostaw puste.
- Jeśli użytkownik poprawia wcześniejszą informację (np. "zmieniam budżet na 10 tys.", "jednak aplikacja mobilna"), zwróć nową wartość — nadpisze poprzednią.
- project_type: ustaw JEDNĄ ogólną kategorię z listy: {categories}.
  Krótka odpowiedź użytkownika wystarczy — nie wymagaj szczegółów. Przykłady:
  "machine learning" → "AI / automatyzacja"; "strona" → "Strona WWW"; "apka na telefon" → "Aplikacja mobilna".
- Jeśli użytkownik opisuje szczegóły projektu w tej samej wiadomości, uzupełnij też description.
- Jeśli użytkownik podaje informacje o projekcie, intent MUSI być intake, nie faq.

Wiadomość:
{user_text}
"""
    extracted: Extracted = llm.invoke(prompt)
    intent = extracted.intent
    if intent == "unknown":
        intent = "intake"
    updates["last_intent"] = intent
    updates.update(apply_field_updates(extracted))
    return updates

def faq_node(state: AgentState) -> dict:
    question = latest_user_message(state)
    context = retrieve_context(question)

    if not context.strip():
        answer = (
            "Na to pytanie nie mam jeszcze gotowej odpowiedzi w materiałach. "
            "Chętnie odpowiem osobiście lub możesz też napisać przez LinkedIn."
        )
        return {"messages": [AIMessage(content=answer)]}

    system = SystemMessage(
        content=(
            "Odpowiadasz po polsku jako asystent freelancera IT. "
            "Używaj kontekstu z PDF. Jeśli kontekst nie zawiera odpowiedzi, "
            "powiedz krótko że nie wiesz — nie wymyślaj faktów."
        )
    )
    human = HumanMessage(
        content=f"Pytanie: {question}\n\nKontekst z bazy wiedzy:\n{context}"
    )
    answer = get_llm().invoke([system, human]).content
    return {"messages": [AIMessage(content=answer)]}

def ask_missing_nodes(state: AgentState) -> dict:
    merged = {**state}
    missing = missing_fields(merged)
    if not missing:
        return {}

    field = missing[0]
    project_type_hint = ""
    if field == "project_type":
        project_type_hint = (
            "\n- Pytaj ogólnie o rodzaj projektu — zaakceptuj krótką odpowiedź "
            "(np. strona, aplikacja, AI). Nie proś o doprecyzowanie technologii ani zakresu.\n"
        )
    system = SystemMessage(
        content=(
            "Jesteś asystentem freelancera IT na stronie portfolio. "
            "Prowadzisz naturalną, krótką rozmowę po polsku.\n\n"
            f"Zebrane informacje:\n{format_collected_fields(merged)}\n\n"
            f"Teraz musisz dowiedzieć się: {FIELD_HINTS[field]}.\n\n"
            "Zasady:\n"
            "- Zadaj jedno pytanie o brakującą informację.\n"
            "- Krótko nawiąż do tego, co użytkownik już napisał.\n"
            "- Maksymalnie 2–3 zdania, bez korporacyjnego żargonu.\n"
            "- Nie pytaj o inne brakujące pola naraz.\n"
            "- Nie wymyślaj faktów o freelancerze ani cen."
            f"{project_type_hint}"
        )
    )
    answer = get_llm(temperature=0.4).invoke([system, *state["messages"]]).content
    return {"messages": [AIMessage(content=answer)]}

def save_lead_node(state: AgentState) -> dict:
    if state.get("lead_saved"):
        return {}

    if not all_fields_collected(state):
        return {}

    save_lead_summary(
        session_id=state.get("session_id", "unknown"),
        project_type=state["project_type"],
        budget=state["budget"],
        email=state["email"],
        description=state["description"],
    )

    return {
        "lead_saved": True,
        "messages": [
            AIMessage(
                content=(
                    "Dziękuję! Mam komplet informacji, które zostały zapisane. "
                    "Przeanalizuję temat i odezwę się na podany e-mail."
                )
            )
        ],
    }

def route_intake_status(state: AgentState) -> str:
    if all_fields_collected(state):
        if not state.get("lead_saved"):
            return "save"
        return "end"
    return "ask"


def route_after_extract(state: AgentState) -> str:
    if state.get("last_intent") == "faq":
        return "faq"
    return route_intake_status(state)
