"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ChurchMark } from "./ChurchMark";

const links = [
  { href: "/", label: "Welcome" },
  { href: "/about", label: "Who we are" },
  { href: "/mass-times", label: "Mass times" },
  { href: "/find-us", label: "Find us" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/25 bg-wine-deep/95 text-parchment backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 rounded-sm text-parchment"
        >
          <ChurchMark className="h-10 w-10 shrink-0 text-gold-light" />
          <span className="min-w-0">
            <span className="block font-serif text-xl leading-none sm:text-2xl">
              St Joseph&apos;s
            </span>
            <span className="mt-1 block truncate text-xs tracking-[0.14em] text-gold-light/90 uppercase">
              Millfield, Sunderland
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="nav-link"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-sm border border-gold/40 px-3 py-2 text-sm text-gold-light lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id={menuId}
          aria-label="Mobile"
          className="border-t border-gold/20 bg-wine px-4 py-4 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-sm px-2 py-3 text-lg text-parchment"
                  aria-current={pathname === link.href ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
