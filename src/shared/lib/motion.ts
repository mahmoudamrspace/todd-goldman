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
