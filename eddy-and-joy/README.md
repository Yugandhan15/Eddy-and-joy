# Eddy and Joy — Premium Salon Website

**Phase 1 of 6: Public Website (Frontend)**

This is the production frontend for Eddy and Joy, a premium hair salon and beauty studio. It is built as a real Next.js application — not a mockup — and is fully responsive, animated, and ready to extend with backend functionality in later phases.

## What's included in this phase

- Sticky navbar — transparent over the hero, blurs on scroll, with a working "Call Now" link and mobile menu
- Hero section with stats, ratings, and animated entrance
- Services section — all 12 services from the brief, each with image, description, price, duration, and a dedicated detail page at `/services/[slug]`
- Filterable masonry gallery with a lightbox (Hair / Beauty / Facial / Waxing / Nails)
- About page with story, mission, vision, team, and stats
- Contact page with validated form and embedded map
- Booking page — full form UI (name, validated 10-digit Indian mobile with fixed +91, optional email with validation, address, PIN, date, time, service select, message, file upload) — **not yet connected to a backend**, see "What's next" below
- Floating WhatsApp and Call buttons, visible site-wide
- Footer with quick links, services, contact info, and map embed
- SEO: metadata, Open Graph tags, JSON-LD schema, sitemap.xml, robots.txt
- Accessibility: semantic HTML, visible focus states, skip-to-content link, reduced-motion support
- Self-hosted fonts (Fraunces + Inter) — no external font requests at runtime

## What's next (later phases)

This phase is frontend only, on purpose, so it can be reviewed and tested before backend work begins:

1. **Supabase setup** — database schema, RLS policies
2. **Authentication** — user login/register/Google login, admin login
3. **Booking system** — connect the booking form to the database, add the login-gate, user dashboard (profile, my bookings)
4. **Admin dashboard** — bookings management, customer database, service/gallery management, analytics
5. **Notifications** — WhatsApp, SMS, and email confirmations for every booking
6. **Polish & deployment** — final QA, performance pass, Vercel deployment

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

To build for production:

```bash
npm run build
npm run start
```

## Tech stack (this phase)

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion (animations)
- Lucide React (icons)
- Self-hosted Fraunces & Inter fonts via Fontsource

## Project structure

```
app/                 Routes (home, services, gallery, about, contact, booking, account, legal pages)
components/layout/   Navbar, Footer, Floating buttons
components/sections/ Page sections (hero, services preview, gallery, about, testimonials, etc.)
components/ui/       Reusable UI primitives (service card, reveal animation wrapper, page header)
lib/                 Site config and data (services, gallery)
```

## Notes

- Images currently use Unsplash placeholders for menu/gallery/team photography. Swap these for real salon photography in `lib/data/services.ts`, `lib/data/gallery.ts`, and the About/Hero sections when available.
- Replace the placeholder Instagram, Facebook, and Google Maps links in `lib/site-config.ts` with real ones when available.
- The booking form currently submits to a local confirmation screen only (no database write, no notifications yet) — this is intentional until the backend phase.
