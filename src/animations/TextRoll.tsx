"use client";
import { motion, Variants, Transition } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface TextRollProps {
  text: string;
  className?: string;
  trigger: boolean;
}

export const TextRoll = ({ text, className = "", trigger }: TextRollProps) => {

  const transition: Transition = {
    duration: 0.6,
    ease: [0.6, 0.01, -0.05, 0.95] as [number, number, number, number],
  };

  const letters = text.split("");

  const containerVariants: Variants = {
    initial: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
    hover: { transition: { staggerChildren: 0.02, staggerDirection: 1 } },
  };

  const letterVariants: Variants = {
    initial: { y: 0 },
    hover: { y: "-100%" },
  };

  return (
    <motion.span
      variants={containerVariants}
      animate={trigger ? "hover" : "initial"}
      className={`relative inline-flex flex-nowrap whitespace-nowrap overflow-hidden ${className}`}
    >
      {letters.map((char, i) => (
        <span
          key={i}
          className="relative inline-block overflow-hidden"
          style={{ height: "1.2em" }}
        >
          <motion.span
            variants={letterVariants}
            transition={transition}
            className="flex flex-col text-center"
          >
            <span className="flex items-center justify-center">
              {char === " " ? "\u00A0" : char}
            </span>

            <span className="flex items-center justify-center absolute top-full">
              {char === " " ? "\u00A0" : char}
            </span>
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export const CustomLinkBracket = ({
  name,
  url,
  className,
}: {
  name: string;
  url: string;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      className={`group relative mix-blend-difference tracking-tight flex items-center justify-center uppercase text-md ${className}`}
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="flex items-center">
        <span className="transition-transform duration-500 ease-out group-hover:-translate-x-1">
          [
        </span>

        <span className="inline-block px-2 transition-all duration-500 ease-out group-hover:px-5">
          <TextRoll text={name} trigger={isHovered} />
        </span>

        <span className="transition-transform duration-500 ease-out group-hover:translate-x-1">
          ]
        </span>
      </span>
    </Link>
  );
};