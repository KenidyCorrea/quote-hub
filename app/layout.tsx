import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "QuoteHub",
  description: "Landing page e painel admin para gerenciamento de orcamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
