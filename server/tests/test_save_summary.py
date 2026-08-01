from unittest.mock import MagicMock

from app.leads.save_summary import save_lead_summary


def test_save_lead_summary(monkeypatch):
    supabase = MagicMock()
    notify = MagicMock()
    monkeypatch.setattr("app.leads.save_summary.get_supabase", lambda: supabase)
    monkeypatch.setattr("app.leads.save_summary.notify_new_lead", notify)

    save_lead_summary("s1", "Landing", "3000 PLN", "a@b.pl", "Opis")

    supabase.table.assert_any_call("leads")
    notify.assert_called_once()
