import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const slideIn: Variants = {
  hidden: (direction: "left" | "right" = "left") => ({
    x: direction === "left" ? -60 : 60,
    opacity: 0
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const staggerChildren = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const scaleIn: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const parallaxScroll = (yOffset: number = 100): Variants => ({
  hidden: { y: yOffset },
  visible: {
    y: 0,
    transition: {
      type: "spring",
      stiffness: 30,
      damping: 15
    }
  }
});