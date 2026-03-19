import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "WikiChain — Daily Link Puzzle",
  description: "Find the shortest path between two topics. Watch out for traps!",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-192.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "WikiChain",
  },
  openGraph: {
    title: "WikiChain — Daily Link Puzzle",
    description: "Find the shortest path between two topics. Watch out for traps!",
    type: "website",
    siteName: "WikiChain",
  },
  twitter: {
    card: "summary",
    title: "WikiChain — Daily Link Puzzle",
    description: "Find the shortest path between two topics. Watch out for traps!",
  },
};

export const viewport = {
  themeColor: "#3366cc",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dmSerif.variable} ${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
