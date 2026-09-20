"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { portfolio } from "@/lib/portfolio";
import { socialIcons } from "@/components/Footer";

const SIDEBAR_WIDTH = 260;

/** Sub-items shown in the accordion submenu under a given nav item's href. */
const SUBMENUS: Record<string, { label: string; href: string }[]> = {
  "/services": services.map((s) => ({ label: s.title, href: `/services/${s.slug}` })),
  "/work": portfolio.map((p) => ({ label: p.title, href: `/work/${p.slug}` })),
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop: fixed left column */}
      <aside
        style={{ width: SIDEBAR_WIDTH }}
        className="fixed inset-y-0 left-0 z-50 hidden flex-col overflow-hidden border-r border-glass-border bg-ink-deep/60 shadow-[12px_0_48px_-28px_rgba(0,0,0,0.75)] backdrop-blur-md md:flex"
      >
        {/* Surface wash: a faint top-down glow in the brand sweep so the
            panel reads as a lit surface (like a card catching light) rather
            than a flat color stopping at a border. Kept very low-opacity and
            fixed (no animation) so it never competes with the nav text. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 60% at 0% 0%, rgba(51,199,224,0.10), transparent 55%), radial-gradient(90% 50% at 100% 0%, rgba(198,242,78,0.08), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.03), transparent 30%)",
          }}
        />
        {/* Right-edge hairline: the same cyan -> lime -> amber sweep used for
            the active-nav accent bar, stretched the full height so the
            sidebar's edge reads as a deliberate seam, not a CSS border. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-cyan/40 via-lime/25 to-amber/40"
        />

        <div className="relative flex h-full flex-col overflow-y-auto px-6 py-8">
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.06, rotate: -1.5 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="group flex h-14 w-14 items-center justify-center rounded-xl border border-glass-border bg-glass backdrop-blur-sm transition-[border-color,box-shadow] duration-300 ease-out hover:border-lime/40 hover:shadow-[0_0_20px_rgba(198,242,78,0.2)]"
            >
              <Image src="/logo.jpg" alt="GN Club" width={40} height={31} className="h-[31px] w-10 rounded-md" />
            </motion.div>
          </Link>

          <SidebarNav pathname={pathname} />

          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-lime px-5 py-2 text-center text-sm font-medium text-ink shadow-[0_10px_28px_-14px_rgba(198,242,78,0.55)] outline-none transition-[transform,box-shadow] duration-300 hover:scale-105 hover:shadow-[0_10px_24px_-8px_rgba(198,242,78,0.5)] focus-visible:scale-105 focus-visible:shadow-[0_10px_24px_-8px_rgba(198,242,78,0.5)] focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-95"
          >
            Start a project
          </Link>

          <div className="flex-1" />

          <div className="flex flex-col gap-3.5 border-t border-glass-border pt-6 text-xs text-fog-dim">
            <a
              href={`mailto:${site.contact.email}`}
              className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-lime"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="truncate">{site.contact.email}</span>
            </a>

            <div className="flex items-center gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-7 w-7 items-center justify-center rounded-full text-fog-dim transition-[color,background-color] duration-200 hover:bg-glass hover:text-lime"
                  >
                    {Icon ? <Icon className="h-3.5 w-3.5" aria-hidden /> : s.label}
                  </a>
                );
              })}
            </div>

            <span className="tabular-nums text-fog-dim/70">© {new Date().getFullYear()} GN Club</span>
          </div>
        </div>
      </aside>

      {/* Mobile: slim top bar with hamburger */}
      <MobileTopBar pathname={pathname} />
    </>
  );
}

export const SIDEBAR_WIDTH_PX = SIDEBAR_WIDTH;

function SidebarNav({ pathname }: { pathname: string }) {
  // Hover-previewed section (desktop pointer). Cleared on mouse leave.
  const [hovered, setHovered] = useState<string | null>(null);

  // The section implied by the current route, e.g. viewing /services/digital
  // keeps the Services submenu expanded without needing to hover it.
  const activeSection =
    site.nav.find((item) => SUBMENUS[item.href] && (pathname === item.href || pathname.startsWith(`${item.href}/`)))
      ?.href ?? null;

  // Only one submenu open at a time: hover wins, otherwise fall back to
  // whichever section the current route belongs to.
  const openHref = hovered ?? activeSection;

  return (
    <nav className="mt-12 flex flex-col gap-1">
      {site.nav.map((item) => {
        const subItems = SUBMENUS[item.href];
        const sectionActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const isOpen = Boolean(subItems) && openHref === item.href;

        return (
          <div
            key={item.href}
            className="relative"
            onMouseEnter={() => subItems && setHovered(item.href)}
            onMouseLeave={() => subItems && setHovered((h) => (h === item.href ? null : h))}
          >
            <div className="group relative flex items-center">
              <Link
                href={item.href}
                aria-expanded={subItems ? isOpen : undefined}
                className="flex flex-1 items-center py-2.5 pl-4 text-sm text-fog-dim tracking-normal transition-[color,letter-spacing] duration-300 hover:text-fog hover:tracking-wide"
              >
                <span
                  className={`absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 origin-center bg-gradient-to-b from-cyan via-lime to-amber transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    sectionActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100"
                  }`}
                />
                <span className={sectionActive ? "text-fog" : ""}>{item.label}</span>
              </Link>
            </div>

            {subItems && (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ul className="flex flex-col gap-0.5 py-1">
                      {subItems.map((sub) => {
                        const subActive = pathname === sub.href;
                        return (
                          <li key={sub.href}>
                            <Link
                              href={sub.href}
                              className={`block py-1.5 pl-8 text-xs tracking-normal transition-colors duration-200 ${
                                subActive ? "text-lime" : "text-fog-dim hover:text-lime"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}

function MobileTopBar({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-glass-border bg-ink/80 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <motion.div whileHover={{ scale: 1.06, rotate: -1.5 }} whileTap={{ scale: 0.96 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
            <Image src="/logo.jpg" alt="GN Club" width={40} height={31} className="h-[31px] w-10 rounded-md" />
          </motion.div>
        </Link>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
        >
          <span className={`h-px w-5 bg-fog transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-fog transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-fog transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="origin-top overflow-hidden border-b border-glass-border bg-ink/95 backdrop-blur-md"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`inline-block py-2 text-base transition-colors ${
                      pathname === item.href ? "text-lime" : "text-fog-dim hover:text-fog"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + site.nav.length * 0.04, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-2 inline-block rounded-full bg-lime px-5 py-2 text-center text-sm font-medium text-ink outline-none transition-[transform,box-shadow] duration-300 focus-visible:ring-2 focus-visible:ring-lime focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-95"
                >
                  Start a project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
