import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-glass-border bg-ink-deep">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.jpg" alt="GN Club" width={40} height={31} className="h-[31px] w-10 rounded-md" />
              <span className="font-display text-lg text-fog">
                gn <span className="text-lime">CLUB</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fog-dim">{site.bio}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-fog">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-fog-dim">
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:text-lime">
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-medium text-fog">Follow {site.handle}</h3>
            <ul className="mt-4 space-y-2 text-sm text-fog-dim">
              {site.socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-lime">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-glass-border pt-6 text-xs text-fog-dim md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} GN Club. All rights reserved.</span>
          <span>{site.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
