import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Header from "./components/Header";
import { SmoothCursor } from "./components/ui/smooth-cursor";
import ScrollProgressBar from "./components/ScrollProgressBar";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
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
        className={`${plusJakartaSans.variable} antialiased selection:bg-stone-800 selection:text-white`}
      >
        <SmoothCursor />
        <ScrollProgressBar />
        <Header />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
