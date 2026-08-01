from app.db.supabase_client import get_supabase
from app.notifications.discord import notify_new_lead


def save_lead_summary(
    session_id: str,
    project_type: str,
    budget: str,
    email: str,
    description: str,
) -> None:
    supabase = get_supabase()
    supabase.table("chat_sessions").upsert(
        {"session_id": session_id},
        on_conflict="session_id",
    ).execute()
    supabase.table("leads").insert(
        {
            "session_id": session_id,
            "project_type": project_type,
            "budget": budget,
            "email": email,
            "description": description,
        }
    ).execute()

    try:
        notify_new_lead(
            session_id=session_id,
            project_type=project_type,
            budget=budget,
            email=email,
            description=description,
        )
    except Exception:
        pass
