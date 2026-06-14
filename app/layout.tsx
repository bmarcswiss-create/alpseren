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
    "Estate & lifestyle management sur la campagne genevoise. Un interlocuteur unique pour la coordination de votre propriété et de votre quotidien.",
  metadataBase: new URL("https://alpseren.ch"),
  openGraph: {
    title: "ALPSEREN — Private Estate & Lifestyle",
    description: "Estate & lifestyle management sur la campagne genevoise. Un interlocuteur unique pour la coordination de votre propriété et de votre quotidien.",
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
    description: "Estate & lifestyle management sur la campagne genevoise. Un interlocuteur unique pour la coordination de votre propriété et de votre quotidien.",
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
