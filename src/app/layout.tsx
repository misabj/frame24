import type { Metadata } from "next";
import { Barlow_Condensed, Manrope, Strait, PT_Sans } from "next/font/google";
import { siteBrand } from "@/lib/site-content";
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
  metadataBase: new URL(siteBrand.url),
  title: {
    default: `${siteBrand.name} | Film & Video Production`,
    template: `%s | ${siteBrand.name}`,
  },
  description: `${siteBrand.name}: video production, editing, brand films and stories that leave a lasting impression.`,
  applicationName: siteBrand.name,
  openGraph: {
    siteName: siteBrand.name,
    title: `${siteBrand.name} | Film & Video Production`,
    description: "Video production, editing, brand films and stories that leave a lasting impression.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${display.variable} ${body.variable} ${publicDisplay.variable} ${publicBody.variable}`}>{children}</body>
    </html>
  );
}
