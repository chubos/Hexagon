import type { Metadata, Viewport } from "next";

import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import "../styles/styles.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  viewportFit: "cover",
  colorScheme: "light dark",
};

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
  icons: {
    icon: [
      {
        url: "/brand/symbol-on-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/brand/symbol-on-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/brand/symbol-on-light.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body>
        <JsonLd />
        {children}
      </body>
    </html>
  );
}
