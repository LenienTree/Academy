import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { calculatePlanBreakdown } from '@/lib/register/courses';
import { validateRegistrationInput } from '@/lib/register/validate';
import type { PaymentPlanKey, ProgramTierKey } from '@/types/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateRegistrationInput(body);

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, errors: validation.errors },
        { status: 400 }
      );
    }

    const tierKey = body.tier as ProgramTierKey;
    const planKey = (body.payment_plan || 'full') as PaymentPlanKey;
    const pricing = calculatePlanBreakdown(tierKey, planKey);

    const supabase = await createClient();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const registrationCode = `LTA-${new Date().getFullYear()}-${randomSuffix}`;

    const isRazorpayConfigured = Boolean(
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    );

    const { data, error } = await supabase
      .from('registrations')
      .insert({
        registration_code: registrationCode,
        course_slug: 'fullstack-ai',
        program_slug: 'live-classes',
        course_id: `live-${tierKey}`,
        tier: tierKey,
        payment_plan: planKey,
        batch_id: body.batch_id || null,
        full_name: body.full_name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        college: body.college.trim(),
        college_or_company: body.college.trim(),
        graduation_year: body.graduation_year?.trim() || null,
        city_state: body.city_state?.trim() || null,
        applicant_role: body.applicant_role?.trim() || 'Student',
        total_fee_inr: pricing.totalFeeInr,
        amount_inr: pricing.payableNowInr,
        balance_due_inr: pricing.balanceDueInr,
        payment_mode: isRazorpayConfigured ? 'razorpay' : 'hold',
        payment_status: 'pending_payment',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      registration: data,
      gatewayMode: isRazorpayConfigured ? 'razorpay_live' : 'razorpay_hold',
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unexpected server error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
