import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./letter-alternates.css";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://amicitia.uk"),
  title: "Amicitia | Software that does good, or is just plain fun",
  description:
    "Amicitia Limited is a UK software studio that builds apps that do good, or are just plain fun. Makers of Meow Map.",
  keywords: [
    "Amicitia",
    "Amicitia Limited",
    "software studio",
    "app development",
    "product design",
    "Meow Map",
    "United Kingdom",
  ],
  openGraph: {
    title: "Amicitia | Software that does good, or is just plain fun",
    description:
      "A UK software studio building apps that do good, or are just plain fun. Makers of Meow Map.",
    url: "https://amicitia.uk",
    siteName: "Amicitia Limited",
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6f0",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
