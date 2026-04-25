"use client";

import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, useReducedMotion, type Variants } from "motion/react";
import * as m from "motion/react-m";

export { AnimatePresence, m, useReducedMotion };

export const softEase = [0.22, 1, 0.36, 1] as const;

export const pageVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: softEase }
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.18, ease: softEase }
  }
};

export const listVariants: Variants = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.065, delayChildren: 0.04 }
  }
};

export const revealVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: softEase }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.18, ease: softEase }
  }
};

export const panelVariants: Variants = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.36, ease: softEase }
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.99,
    transition: { duration: 0.18, ease: softEase }
  }
};

export const cardVariants: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: softEase }
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: { duration: 0.18, ease: softEase }
  }
};

export const controlMotion = {
  whileHover: { y: -1 },
  whileTap: { y: 0, scale: 0.985 },
  transition: { duration: 0.18, ease: softEase }
};

export const cardMotion = {
  whileHover: { y: -3 },
  whileTap: { y: -1, scale: 0.995 },
  transition: { duration: 0.2, ease: softEase }
};

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}

type MotionDivProps = React.ComponentProps<typeof m.div>;

export function MotionPage({ children, ...props }: MotionDivProps) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function MotionList({ children, ...props }: MotionDivProps) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      variants={listVariants}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function MotionPanel({ children, ...props }: MotionDivProps) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={panelVariants}
      {...props}
    >
      {children}
    </m.div>
  );
}

export function MotionItem({ children, ...props }: MotionDivProps) {
  return (
    <m.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={cardVariants}
      {...props}
    >
      {children}
    </m.div>
  );
}
