import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const britney = localFont({
  src: "./fonts/Britney-Variable.ttf",
  variable: "--font-britney",
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
        className={`${geistSans.variable} ${geistMono.variable} ${britney.variable} antialiased selection:bg-stone-800 selection:text-white`}
      >
        <CustomCursor />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
