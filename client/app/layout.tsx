import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import "../styles/styles.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Hexagon Studio — strony, aplikacje i AI | Rzeszów",
    template: "%s | Hexagon Studio",
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: "Hexagon Studio — strony, aplikacje i AI | Rzeszów",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Hexagon Studio — strony, aplikacje i AI | Rzeszów",
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
