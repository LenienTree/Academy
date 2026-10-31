# Lenienttree Academy (v2)

A high-fidelity modern web application for **Lenienttree Academy**, built with Next.js (App Router), TypeScript, Tailwind CSS v4, and GSAP. Converted from the original editorial design to deliver smooth scroll interactions, zero layout shifts, and accessible motion controls.

---

## 🛠 Tech Stack & Libraries

### 1. Core Framework & Language
- **[Next.js 16 (App Router)](https://nextjs.org/)**: Server-side rendering, static generation, partial prerendering, and optimized asset pipelines.
- **[React 19](https://react.dev/)**: Latest React runtime with modern hooks (`useSyncExternalStore`, `useRef`, `useEffect`).
- **[TypeScript 5](https://www.typescriptlang.org/)**: Strict type safety throughout all data models, UI props, and GSAP refs.

### 2. Styling & Design System
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS styling using `@tailwindcss/postcss` for seamless compilation.
- **[PostCSS 8](https://postcss.org/)**: Native CSS processing pipeline.
- **`clsx` & `tailwind-merge`**: Safe dynamic class composition.
- **Typography (`next/font/google`)**:
  - **Newsreader**: Display serif with variable optical sizing (`opsz: 6..72`) for editorial headlines and quotations.
  - **Inter**: Clean UI sans (`400`, `500`, `600`) for headers, body copy, and UI metrics.
- **Color Tokens**:
  - `cream`: `#F5EFE3` (Primary background)
  - `cream-deep`: `#EBDBCD` (Card surfaces and borders)
  - `ink`: `#19181D` (Primary typography & accents)
  - `ink60`: `#5D5B62` (Secondary muted typography)
  - `tangerine`: `#FE6500` (Brand accent, buttons, badges, highlights)

### 3. Animations & Interactions
- **[GSAP 3](https://gsap.com/) & [@gsap/react](https://gsap.com/resources/React/) (`useGSAP`)**:
  - **ScrollTrigger**: Pinned timeline scrubbing for the Academy Story section (`#story`), animating SVG plant stem stroke dash offsets, node indicators, and leaf blooms.
  - Scope-isolated animations with automatic cleanup preventing memory leaks.
- **Continuous CSS Marquees**: Dual-set infinite scrolling tracks for Testimonials, Events, and Judges with pause-on-hover and pause-on-focus.
- **Reduced Motion Engine (`MotionToggle`)**: Global toggle button fixed at the bottom right that synchronizes with `prefers-reduced-motion`, pausing the hero video, halting marquees, and disabling card lifts.

### 4. Media Architecture & CLS Prevention
- **Next.js `<Image />`**: Automatic WebP/AVIF formatting, responsive sizes, and intrinsic aspect ratio preservation.
- **Aspect-Ratio Reserved Video**: The Hero section features a `9:16` vertical video player with poster preview fallback, offset accent shadow, and playsInline configuration.
- **Procedural SVG Fallbacks (`src/lib/graphics.ts`)**: Seeded pseudo-random generator (`rng`) generating consistent geometric avatars and badges for cards without photographs.

---

## 📂 Project Architecture

```
lenienttree-academy/
├── public/
│   ├── assets/
│   │   ├── hero.mp4            # Hero vertical video
│   │   ├── hero-poster.jpg     # Video placeholder poster
│   │   ├── christina.jpg       # Testimonial image
│   │   ├── academia.jpg        # Campus / event image
│   │   ├── heads/              # 11 State Head portraits (01.webp - 11.webp)
│   │   └── events/             # Hackathon & event promotional art
│   ├── favicon.svg             # Brand favicon
│   └── icons/                  # Star rating & brand SVGs
├── src/
│   ├── app/
│   │   ├── globals.css         # Theme tokens, custom utilities, marquees, plant stem styles
│   │   ├── layout.tsx          # Root layout, Google fonts, Header, Footer, MotionToggle
│   │   ├── page.tsx            # Main landing page combining all sections and modal context
│   │   └── programs/
│   │       └── [slug]/page.tsx # Dynamic program deep-dive routes
│   ├── components/
│   │   ├── common/
│   │   │   └── SvgDefs.tsx     # Reusable SVG symbol definitions (logo mark, stars, checkmarks)
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Split desktop navigation (.nl, logo, .nr), mobile tab bar (.nav-m), scroll progress bar
│   │   │   └── Footer.tsx      # Dark footer with brand lockup, navigation links, and copyright
│   │   ├── modals/
│   │   │   ├── ModalManager.tsx      # Modal orchestrator (backdrop scrim, Esc key, focus trap)
│   │   │   ├── TestimonialModal.tsx  # Rounded card pop-up with reviewer info and LinkedIn link
│   │   │   └── EventDetailModal.tsx  # Fullscreen deep-dive event sheet
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Balanced headline, dual CTAs, video container
│   │   │   ├── ValueBand.tsx         # 3-column core feature strip
│   │   │   ├── TestimonialsSection.tsx # Drifting student review cards
│   │   │   ├── EventsSection.tsx     # Upcoming hackathons and workshop marquee
│   │   │   ├── StateHeadsSection.tsx # 11-member grid (desktop) & snap carousel (mobile)
│   │   │   ├── StorySection.tsx      # Pinned GSAP ScrollTrigger plant growth journey
│   │   │   ├── RoomSection.tsx       # Experts & mentors grid with lift-on-tap cards
│   │   │   ├── ProgramTiersSection.tsx # Live classes, internship, and career tracks
│   │   │   └── FaqSection.tsx        # Structured expandable FAQ accordion
│   │   └── ui/
│   │       ├── Marquee.tsx           # Continuous seamless scrolling wrapper
│   │       ├── MotionToggle.tsx      # Persistent bottom-right pause motion controller
│   │       ├── ProceduralGraphics.tsx # Deterministic SVG avatar & badge generator
│   │       └── RoomCard.tsx          # Accessible interactive expert card
│   ├── context/
│   │   └── ModalContext.tsx    # Global modal state provider with scroll locking
│   ├── data/
│   │   └── academyData.ts      # Verbatim data models (events, testimonials, state heads, mentors, FAQs)
│   ├── lib/
│   │   ├── graphics.ts         # Math and SVG path algorithms for procedural art
│   │   └── gsap.ts             # GSAP core and ScrollTrigger registration
│   └── types/
│       └── academy.ts          # TypeScript interfaces for all data entities
├── postcss.config.mjs          # PostCSS configuration with @tailwindcss/postcss
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind theme configuration
└── tsconfig.json               # TypeScript strict configuration
```

---

## 🚀 How to Run the Project Locally

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js**: v18.18.0 or newer (v20+ recommended)
- **npm**: v9 or newer (or `pnpm` / `yarn` / `bun`)

### 2. Installation
Navigate into the project directory and install dependencies:

```bash
cd lenienttree-academy
npm install
```

### 3. Start Development Server
Run the local Next.js dev server:

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

The application will start with hot-module reloading and Turbopack enabled.

### 4. Verification & Quality Gates
Before deploying or committing code, run the verification commands to ensure zero type errors or lint warnings:

```bash
# 1. TypeScript Strict Type Check
npm run type-check

# 2. ESLint Validation
npm run lint

# 3. Production Build Simulation
npm run build
```

### 5. Production Preview
To test the production build locally with static generation:

```bash
npm run build
npm run start
```
Access the production build at `http://localhost:3000`.

---

## 🎨 Key Features & User Interactions

1. **Split-Navigation Header (`Header.tsx`)**:
   - Desktop (`> 760px`): Symmetrical 3-column layout (Events & Programs on left, Wordmark in center, About, Experts, and Register CTA on right).
   - Mobile (`< 760px`): Compact top bar with sticky 4-item tab bar (`.nav-m`).
   - Scroll Progress: Real-time top progress bar scrubbing the scroll percentage across the document.

2. **Persistent "Pause Motion" Controller (`MotionToggle.tsx`)**:
   - Always visible in the bottom-right corner (`position: fixed; right: 16px; bottom: 16px`).
   - Automatically pauses all CSS marquee animations, freezes the Hero video player, and sets `prefers-reduced-motion` compliance.

3. **Interactive Modals (`ModalContext.tsx`)**:
   - **Testimonial Pop-up**: Clicking any testimonial card opens an accessible review card with star ratings and a direct LinkedIn profile link.
   - **Event Deep Dive**: Clicking any event card opens a fullscreen detailed view.
   - Includes background scroll locking and `Escape` key dismissal.

4. **GSAP Story Plant Growth (`StorySection.tsx`)**:
   - As you scroll through the 4 academy journey milestones, the container pins and scrubs the SVG plant stem (`strokeDashoffset`), lighting up milestones and growing leaves progressively.

5. **State Heads Carousel (`StateHeadsSection.tsx`)**:
   - Displays 11 regional state leads.
   - Responsive design switches to a horizontal swipe-snap carousel on mobile devices (`< 640px`) with touch indicators.
