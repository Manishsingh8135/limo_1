import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientGlobalStyles from "@/components/ui/ClientGlobalStyles";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "All American Limousine | Luxury Transportation Services",
  description: "Experience premium limousine and luxury transportation services in Chicago and surrounding areas. Airport transfers, corporate travel, weddings, and special events.",
  keywords: "limousine, luxury transportation, Chicago limo service, airport transfers, corporate travel, wedding limo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ClientGlobalStyles />
        {children}
      </body>
    </html>
  );
}
