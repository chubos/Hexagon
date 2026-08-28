# Hexagon Studio

Strona freelancera IT (Rzeszów / zdalnie) + backend chatbota leadowego.

## Struktura

```
Hexagon/
├── client/          # Next.js
├── server/          # FastAPI + LangGraph (chatbot)
```

## Brand / logo

Wyeksportowane SVG (używane na stronie):

| Plik                                      | Zastosowanie                          |
| ----------------------------------------- | ------------------------------------- |
| `client/public/brand/logo-on-light.svg`   | Navbar — motyw jasny (ciemne logo)    |
| `client/public/brand/logo-on-dark.svg`    | Navbar — motyw ciemny (jasne logo)    |
| `client/public/brand/symbol-on-light.svg` | Favicon — motyw jasny (czarny symbol) |
| `client/public/brand/symbol-on-dark.svg`  | Favicon — motyw ciemny (biały symbol) |
| `client/public/favicon.svg`               | Favicon fallback (auto light/dark)    |

<p align="center">
  <img src="client/public/brand/logo-on-light.svg" alt="Hexagon Studio logo" width="320" />
</p>

<p align="center">
  <img src="client/public/brand/symbol-on-light.svg" alt="Hexagon symbol" width="64" />
</p>

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
