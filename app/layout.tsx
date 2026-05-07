import type { Metadata } from "next";
import { Cinzel, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "ALPSEREN — Private Estate & Lifestyle",
  description:
    "Estate Management & Lifestyle Services — Conciergerie de luxe et gestion immobilière de prestige dans les Alpes.",
  openGraph: {
    title: "ALPSEREN — Private Estate & Lifestyle",
    description: "Alpine Excellence. Discreet. Precise. Absolute.",
    url: "https://alpseren.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${cinzel.variable} ${montserrat.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}