import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import RouteLoader from "@/components/RouteLoader";
import ThemeProvider from "@/components/ThemeProvider";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SafariNest — AI-Powered Yala Expeditions",
  description: "Experience the highest leopard density in the world with SafariNest's AI tracking and premium safari packages in Yala National Park, Sri Lanka.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
        <ThemeProvider>
          <Suspense fallback={null}>
            <RouteLoader />
          </Suspense>
          <ConditionalHeader />
          {children}
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
