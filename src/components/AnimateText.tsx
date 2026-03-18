"use client";

import React, { useRef, useEffect, useState, ReactNode } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useSpring, 
  MotionValue,
  Variants,
  BezierDefinition
} from "framer-motion";

interface AnimateTextProps {
  children: ReactNode;
  className?: string;
  mode?: "in-view" | "scroll";
  stagger?: number;
  duration?: number;
  easing?: BezierDefinition;
}

export const AnimateText = ({
  children,
  className = "",
  mode = "in-view",
  stagger = 0.05,
  duration = 0.9,
  easing = [0.22, 1, 0.36, 1] as BezierDefinition,
}: AnimateTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    const calculateLines = () => {
      if (!containerRef.current) return;

      // 1. Get plain text and respect <br/> by replacing them temporarily
      // We look at the actual text content rendered in the DOM
      const element = containerRef.current;
      const text = element.innerText || "";
      
      // 2. Split by the actual lines the browser rendered (the "luxury" way)
      const words = text.split(/\s+/);
      const newLines: string[] = [];
      let currentLine = "";

      const tempSpan = document.createElement("span");
      tempSpan.style.visibility = "hidden";
      tempSpan.style.position = "absolute";
      tempSpan.style.whiteSpace = "nowrap";
      
      const computedStyle = window.getComputedStyle(element);
      tempSpan.style.font = computedStyle.font;
      tempSpan.style.fontWeight = computedStyle.fontWeight;
      tempSpan.style.letterSpacing = computedStyle.letterSpacing;
      tempSpan.style.textTransform = computedStyle.textTransform;
      
      document.body.appendChild(tempSpan);
      const maxWidth = element.offsetWidth;

      // Handle explicit breaks and auto-wrapping
      const explicitSegments = text.split("\n"); // <br/> shows up as \n in innerText

      explicitSegments.forEach((segment) => {
        const segmentWords = segment.trim().split(" ");
        currentLine = "";
        
        segmentWords.forEach((word) => {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          tempSpan.innerText = testLine;
          if (tempSpan.offsetWidth > maxWidth && currentLine !== "") {
            newLines.push(currentLine);
            currentLine = word;
          } else {
            currentLine = testLine;
          }
        });
        if (currentLine) newLines.push(currentLine);
      });

      document.body.removeChild(tempSpan);
      setLines(newLines);
    };

    calculateLines();
    window.addEventListener("resize", calculateLines);
    return () => window.removeEventListener("resize", calculateLines);
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end center"], 
  });

  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 80, // Slightly looser for a "heavier" feel
  });

  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  return (
    <div ref={containerRef} className={className}>
      {/* Hidden original children to keep the style reference and SEO, 
          but we animate the calculated lines */}
      <div className="sr-only" aria-hidden="true">{children}</div>
      
      {lines.map((line, index) => (
        <Line 
          key={index} 
          line={line} 
          index={index} 
          mode={mode} 
          isInView={isInView} 
          progress={smoothProgress}
          stagger={stagger}
          duration={duration}
          ease={easing}
        />
      ))}
    </div>
  );
};

const Line = React.memo(({ line, index, mode, isInView, progress, stagger, duration, ease }: any) => {
  const startTrigger = index * 0.03;
  const endTrigger = Math.min(startTrigger + 0.3, 1);
  
  const yScroll = useTransform(progress, [startTrigger, endTrigger], ["100%", "0%"]);
  const opacityScroll = useTransform(progress, [startTrigger, endTrigger], [0, 1]);

  const variants: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: duration,
        delay: index * stagger,
        ease: ease
      }
    }
  };

  return (
    <div className="overflow-hidden block py-[0.05em]">
      {mode === "scroll" ? (
        <motion.span style={{ y: yScroll, opacity: opacityScroll, display: "block" }}>
          {line}
        </motion.span>
      ) : (
        <motion.span
          variants={variants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="block"
        >
          {line}
        </motion.span>
      )}
    </div>
  );
});

Line.displayName = "Line";