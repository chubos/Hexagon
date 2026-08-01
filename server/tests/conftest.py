import os
from unittest.mock import MagicMock

import pytest
from fastapi.testclient import TestClient
from langchain_core.messages import AIMessage, HumanMessage

for key, value in {
    "OPENAI_API_KEY": "test-key",
    "SUPABASE_URL": "https://example.supabase.co",
    "SUPABASE_SECRET_KEY": "test-secret",
    "UPSTASH_REDIS_REST_URL": "https://example.upstash.io",
    "UPSTASH_REDIS_REST_TOKEN": "test-token",
    "REDIS_URL": "redis://localhost:6379",
}.items():
    os.environ.setdefault(key, value)


@pytest.fixture
def client(monkeypatch):
    graph = MagicMock()
    graph.invoke.return_value = {
        "messages": [
            HumanMessage(content="Cześć"),
            AIMessage(content="Witaj!"),
        ],
        "lead_saved": False,
    }

    monkeypatch.setattr("app.main.UpstashRedisSaver.from_conn_info", lambda **_kwargs: MagicMock())
    monkeypatch.setattr("app.main.build_graph", lambda _cp: graph)
    monkeypatch.setattr("app.main.get_supabase", lambda: MagicMock())
    monkeypatch.setattr("app.main.enforce_rate_limit", lambda _session_id: None)

    from app.main import app

    with TestClient(app) as test_client:
        yield test_client
