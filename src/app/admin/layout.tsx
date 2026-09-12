import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Parish login",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-parchment">
      <header className="border-b border-gold/25 bg-wine-deep text-parchment">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <p className="font-serif text-xl">St Joseph&apos;s · Parish editor</p>
          <Link href="/" className="text-sm text-gold-light underline underline-offset-4">
            View the public site
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
