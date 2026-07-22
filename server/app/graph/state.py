from typing import Annotated, Literal, TypedDict

from langgraph.graph.message import add_messages
from typing_extensions import NotRequired


class AgentState(TypedDict):
    messages: Annotated[list, add_messages]
    session_id: NotRequired[str]
    project_type: NotRequired[str | None]
    budget: NotRequired[str | None]
    email: NotRequired[str | None]
    description: NotRequired[str | None]
    lead_saved: NotRequired[bool]
    last_intent: NotRequired[Literal["faq", "intake", "unknown"]]