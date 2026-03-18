"use client";

import React, {
  useRef,
  Children,
  isValidElement,
  cloneElement,
  ReactNode,
  ReactElement,
  useState,
  useEffect,
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
  Variants,
} from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface TextRevealProps {
  children: ReactNode;
  className?: string;

  delay?: number;
  staggerDuration?: number;
  animationDuration?: number;

  once?: boolean;
  repeat?: boolean;

  /** Scroll synced animation */
  scrub?: boolean;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className,

  delay = 0,
  staggerDuration = 0.015,
  animationDuration = 0.7,

  once = true,
  repeat = false,
  scrub = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  /* ---------------- IN VIEW ---------------- */

  const isInView = useInView(ref, {
    once: false,
    margin: "-10% 0px",
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && once && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, once, hasAnimated]);

  const shouldAnimate = once ? hasAnimated : isInView;

  /* ---------------- SCROLL SCRUB ---------------- */

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });

  /* ---------------- ANIMATION ---------------- */

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {
      y: "110%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: animationDuration,
        ease,
      },
    },
  };

  /* ---------------- WORD WRAPPER ---------------- */

  let globalIndex = 0;

  const wrapText = (nodes: ReactNode): ReactNode => {
    return Children.map(nodes, (child, index) => {
      if (typeof child === "string") {
        const words = child.split(" ");

        return words.map((word, i) => {
          const wordIndex = globalIndex++;

          /* stagger offset for scrub mode */
          const start = wordIndex * staggerDuration;
          const end = start + 0.25;

          const y: MotionValue<string> = useTransform(
            scrollYProgress,
            [start, end],
            ["110%", "0%"]
          );

          const opacity: MotionValue<number> = useTransform(
            scrollYProgress,
            [start, end],
            [0, 1]
          );

          return (
            <span
              key={`${word}-${index}-${i}`}
              className="inline-block overflow-hidden align-bottom"
            >
              {scrub ? (
                <motion.span
                  style={{ y, opacity }}
                  className="inline-block will-change-transform"
                >
                  {word}&nbsp;
                </motion.span>
              ) : (
                <motion.span
                  variants={wordVariants}
                  className="inline-block will-change-transform"
                >
                  {word}&nbsp;
                </motion.span>
              )}
            </span>
          );
        });
      }

      if (isValidElement(child)) {
        const typedChild = child as ReactElement<{
          children?: ReactNode;
          className?: string;
        }>;

        if (typedChild.type === "br") {
          return <br key={`br-${index}`} />;
        }

        return cloneElement(
          typedChild,
          {
            ...typedChild.props,
            className: cn(typedChild.props.className),
          },
          wrapText(typedChild.props.children)
        );
      }

      return child;
    });
  };

  /* ---------------- RENDER ---------------- */

  return (
    <motion.div
      ref={ref}
      className={cn("inline", className)}
      variants={!scrub ? containerVariants : undefined}
      initial={!scrub ? "hidden" : undefined}
      animate={!scrub ? (repeat ? (isInView ? "visible" : "hidden") : shouldAnimate ? "visible" : "hidden") : undefined}
    >
      {wrapText(children)}
    </motion.div>
  );
};