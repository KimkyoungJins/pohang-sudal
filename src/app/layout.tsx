import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingChat from "@/components/FloatingChat";
import CookieConsent from "@/components/CookieConsent";
import { AuthProvider } from "@/components/AuthProvider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pohang Sudal - Your Local Tour Guide in Pohang, South Korea",
  description:
    "Discover Pohang with a certified local guide. Private and group tours including Homigot sunrise, Jukdo seafood market, Guryongpo heritage walk, temple hiking, and more. Book your Pohang adventure today!",
  keywords: [
    "Pohang tour guide",
    "Pohang tours",
    "Korea tour guide",
    "Pohang travel",
    "things to do in Pohang",
    "Homigot sunrise",
    "Jukdo market tour",
    "Guryongpo",
    "Pohang seafood",
    "English speaking guide Korea",
  ],
  openGraph: {
    title: "Pohang Sudal - Discover Pohang Like a Local",
    description:
      "Explore Korea's hidden coastal gem with a certified local guide. Stunning sunrises, fresh seafood, ancient temples, and more.",
    locale: "en_US",
    type: "website",
    siteName: "Pohang Sudal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pohang Sudal - Discover Pohang Like a Local",
    description:
      "Explore Korea's hidden coastal gem with a certified local guide.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pohang-sudal.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristInformationCenter",
    name: "Pohang Sudal (포항수달)",
    description:
      "Licensed tour interpreter guide service in Pohang, South Korea. Private and group tours for English-speaking visitors.",
    url: "https://pohang-sudal.vercel.app",
    areaServed: {
      "@type": "City",
      name: "Pohang",
      containedInPlace: {
        "@type": "Country",
        name: "South Korea",
      },
    },
    availableLanguage: ["English", "Korean"],
    priceRange: "$75 - $120+",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pohang Tours",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Homigot Sunrise Tour",
            description: "Watch the first sunrise on the Korean Peninsula",
            touristType: "Sightseeing",
          },
          price: "89",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Pohang Seafood & Market Tour",
            description: "Taste the freshest seafood at Jukdo Market",
            touristType: "Food & Drink",
          },
          price: "75",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Guryongpo Heritage Walk",
            description: "Step back in time at a Japanese colonial village",
            touristType: "Cultural",
          },
          price: "95",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Temple & Waterfall Hiking",
            description: "Bogyeongsa Temple and 12 waterfalls trail",
            touristType: "Nature & Adventure",
          },
          price: "120",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Steel City & Ocean View",
            description: "POSCO industrial heritage meets coastal beauty",
            touristType: "Sightseeing",
          },
          price: "79",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Winter Gwamegi & Hot Springs Tour",
            description: "Savor Pohang's iconic winter delicacy and warm up at local hot springs",
            touristType: "Food & Drink",
          },
          price: "99",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Spring Cherry Blossom & Coastal Walk",
            description: "Experience Pohang's stunning cherry blossom trails along the coast",
            touristType: "Nature & Adventure",
          },
          price: "85",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Summer Beach & Water Sports Adventure",
            description: "Dive into Pohang's best beaches with snorkeling and kayaking",
            touristType: "Nature & Adventure",
          },
          price: "110",
          priceCurrency: "USD",
        },
      ],
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#6CB4EE" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pohang Sudal" />
      </head>
      <GoogleAnalytics />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingChat />
          <CookieConsent />
          <PWAInstallPrompt />
        </AuthProvider>
      </body>
    </html>
  );
}
