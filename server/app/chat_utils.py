from langchain_core.messages import AIMessage, HumanMessage


def ai_replies_this_turn(messages: list, user_text: str) -> list[str]:
    """Zwraca odpowiedzi bota dodane po ostatniej wiadomości użytkownika w tej turze."""
    replies: list[str] = []
    for msg in reversed(messages):
        if isinstance(msg, HumanMessage):
            if msg.content.strip() == user_text.strip():
                break
            continue
        if isinstance(msg, AIMessage):
            replies.append(msg.content)
    replies.reverse()
    return replies
