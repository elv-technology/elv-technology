import type { Metadata } from "next";
import { Source_Sans_3, Montserrat, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import OrganizationSchema from "@/components/seo/OrganizationSchema";
import LocalBusinessSchema from "@/components/seo/LocalBusinessSchema";

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
  metadataBase: new URL("https://www.etssmart.com"),
  title: {
    default: "ELV Companies in Abu Dhabi | MCC Approved – ETS Smart",
    template: "%s | ETS Smart",
  },
  description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation across the UAE.",
  keywords: [
    "ELV Companies in Abu Dhabi",
    "CCTV Installation Abu Dhabi",
    "Access Control System Abu Dhabi",
    "ELV Solutions Abu Dhabi",
    "Gate Barrier System UAE",
    "Audio Visual Company Abu Dhabi",
    "Home Automation Abu Dhabi",
    "Structured Cabling Abu Dhabi",
    "MCC Approved ELV Company",
  ],
  authors: [{ name: "ELV Technology Solutions", url: "https://www.etssmart.com" }],
  creator: "ELV Technology Solutions",
  publisher: "ELV Technology Solutions",
  icons: {
    icon: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.etssmart.com",
    siteName: "ELV Technology Solutions (ETS Smart)",
    title: "ELV Companies in Abu Dhabi | MCC Approved – ETS Smart",
    description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation across the UAE.",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "ELV Technology Solutions Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ELV Companies in Abu Dhabi | MCC Approved – ETS Smart",
    description: "ETS Smart is an MCC-approved ELV company in Abu Dhabi offering CCTV, Access Control, AV Systems & Home Automation across the UAE.",
    images: ["/images/logo.svg"],
    creator: "@elv_technology",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        {/* Google Analytics (GA4) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${sourceSans.variable} ${montserrat.variable} ${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        {children}
        <OrganizationSchema />
        <LocalBusinessSchema />
        <BreadcrumbSchema />
        <SpeedInsights />
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}

