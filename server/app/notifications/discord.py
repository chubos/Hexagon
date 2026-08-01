import json
import urllib.error
import urllib.request

from app.config import settings

DISCORD_FIELD_LIMIT = 1024


def _clip(text: str, limit: int = DISCORD_FIELD_LIMIT) -> str:
    text = text.strip()
    if len(text) <= limit:
        return text
    return text[: limit - 1] + "…"


def notify_new_lead(
    session_id: str,
    project_type: str,
    budget: str,
    email: str,
    description: str,
) -> None:
    webhook_url = settings.discord_webhook_url
    if not webhook_url:
        return

    payload = {
        "content": "**Nowy lead — Hexagon**",
        "embeds": [
            {
                "title": "Brief projektu",
                "color": 0,
                "fields": [
                    {"name": "Projekt", "value": _clip(project_type), "inline": True},
                    {"name": "Budżet", "value": _clip(budget), "inline": True},
                    {"name": "E-mail", "value": _clip(email), "inline": False},
                    {"name": "Opis", "value": _clip(description), "inline": False},
                    {"name": "Sesja", "value": _clip(session_id, 128), "inline": False},
                ],
            }
        ],
    }

    request = urllib.request.Request(
        webhook_url.strip(),
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "User-Agent": "HexagonBot/1.0",
        },
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=10) as response:
        if response.status not in (200, 204):
            raise urllib.error.HTTPError(
                webhook_url,
                response.status,
                response.reason,
                response.headers,
                None,
            )
