from langgraph.graph import END, START, StateGraph

from app.graph.nodes import (
    ask_missing_node,
    extract_node,
    faq_node,
    route_after_extract,
    route_after_faq,
    route_after_intake,
    save_lead_node,
)
from app.graph.state import AgentState


def build_graph(checkpointer):
    graph = StateGraph(AgentState)

    graph.add_node("extract", extract_node)
    graph.add_node("faq", faq_node)
    graph.add_node("ask", ask_missing_node)
    graph.add_node("save", save_lead_node)

    graph.add_edge(START, "extract")
    graph.add_conditional_edges("extract", route_after_extract, {"faq": "faq", "intake": "intake_path"})
    graph.add_node("intake_path", lambda state: {})
    graph.add_conditional_edges("intake_path", route_after_intake, {"save": "save", "ask": "ask", "end": END})
    graph.add_conditional_edges("faq", route_after_faq, {"save": "save", "ask": "ask", "end": END})
    graph.add_edge("ask", END)
    graph.add_edge("save", END)

    return graph.compile(checkpointer=checkpointer)