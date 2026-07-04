import type { Variants } from "framer-motion";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
	hidden: { opacity: 0, y: 32 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.94 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const slideInLeft: Variants = {
	hidden: { opacity: 0, x: -48 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 48 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const staggerContainer = (staggerChildren = 0.12, delayChildren = 0): Variants => ({
	hidden: {},
	visible: { transition: { staggerChildren, delayChildren } },
});

// Scroll sections animate once, on first entry — repeated triggers while
// scrolling up/down over a 7-section marketing page reads as noisy rather than polished.
export const revealOnce = { once: true, amount: 0.25 } as const;
