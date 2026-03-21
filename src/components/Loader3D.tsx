"use client";

import { useEffect, useRef, useState } from "react";

/* ================= CONFIG ================= */
const DYNAMIC_GAP = 56;
const ROTATION_SPEED_BASE = 0.25;
const ENTRANCE_OFFSET = 300;

const EXIT_CONFIG = {
  dipY: 60,
  sweepX: 800,
  sweepY: 1200,
  scaleMid: 0.95,
  scaleEnd: 0.85,
  dipDuration: 300, 
  delayBetween: 100, // ✅ Try 0 to 150 here. They will now perfectly overlap.
};

const customEasing = "cubic-bezier(0.16, 1, 0.3, 1)";
const exitEasing = "cubic-bezier(0.5, 0, 0.2, 1)"; 

/* ================= CYLINDER TEXT ================= */

function CircularText({
  text,
  radius,
  fontSize,
  className,
  isVisible,
}: {
  text: string;
  radius: number;
  fontSize: number;
  className?: string;
  isVisible: boolean;
}) {
  const chars = text.split("");
  const total = chars.length;

  return (
    <div
      className={`absolute inset-0 ${className || ""}`}
      style={{
        transformStyle: "preserve-3d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {chars.map((char, i) => {
        const angle = (i / total) * Math.PI * 2;
        const angleDeg = (angle * 180) / Math.PI;

        const z = Math.cos(angle) * radius;
        const depth = (z + radius) / (2 * radius);
        const isBack = z < 0;

        const baseOpacity = 0.25 + depth * 0.75;
        const currentOpacity = isVisible ? baseOpacity : 0;

        return (
          <span
            key={i}
            className="absolute text-black origin-center select-none"
            style={{
              transform: `
                rotateY(${angleDeg}deg)
                rotateX(${Math.sin(angle) * 8}deg)
                translateZ(${radius}px)
                ${isBack ? "rotateY(180deg)" : ""}
              `,
              opacity: currentOpacity,
              transition: `opacity 2.2s ${customEasing}`,
              fontSize: `${fontSize * (0.7 + depth * 0.3)}px`,
              whiteSpace: "pre",
              willChange: "transform, opacity, filter",
              backfaceVisibility: "visible",
              filter: `blur(${(1 - depth) * 1.2}px)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}

/* ================= MAIN LOADER ================= */

export default function Loader3D({ onFinish }: { onFinish: () => void }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  
  // ✅ DECOUPLED TIMELINES
  const [bottomExit, setBottomExit] = useState(0);
  const [topExit, setTopExit] = useState(0);
  const [uiExit, setUiExit] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const rotationRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const parallax = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 600);
    const t3 = setTimeout(() => setStage(3), 1400);

    const start = Date.now() + 1400;
    const duration = 4500;

    const interval = setInterval(() => {
      const now = Date.now();
      const t = Math.min((now - start) / duration, 1);
      if (t > 0) {
        setProgress(Math.floor((1 - Math.pow(1 - t, 4)) * 100));
      }
      if (t >= 1) {
        clearInterval(interval);
        
        const exitStart = 500; 

        // ✅ Bottom Cylinder Timeline
        setTimeout(() => setBottomExit(1), exitStart); 
        setTimeout(() => setBottomExit(2), exitStart + EXIT_CONFIG.dipDuration); 

        // ✅ Top Cylinder Timeline (Now completely isolated)
        setTimeout(() => setTopExit(1), exitStart + EXIT_CONFIG.delayBetween); 
        setTimeout(() => setTopExit(2), exitStart + EXIT_CONFIG.delayBetween + EXIT_CONFIG.dipDuration); 

        // ✅ Background/UI Wipe Timeline
        const finishDelay = exitStart + Math.max(EXIT_CONFIG.delayBetween, 0) + EXIT_CONFIG.dipDuration;
        setTimeout(() => setUiExit(true), finishDelay + 800);
        setTimeout(onFinish, finishDelay + 2000);
      }
    }, 16);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onFinish]);

  /* ================= ROTATION LOOP ================= */
  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTime.current) lastTime.current = time;
      const dt = (time - lastTime.current) / 16.66;
      lastTime.current = time;

      rotationRef.current += ROTATION_SPEED_BASE * dt;

      parallax.current.x += (mouse.current.x - parallax.current.x) * 0.06 * dt;
      parallax.current.y += (mouse.current.y - parallax.current.y) * 0.06 * dt;

      if (containerRef.current) {
        containerRef.current.style.transform = `
          rotateX(${22 + parallax.current.y * 8}deg)
          rotateY(${rotationRef.current + parallax.current.x * 10}deg)
        `;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const rafRef = { current: requestAnimationFrame(animate) };
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ✅ Updated to use specific topExit state
  const getTopCylinderTransform = () => {
    if (topExit >= 2) return `translate3d(${EXIT_CONFIG.sweepX}px, ${EXIT_CONFIG.sweepY}px, -200px) scale(${EXIT_CONFIG.scaleEnd}) rotateX(15deg) rotateY(-10deg)`; 
    if (topExit >= 1) return `translate3d(0, ${-DYNAMIC_GAP / 2 + EXIT_CONFIG.dipY}px, -50px) scale(${EXIT_CONFIG.scaleMid})`; 
    if (stage >= 1) return `translate3d(0, -${DYNAMIC_GAP / 2}px, 0) scale(1)`; 
    return `translate3d(0, ${ENTRANCE_OFFSET}px, 0) scale(1)`; 
  };

  // ✅ Updated to use specific bottomExit state
  const getBottomCylinderTransform = () => {
    if (bottomExit >= 2) return `translate3d(${EXIT_CONFIG.sweepX}px, ${EXIT_CONFIG.sweepY}px, -200px) scale(${EXIT_CONFIG.scaleEnd}) rotateX(15deg) rotateY(10deg)`; 
    if (bottomExit >= 1) return `translate3d(0, ${DYNAMIC_GAP / 2 + EXIT_CONFIG.dipY}px, -50px) scale(${EXIT_CONFIG.scaleMid})`; 
    if (stage >= 2) return `translate3d(0, ${DYNAMIC_GAP / 2}px, 0) scale(1)`; 
    return `translate3d(0, ${ENTRANCE_OFFSET}px, 0) scale(1)`; 
  };

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#f7f7f7] overflow-hidden"
      style={{
        clipPath: uiExit ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
        transition: `clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)`,
       }}
//       style={{
//   opacity: uiExit ? 0 : 1, // Fades out when uiExit is true
//   pointerEvents: uiExit ? "none" : "auto", 
//   transition: `opacity 1.2s cubic-bezier(0.85, 0, 0.15, 1)`,
// }}
    >
      <div style={{ perspective: "900px" }}>
        <div
          ref={containerRef}
          className="relative w-0 h-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* TOP CYLINDER */}
          <div
            style={{
              transform: getTopCylinderTransform(),
              transition: `transform 2s ${topExit >= 1 ? exitEasing : customEasing}`, 
              transformStyle: "preserve-3d",
            }}
          >
            <CircularText
              className="sofiaSemiBold tracking-tighter"
              text="SYSTEMS THAT ARE BUILT FOR SCALE "
              radius={140}
              fontSize={70}
              isVisible={stage >= 1}
            />
          </div>

          {/* BOTTOM CYLINDER */}
          <div
            style={{
              transform: getBottomCylinderTransform(),
              transition: `transform 2s ${bottomExit >= 1 ? exitEasing : customEasing}`,
              transformStyle: "preserve-3d",
            }}
          >
            <CircularText
              className="splineLight tracking-tighter"
              text="UI / UX · SYSTEM ARCHITECT · CREATIVE DEV · FULLSTACK · SCALABLE SYSTEMS · "
              radius={140}
              fontSize={16}
              isVisible={stage >= 2} 
            />
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div
        className="absolute bottom-16 text-black text-xl splineLight tracking-tight leading-none"
        style={{
          opacity: stage >= 3 && bottomExit === 0 && topExit === 0 ? 1 : 0, 
          transform: stage >= 3 && bottomExit === 0 && topExit === 0 ? "translateY(0)" : "translateY(30px)",
          transition: `all 1.2s ${customEasing}`,
        }}
      >
        {progress.toString().padStart(2, "0")}%
      </div>
    </div>
  );
}