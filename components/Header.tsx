"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/80 backdrop-blur-md border-b border-glass-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.jpg" alt="GN Club" width={40} height={31} className="h-[31px] w-10 rounded-md" />
          <span className="font-display text-lg tracking-tight text-fog">
            gn <span className="text-lime">CLUB</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {site.nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-1 text-sm text-fog-dim transition-colors hover:text-fog"
              >
                <span className={active ? "text-fog" : ""}>{item.label}</span>
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-gradient-to-r from-cyan via-lime to-amber transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden rounded-full bg-lime px-5 py-2 text-sm font-medium text-ink transition-transform hover:scale-105 md:inline-block"
        >
          Start a project
        </Link>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        aria-label="Toggle menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-px w-5 bg-fog transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
        />
        <span className={`h-px w-5 bg-fog transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`h-px w-5 bg-fog transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-glass-border bg-ink/95 backdrop-blur-md">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`py-2 text-base ${
                  pathname === item.href ? "text-lime" : "text-fog-dim"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full bg-lime px-5 py-2 text-center text-sm font-medium text-ink"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
