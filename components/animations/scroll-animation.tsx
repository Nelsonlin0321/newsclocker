"use client";

import { motion, useReducedMotion, useInView, UseInViewOptions } from "framer-motion";
import { useRef, ReactNode } from "react";
import { Variants } from "framer-motion";

interface ScrollAnimationProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  viewport?: UseInViewOptions;
  custom?: any;
}

export function ScrollAnimation({
  children,
  variants,
  className = "",
  viewport = { once: true, amount: 0.3 },
  custom
}: ScrollAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, viewport);
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={custom}
      className={className}
    >
      {children}
    </motion.div>
  );
}