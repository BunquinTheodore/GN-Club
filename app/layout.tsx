import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { ClickSoundProvider } from "@/components/ClickSoundProvider";
import { SplashScreen } from "@/components/SplashScreen";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "GN Club: Activations, Events & Full Production",
  description:
    "From concept to full production and execution. GN Club creates high impact event activations for tech and Web3 brands in the Philippines and globally.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, spaceGrotesk.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full bg-ink md:pl-[260px]">
        <SplashScreen />
        <Sidebar />
        <div className="flex min-h-full flex-col">
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
        <ClickSoundProvider />
      </body>
    </html>
  );
}
