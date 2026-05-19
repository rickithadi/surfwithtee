import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://surfwithtee.com"),
  title: {
    default: "Surf With Tee | Surf Lessons in Uluwatu, Bali",
    template: "%s | Surf With Tee",
  },
  description:
    "Book surf lessons in Bali with Tee — local Uluwatu instructor. Beginner to advanced, max 2 students per coach. Video analysis, transport & all equipment included. Balangan Beach, Jimbaran.",
  keywords: [
    "surf lessons Bali",
    "surf school Uluwatu",
    "Balangan beach surf",
    "beginner surf Bali",
    "private surf instructor Bali",
    "surfing lessons Jimbaran",
    "learn to surf Bali",
    "Bali surf school",
    "group surf lesson Bali",
    "surf coach Uluwatu",
  ],
  authors: [{ name: "Tee", url: "https://surfwithtee.com" }],
  creator: "Surf With Tee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://surfwithtee.com",
    siteName: "Surf With Tee",
    title: "Surf With Tee | Surf Lessons in Uluwatu, Bali",
    description:
      "Private & group surf lessons at Uluwatu's best breaks. Local instructor, max 2 per coach, video analysis & transport included. Book your session today.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Surf With Tee – Surf Lessons in Uluwatu, Bali",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Surf With Tee | Surf Lessons in Bali",
    description:
      "Private & group surf lessons at Uluwatu's best breaks. Local instructor, max 2 per coach, video analysis included.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://surfwithtee.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
