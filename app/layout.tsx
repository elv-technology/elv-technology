import type { Metadata } from "next";
import { Source_Sans_3, Montserrat, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-source-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ELV Technology Solutions",
  description: "Leading provider of integrated technology solutions in the UAE.",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload hero video — browser starts fetching before any JS runs */}
        <link
          rel="preload"
          href="/images/home/slides/videos/hero_new.mp4"
          as="video"
          type="video/mp4"
        />
      </head>
      <body className={`${sourceSans.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <SpeedInsights />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
