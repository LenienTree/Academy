import Script from 'next/script';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { CourseEnrollmentWizard } from '@/components/register/CourseEnrollmentWizard';
import type { BatchItem, PaymentPlanKey, ProgramTierKey } from '@/types/database';

export const instant = false;

interface CoursePageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ tier?: string; plan?: string }>;
}

export default async function CourseEnrollmentPage({ params, searchParams }: CoursePageProps) {
  await connection();
  const { slug } = await params;
  const query = await searchParams;

  // Enforce DEV-NOTE: Only fullstack-ai (Live Classes) is currently open
  if (slug !== 'fullstack-ai' && slug !== 'live-classes') {
    redirect('/register');
  }

  const supabase = await createClient();
  const { data: batches } = await supabase
    .from('batches')
    .select('*')
    .order('start_date', { ascending: true });

  const validTiers: ProgramTierKey[] = ['sprout', 'sapling', 'tree'];
  const initialTier: ProgramTierKey = validTiers.includes(query.tier as ProgramTierKey)
    ? (query.tier as ProgramTierKey)
    : 'sapling';

  const initialPlan: PaymentPlanKey =
    query.plan === 'installment' ? 'installment' : 'full';

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <CourseEnrollmentWizard
        initialTier={initialTier}
        initialPlan={initialPlan}
        batches={(batches as BatchItem[]) || []}
      />
    </>
  );
}
