export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeFaq = [0.12, 0.23, 0.17, 0.99] as const;
export const easeNav = [0.27, 0.1, 0.17, 1] as const;

export const springSoft = { type: "spring" as const, bounce: 0.2, duration: 0.8 };
export const springHero = { type: "spring" as const, bounce: 0.2, duration: 1.4 };
export const springHover = {
  type: "spring" as const,
  bounce: 0.5,
  duration: 0.8,
  stiffness: 500,
  damping: 55,
};

/** Editorial scroll-linked scenes — synced with Lenis via Motion frame loop. */
export const editorialSpring = {
  stiffness: 90,
  damping: 28,
  mass: 0.35,
};

export const editorialSceneHeight = "min(62vh, 640px)";

export const chapterScrollRange = {
  opacity: [0.88, 1, 1, 0.9] as const,
  opacityInput: [0, 0.06, 0.94, 1] as const,
  y: [20, 0, 0, -12] as const,
  yInput: [0, 0.1, 0.9, 1] as const,
};

export const editorialDominantParallax = {
  y: [48, 0, -24] as const,
  yInput: [0, 0.5, 1] as const,
};

export const editorialSupportParallax = {
  y: [64, 0, -36] as const,
  yInput: [0, 0.5, 1] as const,
};

export const editorialClipReveal = {
  dominant: ["inset(10% 6% 10% 6%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] as const,
  dominantInput: [0, 0.4, 1] as const,
  support: ["inset(16% 10% 16% 10%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)"] as const,
  supportInput: [0.08, 0.45, 1] as const,
};

export const fadeOpacity = {
  hidden: { opacity: 0.001 },
  visible: {
    opacity: 1,
    transition: { type: "spring" as const, bounce: 0.2, delay: 0.2, duration: 0.4 },
  },
};

export const fadeUpSmall = {
  hidden: { opacity: 0.001, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, bounce: 0, delay: 0.075, duration: 0.8 },
  },
};

export const fadeUpFaq = {
  hidden: { opacity: 0.001, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: easeFaq },
  },
};

export const fadeUpCard = {
  hidden: { opacity: 0.001, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, damping: 30, stiffness: 80 },
  },
};

export const workDetailEnter = {
  hidden: { opacity: 0.001, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, bounce: 0.1, delay: 0.5, duration: 0.6 },
  },
};

export const staggerFast = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const editorialFilterTransition = {
  layout: { type: "spring" as const, stiffness: 120, damping: 22 },
  opacity: { duration: 0.25 },
};

/** Nav overlay springs — recovered from Framer reference. */
export const navOverlaySpring = {
  type: "spring" as const,
  damping: 60,
  stiffness: 500,
  mass: 1,
};

export const navLinkCloseSpring = {
  type: "spring" as const,
  damping: 30,
  stiffness: 400,
  mass: 1,
};

export const navLinkDelays = [0, 0.2, 0.4] as const;
