import pytest
from fakeredis import FakeRedis
from fastapi import HTTPException

from app import rate_limit
from app.config import settings


def test_rate_limit_blocks_after_max(monkeypatch):
    rate_limit._client = None
    redis = FakeRedis(decode_responses=True)
    monkeypatch.setattr(rate_limit, "get_redis", lambda: redis)
    monkeypatch.setattr(settings, "rate_limit_max_messages", 2)

    rate_limit.enforce_rate_limit("sess")
    rate_limit.enforce_rate_limit("sess")

    with pytest.raises(HTTPException) as exc:
        rate_limit.enforce_rate_limit("sess")

    assert exc.value.status_code == 429
