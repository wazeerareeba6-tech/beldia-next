import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { LanguageProvider } from "@/components/language-provider";
// 1. Nav component ko yahan import karein
import { Nav } from "@/components/nav"; 

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "إصدار شهادة صحية",
  description: "نظام إصدار الشهادات الصحية عبر منصة بلدي",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className={`${cairo.className}`}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            {/* 2. Nav ko yahan rakhein taake ye har page par automatically show ho */}
            <Nav />
            
            {/* 3. Main content (apka form ya result) niche load hoga */}
            <main>
              {children}
            </main>
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}