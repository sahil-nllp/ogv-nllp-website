import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import { SmoothCursor } from "./components/ui/smooth-cursor";
import ScrollProgressBar from "./components/ScrollProgressBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const canela = localFont({
  src: [
    { path: "./fonts/Canela/Canela-Light-Trial.otf", weight: "300" },
    { path: "./fonts/Canela/Canela-Regular-Trial.otf", weight: "400" },
    { path: "./fonts/Canela/Canela-Medium-Trial.otf", weight: "500" },
    { path: "./fonts/Canela/Canela-Bold-Trial.otf", weight: "700" },
    { path: "./fonts/Canela/Canela-Black-Trial.otf", weight: "900" },
  ],
  variable: "--font-canela",
  display: "swap",
});

const noka = localFont({
  src: "./fonts/NokaRegular-G3wYq.ttf",
  variable: "--font-noka",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OGV / NLLP — Healthcare Consultancy",
  description: "Strategic infrastructure development and operational advisory for modern healthcare ecosystems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${canela.variable} ${noka.variable} antialiased selection:bg-stone-800 selection:text-white`}
      >
        <SmoothCursor />
        <ScrollProgressBar />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
