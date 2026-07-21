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