'use client';

import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import Matter from 'matter-js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface FallingTextProps {
  text?: string;
  highlightWords?: string[];
  trigger?: 'auto' | 'scroll' | 'click' | 'hover';
  backgroundColor?: string;
  wireframes?: boolean;
  gravity?: number;
  fontSize?: string;
  lineHeight?: number; 
  className?: string;
  reset?: boolean;
}

const FallingText: React.FC<FallingTextProps> = ({
  text = '',
  highlightWords = [],
  trigger = 'auto',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.5,
  fontSize = '1rem',
  lineHeight = 0.8,
  className = '',
  reset = true
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;

    const lines = text.split(/<br\s*\/?>/i);
    const newHTML = lines
      .map(line => {
        const words = line.trim().split(/\s+/);
        const lineContent = words.map(word => {
          // FIXED: Check if the word is part of any of the highlight phrases
          const isHighlighted = highlightWords.some(phrase => phrase.includes(word));
          
          const chars = word.split('');
          return chars.map(char => (
            // FIXED: Applied isHighlighted to the class string
            `<span class="inline-flex select-none char-span leading-none ${isHighlighted ? 'text-[#aaa]' : 'text-current'}">
              ${char}
            </span>`
          )).join('') + `<span class="inline-flex select-none char-span leading-none">&nbsp;</span>`;
        }).join('');
        
        // Note: Reduced the aggressive margin-bottom. 
        // Using lineHeight 0.8 is usually enough to remove the gap.
        return `<div class="line-wrapper block" style="margin-bottom: ${-3 * parseFloat(fontSize)}px;">${lineContent}</div>`;
      })
      .join('');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords, fontSize]);

  useLayoutEffect(() => {
    if (trigger !== 'scroll' || !containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: '50% 20%', // Triggers earlier for better UX
      onEnter: () => setEffectStarted(true),
      onLeaveBack: () => {
        if (reset) setEffectStarted(false);
      },
      once: !reset,
    });

    return () => st.kill();
  }, [trigger, reset]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const canvasContainer = canvasContainerRef.current;
    
    if (!effectStarted || !container || !canvasContainer || !textRef.current) {
      if (!effectStarted && textRef.current) {
        const spans = textRef.current.querySelectorAll('.char-span');
        gsap.to(spans, { x: 0, y: 0, rotation: 0, duration: 0.8, ease: 'power2.out', overwrite: true });
      }
      return;
    }

    const { Engine, Render, World, Bodies, Body, Vector } = Matter;
    const containerRect = container.getBoundingClientRect();
    const { width, height } = containerRect;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainer,
      engine,
      options: { 
        width, 
        height, 
        background: 'transparent',
        wireframes: wireframes,
        wireframeBackground: 'transparent'
      }
    });

    const boundaryOptions = { isStatic: true, render: { visible: false } };
    const floor = Bodies.rectangle(width / 2, height + 50, width, 100, boundaryOptions);
    const leftWall = Bodies.rectangle(-50, height / 2, 100, height, boundaryOptions);
    const rightWall = Bodies.rectangle(width + 50, height / 2, 100, height, boundaryOptions);
    const ceiling = Bodies.rectangle(width / 2, -50, width, 100, boundaryOptions);

    const charSpans = textRef.current.querySelectorAll('.char-span');
    const bodiesData = [...charSpans].map(elem => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const visualHeight = rect.height * 0.75; 
      const visualWidth = rect.width * 0.9;

      const body = Bodies.rectangle(x, y, visualWidth, visualHeight, {
        restitution: 0.4,
        frictionAir: 0.04,
        friction: 0.1,
        render: { visible: wireframes } 
      });

      Body.setVelocity(body, { x: (Math.random() - 0.5) * 2, y: 0 });
      return { elem, body, startX: x, startY: y };
    });

    World.add(engine.world, [floor, leftWall, rightWall, ceiling, ...bodiesData.map(d => d.body)]);
    Render.run(render);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    container.addEventListener('mousemove', handleMouseMove);

    const updateLoop = (_: number, deltaTime: number) => {
      Engine.update(engine, deltaTime);
      const mousePos = mouseRef.current;
      const repulsionRadius = 150; 
      const repulsionStrength = 0.015;

      bodiesData.forEach(({ body, elem, startX, startY }) => {
        const distVector = Vector.sub(body.position, mousePos);
        const distance = Vector.magnitude(distVector);

        if (distance < repulsionRadius) {
          const forceDir = Vector.normalise(distVector);
          const forceMag = (repulsionRadius - distance) * repulsionStrength;
          Body.applyForce(body, body.position, Vector.mult(forceDir, forceMag));
        }

        gsap.set(elem, {
          x: body.position.x - startX,
          y: body.position.y - startY,
          rotation: body.angle * (180 / Math.PI),
        });
      });
    };

    gsap.ticker.add(updateLoop);

    return () => {
      gsap.ticker.remove(updateLoop);
      container.removeEventListener('mousemove', handleMouseMove);
      Render.stop(render);
      if (render.canvas) canvasContainer.removeChild(render.canvas);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [effectStarted, gravity, wireframes, backgroundColor]);

  return (
    <div
      ref={containerRef}
      className={`relative z-[1] w-full h-full cursor-default overflow-hidden ${className}`}
    >
      <div
        ref={textRef}
        className="inline-block relative z-10"
        style={{ 
            fontSize, 
            lineHeight,
            wordBreak: 'break-word'
        }}
      />
      <div 
        className="absolute top-0 left-0 z-0 pointer-events-none w-full h-full" 
        ref={canvasContainerRef} 
      />
    </div>
  );
};

export default FallingText;