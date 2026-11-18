'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  COURSE_CATALOG,
  LIVE_CLASS_TIERS,
  PAYMENT_PLANS,
  calculatePlanBreakdown,
  formatInr,
} from '@/lib/register/courses';
import { validateRegistrationInput } from '@/lib/register/validate';
import { CourseScheduleOverview } from './CourseScheduleOverview';
import type {
  BatchItem,
  PaymentPlanKey,
  ProgramTierKey,
  RegistrationRecord,
} from '@/types/database';

interface CourseEnrollmentWizardProps {
  initialTier?: ProgramTierKey;
  initialPlan?: PaymentPlanKey;
  batches: BatchItem[];
}

export function CourseEnrollmentWizard({
  initialTier = 'sapling',
  initialPlan = 'full',
  batches,
}: CourseEnrollmentWizardProps) {
  const course = COURSE_CATALOG[0]; // FullStack + AI

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTier, setSelectedTier] = useState<ProgramTierKey>(initialTier);
  const [selectedPlan, setSelectedPlan] = useState<PaymentPlanKey>(initialPlan);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(batches[0]?.id || '');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    college: '',
    graduation_year: '',
    city_state: '',
    applicant_role: 'Student',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedRegistration, setSavedRegistration] = useState<RegistrationRecord | null>(null);
  const [gatewayState, setGatewayState] = useState<'idle' | 'hold' | 'paid'>('idle');

  const breakdown = calculatePlanBreakdown(selectedTier, selectedPlan);

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateRegistrationInput({
      course_slug: 'fullstack-ai',
      tier: selectedTier,
      payment_plan: selectedPlan,
      batch_id: selectedBatchId,
      ...formData,
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const regRes = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          course_slug: 'fullstack-ai',
          tier: selectedTier,
          payment_plan: selectedPlan,
          batch_id: selectedBatchId,
          ...formData,
        }),
      });
      const regJson = await regRes.json();

      if (!regRes.ok || !regJson.success) {
        alert(regJson.message || 'Could not save registration.');
        setIsSubmitting(false);
        return;
      }

      setSavedRegistration(regJson.registration);

      const orderRes = await fetch('/api/payments/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: regJson.registration.id }),
      });
      const orderJson = await orderRes.json();

      if (orderJson.hold) {
        setGatewayState('hold');
        setStep(4);
        setIsSubmitting(false);
        return;
      }

      // Live Razorpay SDK invocation once API keys are configured
      if (orderJson.order && orderJson.keyId && typeof window !== 'undefined') {
        const RazorpayConstructor = (
          window as unknown as {
            Razorpay?: new (opts: Record<string, unknown>) => { open: () => void };
          }
        ).Razorpay;

        if (RazorpayConstructor) {
          const rzp = new RazorpayConstructor({
            key: orderJson.keyId,
            amount: orderJson.order.amount,
            currency: 'INR',
            name: 'Lenienttree Academy',
            description: `${course.title} (${breakdown.tier.name} · ${breakdown.plan.title})`,
            order_id: orderJson.order.id,
            prefill: {
              name: formData.full_name,
              email: formData.email,
              contact: formData.phone,
            },
            theme: { color: '#FE6500' },
            handler: async (response: {
              razorpay_order_id: string;
              razorpay_payment_id: string;
              razorpay_signature: string;
            }) => {
              const verifyRes = await fetch('/api/payments/razorpay/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  registrationId: regJson.registration.id,
                  ...response,
                }),
              });
              const verifyJson = await verifyRes.json();
              if (verifyJson.success) {
                setSavedRegistration(verifyJson.registration);
                setGatewayState('paid');
                setStep(4);
              }
            },
          });
          rzp.open();
        } else {
          setGatewayState('hold');
          setStep(4);
        }
      }
    } catch (err) {
      console.error(err);
      alert('Network error while creating registration.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#19181D]">
      {/* Sticky Top Bar */}
      <header className="border-b border-[#19181D]/15 bg-[#F5EFE3] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/register"
            className="text-xs font-sans font-semibold uppercase tracking-wider text-[#5D5B62] hover:text-[#19181D]"
          >
            &larr; All Courses
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 md:py-14">
        {/* 4-Step Progress Bar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-sans font-semibold uppercase tracking-widest mb-8 pb-4 border-b border-[#19181D]/15">
          <button
            type="button"
            onClick={() => step < 4 && setStep(1)}
            className={step >= 1 ? 'text-[#FE6500]' : 'text-[#5D5B62]'}
          >
            01. Course & Tier
          </button>
          <span className="text-[#5D5B62]">/</span>
          <button
            type="button"
            onClick={() => step > 2 && step < 4 && setStep(2)}
            className={step >= 2 ? 'text-[#FE6500]' : 'text-[#5D5B62]'}
          >
            02. Payment Plan
          </button>
          <span className="text-[#5D5B62]">/</span>
          <span className={step >= 3 ? 'text-[#FE6500]' : 'text-[#5D5B62]'}>03. Student Details</span>
          <span className="text-[#5D5B62]">/</span>
          <span className={step >= 4 ? 'text-[#FE6500]' : 'text-[#5D5B62]'}>04. Confirmation</span>
        </div>

        {/* ================= STEP 1: COURSE OVERVIEW & TIER SELECTION ================= */}
        {step === 1 && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
              <div>
                <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-[#FE6500]">
                  {course.eyebrow}
                </p>
                <h1 className="font-serif text-4xl md:text-5xl mt-2">{course.title}</h1>
                <p className="font-sans text-base text-[#5D5B62] mt-3 leading-relaxed">
                  {course.subtitle}
                </p>
              </div>

              {/* Curriculum Syllabus Snapshot */}
              <div className="bg-[#EBDBCD] border border-[#19181D]/25 p-5 space-y-3">
                <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-[#19181D]">
                  30-Day Structure
                </h2>
                <div className="space-y-2.5 divide-y divide-[#19181D]/10">
                  {course.curriculum_phases.map((cp, i) => (
                    <div key={i} className={i > 0 ? 'pt-2.5' : ''}>
                      <div className="flex justify-between text-xs font-semibold">
                        <span>{cp.phase}</span>
                        <span className="font-mono text-[#FE6500]">{cp.days}</span>
                      </div>
                      <p className="text-[11px] font-sans text-[#5D5B62] mt-0.5">{cp.summary}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cohort Batch Selector */}
            {batches.length > 0 && (
              <div className="p-4 bg-[#EBDBCD] border border-[#19181D] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#FE6500]">
                    Selected Cohort
                  </span>
                  <p className="font-serif text-xl">{batches[0].name || batches[0].label}</p>
                  <p className="text-xs font-sans text-[#5D5B62]">
                    {batches[0].schedule_text || batches[0].schedule}
                  </p>
                </div>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="px-3 py-2 bg-white border border-[#19181D] text-xs font-sans font-semibold"
                >
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name || b.label} ({b.start_date})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Comprehensive Syllabus & Schedule Overview */}
            <CourseScheduleOverview />

            {/* Tier Cards */}
            <div>
              <h2 className="font-serif text-2xl mb-4">Choose Your Learning Tier</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {LIVE_CLASS_TIERS.map((tier) => {
                  const isSelected = selectedTier === tier.key;
                  return (
                    <button
                      key={tier.key}
                      type="button"
                      onClick={() => setSelectedTier(tier.key)}
                      className={`text-left p-6 border-[1.5px] transition-all flex flex-col justify-between ${isSelected
                          ? 'bg-[#19181D] text-[#F5EFE3] border-[#19181D] shadow-[5px_5px_0px_#FE6500]'
                          : 'bg-[#F5EFE3] text-[#19181D] border-[#19181D]/40 hover:border-[#19181D]'
                        }`}
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-sans font-semibold uppercase tracking-widest opacity-75">
                            {tier.tag}
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#FE6500] bg-[#FE6500]' : 'border-current'
                              }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#19181D]" />}
                          </span>
                        </div>
                        <h3 className="font-serif text-3xl mt-2">{tier.name}</h3>
                        <p className="font-serif text-3xl text-[#FE6500] mt-3 pb-4 border-b border-current/20">
                          {formatInr(tier.basePriceInr)}
                        </p>

                        <ul className="mt-4 space-y-2.5 text-xs font-sans">
                          {tier.inherit && (
                            <li className="font-semibold text-[#FE6500]">
                              + Everything in {tier.inherit}
                            </li>
                          )}
                          {tier.perks.map((perk, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#FE6500] font-bold">✓</span>
                              <span>{perk}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 pt-3 border-t border-current/15 text-xs font-sans font-semibold uppercase tracking-wider">
                        {isSelected ? 'Selected Tier ✓' : `Select ${tier.name}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-sm border border-[#19181D] shadow-[3px_3px_0px_#19181D]"
              >
                Next: Choose Payment Plan &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: PAYMENT PLAN SELECTION ================= */}
        {step === 2 && (
          <div className="max-w-3xl space-y-8">
            <div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-sans font-semibold text-[#5D5B62] hover:text-[#19181D] mb-2"
              >
                &larr; Back to Tier Selection ({breakdown.tier.name})
              </button>
              <h1 className="font-serif text-4xl">Choose Your Payment Plan</h1>
              <p className="text-sm font-sans text-[#5D5B62] mt-1">
                Select how you would like to pay for the <strong>{breakdown.tier.name}</strong> tier ({formatInr(breakdown.basePriceInr)}).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PAYMENT_PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.key;
                const previewCalc = calculatePlanBreakdown(selectedTier, plan.key);

                return (
                  <button
                    key={plan.key}
                    type="button"
                    onClick={() => setSelectedPlan(plan.key)}
                    className={`text-left p-6 border-[1.5px] transition-all flex flex-col justify-between ${isSelected
                        ? 'bg-[#19181D] text-[#F5EFE3] border-[#19181D] shadow-[5px_5px_0px_#FE6500]'
                        : 'bg-[#EBDBCD] text-[#19181D] border-[#19181D]/40 hover:border-[#19181D]'
                      }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-0.5 bg-[#FE6500] text-[#19181D] text-[10px] font-sans font-bold uppercase tracking-wider">
                          {plan.badge}
                        </span>
                        <span
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#FE6500] bg-[#FE6500]' : 'border-current'
                            }`}
                        >
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#19181D]" />}
                        </span>
                      </div>

                      <h2 className="font-serif text-2xl">{plan.title}</h2>
                      <p className="text-xs font-sans opacity-80 leading-relaxed">
                        {plan.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-current/20 space-y-1.5 text-xs font-sans">
                      <div className="flex justify-between">
                        <span className="opacity-75">Payable Today:</span>
                        <strong className="font-serif text-xl text-[#FE6500]">
                          {formatInr(previewCalc.payableNowInr)}
                        </strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="opacity-75">Remaining Balance Later:</span>
                        <span className="font-mono">{formatInr(previewCalc.balanceDueInr)}</span>
                      </div>
                      {previewCalc.discountInr > 0 && (
                        <div className="flex justify-between text-emerald-400">
                          <span>Instant Waiver Applied:</span>
                          <span>-{formatInr(previewCalc.discountInr)}</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-5 py-3 border border-[#19181D] text-xs font-sans font-semibold uppercase tracking-wider"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(3);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-7 py-3.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-sm border border-[#19181D] shadow-[3px_3px_0px_#19181D]"
              >
                Continue to Student Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: STUDENT DETAILS FORM ================= */}
        {step === 3 && (
          <form onSubmit={handleSubmitRegistration} className="max-w-2xl space-y-6">
            <div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-sans font-semibold text-[#5D5B62] hover:text-[#19181D] mb-2"
              >
                &larr; Change Payment Plan ({breakdown.plan.title})
              </button>
              <h1 className="font-serif text-4xl">Student Details</h1>
              <p className="text-sm font-sans text-[#5D5B62] mt-1">
                Complete your enrollment profile to reserve your seat in {course.title}.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#EBDBCD] p-6 border border-[#19181D]">
              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g. Ananya Nair"
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                />
                {errors.full_name && <span className="text-xs text-red-600">{errors.full_name}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="you@example.com"
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                />
                {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                />
                {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
              </div>

              <div className="sm:col-span-2 flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  College / Institution / Organization *
                </label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="e.g. CUSAT, College of Engineering"
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                />
                {errors.college && <span className="text-xs text-red-600">{errors.college}</span>}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  Current Role
                </label>
                <select
                  value={formData.applicant_role}
                  onChange={(e) => setFormData({ ...formData, applicant_role: e.target.value })}
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                >
                  <option value="Student">Student</option>
                  <option value="Graduate">Recent Graduate</option>
                  <option value="Working Professional">Working Professional</option>
                  <option value="Aspiring Founder">Aspiring Founder</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-sans font-semibold uppercase text-[#19181D]">
                  City & State
                </label>
                <input
                  type="text"
                  value={formData.city_state}
                  onChange={(e) => setFormData({ ...formData, city_state: e.target.value })}
                  placeholder="e.g. Kochi, Kerala"
                  className="px-3 py-2.5 bg-white border border-[#19181D] text-sm font-sans outline-none focus:border-[#FE6500]"
                />
              </div>
            </div>

            {/* Summary Bar */}
            <div className="p-4 bg-[#19181D] text-[#F5EFE3] flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs font-sans space-y-0.5">
                <p className="uppercase tracking-wider text-[#F5EFE3]/70">
                  {breakdown.tier.name} Tier &middot; {breakdown.plan.title}
                </p>
                <p className="font-serif text-2xl text-[#FE6500]">
                  Payable Now: {formatInr(breakdown.payableNowInr)}
                </p>
                {breakdown.balanceDueInr > 0 && (
                  <p className="text-[11px] text-[#F5EFE3]/75">
                    Remaining balance before Day 1: {formatInr(breakdown.balanceDueInr)}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 bg-[#FE6500] text-[#19181D] font-sans font-semibold text-sm border border-[#FE6500] disabled:opacity-50"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Checkout →'}
              </button>
            </div>
          </form>
        )}

        {/* ================= STEP 4: CONFIRMATION / RAZORPAY HOLD ================= */}
        {step === 4 && savedRegistration && (
          <div className="max-w-2xl bg-[#EBDBCD] border-[1.5px] border-[#19181D] p-8 space-y-6">
            <div className="border-b border-[#19181D]/20 pb-4">
              <span className="px-2.5 py-1 bg-[#FE6500] text-[#19181D] text-[11px] font-sans font-bold uppercase tracking-wider">
                {gatewayState === 'paid' ? 'Payment Confirmed' : 'Seat Reserved · Payment Gateway Hold'}
              </span>
              <h1 className="font-serif text-3xl md:text-4xl mt-3">
                {gatewayState === 'paid'
                  ? 'Enrollment Confirmed.'
                  : 'Your registration details are saved.'}
              </h1>
            </div>

            {gatewayState === 'hold' && (
              <div className="p-4 bg-[#F5EFE3] border-l-4 border-[#FE6500] text-xs font-sans text-[#19181D] space-y-1">
                <p className="font-bold">Razorpay Checkout is Currently in Hold Mode</p>
                <p className="text-[#5D5B62]">
                  Your spot and chosen payment plan have been saved under reference{' '}
                  <strong className="font-mono text-[#19181D]">{savedRegistration.registration_code}</strong>.
                  Once the Razorpay payment gateway is activated, you can complete the payment of{' '}
                  <strong>{formatInr(savedRegistration.amount_inr)}</strong> using this reference ID.
                </p>
              </div>
            )}

            <dl className="grid grid-cols-2 gap-4 text-sm font-sans border-y border-[#19181D]/20 py-4">
              <div>
                <dt className="text-xs uppercase text-[#5D5B62]">Registration Code</dt>
                <dd className="font-mono font-bold text-base">{savedRegistration.registration_code}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-[#5D5B62]">Course & Tier</dt>
                <dd className="font-serif text-lg capitalize">
                  FullStack + AI ({savedRegistration.tier})
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-[#5D5B62]">Payment Plan</dt>
                <dd className="font-semibold capitalize">{savedRegistration.payment_plan} Plan</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-[#5D5B62]">Due Now / Balance</dt>
                <dd className="font-serif text-lg">
                  {formatInr(savedRegistration.amount_inr)}
                  {savedRegistration.balance_due_inr > 0 && (
                    <span className="block text-xs font-sans text-[#5D5B62]">
                      Balance later: {formatInr(savedRegistration.balance_due_inr)}
                    </span>
                  )}
                </dd>
              </div>
            </dl>

            <div className="flex gap-3">
              <Link
                href="/"
                className="px-6 py-3 bg-[#19181D] text-[#F5EFE3] font-sans font-semibold text-xs uppercase tracking-wider"
              >
                Return to Home
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
