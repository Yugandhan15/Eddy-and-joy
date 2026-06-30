-- ============================================================
-- Eddy and Joy — Phase 4 Storage Setup
-- Run this entire file in Supabase Dashboard → SQL Editor → New Query
-- Requires supabase/schema.sql (with public.is_admin()) to already be applied.
-- ============================================================

-- ---------- BUCKETS ----------
-- Two public buckets: one for service images, one for gallery images.
-- Public = readable by anyone via the public URL, but writes still go through RLS below.
insert into storage.buckets (id, name, public)
values ('services', 'services', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

-- ---------- STORAGE RLS POLICIES ----------
-- storage.objects already has RLS enabled by default in Supabase.

-- Public read access for both buckets (defensive — public buckets already serve
-- via the CDN URL, but this also allows authenticated `list`/`select` calls).
create policy "Public can view service images"
  on storage.objects for select
  using (bucket_id = 'services');

create policy "Public can view gallery images"
  on storage.objects for select
  using (bucket_id = 'gallery');

-- Only admins can upload, replace, or delete files in these buckets.
create policy "Admins can upload service images"
  on storage.objects for insert
  with check (bucket_id = 'services' and public.is_admin());

create policy "Admins can update service images"
  on storage.objects for update
  using (bucket_id = 'services' and public.is_admin());

create policy "Admins can delete service images"
  on storage.objects for delete
  using (bucket_id = 'services' and public.is_admin());

create policy "Admins can upload gallery images"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and public.is_admin());

create policy "Admins can update gallery images"
  on storage.objects for update
  using (bucket_id = 'gallery' and public.is_admin());

create policy "Admins can delete gallery images"
  on storage.objects for delete
  using (bucket_id = 'gallery' and public.is_admin());

-- ============================================================
-- DONE. After running this, the admin Services and Gallery pages
-- can upload images directly to the `services` and `gallery` buckets.
-- ============================================================
