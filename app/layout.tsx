import type { Metadata } from "next";
import { Josefin_Sans, Manrope, Poppins } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";
import { DynamicToaster as Toaster } from "@/components/DynamicToaster";
import { ClickSoundProvider } from "@/components/ClickSoundProvider";
import { ConstellationBackground } from "@/components/background/ConstellationBackground";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SplashScreen } from "@/components/SplashScreen";
import { cn } from "@/lib/utils";

// Sidebar and footer are server-rendered as usual but hydrate in their own time-sliced tasks instead
// of inside one long hydration task with the page.
const Sidebar = dynamic(() => import("@/components/Sidebar").then((mod) => mod.Sidebar));
const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer));

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["300"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  // Buttons, labels and nav only. Not needed for the first paint, so no preload competing
  // with the LCP image; the size-adjusted fallback keeps the swap from shifting layout.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.gnclubs.events"),
  title: "GN Club: Activations, Events & Full Production",
  description:
    "From concept to full production and execution. GN Club creates high impact event activations for tech and Web3 brands in the Philippines and globally.",
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", josefin.variable, manrope.variable, poppins.variable, "font-sans")}
    >
      <body className="min-h-full md:pl-[260px]">
        <SplashScreen />
        <ConstellationBackground />
        <MotionProvider>
          <Sidebar />
          <div className="flex min-h-full flex-col">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </MotionProvider>
        <Toaster />
        <ClickSoundProvider />
      </body>
    </html>
  );
}
