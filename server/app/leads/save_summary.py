from app.db.supabase_client import get_supabase


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
