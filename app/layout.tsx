import type { Metadata } from "next";
import "../styles/styles.css";

export const metadata: Metadata = {
  title: "Hexagon",
  description: "Hexagon — Next.js app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
