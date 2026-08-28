# Hexagon Studio

Strona freelancera IT (Rzeszów / zdalnie) + backend chatbota leadowego.

## Struktura

```
Hexagon/
├── client/          # Next.js (frontend)
│   ├── public/brand/           # SVG używane na stronie
│   └── assets/
│       ├── Hexagon symbols/    # pełny zestaw eksportów SVG
│       └── affinity/           # źródła Affinity (.af)
└── server/          # FastAPI + LangGraph (chatbot)
```

## Brand / logo

<p align="center">
  <img src="client/assets/Hexagon%20symbols/Hexagon%20logo%20horizontal%20light.svg" alt="Hexagon Studio — logo poziome (wersja jasna)" width="480" />
</p>

<p align="center"><em>Logo poziome na jasnym wariancie — symbol + napis HEXAGON obok siebie.</em></p>

<p align="center">
  <img src="client/assets/Hexagon%20symbols/Hexagon%20logo%20horizontal%20dark.svg" alt="Hexagon Studio — logo poziome (wersja ciemna)" width="480" />
</p>

<p align="center"><em>Logo poziome na ciemnym wariancie — ten sam układ, jasny kolor znaku.</em></p>

<p align="center">
  <img src="client/assets/Hexagon%20symbols/Hexagon%20light%20logo.svg" alt="Hexagon Studio — logo z napisem (białe tło)" width="280" />
</p>

<p align="center"><em>Logo z napisem w środku na białym tle — wariant do jasnych powierzchni.</em></p>

<p align="center">
  <img src="client/assets/Hexagon%20symbols/Hexagon%20dark%20logo.svg" alt="Hexagon Studio — logo z napisem (czarne tło)" width="280" />
</p>

<p align="center"><em>Logo z napisem w środku na czarnym tle — wariant do ciemnych powierzchni.</em></p>

## Uruchomienie lokalne

### Client

```bash
npm run dev
# lub: cd client && npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

Env: skopiuj `client/.env.example` → `client/.env`  
(`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_SITE_URL`)

### Server

```bash
cd server
source .venv/bin/activate   # lub: .venv/bin/uvicorn …
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

→ [http://127.0.0.1:8000/health](http://127.0.0.1:8000/health)

Env: skopiuj `server/.env.example` → `server/.env`

Lokalnie: client `API_URL=http://localhost:8000`, server `CORS_ORIGIN=http://localhost:3000`.

## Dokumentacja

- [client/README.md](./client/README.md)
- [server/README.md](./server/README.md)
