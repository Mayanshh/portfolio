"use client";

import { useRef } from "react";
import { motion, useInView, Variants, useScroll, useTransform, MotionValue } from "framer-motion";

interface TextRippleProps {
  text: string;
  className?: string;
  once?: boolean;
  delayOffset?: number;
  duration?: number;
  blur?: boolean;
  scrub?: boolean;
  reverse?: boolean; // New prop: defaults to false
}

// Sub-component to prevent Hook violations (needed for both modes)
interface RippleCharProps {
  char: string;
  i: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  scrub: boolean;
  blur: boolean;
  charVariants: Variants;
  isInView: boolean;
  startY: number;
}

const RippleChar = ({
  char,
  i,
  centerIndex,
  scrollYProgress,
  scrub,
  blur,
  charVariants,
  isInView,
  startY
}: RippleCharProps) => {
  const charDelay = Math.abs(i - centerIndex) * 0.1;
  const start = 0 + charDelay;
  const end = Math.min(1, 0.6 + charDelay);
  
  const yScrub = useTransform(scrollYProgress, [start, end], [startY, 0]);
  const blurScrub = useTransform(scrollYProgress, [start, end], ["blur(10px)", "blur(0px)"]);

  return (
    <motion.span
      custom={i}
      variants={!scrub ? charVariants : undefined}
      initial={!scrub ? "hidden" : undefined}
      animate={!scrub ? (isInView ? "visible" : "hidden") : undefined}
      style={scrub ? { 
          y: yScrub, 
          filter: blur ? blurScrub : "none" 
      } : {}}
      className="inline-block whitespace-pre px-[0.0025em] will-change-transform"
    >
      {char}
    </motion.span>
  );
};

const TextRipple = ({
  text,
  className = "",
  once = true,
  delayOffset = 0.08,
  duration = 0.5,
  blur = false,
  scrub = false,
  reverse = false,
}: TextRippleProps) => {
  const containerRef = useRef(null);
  
  // Logic: Use original settings for normal, modified settings for reverse
  const viewMargin = reverse ? "0px" : "-10% 0px";
  const scrollOffset: any = reverse 
    ? ["start end", "end end"] 
    : ["start end", "end center"];

  const isInView = useInView(containerRef, {
    once,
    margin: viewMargin,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: scrollOffset,
  });

  const characters = text.split("");
  const centerIndex = (characters.length - 1) / 2;
  
  // startY is 200 for bottom-up (reverse), -200 for top-down (original)
  const startY = reverse ? 200 : -200;

  const charVariants: Variants = {
    hidden: {
      y: startY,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: (i: number) => ({
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: Math.abs(i - centerIndex) * delayOffset,
        duration: duration,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div 
      ref={containerRef} 
      className={`relative overflow-hidden flex flex-wrap justify-center items-center px-2 ${className}`}
    >
      {characters.map((char, i) => (
        <RippleChar
          key={i}
          char={char}
          i={i}
          centerIndex={centerIndex}
          scrollYProgress={scrollYProgress}
          scrub={scrub}
          blur={blur}
          charVariants={charVariants}
          isInView={isInView}
          startY={startY}
        />
      ))}
    </div>
  );
};

export default TextRipple;