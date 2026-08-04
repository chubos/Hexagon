import { siteConfig } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: [
      {
        "@type": "City",
        name: "Rzeszów",
      },
      {
        "@type": "Country",
        name: "Poland",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Rzeszów",
      addressRegion: "Podkarpackie",
      addressCountry: "PL",
    },
    serviceType: [
      "Tworzenie stron internetowych",
      "Aplikacje webowe",
      "Aplikacje mobilne",
      "Machine Learning",
      "Agenty AI i chatboty",
    ],
    knowsAbout: [
      "Next.js",
      "React Native",
      "Node.js",
      "Python",
      "LLMs",
      "LangChain",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
