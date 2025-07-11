import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "D&D Check Logger",
  description: "Web App criado para registro de sucessos de testes em jogos de D&D, ou qual outro sistema que utilizem os mesmos atributos.",
  creator:"Pedro Braga Magalhães",
  keywords: ["d&d","react","tailwind", "ability", "skill", "check", "log"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
