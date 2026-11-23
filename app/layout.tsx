import type { Metadata } from "next";
import { Instrument_Serif, Permanent_Marker, Rubik_Wet_Paint, Sedgwick_Ave_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sedgwick = Sedgwick_Ave_Display({ variable: "--font-sedgwick", weight: "400", subsets: ["latin"] });
const wetPaint = Rubik_Wet_Paint({ variable: "--font-wetpaint", weight: "400", subsets: ["latin"] });
const permanent = Permanent_Marker({ variable: "--font-permanent", weight: "400", subsets: ["latin"] });
const grotesk = Space_Grotesk({ variable: "--font-grotesk", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-instrument", weight: "400", style: ["normal", "italic"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bonascent · Scent Outside the Lines",
  description: "BONA by Bonascent. Fragrance as self-expression, inspired by street culture and urban art.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sedgwick.variable} ${wetPaint.variable} ${permanent.variable} ${grotesk.variable} ${serif.variable} antialiased`}
    >
      {/* browser extensions (e.g. Grammarly) inject attributes on <body> before React hydrates */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
