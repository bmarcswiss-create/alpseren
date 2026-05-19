import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "ALPSEREN — Private Estate & Lifestyle",
  description:
    "Estate Management & Lifestyle Services — Conciergerie de luxe et gestion immobilière de prestige dans les Alpes.",
  metadataBase: new URL("https://alpseren.ch"),
  openGraph: {
    title: "ALPSEREN — Private Estate & Lifestyle",
    description: "Discreet. Precise. Absolute.",
    url: "https://alpseren.ch",
    siteName: "ALPSEREN",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ALPSEREN — Private Estate & Lifestyle",
      },
    ],
    locale: "fr_CH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ALPSEREN — Private Estate & Lifestyle",
    description: "Discreet. Precise. Absolute.",
    images: ["/og-image.png"],
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
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${montserrat.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
