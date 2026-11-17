import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const { registrationId } = await request.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    const supabase = await createClient();
    const { data: reg, error: fetchErr } = await supabase
      .from('registrations')
      .select('*')
      .eq('id', registrationId)
      .single();

    if (fetchErr || !reg) {
      return NextResponse.json({ success: false, message: 'Registration not found.' }, { status: 404 });
    }

    // HOLD MODE: Razorpay account keys not yet configured
    if (!keyId || !keySecret) {
      return NextResponse.json({
        success: true,
        hold: true,
        message: 'Razorpay credentials not yet configured. Registration is reserved in Hold status.',
        registration: reg,
      });
    }

    // LIVE / TEST RAZORPAY ORDER CREATION (Activates automatically once keys are added)
    const authHeader = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const rzpResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authHeader}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: reg.amount_inr * 100, // paise
        currency: 'INR',
        receipt: reg.registration_code,
        notes: {
          registration_id: reg.id,
          course: reg.course_slug,
          tier: reg.tier,
          student_email: reg.email,
        },
      }),
    });

    const rzpOrder = await rzpResponse.json();
    if (!rzpResponse.ok) {
      return NextResponse.json(
        { success: false, message: rzpOrder?.error?.description || 'Razorpay order creation failed' },
        { status: 502 }
      );
    }

    await supabase
      .from('registrations')
      .update({
        razorpay_order_id: rzpOrder.id,
        payment_status: 'order_created',
        updated_at: new Date().toISOString(),
      })
      .eq('id', reg.id);

    return NextResponse.json({
      success: true,
      hold: false,
      keyId,
      order: rzpOrder,
      registration: reg,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Payment order error';
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
}
