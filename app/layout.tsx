import type { Metadata } from "next";
import { Syne } from "next/font/google";
import localFont from "next/font/local";
import { GlobalAirMouseControls } from "@/src/components/global-air-mouse-controls";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const digitalNumbers = localFont({
  src: "../public/fonts/DigitalNumbers-Regular.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-digital-numbers",
});

export const metadata: Metadata = {
  title: "Arena SJPII",
  description: "Jogos da Arena SJPII",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${syne.variable} ${digitalNumbers.variable} h-full`}>
      <body><GlobalAirMouseControls />{children}</body>
    </html>
  );
}
