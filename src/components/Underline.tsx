"use client";

import React from "react";

interface UnderlineProps {
  children: React.ReactNode;
  className?: string;
  lineClassName?: string;
}

export const Underline = ({ children, className = "", lineClassName = "" }: UnderlineProps) => {
  return (
    <span className={`group relative inline-block cursor-pointer ${className}`}>
      {children}
      
      {/* The Underline:
        1. 'bottom-[2px]' ensures it starts with NO gap (touching the text baseline).
        2. 'left-1/2' and 'w-0' sets the starting point at the center.
        3. 'group-hover:translate-y-[6px]' creates the gap instantly.
        4. 'group-hover:w-1/2' + 'group-hover:left-1/2' makes it animate to the right.
      */}
      <span
        className={`
          absolute bottom-0.5 left-[18%] w-0 h-[1.5px]! 
          leading-[0.90]
          bg-current transition-all duration-500 
          ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] 
          group-hover:left-[18%] group-hover:w-[82%]
          translate-y-1.5
          ${lineClassName}
        `}
      />
      
      {/* Optional: If you want the line to appear from the center to BOTH sides 
        simultaneously (more balanced), use this second span. 
        If you strictly want Center-to-Right, the code above is enough.
      */}
    </span>
  );
};