export type SiteConfig = {
  id: string;
  eyebrow: string;
  title: string;
  sub_text: string;
  hero_video_url: string;
  hero_poster_url: string;
  reg_url: string;
  updated_at: string;
};

export type EventItem = {
  id: string;
  title: string;
  venue: string;
  date: string;
  about: string;
  image_url: string;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type TestimonialItem = {
  id: string;
  name: string;
  role_course: string;
  college: string;
  quote: string;
  image_url: string | null;
  linkedin_url: string | null;
  stars: number;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type StateHeadItem = {
  id: string;
  name: string;
  title: string;
  state: string;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type SpeakerItem = {
  id: string;
  name: string;
  role_company: string;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type JudgeItem = {
  id: string;
  name: string;
  role_company: string;
  image_url: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
};

export type RoomCategory = 'Founders' | 'Academics' | 'Tech';

export type RoomCardItem = {
  id: string;
  number?: string;
  title: string;
  tagline?: string | null;
  description: string;
  badge?: string | null;
  highlight_text?: string | null;
  category?: RoomCategory;
  name?: string;
  role?: string;
  image_url?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
};

export interface Database {
  public: {
    Tables: {
      site_config: {
        Row: SiteConfig;
        Insert: Partial<SiteConfig>;
        Update: Partial<SiteConfig>;
        Relationships: [];
      };
      events: {
        Row: EventItem;
        Insert: Omit<EventItem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<EventItem>;
        Relationships: [];
      };
      testimonials: {
        Row: TestimonialItem;
        Insert: Omit<TestimonialItem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<TestimonialItem>;
        Relationships: [];
      };
      state_heads: {
        Row: StateHeadItem;
        Insert: Omit<StateHeadItem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<StateHeadItem>;
        Relationships: [];
      };
      speakers: {
        Row: SpeakerItem;
        Insert: Omit<SpeakerItem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<SpeakerItem>;
        Relationships: [];
      };
      judges: {
        Row: JudgeItem;
        Insert: Omit<JudgeItem, 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<JudgeItem>;
        Relationships: [];
      };
      room_cards: {
        Row: RoomCardItem;
        Insert: Partial<RoomCardItem>;
        Update: Partial<RoomCardItem>;
        Relationships: [];
      };
      courses: {
        Row: Record<string, unknown>;
        Insert: Record<string, unknown>;
        Update: Record<string, unknown>;
        Relationships: [];
      };
      batches: {
        Row: BatchItem;
        Insert: Partial<BatchItem>;
        Update: Partial<BatchItem>;
        Relationships: [];
      };
      registrations: {
        Row: RegistrationRecord;
        Insert: Partial<RegistrationRecord>;
        Update: Partial<RegistrationRecord>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// APPEND to src/types/database.ts

export type ProgramTierKey = 'sprout' | 'sapling' | 'tree';
export type PaymentPlanKey = 'full' | 'installment';

export interface CourseCatalogItem {
  slug: string;
  program_category: 'live-classes' | 'offline-internship' | 'career-accelerator';
  title: string;
  eyebrow: string;
  subtitle: string;
  duration_label: string;
  schedule_summary: string;
  starting_price_inr: number;
  is_available: boolean;
  coming_soon_label?: string;
  highlights: string[];
  curriculum_phases: { phase: string; days: string; summary: string }[];
}

export type BatchItem = {
  id: string;
  course_id?: string;
  course_slug?: string;
  name?: string;
  label?: string;
  start_date: string;
  end_date?: string | null;
  schedule_text?: string;
  schedule?: string;
  total_seats?: number;
  enrolled_seats?: number;
  seats_total?: number;
  seats_remaining?: number;
  is_open?: boolean;
  is_active?: boolean;
};

export type RegistrationRecord = {
  id: string;
  registration_code: string;
  course_slug: string;
  program_slug?: string;
  course_id?: string;
  tier: ProgramTierKey;
  payment_plan: PaymentPlanKey;
  batch_id: string | null;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  college_or_company?: string;
  graduation_year?: string | null;
  city_state?: string | null;
  applicant_role?: string | null;
  total_fee_inr: number;
  amount_inr: number;
  balance_due_inr: number;
  payment_mode: 'hold' | 'razorpay';
  payment_status: string;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  razorpay_signature?: string | null;
  created_at: string;
  updated_at?: string;
};
