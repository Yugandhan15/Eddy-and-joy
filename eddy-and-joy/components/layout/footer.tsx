import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/social-icons";
import { SITE, NAV_LINKS } from "@/lib/site-config";
import { SERVICES } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-2xl tracking-tight text-ink">
              Eddy <span className="italic text-accent">&amp;</span> Joy
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              A premium hair and beauty studio built around calm spaces, considered detail and
              treatments that last.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={SITE.instagram}
                aria-label="Eddy and Joy on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href={SITE.facebook}
                aria-label="Eddy and Joy on Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <FacebookIcon size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="editorial-eyebrow">Quick Links</h3>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/booking"
                  className="text-sm text-ink-soft transition-colors hover:text-accent"
                >
                  Book a Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="editorial-eyebrow">Services</h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-ink-soft transition-colors hover:text-accent"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="editorial-eyebrow">Contact</h3>
            <ul className="mt-5 space-y-4">
              <li className="flex items-start gap-3 text-sm text-ink-soft">
                <MapPin size={17} className="mt-0.5 shrink-0 text-accent" />
                {SITE.address}
              </li>
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-accent"
                >
                  <Phone size={17} className="text-accent" /> {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-ink-soft transition-colors hover:text-accent"
                >
                  <Mail size={17} className="text-accent" /> {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-line">
          <iframe
            title="Eddy and Joy location on Google Maps"
            src="https://www.google.com/maps?q=Chennai&output=embed"
            className="h-56 w-full grayscale-[20%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Eddy and Joy. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
