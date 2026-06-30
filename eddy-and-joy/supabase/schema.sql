-- ============================================================
-- Eddy and Joy — Phase 2 Database Schema + RLS Policies
-- Run this entire file in Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ---------- EXTENSIONS ----------
create extension if not exists "pgcrypto";

-- ---------- PROFILES ----------
-- One row per auth user. Created automatically on signup via trigger below.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Helper function to check admin role without triggering recursive RLS checks
-- (querying profiles from inside a profiles policy would otherwise recurse infinitely)
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (public.is_admin());

-- ---------- SERVICES ----------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  price_from numeric(10, 2) not null default 0,
  duration_minutes integer not null default 30,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.services enable row level security;

create policy "Anyone can view active services"
  on public.services for select
  using (is_active = true);

create policy "Admins can manage services"
  on public.services for all
  using (public.is_admin());

-- ---------- GALLERY ----------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  image_url text not null,
  caption text,
  display_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.gallery_items enable row level security;

create policy "Anyone can view gallery items"
  on public.gallery_items for select
  using (true);

create policy "Admins can manage gallery"
  on public.gallery_items for all
  using (public.is_admin());

-- ---------- BOOKINGS ----------
create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles (id) on delete set null,
  service_id uuid references public.services (id) on delete set null,
  full_name text not null,
  mobile text not null,
  booking_date date not null,
  booking_time time not null,
  message text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.bookings enable row level security;

create policy "Users can view their own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel their own pending bookings"
  on public.bookings for update
  using (auth.uid() = user_id and status = 'pending')
  with check (status in ('pending', 'cancelled'));

create policy "Admins can view all bookings"
  on public.bookings for select
  using (public.is_admin());

create policy "Admins can manage all bookings"
  on public.bookings for all
  using (public.is_admin());

-- ---------- AUTO-CREATE PROFILE ON SIGNUP ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- updated_at AUTO-UPDATE ----------
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

drop trigger if exists bookings_updated_at on public.bookings;
create trigger bookings_updated_at
  before update on public.bookings
  for each row execute function public.handle_updated_at();

-- ---------- SEED: starter services (matches Phase 1 frontend) ----------
insert into public.services (name, category, description, price_from, duration_minutes, image_url)
values
  ('Signature Haircut', 'Hair', 'Precision cutting tailored to your face shape and lifestyle.', 599, 45, 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=900&auto=format&fit=crop'),
  ('Blow-dry & Styling', 'Hair', 'Salon-grade volume and shine for everyday or special occasions.', 499, 40, 'https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=900&auto=format&fit=crop'),
  ('Root Touch-up', 'Hair', 'Seamless colour matching to keep regrowth invisible.', 899, 60, 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=900&auto=format&fit=crop'),
  ('Classic Manicure', 'Nails', 'Shape, cuticle care and polish for naturally healthy hands.', 399, 30, 'https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=900&auto=format&fit=crop'),
  ('Signature Facial', 'Facial', 'A full facial ritual for deep nourishment and glow.', 999, 60, 'https://images.unsplash.com/photo-1570172619644-7c4eb1b27c69?q=80&w=900&auto=format&fit=crop'),
  ('Body Waxing', 'Waxing', 'Smooth, long-lasting hair removal using gentle, skin-safe wax.', 299, 45, 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=900&auto=format&fit=crop')
on conflict do nothing;

-- ============================================================
-- DONE. After running this, to make YOUR account an admin, run:
--
--   update public.profiles set role = 'admin' where id = (
--     select id from auth.users where email = 'your-admin-email@example.com'
--   );
--
-- (Sign up through the site first so the row exists, then run that.)
-- ============================================================
