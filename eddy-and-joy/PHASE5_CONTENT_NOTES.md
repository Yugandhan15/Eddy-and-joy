# This round's additions — setup notes

## 1. Run this SQL first
**`supabase/phase5-content-coupons.sql`** in Supabase Dashboard → SQL Editor. It adds:
- `coupon_code` / `discount_amount` columns to `bookings`
- a new `coupons` table (RLS: admins manage everything, signed-in customers can only see active, non-expired ones — needed so the booking form can validate a code)
- a new `site_content` table (key/value) seeded with your current hero text, plus public read / admin write RLS
- a new `team_members` table seeded with your current 4 team members, plus public read (active only) / admin write RLS
- a new `site` storage bucket for hero + team photos, with the same admin-only-write pattern as `services`/`gallery`

This only adds to what's there — nothing in `schema.sql` or `storage-setup.sql` changes.

## 2. What's new

**Signup message** — `lib/auth/actions.ts` now detects an already-registered email (via Supabase's own signal for this, rather than guessing) and returns a clear "This email is already registered. Please sign in instead." message with a direct link to the login page, instead of just silently resending a confirmation email.

**Coupons** — `/admin/coupons` lets you create flat-₹-off codes with an optional expiry date and active/inactive toggle. On the booking form, customers enter a code and hit Apply; it's checked against the live `coupons` table and shows the discount plus an estimated total. The discount is re-validated server-side when the booking is actually submitted (the client-side check is just UX — a tampered hidden field can't force a discount that isn't real), and the applied code + amount are stored on the booking row, visible to the customer on `/account` and to you on `/admin/bookings`.

**Site Content (hero + team)** — `/admin/content` has two sections:
- **Hero Section**: edit the eyebrow text, both heading lines, the italic accent word, the subheading, and the background image (uploads to the new `site` bucket). The homepage hero now pulls all of this from the database instead of being hardcoded.
- **Our Team**: full CRUD for team members (photo, name, role, display order, visible/hidden toggle). The `/about` page now pulls from this table; if the table is ever empty it falls back to the original 4 hardcoded people so the page never looks broken.

## 3. New/changed files
- `supabase/phase5-content-coupons.sql` *(new)*
- `lib/admin/actions.ts` *(added coupon, site content, team member actions)*
- `lib/booking/actions.ts` *(added `validateCoupon`, updated `createBooking` to apply/store discounts)*
- `lib/auth/actions.ts` *(clearer already-registered message)*
- `lib/types/database.ts` *(added `coupons`, `site_content`, `team_members` types + booking coupon columns)*
- `components/admin/coupon-form.tsx`, `site-content-form.tsx`, `team-member-form.tsx` *(new)*
- `app/admin/coupons/page.tsx`, `app/admin/content/page.tsx` *(new)*; sidebar updated with both links
- `components/sections/hero.tsx` *(now accepts content as props)*; `app/page.tsx` *(fetches it)*
- `app/about/page.tsx` *(fetches team from DB, falls back to hardcoded list)*
- `components/sections/booking-form.tsx` *(coupon field + live price summary)*
- `app/account/page.tsx`, `app/admin/bookings/page.tsx` *(show applied coupon/discount)*
- `app/account/register/page.tsx` *(sign-in link on duplicate-email error)*
- `components/admin/image-uploader.tsx`, `lib/storage/upload.ts` *(widened to accept the new `site` bucket)*

## 4. Still as before
No changes to anything from Phase 4 you haven't asked about — bookings management, services, gallery, customers, settings all work exactly as they did.
