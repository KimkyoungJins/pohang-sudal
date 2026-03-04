import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
