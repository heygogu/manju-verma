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

const PoppinsFont = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600"],
})
export const metadata: Metadata = {
  title: "Manju Verma",
  description: "Tech Content Writer",
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
    <html className={`${PoppinsFont.className}`} lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning
        className={`${PoppinsFont.variable} ${PoppinsFont.variable} `}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
