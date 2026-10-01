import type { Metadata } from "next";
import { Barlow_Condensed, Manrope, Strait, PT_Sans } from "next/font/google";
import "./globals.css";
import "./public-site.css";

const publicDisplay = Strait({ variable: "--font-public-display", subsets: ["latin"], weight: "400" });
const publicBody = PT_Sans({ variable: "--font-public-body", subsets: ["latin", "latin-ext"], weight: ["400", "700"] });

const display = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "FRAME/24 — Video editing studio",
  description: "Video editing, brand films and stories that leave a lasting impression.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${publicDisplay.variable} ${publicBody.variable}`}>{children}</body>
    </html>
  );
}
