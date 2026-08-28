# Hexagon Studio — Client

Frontend: **Next.js** (App Router, TypeScript, czysty CSS), `output: "export"`.

## Skrypty

```bash
npm run dev      # http://localhost:3000
npm run build    # statyczny export → out/
npm run lint
npm run format
```

Z rootu monorepo: `npm run dev` / `npm run build`.

## Env

Skopiuj `.env.example` → `.env`:

```bash
NEXT_PUBLIC_SITE_URL=https://hexagon-studio.pl
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Brand

```
public/
├── favicon.svg                 # fallback favicon (light/dark w CSS)
└── brand/
    ├── logo-on-light.svg       # navbar — jasny motyw
    ├── logo-on-dark.svg        # navbar — ciemny motyw
    ├── symbol-on-light.svg     # favicon — czarny symbol
    └── symbol-on-dark.svg      # favicon — biały symbol
```

Logo w navbarze i favicon przełączają się przez `prefers-color-scheme`.

![Logo](public/brand/logo-on-light.svg)

![Symbol](public/brand/symbol-on-light.svg)

## SEO

- Metadata / Open Graph w `app/layout.tsx` i `app/page.tsx`
- JSON-LD (`ProfessionalService`) — Rzeszów + usługi
- `app/robots.ts`, `app/sitemap.ts`
- Konfiguracja domeny: `NEXT_PUBLIC_SITE_URL` + `lib/site.ts`

## Dark mode

Automatyczny przez `@media (prefers-color-scheme: dark)` w `styles/styles.css`.
