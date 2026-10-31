import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-cream border-t border-[rgba(245,239,227,0.18)]">
      <div className="wrap flex flex-wrap justify-between items-center gap-6 py-8">
        <Link
          href="/"
          className="flex items-center gap-3 no-underline text-cream"
          aria-label="Lenienttree Academy, home"
        >
          <span className="block flex-none bg-tangerine w-10 h-10">
            <svg viewBox="0 0 100 100" aria-hidden="true" className="w-full h-full block">
              <use href="#L" x="33" y="17" width="34" height="66" fill="#ffffff" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <b className="font-display font-normal text-[24px] leading-none tracking-[-0.01em] text-cream">
              Lenienttree
            </b>
            <i className="font-ui font-medium not-italic text-[8px] leading-none tracking-[0.34em] mt-[5px] pl-[1px] text-[rgba(245,239,227,0.7)]">
              ACADEMY
            </i>
          </span>
        </Link>

        <nav className="flex flex-wrap gap-5 text-[14px]" aria-label="Footer">
          <Link href="/#events" className="hover:text-tangerine transition-colors">
            Events
          </Link>
          <Link href="/#programs" className="hover:text-tangerine transition-colors">
            Program
          </Link>
          <Link href="/#story" className="hover:text-tangerine transition-colors">
            About
          </Link>
          <Link href="/#room" className="hover:text-tangerine transition-colors">
            Experts
          </Link>
          <Link href="/#faq" className="hover:text-tangerine transition-colors">
            FAQ
          </Link>
        </nav>

        <small className="block w-full text-[rgba(245,239,227,0.65)] text-[12px]">
          Learn it live. Build it real. · © 2026 Lenienttree
        </small>
      </div>
    </footer>
  );
}
