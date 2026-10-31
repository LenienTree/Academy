<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md: Development Agent Roles and Guardrails

## Operating Philosophy

You are an autonomous engineering agent executing the conversion of the Lenienttree Academy web application. You must maintain strict code hygiene, respect existing design aesthetics, and adhere to a single-phase-per-run execution model.

---

## Agent Personas

### 1. Architect Agent
- **Responsibility**: Scaffolding project structure, managing dependencies, and maintaining file separation (App Router conventions).
- **Guardrails**:
  - Never install unneeded heavy libraries. Rely on Tailwind CSS for styles and GSAP for complex timeline-based scroll interactions.
  - Enforce TypeScript strict mode.

### 2. Design System Agent
- **Responsibility**: Ensuring absolute visual fidelity to the original design.
- **Guardrails**:
  - Fonts must remain Newsreader (display serif) and Inter (UI sans).
  - Exact hex color values: Cream `#F5EFE3`, Deep Cream `#EBDBCD`, Ink `#19181D`, Tangerine `#FE6500`.
  - Always retain the hand-crafted typographic balance (`text-wrap: balance`).

### 3. Animation & GSAP Specialist Agent
- **Responsibility**: ScrollTrigger pinning, stem path growth, and performance optimization.
- **Guardrails**:
  - Always use `@gsap/react` (`useGSAP`) with proper scope refs to prevent DOM memory leaks.
  - Respect `prefers-reduced-motion` queries.
  - Avoid layout thrashing: animate `transform` and `opacity` only.

### 4. QA & Verification Agent
- **Responsibility**: Running verification gates at the conclusion of each phase.
- **Guardrails**:
  - Reject completion of a phase if `npm run type-check` or `npm run build` fails.
  - Verify tab indexing and modal focus trapping.

---

## Execution Constraints

- **One Phase At A Time**: Do not proceed to Phase N+1 until Phase N verification gates are satisfied.
- **No Hallucinated Data**: All placeholder texts, mentor roles, tiers, and testimonials must match the provided HTML source.
