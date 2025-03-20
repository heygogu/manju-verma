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
  metadataBase: new URL("https://manjuverma.com"),
  title: {
    template: "%s | Manju Verma - Content Writer",
    default: "Hire the Best Content Writer for IT & Marketing | Manju Verma",
  },
  description:
    "Looking for a top-notch content writer? Get high-quality, SEO-optimized content for IT & Digital Marketing from Manju Verma.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manjuverma.com/",
    siteName: "Manju Verma | Content Writer",
    images: [
      {
        url: "https://manjuverma.com/_next/static/media/briefcase.4677d727.png",
        width: 1200,
        height: 630,
        alt: "Manju Verma - Professional Content Writer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // site: "@yourhandle",
  },
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
