# Phase 3 — Booking System (what changed)

## What's now working
- `/booking` is gated behind login: if you're signed out and try to visit it (or click "Book a Service" anywhere on the site), you're sent to `/account/login`, then automatically brought back to `/booking` after signing in.
- The form now pulls real services live from your Supabase `services` table — no more hardcoded list.
- Submitting the form actually inserts a row into the `bookings` table, tied to your logged-in user via Row Level Security (you can only ever create/view bookings as yourself).
- Your name and mobile number are pre-filled from your profile if you've set them.
- After submitting, you get a real booking reference (first 8 characters of the database ID) and links to return home or jump straight to "My Bookings."
- `/account` now shows your real bookings list immediately after booking — no refresh needed (Next.js revalidates that page automatically).
- "Book Now" buttons on service cards and individual service pages correctly preselect that service in the booking form dropdown.

## Not included yet (later phases)
- The reference-photo upload field was removed for now — wiring file uploads needs a Supabase Storage bucket + policies, which fits better alongside Phase 4 (admin can review uploaded references) or Phase 5.
- No SMS/email/WhatsApp confirmation is sent yet — that's Phase 5, once you've picked a provider.
- Cancelling a booking from `/account` isn't built yet — the database policy already allows users to cancel their own pending bookings, but there's no UI button for it yet. Can add quickly if you want it now or in Phase 4 alongside the admin dashboard.

## To test
1. Pull the new code, run `npm install` again (no new packages this phase, but safe to run) and `npm run dev`.
2. Sign out if you're signed in, then click "Book a Service" anywhere — confirm it redirects to login first.
3. Sign in — confirm you land back on `/booking` automatically.
4. Submit a booking — confirm you get a reference number.
5. Go to `/account` — confirm the booking appears in your bookings list with status "pending."
6. As an admin, run this in Supabase SQL Editor to see all bookings across all users:
   ```sql
   select * from public.bookings order by created_at desc;
   ```
