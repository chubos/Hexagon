from datetime import datetime
from pathlib import Path


def save_lead_summary(
    leads_dir: str,
    session_id: str,
    project_type: str,
    budget: str,
    email: str,
    description: str,
) -> Path:
    Path(leads_dir).mkdir(parents=True, exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    path = Path(leads_dir) / f"lead_{timestamp}_{session_id[:8]}.txt"

    content = f"""=== LEAD HEXAGON ===
Data: {datetime.now().isoformat(timespec="seconds")}
Session: {session_id}

Typ projektu: {project_type}
Budżet: {budget}
Email: {email}

Opis:
{description}

---
Wygenerowano przez chatbot.
"""
    path.write_text(content, encoding="utf-8")
    return path