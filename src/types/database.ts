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
