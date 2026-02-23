import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Bond Yield Calculator",
    template: "%s | Bond Yield Calculator",
  },
  description:
    "Professional bond yield calculator for computing current yield, yield to maturity (YTM), and detailed cash flow schedules",
  keywords: [
    "bond calculator",
    "YTM",
    "yield to maturity",
    "bond analysis",
    "financial calculator",
  ],
  authors: [{ name: "Bond Yield Calculator Team" }],
  creator: "Bond Yield Calculator",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Bond Yield Calculator",
    description:
      "Calculate current yield, YTM, and cash flow schedules for bonds",
    siteName: "Bond Yield Calculator",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
