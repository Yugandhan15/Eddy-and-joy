# Phase 4 — Admin Dashboard — Setup Notes

## 1. Run the new SQL file
Before anything else, run **`supabase/storage-setup.sql`** in Supabase Dashboard → SQL Editor.
It creates two public storage buckets (`services`, `gallery`) and RLS policies so only admins
can upload/replace/delete files, while images remain publicly viewable. It depends on
`public.is_admin()` from `supabase/schema.sql`, which you already have applied.

No changes were made to `supabase/schema.sql` itself — your existing tables/policies are untouched.

## 2. What was built

**Navbar (fixed)** — `components/layout/navbar.tsx` is now a real auth-aware client component.
It checks the Supabase session on load and on every auth change, shows the customer's name with
an account dropdown (My Account / Admin Dashboard if applicable / Sign Out) when logged in, and
falls back to "Sign In" when logged out. Same logic is mirrored in the mobile menu.

**Admin layout** — `app/admin/layout.tsx` + `components/admin/admin-sidebar.tsx` add a persistent
sidebar (Overview, Bookings, Customers, Services, Gallery, Settings) around every `/admin/*` page.
Access is still gated by `middleware.ts` (unchanged) plus a server-side re-check in the layout itself.

**Overview** (`/admin`) — live stats (total/pending bookings, customers, active services, gallery
count) and a table of the 6 most recent bookings.

**Bookings** (`/admin/bookings`) — every booking across all users, with status filter tabs, a
name/mobile search box, and an inline status dropdown (`BookingStatusSelect`) that updates
`bookings.status` via a server action (`updateBookingStatus`) immediately, no page reload.

**Customers** (`/admin/customers`) — every row in `profiles`, with role badge and a computed
booking count per customer.

**Services** (`/admin/services`) — full CRUD. The "Add Service" / "Edit" buttons open a modal
form (`ServiceForm`) covering name, category, description, price, duration, active toggle, and
an image uploader that pushes directly to the `services` Storage bucket and stores the public URL.
Delete has an inline confirm step. Toggling "Active" is what controls visibility on the public
Services page and the booking dropdown (RLS already filtered on `is_active`).

**Gallery** (`/admin/gallery`) — same CRUD pattern (`GalleryForm`) for `gallery_items`: image
upload to the `gallery` bucket, category, caption, display order.

**Settings** (`/admin/settings`) — the logged-in admin can update their own name/mobile
(`AdminProfileForm` → `updateAdminProfile`), plus a placeholder explaining Phase 5 notifications
need real SMS/WhatsApp + SMTP provider keys before they can be wired up.

## 3. New/changed files
- `supabase/storage-setup.sql` *(new)*
- `lib/admin/actions.ts` *(new — all admin server actions)*
- `lib/storage/upload.ts` *(new — client-side upload helper)*
- `components/admin/*` *(new — sidebar, forms, status select, delete button, image uploader)*
- `app/admin/layout.tsx`, `app/admin/bookings`, `/customers`, `/services`, `/gallery`,
  `/settings` *(new)*; `app/admin/page.tsx` *(replaced stub with real overview)*
- `components/layout/navbar.tsx` *(replaced — real auth state)*
- `next.config.ts` *(added your Supabase project domain to `images.remotePatterns` so uploaded
  images render via `next/image`)*

## 4. To run locally
Unzip over your existing project folder (or into a fresh folder and copy your `.env.local` in —
it's included here unchanged), then:
```
npm install
npm run dev
```
Run `supabase/storage-setup.sql` once in the Supabase SQL Editor first, or service/gallery image
uploads will fail with a bucket-not-found error.

## 5. Known follow-ups (unchanged from before)
- Reference-photo upload on the booking form and a cancel-booking button on `/account` are still
  deferred, as previously noted.
- Phase 5 (SMS/WhatsApp + email notifications) needs you to pick and provide API keys for a
  provider before it can be built.
