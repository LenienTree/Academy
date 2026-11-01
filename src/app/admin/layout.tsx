import { createClient } from '@/lib/supabase/server';
import { logout } from './actions';

export const instant = false;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If on login page or not authenticated yet, render just the clean page
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F5EFE3] flex flex-col">
      {/* Top Admin Utility Bar */}
      <header className="h-14 bg-[#19181D] text-[#F5EFE3] px-6 flex items-center justify-between border-b border-[#F5EFE3]/20">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 bg-[#FE6500] text-[#19181D] font-bold text-xs flex items-center justify-center">
            L
          </span>
          <span className="font-serif text-lg">Lenienttree Academy</span>
          <span className="text-[10px] uppercase tracking-widest bg-[#F5EFE3]/15 px-2 py-0.5 font-sans font-semibold text-[#FE6500]">
            Editor
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs font-sans">
          <span className="text-[#F5EFE3]/70">{user.email}</span>
          <form action={logout}>
            <button
              type="submit"
              className="px-3 py-1 bg-transparent border border-[#F5EFE3]/30 hover:border-[#FE6500] hover:text-[#FE6500] transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      {/* Main Admin Work Area */}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
