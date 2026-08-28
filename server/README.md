# Hexagon Studio — Server

Backend chatbota: **FastAPI + LangGraph** (lead intake + FAQ/RAG).

## Struktura

```
server/
├── app/
│   ├── main.py           # FastAPI entrypoint (/health, /chat)
│   ├── config.py
│   ├── graph/            # LangGraph (extract → faq/intake → ask/save)
│   ├── rag/              # Chroma + PDF knowledge
│   ├── leads/            # zapis leadów
│   └── …
├── data/
│   ├── knowledge.pdf
│   ├── chroma/
│   └── leads/
├── requirements.txt
└── .env.example
```

## Setup

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

## Uruchomienie

```bash
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Health: [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

Dla local frontu ustaw w `.env`:

```bash
CORS_ORIGIN=http://localhost:3000
```

## Zależności zewnętrzne

OpenAI, Upstash Redis (checkpoint + rate limit), Supabase, opcjonalnie Discord webhook — szczegóły w `.env.example`.
