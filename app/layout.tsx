import type { Metadata } from "next";
import { Space_Grotesk, Geist, Geist_Mono } from "next/font/google";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "./globals.css";
import AppTheme from "@/components/AppTheme";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-display" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Sunil Jalandhra | Backend & Blockchain Engineer",
  description:
    "Backend and blockchain engineer working in Rust and TypeScript: Solana programs, ZK systems, cross-chain bridges and event-driven backends.",
  metadataBase: new URL("https://suniljalandhra.com"),
  icons: {
    icon: [{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Sunil Jalandhra | Backend & Blockchain Engineer",
    description: "Event-driven backends, Solana programs, cross-chain bridges and ZK systems.",
    url: "https://suniljalandhra.com",
    type: "website",
  },
};

const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <AppTheme>{children}</AppTheme>
      </body>
    </html>
  );
}
