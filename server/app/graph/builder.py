from langgraph.graph import END, START, StateGraph

from app.graph.nodes import (
    ask_missing_nodes,
    extract_node,
    faq_node,
    route_after_extract,
    route_intake_status,
    save_lead_node,
)
from app.graph.state import AgentState


def build_graph(checkpointer):
    graph = StateGraph(AgentState)

    graph.add_node("extract", extract_node)
    graph.add_node("faq", faq_node)
    graph.add_node("ask", ask_missing_nodes)
    graph.add_node("save", save_lead_node)

    graph.add_edge(START, "extract")

    graph.add_conditional_edges(
        "extract",
        route_after_extract,
        {
            "faq": "faq",
            "ask": "ask",
            "save": "save",
            "end": END,
        },
    )

    graph.add_conditional_edges(
        "faq",
        route_intake_status,
        {
            "ask": "ask",
            "save": "save",
            "end": END,
        },
    )

    graph.add_edge("ask", END)
    graph.add_edge("save", END)

    return graph.compile(checkpointer=checkpointer)
