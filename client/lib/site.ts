export const siteConfig = {
  name: "Hexagon Studio",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://hexagon-studio.pl",
  locale: "pl_PL",
  email: "kontakt@hexagon-studio.pl",
  description:
    "Hexagon Studio — tworzenie stron internetowych, aplikacji webowych i mobilnych oraz agentów AI. Freelancer IT w Rzeszowie i zdalnie w całej Polsce.",
  keywords: [
    "Hexagon Studio",
    "freelancer IT Rzeszów",
    "tworzenie stron Rzeszów",
    "aplikacje webowe",
    "aplikacje mobilne",
    "Next.js",
    "React Native",
    "agenty AI",
    "chatboty",
    "programista Rzeszów",
  ],
} as const;

export function absoluteUrl(path = "/") {
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized === "/" ? "" : normalized}`;
}
