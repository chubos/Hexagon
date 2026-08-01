from unittest.mock import MagicMock, patch

from app.config import settings
from app.notifications.discord import notify_new_lead


def test_discord_skips_without_webhook(monkeypatch):
    monkeypatch.setattr(settings, "discord_webhook_url", None)

    with patch("urllib.request.urlopen") as urlopen:
        notify_new_lead("s1", "Strona", "5000", "a@b.pl", "Opis")

    urlopen.assert_not_called()


def test_discord_sends_when_configured(monkeypatch):
    monkeypatch.setattr(settings, "discord_webhook_url", "https://discord.com/api/webhooks/x")
    response = MagicMock(status=204)
    response.__enter__ = MagicMock(return_value=response)
    response.__exit__ = MagicMock(return_value=False)

    with patch("urllib.request.urlopen", return_value=response) as urlopen:
        notify_new_lead("s1", "Strona", "5000", "a@b.pl", "Opis")

    urlopen.assert_called_once()
