export interface RegistrationPayloadInput {
  course_slug: string;
  tier: 'sprout' | 'sapling' | 'tree';
  payment_plan: 'full' | 'installment';
  batch_id: string;
  full_name: string;
  email: string;
  phone: string;
  college: string;
  graduation_year?: string;
  city_state?: string;
  applicant_role?: string;
}

export function validateRegistrationInput(data: Partial<RegistrationPayloadInput>): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (data.course_slug !== 'fullstack-ai' && data.course_slug !== 'live-classes') {
    errors.course_slug = 'Only Live Classes (FullStack + AI) is currently open for registration.';
  }

  if (!data.tier || !['sprout', 'sapling', 'tree'].includes(data.tier)) {
    errors.tier = 'Please select a valid tier.';
  }

  if (!data.payment_plan || !['full', 'installment'].includes(data.payment_plan)) {
    errors.payment_plan = 'Please select a payment plan.';
  }

  if (!data.full_name || data.full_name.trim().length < 2) {
    errors.full_name = 'Enter your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  const cleanPhone = (data.phone || '').replace(/[\s\-+]/g, '');
  if (cleanPhone.length < 10) {
    errors.phone = 'Enter a valid 10-digit phone number.';
  }

  if (!data.college || data.college.trim().length < 2) {
    errors.college = 'Enter your college or organization name.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
