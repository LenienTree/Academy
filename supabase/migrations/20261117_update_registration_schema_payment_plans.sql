-- 1. Ensure courses & batches tables exist (safe if already created)
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    program_slug TEXT NOT NULL,
    title TEXT NOT NULL,
    tier_badge TEXT,
    subtitle TEXT,
    duration_label TEXT NOT NULL,
    price_inr INTEGER NOT NULL,
    original_price_inr INTEGER,
    currency TEXT NOT NULL DEFAULT 'INR',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    is_available BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.batches (
    id TEXT PRIMARY KEY,
    course_id TEXT NOT NULL,
    name TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    schedule_text TEXT NOT NULL,
    total_seats INTEGER NOT NULL DEFAULT 40,
    enrolled_seats INTEGER NOT NULL DEFAULT 0,
    is_open BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Add Payment Plan & Student Detail columns to public.registrations
ALTER TABLE public.registrations
    ADD COLUMN IF NOT EXISTS course_slug TEXT NOT NULL DEFAULT 'fullstack-ai',
    ADD COLUMN IF NOT EXISTS program_slug TEXT DEFAULT 'live-classes',
    ADD COLUMN IF NOT EXISTS course_id TEXT DEFAULT 'live-sprout',
    ADD COLUMN IF NOT EXISTS tier TEXT NOT NULL DEFAULT 'sprout',
    ADD COLUMN IF NOT EXISTS payment_plan TEXT NOT NULL DEFAULT 'full',
    ADD COLUMN IF NOT EXISTS total_fee_inr INTEGER NOT NULL DEFAULT 8500,
    ADD COLUMN IF NOT EXISTS amount_inr INTEGER NOT NULL DEFAULT 8500,
    ADD COLUMN IF NOT EXISTS balance_due_inr INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN IF NOT EXISTS college TEXT,
    ADD COLUMN IF NOT EXISTS college_or_company TEXT,
    ADD COLUMN IF NOT EXISTS graduation_year TEXT,
    ADD COLUMN IF NOT EXISTS city_state TEXT,
    ADD COLUMN IF NOT EXISTS applicant_role TEXT,
    ADD COLUMN IF NOT EXISTS payment_mode TEXT NOT NULL DEFAULT 'hold';

-- 3. Reload PostgREST schema cache immediately
NOTIFY pgrst, 'reload schema';
