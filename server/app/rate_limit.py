import redis
from fastapi import HTTPException

from app.config import settings

_client: redis.Redis | None = None


def get_redis() -> redis.Redis:
    global _client
    if _client is None:
        _client = redis.from_url(settings.redis_url, decode_responses=True)
    return _client


def enforce_rate_limit(session_id: str) -> None:
    key = f"rate:{session_id}"
    r = get_redis()
    count = r.incr(key)
    if count == 1:
        r.expire(key, settings.rate_limit_window_seconds)
    if count > settings.rate_limit_max_messages:
        raise HTTPException(
            status_code=429,
            detail=(
                f"Osiągnięto limit {settings.rate_limit_max_messages} wiadomości "
                "na tę sesję. Spróbuj ponownie później."
            ),
        )
