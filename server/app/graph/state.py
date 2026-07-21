from typing import Annotated, Literal, TypedDict

from langgraph.graph.message import add_messages

class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    project_type: str | None
    budget: str | None
    email: str | None
    description: str | None
    lead_saved: bool
    last_intent: Literal["faq", "intake", "unknown"]