import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
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
  title: "Amicitia — Social · Maps · Computer Vision",
  description:
    "Amicitia Limited is a UK software studio building social, mapping, and computer-vision products. Makers of CatApp.",
  keywords: [
    "Amicitia",
    "Amicitia Limited",
    "social software",
    "mapping",
    "computer vision",
    "CatApp",
    "United Kingdom",
  ],
  openGraph: {
    title: "Amicitia — Social · Maps · Computer Vision",
    description:
      "A UK software studio building social, mapping, and computer-vision products.",
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
