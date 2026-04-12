import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GeminiChat } from "@/components/GeminiChat";
import { ThemeProviders } from "@/components/ThemeProviders";
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
  title: "Tanimowo David | Fullstack software engineer",
  description:
    "Portfolio of Tanimowo David — fullstack software engineer building scalable systems and thoughtful interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <ThemeProviders>
          {children}
          <GeminiChat />
        </ThemeProviders>
      </body>
    </html>
  );
}
