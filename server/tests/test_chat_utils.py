from langchain_core.messages import AIMessage, HumanMessage

from app.chat_utils import ai_replies_this_turn


def test_ai_replies_this_turn():
    messages = [
        HumanMessage(content="Pierwsze"),
        AIMessage(content="Stara"),
        HumanMessage(content="Drugie"),
        AIMessage(content="Nowa A"),
        AIMessage(content="Nowa B"),
    ]

    assert ai_replies_this_turn(messages, "Drugie") == ["Nowa A", "Nowa B"]
