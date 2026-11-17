-- 1. Create Batches Table
create table if not exists public.batches (
  id text primary key,
  course_slug text not null default 'live-classes',
  label text not null,
  start_date text not null,
  schedule text not null,
  seats_total int not null default 40,
  seats_remaining int not null default 18,
  is_active boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Registrations Table
create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_code text unique not null,
  course_slug text not null default 'live-classes',
  tier text not null check (tier in ('sprout', 'sapling', 'tree')),
  batch_id text references public.batches(id),
  full_name text not null,
  email text not null,
  phone text not null,
  college text not null,
  graduation_year text,
  city_state text,
  amount_inr int not null,
  payment_status text not null default 'pending_gateway' check (payment_status in ('pending_gateway', 'order_created', 'paid', 'failed')),
  razorpay_order_id text,
  razorpay_payment_id text,
  razorpay_signature text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
alter table public.batches enable row level security;
alter table public.registrations enable row level security;

-- 4. Policies
create policy "Public read active batches"
  on public.batches for select using (is_active = true);

create policy "Public insert registration"
  on public.registrations for insert with check (true);

create policy "Public read own registration by code"
  on public.registrations for select using (true);

create policy "Admin full access batches"
  on public.batches for all to authenticated using (true) with check (true);

create policy "Admin full access registrations"
  on public.registrations for all to authenticated using (true) with check (true);

-- 5. Seed Active Live Classes Batch
insert into public.batches (id, course_slug, label, start_date, schedule, seats_total, seats_remaining, is_active)
values
  ('batch-fsai-01', 'live-classes', 'Cohort 01 · FullStack + AI (Live)', 'Upcoming Cohort', '17 Days Theory + 13 Days Live Build · Evening Live Sessions', 40, 14, true)
on conflict (id) do nothing;
