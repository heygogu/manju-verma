import type { Metadata } from "next";
import { Geist, Geist_Mono,Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Favicon from "@/assets/images/briefcase.png"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"], 
});

export const metadata: Metadata = {
  title: "Hire the Best Content Writer for IT & Marketing | Manju Verma",
  description:
    "Looking for a top-notch content writer? Get high-quality, SEO-optimized content for IT & Digital Marketing from Manju Verma.",
  icons: {
    icon: Favicon.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${poppins.className}`} lang="en" suppressHydrationWarning>
      <body
       suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
