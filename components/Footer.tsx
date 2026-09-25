"use client";

import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-7.3L4.2 22H1l8.1-9.3L1 2h7.3l5 6.7L18.9 2Zm-1.2 18h1.9L6.4 4H4.4l13.3 16Z" />
  </svg>
);

export const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M14 13.5h2.5l1-4H14V7.5c0-1.03 0-2 2-2h1.5V2.14C17.17 2.1 15.95 2 14.66 2 11.96 2 10 3.66 10 6.7V9.5H7v4h3V22h4v-8.5Z" />
  </svg>
);

export const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const socialIcons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  X: XIcon,
};

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-ink-deep md:hidden">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-6 text-sm text-fog-dim sm:py-8 lg:px-10">
        <span className="text-fog-dim/80">© {new Date().getFullYear()} GN Club</span>

        <a
          href={`mailto:${site.contact.email}`}
          aria-label={`Email ${site.contact.email}`}
          className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-lime"
        >
          <Mail className="h-4 w-4" aria-hidden />
          <span className="hidden sm:inline">{site.contact.email}</span>
        </a>

        <div className="flex items-center gap-4">
          {site.socials.map((s) => {
            const Icon = socialIcons[s.label];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="-m-3 flex items-center justify-center p-3 text-fog-dim transition-colors duration-200 hover:text-lime"
              >
                {Icon ? <Icon className="h-4 w-4" aria-hidden /> : s.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
