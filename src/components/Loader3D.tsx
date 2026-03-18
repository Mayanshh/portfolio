"use client";

import { useEffect, useRef, useState } from "react";

/* ================= CONFIG ================= */
const DYNAMIC_GAP = 56;
const ROTATION_SPEED_BASE = 0.25;
const ENTRANCE_OFFSET = 300;
const customEasing = "cubic-bezier(0.16, 1, 0.3, 1)";

/* ================= CYLINDER TEXT ================= */

function CircularText({
  text,
  radius,
  fontSize,
  className,
  isVisible, // ✅ NEW: Control visibility at the leaf node
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

        // ✅ Calculate target opacity based on visibility
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
              opacity: currentOpacity, // ✅ Fade happens here
              transition: `opacity 2.2s ${customEasing}`, // ✅ Animate opacity on the span directly
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
  const [exit, setExit] = useState(false);

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
        setTimeout(() => {
          setExit(true);
          setTimeout(onFinish, 1100);
        }, 500);
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

  return (
    <div
      className="fixed inset-0 z-9999 flex items-center justify-center bg-[#f7f7f7] overflow-hidden"
      style={{
        clipPath: exit ? "inset(0% 0% 100% 0%)" : "inset(0% 0% 0% 0%)",
        transition: `clip-path 1.2s cubic-bezier(0.85, 0, 0.15, 1)`,
      }}
    >
      <div style={{ perspective: "900px" }}>
        <div
          ref={containerRef}
          className="relative w-0 h-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* PART 1 */}
          <div
            style={{
              transform:
                stage >= 1
                  ? `translate3d(0, -${DYNAMIC_GAP / 2}px, 0)`
                  : `translate3d(0, ${ENTRANCE_OFFSET}px, 0)`,
              // ✅ REMOVED opacity from here
              transition: `transform 2.2s ${customEasing}`, // ✅ Only transition transform
              transformStyle: "preserve-3d",
            }}
          >
            <CircularText
              className="sofiaSemiBold tracking-tighter"
              text="SYSTEMS THAT ARE BUILT FOR SCALE "
              radius={140}
              fontSize={70}
              isVisible={stage >= 1} // ✅ Pass visibility down
            />
          </div>

          {/* PART 2 */}
          <div
            style={{
              transform:
                stage >= 2
                  ? `translate3d(0, ${DYNAMIC_GAP / 2}px, 0)`
                  : `translate3d(0, ${ENTRANCE_OFFSET}px, 0)`,
              transition: `transform 2.2s ${customEasing}`,
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
          opacity: stage >= 3 ? 1 : 0,
          transform: stage >= 3 ? "translateY(0)" : "translateY(30px)",
          transition: `all 1.2s ${customEasing}`,
        }}
      >
        {progress.toString().padStart(2, "0")}%
      </div>
    </div>
  );
}