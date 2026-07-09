import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, Philosopher, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/avatar/theme-provider";
import { PasswordGate } from "@/components/avatar/password-gate";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const cinzelDecorative = Cinzel_Decorative({
  variable: "--font-cinzel-decorative",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const philosopher = Philosopher({
  variable: "--font-philosopher",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avatar-archive.vercel.app"),
  title: "AvatarArchive — The Avatar Universe",
  description:
    "The entire Avatar universe — one fan-made media hub. Avatar: The Last Airbender, The Legend of Korra, the films, graphic novels, and the full chronology.",
  authors: [{ name: "Jeffrey Creates" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/images/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/images/favicon.png" }],
    shortcut: ["/images/favicon.png"],
  },
  openGraph: {
    title: "AvatarArchive — The Avatar Universe",
    description: "The entire Avatar universe — one fan-made media hub.",
    type: "website",
    images: ["/images/favicon.png"],
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
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${philosopher.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider>
          <PasswordGate>{children}</PasswordGate>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
