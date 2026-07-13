import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://agent.netolabs.dev"),
  title: "Aquiles | The AI Development Agent for Codex",
  description: "Aquiles takes software from discovery to production with security, privacy, scale, and monitoring built in.",
  keywords: ["AI development agent", "Codex plugin", "software engineering agent", "NetoLabs", "PII redaction", "LGPD"],
  authors: [{ name: "NetoLabs" }],
  creator: "NetoLabs",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://agent.netolabs.dev",
    title: "Aquiles | Your Full-Stack AI Development Agent",
    description: "Discovery, code, security, privacy, deployment, and monitoring. One agent inside Codex.",
    siteName: "Aquiles by NetoLabs",
    images: [{ url: "/images/aquiles-core.webp", width: 1672, height: 941, alt: "Aquiles engineering system" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aquiles | Your Full-Stack AI Development Agent",
    description: "Discovery, code, security, privacy, deployment, and monitoring. One agent inside Codex.",
    images: ["/images/aquiles-core.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d0c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
