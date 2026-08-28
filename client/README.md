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

Pełne eksporty (z tłami) i źródła Affinity:

```
assets/
├── affinity/              # pliki .af
└── Hexagon symbols/       # SVG (poziome, full logo, symbole)
public/brand/              # wersje używane w UI (przezroczyste)
```

<p align="center">
  <img src="assets/Hexagon%20symbols/Hexagon%20logo%20horizontal%20light.svg" alt="Logo poziome — jasne" width="420" />
</p>

<p align="center"><em>Logo poziome — wariant jasny.</em></p>

<p align="center">
  <img src="assets/Hexagon%20symbols/Hexagon%20logo%20horizontal%20dark.svg" alt="Logo poziome — ciemne" width="420" />
</p>

<p align="center"><em>Logo poziome — wariant ciemny.</em></p>

<p align="center">
  <img src="assets/Hexagon%20symbols/Hexagon%20light%20logo.svg" alt="Logo z napisem — białe tło" width="240" />
</p>

<p align="center"><em>Logo z napisem w środku — białe tło.</em></p>

<p align="center">
  <img src="assets/Hexagon%20symbols/Hexagon%20dark%20logo.svg" alt="Logo z napisem — czarne tło" width="240" />
</p>

<p align="center"><em>Logo z napisem w środku — czarne tło.</em></p>

Navbar i favicon biorą przezroczyste pliki z `public/brand/` i przełączają się przez `prefers-color-scheme`.

## SEO

- Metadata / Open Graph w `app/layout.tsx` i `app/page.tsx`
- JSON-LD (`ProfessionalService`) — Rzeszów + usługi
- `app/robots.ts`, `app/sitemap.ts`
- Konfiguracja domeny: `NEXT_PUBLIC_SITE_URL` + `lib/site.ts`

## Dark mode

Automatyczny przez `@media (prefers-color-scheme: dark)` w `styles/styles.css`.
