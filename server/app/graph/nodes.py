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

MISSING_QUESTIONS = {
    "project_type": "Nad jakim projektem pracujemy? (np. strona web, aplikacja mobilna, agent AI)",
    "budget": "Jaki jest twój budżet na projekt? (< 1 000 PLN / 1 000–5 000 PLN / 5 000–15 000 PLN / 15 000 PLN+)",
    "email": "Podaj proszę swój adres e-mail — wyślę propozycję po analizie.",
    "description": "Opisz krótko, co dokładnie projekt ma zawierać.",
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

def get_llm():
    return ChatOpenAI(model="gpt-4o-mini", api_key=settings.openai_api_key, temperature=0)

def latest_user_message(state: AgentState) -> str:
    for msg in reversed(state["messages"]):
        if isinstance(msg, HumanMessage):
            return msg.content.strip()
    return ""

def extract_node(state: AgentState) -> dict:
    user_text = latest_user_message(state)
    updates: dict = {"last_intent": "intake"}
    email_match = re.search(r"[\w.+-]+@[\w.-]+\.\w+", user_text)
    if email_match and EMAIL_RE.match(email_match.group(0)):
        updates["email"] = email_match.group(0)
    llm = get_llm().with_structured_output(Extracted)
    prompt = f"""
Wyciągnij dane leada z wiadomości użytkownika (po polsku).
Uzupełnij tylko pola, które wynikają wprost z tekstu.
intent:
- faq = pytanie o usługi/działalność/ceny/lokalizację
- intake = użytkownik podaje dane projektu lub odpowiada na pytania
- unknown = niejasne
Wiadomość:
{user_text}
"""
    extracted: Extracted = llm.invoke(prompt)
    updates["last_intent"] = extracted.intent
    for field in REQUIRED_FIELDS:
        value = getattr(extracted, field)
        if value and not state.get(field):
            updates[field] = value.strip()
    return updates

def faq_node(state: AgentState) -> dict:
    question = latest_user_message(state)
    context = retrieve_context(question)

    system = SystemMessage(
        content=(
            "Odpowiadasz po polsku jako asystent freelancera IT. "
            "Używaj TYLKO kontekstu z PDF. Jeśli brak info, powiedz to wprost."
        )
    )
    human = HumanMessage(
        content=f"Pytanie: {question}\n\nKontekst z bazy wiedzy:\n{context or '(brak)'}"
    )

    answer = get_llm().invoke([system, human]).content
    return {"messages": [AIMessage(content=answer)]}