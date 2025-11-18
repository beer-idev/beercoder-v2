// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import BackgroundFX from "@/components/layout/BackgroundFX";
import MouseWave from "@/components/layout/MouseWave";
import BackToTop from "@/components/ui/BackToTop";
import BottomNav from "@/components/layout/BottomNav";
import LoaderOverlay from "@/components/ui/LoaderOverlay";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "beercoder – Web Developer Portfolio",
    template: "%s | beercoder",
  },
  description:
    "beercoder – Web Developer crafting modern, performant web and app experiences using Next.js, Laravel, Flutter and more.",
  keywords: [
    "beercoder",
    "portfolio",
    "web developer",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "Laravel",
    "PHP",
    "Flutter",
    "MongoDB",
    "Thailand",
  ],
  authors: [{ name: "beercoder" }],
  creator: "beercoder",
  openGraph: {
    title: "beercoder – Web Developer Portfolio",
    description: "Projects and experience building modern web and app solutions.",
    url: "/",
    siteName: "beercoder",
    images: [
      { url: "/images/logo.jpg", width: 1200, height: 630, alt: "beercoder" },
    ],
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "beercoder – Web Developer Portfolio",
    description: "Projects and experience building modern web and app solutions.",
    images: ["/images/logo.jpg"],
  },
  icons: {
    icon: "/images/logo.jpg",
    shortcut: "/images/logo.jpg",
    apple: "/images/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="relative min-h-screen bg-black text-slate-100">
        <LoaderOverlay />
        <BackgroundFX />
        <MouseWave />
        <Navbar />
        {children}
        <BottomNav />
        <BackToTop />
      </body>
    </html>
  );
}
