-- ============================================================
-- Eddy and Joy — Phase 5 additions
-- Run this entire file in Supabase Dashboard → SQL Editor → New Query
-- Requires supabase/schema.sql and supabase/storage-setup.sql to already be applied.
-- ============================================================

-- ---------- BOOKINGS: coupon columns ----------
alter table public.bookings
  add column if not exists coupon_code text,
  add column if not exists discount_amount numeric(10, 2) not null default 0;

-- ---------- COUPONS ----------
create table if not exists public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  discount_amount numeric(10, 2) not null check (discount_amount > 0),
  is_active boolean not null default true,
  expires_at date,
  created_at timestamptz not null default now()
);

alter table public.coupons enable row level security;

-- Logged-in customers can look up active, non-expired coupons (needed to validate a code at checkout).
create policy "Authenticated users can view active coupons"
  on public.coupons for select
  using (
    auth.uid() is not null
    and is_active = true
    and (expires_at is null or expires_at >= current_date)
  );

create policy "Admins can manage coupons"
  on public.coupons for all
  using (public.is_admin());

-- ---------- SITE CONTENT (hero text/image, key-value) ----------
create table if not exists public.site_content (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;

create policy "Anyone can view site content"
  on public.site_content for select
  using (true);

create policy "Admins can manage site content"
  on public.site_content for all
  using (public.is_admin());

drop trigger if exists site_content_updated_at on public.site_content;
create trigger site_content_updated_at
  before update on public.site_content
  for each row execute function public.handle_updated_at();

insert into public.site_content (key, value) values
  ('hero_eyebrow', 'Premium Hair Salon & Beauty Studio'),
  ('hero_heading_line1', 'Quiet luxury,'),
  ('hero_heading_accent', 'tailored'),
  ('hero_heading_line2', 'to you.'),
  ('hero_subheading', 'From precision cuts to restorative facials, Eddy and Joy brings considered craft and calm spaces together — every visit, every detail.'),
  ('hero_image_url', 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2400&auto=format&fit=crop')
on conflict (key) do nothing;

-- ---------- TEAM MEMBERS ----------
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  photo_url text,
  display_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.team_members enable row level security;

create policy "Anyone can view active team members"
  on public.team_members for select
  using (is_active = true);

create policy "Admins can manage team members"
  on public.team_members for all
  using (public.is_admin());

insert into public.team_members (name, role, photo_url, display_order)
values
  ('Eddy Fernandes', 'Founder & Senior Stylist', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 1),
  ('Joy Mathew', 'Co-Founder & Skin Specialist', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop', 2),
  ('Priya Nair', 'Senior Colourist', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop', 3),
  ('Arjun Das', 'Nail & Beauty Specialist', 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop', 4)
on conflict do nothing;

-- ---------- STORAGE: bucket for hero/team photos ----------
insert into storage.buckets (id, name, public)
values ('site', 'site', true)
on conflict (id) do nothing;

create policy "Public can view site images"
  on storage.objects for select
  using (bucket_id = 'site');

create policy "Admins can upload site images"
  on storage.objects for insert
  with check (bucket_id = 'site' and public.is_admin());

create policy "Admins can update site images"
  on storage.objects for update
  using (bucket_id = 'site' and public.is_admin());

create policy "Admins can delete site images"
  on storage.objects for delete
  using (bucket_id = 'site' and public.is_admin());

-- ============================================================
-- DONE.
-- ============================================================
