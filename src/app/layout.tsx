import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/avatar/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AvatarArchive — The Avatar Universe, Fan-Made",
  description:
    "A fan-built archive of the entire Avatar universe — Avatar: The Last Airbender, The Legend of Korra, the films, characters, bending arts, graphic novels, and the full in-universe chronology.",
  keywords: [
    "Avatar",
    "The Last Airbender",
    "Legend of Korra",
    "ATLA",
    "Avatar Archive",
    "fan site",
    "bending",
    "four nations",
    "graphic novels",
  ],
  authors: [{ name: "Jeffrey Creates" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "AvatarArchive — The Avatar Universe, Fan-Made",
    description:
      "Every series, every Avatar, every bending art — gathered into one fan-built hub.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AvatarArchive",
    description:
      "The entire Avatar universe — one fan-built media hub.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
