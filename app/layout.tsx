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
  title: "Surf With Tee | Surf School Bali",
  description:
    "Learn to surf in Bali with Tee — expert local instructor, beginner-friendly lessons, and the most beautiful waves in the world.",
  openGraph: {
    title: "Surf With Tee | Surf School Bali",
    description: "Beginner to advanced surf lessons in Bali with local instructor Tee.",
    images: ["/images/bali-aerial.jpg"],
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
