import type {
  CourseCatalogItem,
  PaymentPlanKey,
  ProgramTierKey,
} from '@/types/database';

export interface TierConfig {
  key: ProgramTierKey;
  name: string;
  tag: string;
  basePriceInr: number;
  depositInr: number;
  inherit?: string;
  perks: string[];
  highlighted?: boolean;
}

export interface PaymentPlanOption {
  key: PaymentPlanKey;
  title: string;
  badge: string;
  description: string;
  discountInr: number;
}

export const COURSE_CATALOG: CourseCatalogItem[] = [
  {
    slug: 'fullstack-ai',
    program_category: 'live-classes',
    title: 'FullStack + AI',
    eyebrow: 'Live Classes · Cohort Enrollment Open',
    subtitle:
      'Fourteen live days (1 hour/day) from zero to a deployed full-stack app with React, Node.js, Express, and Supabase on AWS — followed by a 4-day minor project and a 10-day team hackathon.',
    duration_label: '29 Days Total',
    schedule_summary: '14 Days Live Training + 4-Day Minor Project + 10-Day Team Hackathon',
    starting_price_inr: 8500,
    is_available: true,
    highlights: [
      '14 days live interactive training (1 hour/day) with mentors and founders',
      'Daily hands-on lab commits pushed to GitHub with mentor evaluations',
      '4-day minor project + dedicated completion certificate',
      '10-day team hackathon with up to ₹10,000 stipend for winning team',
    ],
    curriculum_phases: [
      {
        phase: 'Stage 01 · Foundations & Backend (Supabase + Express)',
        days: 'Days 1 – 7',
        summary: 'Web fundamentals, Git & GitHub, Supabase PostgreSQL, Node.js, Express REST APIs, Postman & Week 1 Exam.',
      },
      {
        phase: 'Stage 02 · Auth, React UI & AWS Cloud Deployment',
        days: 'Days 8 – 14',
        summary: 'Supabase JWT auth, React Vite frontend, full-stack integration, AWS EC2/S3 deployment & Week 2 Exam.',
      },
      {
        phase: 'Stage 03 · Minor Project Build & Live Review',
        days: 'Days 15 – 19',
        summary: '4-day independent full-stack build, live mentor code review, and dedicated Minor Project Certificate.',
      },
      {
        phase: 'Stage 04 · 10-Day Team Hackathon & Live Demo Day',
        days: 'Days 20 – 29',
        summary: 'Cohort-wide team hackathon, end-to-end production shipping, live screening & up to ₹10,000 winning team stipend.',
      },
    ],
  },
  {
    slug: 'offline-internship',
    program_category: 'offline-internship',
    title: 'Offline Engineering Internship',
    eyebrow: 'Offline Internship · Coming Soon',
    subtitle:
      'Structured practical training followed by offline in-studio internships on live company projects.',
    duration_label: '8 Weeks In-Person',
    schedule_summary: 'In-person studio cohort · Locations announced shortly',
    starting_price_inr: 0,
    is_available: false,
    coming_soon_label: 'Coming Soon · Next Intake Opening Shortly',
    highlights: [
      'Work inside real product teams on active codebases',
      'Daily standups, code reviews, and architecture sprints',
    ],
    curriculum_phases: [],
  },
  {
    slug: 'career-accelerator',
    program_category: 'career-accelerator',
    title: 'Career & Founder Accelerator',
    eyebrow: 'Career Accelerator · Coming Soon',
    subtitle:
      'Focused career guidance or Prototype Track support for students launching a product of their own.',
    duration_label: '6 Weeks Intensive',
    schedule_summary: 'Selective cohort · Applications opening soon',
    starting_price_inr: 0,
    is_available: false,
    coming_soon_label: 'Coming Soon · Applications Opening Soon',
    highlights: [
      '1-on-1 career positioning and founder office hours',
      'Prototype Track validation and early-stage pitch prep',
    ],
    curriculum_phases: [],
  },
];

export const LIVE_CLASS_TIERS: TierConfig[] = [
  {
    key: 'sprout',
    name: 'Sprout',
    tag: 'Standard',
    basePriceInr: 8500,
    depositInr: 3000,
    perks: [
      'All 30 days of live FullStack + AI sessions',
      'Mentorship from founders and industry mentors',
      'Recognised Lenienttree Academy certification',
    ],
  },
  {
    key: 'sapling',
    name: 'Sapling',
    tag: 'Most Popular',
    basePriceInr: 11500,
    depositInr: 4000,
    inherit: 'Sprout',
    highlighted: true,
    perks: [
      'Attend five Lenienttree hackathons a year',
      'Priority 1-on-1 project code reviews',
    ],
  },
  {
    key: 'tree',
    name: 'Tree',
    tag: 'Complete',
    basePriceInr: 14500,
    depositInr: 5000,
    inherit: 'Sapling',
    perks: [
      'Lenienttree merchandise kit: notebook, tote & bottle',
      'Direct Prototype Track evaluation eligibility',
    ],
  },
];

export const PAYMENT_PLANS: PaymentPlanOption[] = [
  {
    key: 'full',
    title: 'One-Time Full Payment',
    badge: 'Save ₹500 Instant Fee Waiver',
    description:
      'Pay the complete cohort fee upfront to lock your seat immediately with a ₹500 instant fee waiver and zero pending balance.',
    discountInr: 500,
  },
  {
    key: 'installment',
    title: '2-Part Seat Reservation Plan',
    badge: 'Flexible Split',
    description:
      'Pay the initial seat reservation deposit today to block your cohort slot. Pay the remaining balance 48 hours before Day 1.',
    discountInr: 0,
  },
];

export function calculatePlanBreakdown(tierKey: ProgramTierKey, planKey: PaymentPlanKey) {
  const tier = LIVE_CLASS_TIERS.find((t) => t.key === tierKey) || LIVE_CLASS_TIERS[0];
  const plan = PAYMENT_PLANS.find((p) => p.key === planKey) || PAYMENT_PLANS[0];

  if (plan.key === 'full') {
    const totalFee = Math.max(0, tier.basePriceInr - plan.discountInr);
    return {
      tier,
      plan,
      basePriceInr: tier.basePriceInr,
      discountInr: plan.discountInr,
      totalFeeInr: totalFee,
      payableNowInr: totalFee,
      balanceDueInr: 0,
    };
  }

  const payableNow = tier.depositInr;
  const balanceDue = Math.max(0, tier.basePriceInr - payableNow);
  return {
    tier,
    plan,
    basePriceInr: tier.basePriceInr,
    discountInr: 0,
    totalFeeInr: tier.basePriceInr,
    payableNowInr: payableNow,
    balanceDueInr: balanceDue,
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
