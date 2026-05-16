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
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "ALPSEREN — Private Estate & Lifestyle",
  description:
    "Estate Management & Lifestyle Services — Conciergerie de luxe et gestion immobilière de prestige dans les Alpes.",
  metadataBase: new URL("https://alpseren.ch"),
  openGraph: {
    title: "ALPSEREN — Private Estate & Lifestyle",
    description: "Alpine Excellence. Discreet. Precise. Absolute.",
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
    description: "Alpine Excellence. Discreet. Precise. Absolute.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
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
