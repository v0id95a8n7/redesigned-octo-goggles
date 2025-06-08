import type { Metadata } from "next";
import { Fira_Code, Geist, Noto_Sans, Noto_Serif } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/analytics";
import { Providers } from "@/components/providers";
import { canonicalUrl, metaDescription, metaTitle, openGraph } from "@/lib/metadata";
import publicConf from "@/lib/public-config";
import { cn } from "@/lib/utils";
import React from "react";
import { Toaster } from "sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});
const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-noto-serif",
});
const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export const metadata: Metadata = {
  metadataBase: new URL(publicConf.host),
  alternates: {
    canonical: canonicalUrl,
  },
  title: metaTitle,
  description: metaDescription,
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  // creator: "",
  robots: "index, follow",
  openGraph: {
    ...openGraph,
    url: publicConf.host,
  },
  twitter: {
    // creator: "@",
    card: "summary_large_image",
    title: metaTitle,
    description: metaDescription,
  },
  category: "",
  keywords: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Analytics />
      </head>{" "}
      <body
        className={cn(
          geist.variable,
          notoSans.variable,
          notoSerif.variable,
          firaCode.variable,
          "flex flex-col min-h-svh min-w-80 justify-center"
        )}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
