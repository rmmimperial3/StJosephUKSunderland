import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import { parish } from "@/content/parish";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${parish.name}, ${parish.locality}`,
    template: `%s | ${parish.shortName}, Sunderland`,
  },
  description:
    "Roman Catholic parish of St Joseph, Millfield, Sunderland, in the Diocese of Hexham & Newcastle. Mass times, how to find us, and how to get in touch.",
  metadataBase: new URL("https://stjosephs-sunderland.example"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB" className={`${cormorant.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-screen flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div id="main" className="flex min-h-screen flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
