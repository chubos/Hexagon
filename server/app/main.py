from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import AIMessage, HumanMessage
from langgraph.checkpoint.redis import RedisSaver

from app.config import settings
from app.graph.builder import build_graph
from app.models import ChatRequest, ChatResponse


@asynccontextmanager
async def lifespan(app: FastAPI):
    with RedisSaver.from_conn_string(settings.redis_url) as checkpointer:
        checkpointer.setup()
        app.state.graph = build_graph(checkpointer)
        yield


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.cors_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}


def ai_replies_this_turn(messages: list, user_text: str) -> list[str]:
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


@app.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    graph = app.state.graph
    config = {"configurable": {"thread_id": body.session_id}}

    try:
        result = graph.invoke(
            {
                "messages": [HumanMessage(content=body.message)],
                "session_id": body.session_id,
            },
            config=config,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc

    replies = ai_replies_this_turn(result["messages"], body.message)
    if not replies:
        replies = ["Przepraszam, coś poszło nie tak."]

    return ChatResponse(
        replies=replies,
        reply=replies[-1],
        done=bool(result.get("lead_saved")),
    )