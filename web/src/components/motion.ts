// Shared motion primitives for the homepage. Centralised so timing/easing stay
// consistent and pages read cleanly. Uses the lean LazyMotion + domAnimation subset
// (features are loaded via <LazyMotion features={domAnimation}> and `m.*` components,
// keeping the framer bundle to the ~15KB gz feature tree we actually use).
import type { Variants } from 'framer-motion';

export { LazyMotion, domAnimation, m, MotionConfig, useReducedMotion } from 'framer-motion';

// Subtle "ease-out expo"-style curve — calm, professional deceleration.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Fade + short slide-up. Under <MotionConfig reducedMotion="user"> the y movement is
// dropped automatically for users who ask for reduced motion; the opacity fade remains.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Parent that reveals its children in a quick staggered cascade. Pair each child with
// `variants={fadeUp}` (children inherit the show/hidden state from this container).
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Shared scroll-reveal trigger: animate once, when ~20% of the block is in view.
export const revealViewport = { once: true, amount: 0.2 } as const;
