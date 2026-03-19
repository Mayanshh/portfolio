"use client";

import Image from "next/image"
import Link from "next/link"
import { useRef, useState, useEffect } from "react";
import FallingText from "@/components/FallingText";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LifeStyleImg2 from "../../../public/images/lifestyle-portrait.2.png"
import { TextReveal } from "@/animations/TextReveal";
import ImageReveal from "@/animations/ImageReveal";
import { useDevice } from "@/hooks/useDevice";

import { ArrowRight } from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);
  const infoRef = useRef(null);
  const fallingTextRef = useRef(null);
    const { isMobile, isDesktop } = useDevice();
  

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
      },
    });

    tl.to({}, { duration: 1 });

    tl.fromTo(
      infoRef.current,
      { yPercent: -100 },
      {
        yPercent: 0,
        ease: "cubic-bezier(0.11, 0.82, 0.39, 0.92)",
        duration: 1
      }
    );

  }, { scope: containerRef });

  return (
    <main className="w-full bg-black text-white sofiaBold">

      <section
        ref={containerRef}
        className="relative w-full max-h-screen h-screen overflow-hidden border-t border-white/10 bg-black"
      >

        <div ref={fallingTextRef} className="absolute inset-0 h-[75vh] w-full">

          <section className="h-fit w-full px-6 lg:px-12 pb-2 pt-16 mt-6 lg:mt-0 lg:pt-24 mb-12">
            <ul className="w-full flex items-center justify-between">
              <li className="text-[2.2rem] lg:text-[3.5rem] leading-[0.8] tracking-tight"> 2/5 </li>
              <li className="text-[0.9rem] lg:text-[1.1rem] leading-[0.8] w-auto lg:w-[34%] uppercase splineLight"> For Me </li>
              <li className="text-[1.3rem] lg:text-[1.8rem] leading-[0.8] tracking-tighter"> DSGN/2 </li>
            </ul>
          </section>

          <FallingText
            text={`Technology <br /> is not just built, <br /> but architected <br /> for scale <br /> and impact.`}
            highlightWords={["is not just built,", "but architected"]}
            trigger="scroll"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.6}
            fontSize={isMobile ? "3.2rem" : "8.5rem"}
            reset={true}
            className="tracking-[-2px] lg:tracking-[-10px] pb-5 leading-[0.8]! lg:ml-[8%] uppercase flex items-start lg:items-center justify-center gap-0 text-left!"
          />
        </div>
        <div
          ref={infoRef}
          className="absolute inset-0 h-svh w-full bg-black z-10 flex flex-col items-start justify-start px-6 lg:px-12 text-center"
          style={{ willChange: "transform" }}
        >
          <div className="h-screen w-full flex flex-col items-center justify-between">
            <header className="w-full min-h-[6vh]! mt-[11vh] flex items-center justify-start">
              <h3 className="tracking-tighter leading-[0.80] text-white text-[1.2rem] splineLight uppercase">
                ABOUT ME
              </h3>
            </header>

            <section className="w-full h-[calc(100%-12vh)] flex flex-col lg:block">

              <figure className="w-full lg:w-[18vw] h-auto lg:h-[56%] lg:ml-[26vw] mt-8 lg:mt-16 flex flex-col items-center justify-between gap-6">
                <ImageReveal
                  className="w-[70vw] lg:w-full h-[40vh] lg:h-[60vh]"
                  src="https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto,e_improve,e_sharpen/v1773840412/lifestyle-portrait-1_l8wlah.png"
                  alt="AN IMAGE WAS HERE"
                  delay={0.5}
                  duration={1.4}
                  easing={[0.11, 0.82, 0.39, 0.92]}
                />
                <TextReveal delay={0.8} once staggerDuration={0.01}>
                <h4 className="tracking-tighter leading-[1.1] text-white text-[1.1rem] lg:text-[1.25rem] splineLight uppercase">
                  Hello! <br /> I'm Mayansh Bangali
                </h4>
                </TextReveal>
              </figure>

              <div className="w-full lg:w-[60%] h-fit lg:h-[16vh] mt-10 lg:mt-16 lg:ml-[26vw]">

                <h2 className="h-fit lg:h-[20%] w-full flex flex-col items-center lg:items-start justify-between">
                  <p className="text-white/50 h-fit w-fit lg:w-[12vw] text-[1.15rem] splineLight uppercase flex flex-row items-center justify-between gap-2">
                    My Experince
                    <ArrowRight
                      className="text-white/50 transform rotate-45"
                      size={23}
                      strokeWidth={1.5}
                    />
                  </p>
                </h2>

                <div className="h-auto lg:h-[80%]">
                  <TextReveal delay={0.8} repeat staggerDuration={0.01}>
                    <p className="text-white text-center lg:text-left mt-4 uppercase tracking-tighter leading-none! text-[1.25rem] lg:text-[1.5rem] splineRegular w-full ">
                      specializing in high-concurrency distributed systems.
                      I design resilient, backend-heavy architectures that 
                      solve complex data challenges at global scale.
                    </p>
                  </TextReveal>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="h-auto min-h-[200svh] w-full flex flex-col items-start justify-start px-6 lg:px-12 pb-24">
        <hr className="w-full h-[0.5px] bg-white mt-22 border-rounded" />
        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <h2 className="mt-8 lg:mt-[2.2rem] text-white/70 text-[2.5rem] lg:text-[4rem] uppercase leading-none splineLight w-full lg:w-[90%] h-fit">
            I Don’t Just Build <br className="hidden lg:block" /> Products - I Solve for Systems, at Scale.
          </h2>
        </TextReveal>
        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <p className="mt-8 lg:mt-1 lg:ml-[30vw] text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center lg:text-center w-full lg:w-fit h-fit tracking-tighter leading-[1.2]">
            My craft is part of my lifestyle. As{isDesktop && <br />}a systems architect, I am constantly{isDesktop && <br />}deconstructing the world: I notice how{isDesktop && <br />}components interact, how logic flows,{isDesktop && <br />}and how structures scale.
          </p>
        </TextReveal>
        <p className="text-white/50 h-fit w-fit lg:w-[14vw] mt-12 lg:ml-[58vw] mx-auto lg:mx-0 text-[1.3rem] splineLight uppercase flex flex-row items-center justify-between gap-4">
          My Philosophy
          <ArrowRight className="text-white/50 transform rotate-45" size={25} strokeWidth={1.5} />
        </p>
        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
          <p className="mt-6 lg:mt-4 lg:ml-[58vw] text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center lg:text-center w-full lg:w-fit h-fit tracking-tighter leading-[1.2]">
            I value logic, scalability, and performance{isDesktop && <br />}both in systems and in life. I am close{isDesktop && <br />}to the idea of structural minimalism:{isDesktop && <br />}building only what is resilient{isDesktop && <br />}and serves a purpose. I love elegant architectures with deep foundations{isDesktop && <br />}as well as simple solutions that solve{isDesktop && <br />}complex problems.
          </p>
        </TextReveal>
        <div className="w-full h-auto lg:h-[60svh] mt-16 lg:mt-25 flex flex-col lg:flex-row items-center justify-between gap-12">
          <figure className="h-[40vh] lg:h-[90%] w-full lg:w-[48vw] flex flex-row items-center justify-center lg:justify-between">
            <div className="relative h-full w-[80vw] lg:w-[30vw] lg:ml-[18vw]">
              <Image
                src="https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto/v1773840445/lifestyle-portrait.2_kdymjl.png"
                alt="Image was here"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 30vw"
              />
            </div>
          </figure>
          <div className="w-full lg:w-[35vw] lg:mt-10 h-auto flex flex-col items-center justify-start gap-8">
            <p className="text-white/50 h-fit w-fit lg:w-[14vw] mt-2 text-[1.3rem] splineLight uppercase flex flex-row items-center justify-between gap-4">
              My LifeStyle
              <ArrowRight className="text-white/50 transform rotate-45" size={25} strokeWidth={1.5} />
            </p>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center w-full h-fit tracking-tighter leading-[1.2]">
                I look for harmony everywhere: in the logic of systems, in the blueprints of architecture, in the flow of data, and even in the simple rhythms of everyday life. It’s not just a skill—it’s a way of perceiving the world.
              </p>
            </TextReveal>
            <TextReveal delay={0.2} scrub staggerDuration={0.01}>
              <p className="text-white/95 text-[1.1rem] lg:text-[1.3rem] splineLight uppercase text-center w-full h-fit tracking-tighter leading-[1.2]">
                Every system for me is more than a task. It's a narrative that I help build through code. I believe that a great product is not just about pixels and scripts, but about the seamless experience it creates.
              </p>
            </TextReveal>
          </div>
        </div>
        <Link
          href='mailto:mayanshbangali49@gmail.com'
          className="text-white/50 h-fit w-fit lg:w-[14vw] mt-24 lg:ml-[18.5vw] mx-auto lg:mx-0 text-[1.3rem] splineLight uppercase flex flex-row items-center justify-between gap-4"
        >
          Let's Connect
          <ArrowRight className="text-white/50 transform rotate-45" size={25} strokeWidth={1.5} />
        </Link>
      </section>
    </main>
  );
}