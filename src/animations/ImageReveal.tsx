"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ImageRevealProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  once?: boolean;
  duration?: number;
  delay?: number;
  easing?: any;
  priority?: boolean; // ✅ control LCP manually
}

const ImageReveal = ({
  src,
  alt,
  className = "",
  once = true,
  duration = 0.8,
  delay = 0,
  easing = [0.22, 1, 0.36, 1],
  priority = false,
}: ImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px", // ✅ triggers slightly earlier (feels smoother)
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={
          isInView
            ? { clipPath: "inset(0% 0% 0% 0%)" }
            : undefined // ✅ prevents reverse animation when once=true
        }
        transition={{
          duration,
          delay,
          ease: easing,
        }}
        className="relative w-full h-full will-change-[clip-path]" // ✅ performance hint
      >
        
        <Image
          src={src}
          alt={alt}
          fill  // ✅ REQUIRED FIX (Next.js 16)
          priority={priority} // ✅ only true for hero images
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top"
        />

      </motion.div>
    </div>
  );
};

export default ImageReveal;