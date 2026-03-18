"use client"

import Link from "next/link";
import { TextRoll } from "@/animations/TextRoll";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react"

export const CustomLink = ({
  name,
  url,
  className
}: {
  name: string,
  url: string,
  className?: string
}) => {

  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={url}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group w-40 mix-blend-difference splineLight tracking-tight flex items-center justify-center uppercase text-md ${className}`}
    >
      <span className="flex items-center">
        {/* Animated Text - Brackets and padding expansion removed */}
        <span className="inline-block mix-blend-difference customTransition">
          <TextRoll text={name} trigger={hovered} />
        </span>
      </span>
    </Link>
  );
};


export const CustomLinkBracket = ({
  name,
  url,
  className
}: {
  name: string,
  url: string,
  className?: string
}) => {

  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={url}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group w-40 mix-blend-difference splineLight tracking-tight flex items-center justify-center uppercase text-md ${className}`}
    >
      <span className="flex items-center">

        {/* Left Bracket */}
        <span className="customTransition mix-blend-difference group-hover:-translate-x-0.5">
          [
        </span>

        {/* Animated Text */}
        <span className="inline-block splineLight mix-blend-difference px-2 customTransition group-hover:px-5">
          <TextRoll text={name} trigger={hovered} />
        </span>

        {/* Right Bracket */}
        <span className="customTransition mix-blend-difference group-hover:translate-x-0.5">
          ]
        </span>

      </span>
    </Link>
  );
};

type ArrowPosition =
  | "top right"
  | "top left"
  | "bottom right"
  | "bottom left"
  | "center center";

const rotationMap: Record<ArrowPosition, number> = {
  "top right": -45,
  "top left": 45,
  "bottom right": 45,
  "bottom left": 135,
  "center center": 0,
};

interface CustomLinkArrowProps {
  name: string;
  url: string;
  className?: string;
  animateUnderline?: boolean;
  underlineWidth?: number;
  arrFrom?: ArrowPosition;
  arrTo?: ArrowPosition;
  arrSize?: number;
  arrStroke?: number;
  gapIntensity?: number;
}

export const CustomLinkArrow = ({
  name,
  url,
  className = "",
  animateUnderline = true,
  underlineWidth = 98,
  arrFrom = "top right",
  arrTo = "center center",
  arrSize = 23,
  arrStroke = 0.8,
  gapIntensity = 0.2 ,
}: CustomLinkArrowProps) => {
  const fromRotation = useMemo(() => rotationMap[arrFrom] ?? 0, [arrFrom]);
  const toRotation = useMemo(() => rotationMap[arrTo] ?? 0, [arrTo]);

  return (
    <Link
      href={url}
      style={{
        ["--from-rotate" as string]: `${fromRotation}deg`,
        ["--to-rotate" as string]: `${toRotation}deg`,
      }}
      className={`group relative mix-blend-difference splineLight tracking-tighter flex items-center uppercase text-lg w-full transition-all duration-300 ${className}`}
    >
      <span className="flex items-center justify-between w-full gap-2">
        {name}
        <ArrowRight
          size={arrSize}
          strokeWidth={arrStroke}
          className="transition-transform duration-500 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] origin-center"
          style={{
            transform: `rotate(var(--from-rotate))`,
          }}
        />
      </span>

      {animateUnderline && (
        <span
        style={{
          width: `${underlineWidth}`
        }}
         className={`absolute bottom-0 left-0 h-[1.5px] w-[98%] overflow-hidden pointer-events-none`}>
          
          <span className="absolute inset-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] group-hover:translate-x-[110%]" />
          
          <span 
            className="absolute inset-0 bg-current -translate-x-[110%] transition-transform group-hover:translate-x-0"
            style={{
               transitionDuration: `${500 + (gapIntensity * 1000)}ms`,
               transitionDelay: `${gapIntensity * 100}ms`,
               transitionTimingFunction: 'cubic-bezier(0.11, 0.82, 0.39, 0.92)'
            }}
          />
          
        </span>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover svg {
          transform: rotate(var(--to-rotate)) !important;
        }
      `}} />
    </Link>
  );
};



interface LogoLinkWithBadgeProps {
  name: string;
  url: string;
  className?: string;
  animateUnderline?: boolean;
  arrFrom?: ArrowPosition;
  arrTo?: ArrowPosition;
  underlineHeight?: number; // Passed as a number (e.g., 1.5)
  arrSize?: number;
  arrStroke?: number;
  gapIntensity?: number;
  iconUrl?: any;
  badgeNumber?: number | string;
}

export const LogoLinkWithBadge = ({
  name,
  url,
  className = "",
  animateUnderline = true,
  arrFrom = "top right",
  arrTo = "center center",
  underlineHeight = 1.5,
  arrSize = 23,
  arrStroke = 1.5,
  gapIntensity = 0.35,
  iconUrl,
  badgeNumber,
}: LogoLinkWithBadgeProps) => {
  const fromRotation = useMemo(() => rotationMap[arrFrom] ?? 0, [arrFrom]);
  const toRotation = useMemo(() => rotationMap[arrTo] ?? 0, [arrTo]);

  const imgSrc = typeof iconUrl === "string" ? iconUrl : iconUrl?.src;

  return (
    <Link
      href={url}
      style={{
        ["--from-rotate" as string]: `${fromRotation}deg`,
        ["--to-rotate" as string]: `${toRotation}deg`,
      }}
      className={`group relative tracking-tighter! mix-blend-normal! flex items-center uppercase transition-all duration-300 splineRegular text-2xl!  w-full pb-1 pt-8 ${className}`}
    >
      <span className="flex items-center justify-between w-full gap-2">
        <div className="flex items-center justify-start"> {/* Changed items-start to items-center */}
          {imgSrc && (
            <img
              className="mr-3 h-7 mb-1.5 w-auto block z-10"
              src={imgSrc}
              alt=""
            />
          )}
          <span className="relative">
            {name}
            {badgeNumber !== undefined && (
              <span className="absolute -top-1 -right-6 text-sm! sofiaSemiBold">
                {badgeNumber}
              </span>
            )}
          </span>
        </div>
        <ArrowRight
          size={arrSize}
          strokeWidth={arrStroke}
          className="transition-transform duration-500 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] origin-center"
          style={{
            transform: `rotate(var(--from-rotate))`,
          }}
        />
      </span>

      {animateUnderline && (
        <span 
          className="absolute bottom-0 left-0 w-[98%] overflow-hidden pointer-events-none"
          style={{ height: `${underlineHeight}px` }} // Dynamic height moved here
        >
          <span className="absolute inset-0 bg-current transition-transform duration-500 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] group-hover:translate-x-[110%]" />

          <span
            className="absolute inset-0 bg-current -translate-x-[110%] transition-transform group-hover:translate-x-0"
            style={{
              transitionDuration: `${500 + gapIntensity * 1000}ms`,
              transitionDelay: `${gapIntensity * 100}ms`,
              transitionTimingFunction: "cubic-bezier(0.11, 0.82, 0.39, 0.92)",
            }}
          />
        </span>
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .group:hover svg {
          transform: rotate(var(--to-rotate)) !important;
        }
      `,
        }}
      />
    </Link>
  );
};