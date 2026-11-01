'use client';

import { useState } from 'react';
import { login } from '../actions';

export default function AdminLoginPage() {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setErrorMsg(result.error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5EFE3] text-[#19181D] flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-[420px] bg-[#EBDBCD] p-8 md:p-10 border border-[#19181D] shadow-[6px_6px_0px_#19181D]">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-[#FE6500] flex items-center justify-center font-bold text-white text-lg">
            L
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-normal tracking-tight">Lenienttree</span>
            <span className="font-sans text-[9px] font-semibold tracking-[0.3em] uppercase -mt-1 text-[#5D5B62]">
              Admin Control
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl font-normal mb-2">Sign In</h1>
        <p className="font-sans text-sm text-[#5D5B62] mb-6">
          Access the website content editor and draft preview.
        </p>

        {errorMsg && (
          <div className="mb-6 p-3 bg-[#FE6500]/15 border border-[#FE6500] text-[#B84400] text-sm font-sans font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#19181D]" htmlFor="email">
              Admin Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="admin@lenienttree.com"
              className="w-full px-3.5 py-2.5 bg-[#F5EFE3] border border-[#19181D] font-sans text-sm outline-none focus:ring-2 focus:ring-[#FE6500]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="font-sans text-xs font-semibold uppercase tracking-wider text-[#19181D]" htmlFor="password">
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="font-sans text-xs text-[#5D5B62] hover:text-[#FE6500] transition-colors focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'View password'}
              >
                {showPassword ? 'Hide password' : 'View password'}
              </button>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 pr-10 bg-[#F5EFE3] border border-[#19181D] font-sans text-sm outline-none focus:ring-2 focus:ring-[#FE6500]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5D5B62] hover:text-[#19181D] focus:outline-none p-1"
                aria-label={showPassword ? 'Hide password' : 'View password'}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full py-3 px-4 bg-[#FE6500] text-[#19181D] border border-[#FE6500] font-sans font-semibold text-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_#19181D] active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Enter Dashboard →'}
          </button>
        </form>
      </div>

      <p className="mt-8 text-xs font-sans text-[#5D5B62]">
        Lenienttree Academy Content Engine &middot; Protected System
      </p>
    </div>
  );
}
