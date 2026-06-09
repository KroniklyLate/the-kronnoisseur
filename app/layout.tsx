import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AgeGate from "./components/AgeGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "The Kronnoisseur | Curated Cannabis Culture & Lifestyle",
  description: "Premium cannabis lifestyle brand. Shop limited apparel, hats, and stickers. Watch in-depth podcast episodes and product reviews. Explore the interactive US cannabis laws map.",
  icons: {
    icon: "/brand/transparent/mark-white-256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen text-white">
        <AgeGate>
          <Header />
          <main>{children}</main>
          <Footer />
        </AgeGate>
      </body>
    </html>
  );
}
