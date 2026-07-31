from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage
from langgraph.checkpoint.upstash_redis import UpstashRedisSaver

from app.chat_utils import ai_replies_this_turn
from app.config import settings
from app.db.supabase_client import get_supabase
from app.graph.builder import build_graph
from app.models import ChatRequest, ChatResponse
from app.rate_limit import enforce_rate_limit


@asynccontextmanager
async def lifespan(app: FastAPI):
    checkpointer = UpstashRedisSaver.from_conn_info(
        url=settings.upstash_redis_rest_url,
        token=settings.upstash_redis_rest_token,
    )
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


@app.post("/chat", response_model=ChatResponse)
def chat(body: ChatRequest):
    enforce_rate_limit(body.session_id)

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

    try:
        supabase = get_supabase()
        supabase.table("chat_sessions").upsert(
            {"session_id": body.session_id},
            on_conflict="session_id",
        ).execute()
        supabase.table("chat_messages").insert(
            {
                "session_id": body.session_id,
                "role": "user",
                "content": body.message,
            }
        ).execute()
        for reply in replies:
            supabase.table("chat_messages").insert(
                {
                    "session_id": body.session_id,
                    "role": "bot",
                    "content": reply,
                }
            ).execute()
    except Exception:
        pass

    return ChatResponse(
        replies=replies,
        reply=replies[-1],
        done=bool(result.get("lead_saved")),
    )