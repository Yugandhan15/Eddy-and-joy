# Phase 2 Setup — Supabase + Auth

## 1. Run the database schema
1. Open your Supabase project dashboard → **SQL Editor** → **New Query**.
2. Open `supabase/schema.sql` from this project, copy the entire file, paste it into the SQL editor, and click **Run**.
3. This creates: `profiles`, `services`, `gallery_items`, `bookings` tables, all RLS policies, the auto-profile-creation trigger, and seeds the 6 starter services.

## 2. Install dependencies
```
npm install
```
This pulls in `@supabase/ssr` and `@supabase/supabase-js`, added to `package.json`.

## 3. Environment variables
`.env.local` has already been created with your project's URL and anon key. Don't commit this file (it's gitignored already).

## 4. Run the app
```
npm run dev
```
Visit `http://localhost:3000/account/register` to create your first account, then check your email for the confirmation link (Supabase sends this automatically using its default email provider — fine for testing, but for production you'll want to configure a custom SMTP provider in Supabase Auth settings, which we'll do in Phase 5).

## 5. Make your account an admin
After registering and confirming your email, run this in the Supabase SQL Editor (replace with your email):
```sql
update public.profiles set role = 'admin' where id = (
  select id from auth.users where email = 'your-admin-email@example.com'
);
```
Then visiting `/admin` will work for that account — anyone else gets redirected away.

## What's working now
- `/account/register` — sign up (name, mobile, email, password)
- `/account/login` — sign in
- `/account` — protected dashboard showing profile + your bookings (empty until Phase 3 wires the booking form to actually save)
- `/admin` — protected, admin-role-only stub overview
- Middleware auto-protects `/account/*` and `/admin/*`, redirecting signed-out users to login
- Row Level Security ensures users can only ever see their own data; admins can see everything

## What's next (Phase 3)
The booking form on `/booking` is still the static UI from Phase 1 — it doesn't save to the database yet. Phase 3 wires it to `bookings`, adds the auth gate (must be signed in to book), and builds out the rest of the account dashboard.
