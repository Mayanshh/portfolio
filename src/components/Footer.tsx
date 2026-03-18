"use client";

import { useState, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import { CustomLinkArrow, CustomLink, CustomLinkBracket } from "./CustomLink";
import TextRipple from "@/animations/TextRipple";
import { Underline } from "@/components/Underline";

export default function Footer() {
  const [time, setTime] = useState("");

  // 1. Efficient real-time clock logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(formatter.format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // FIX: Explicitly typing the transition or using 'as const' solves the TS error
  const swapTransition: Transition = { 
    duration: 0.6, 
    ease: [0.22, 1, 0.36, 1] 
  };

  return (
    <main className="w-full h-screen bg-(--bg-color) flex flex-col items-center justify-start px-10 text-white!">
      <section className="w-full mt-19 h-24.5 flex flex-col items-end justify-between">
        <Link
          href="tel:+918262043082"
          className="transition-all duration-300 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] text-black text-5xl sofiaBold indent-19 leading-[0.90] uppercase"
        >
          <Underline lineClassName="bg-black mt-8" className="inline-block">
            +91 &nbsp; 826 &nbsp; 204 &nbsp; 30 &nbsp; 82
          </Underline>
        </Link>
        <Link
          href="mailto:mayanshbangali49@gmail.com"
          className="transition-all duration-300 ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] text-black text-5xl sofiaBold indent-28 "
        >
          <Underline lineClassName="bg-black mt-10" className="inline-block">
            mayanshbangali49@gmail.com
          </Underline>
        </Link>
      </section>

      <section className="w-full mt-3 h-12 flex flex-row items-end justify-end gap-20">
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-32! text-[1.4rem]!"
          name="LinkedIN"
          url="https://www.linkedin.com/in/mayansh-bangali/"
        />
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-25! text-[1.4rem]!"
          name="GITHUB"
          url="https://github.com/Mayanshh"
        />
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-30! text-[1.4rem]!"
          name="Twitter"
          url="https://x.com/MayanshB"
        />
      </section>

      <section className="w-full h-28 flex flex-row items-start justify-between">
        <div className="w-1/2 h-full flex flex-col items-start justify-between">
          <CustomLink name="About" url="/about" className="text-[1.35rem] splineRegular w-fit!" />
          <CustomLink name="Works" url="/about" className="text-[1.35rem] splineRegular w-fit!" />
          <CustomLink name="Services" url="/about" className="text-[1.35rem] splineRegular w-fit!" />
        </div>
        <div className="w-1/2 h-full flex flex-col items-end justify-end">
          <p className="splineLight text-[0.7rem] text-black! leading-[1.1]">
            Address: <br />
            Mithai Street D.Camp Nashik, <br />
            Maharashtra, India.
          </p>
        </div>
      </section>

      <section className="w-full mt-6 h-12 flex flex-row items-center justify-between splineLight">
        <div className="w-1/3 h-full flex items-center justify-start">
          <CustomLinkBracket
            className="mix-blend-difference! splineLight w-32! text-[1.2rem]!"
            name="LeetCode"
            url="https://www.leetcode.com/u/Mayanshh"
          />
        </div>
        <div className="w-1/3 h-full flex items-center justify-center">
          <CustomLinkBracket
            className="mix-blend-difference! w-25! text-[1.2rem]!"
            name="CodeChef"
            url="https://www.codechef.com/users/mayansh"
          />
        </div>
        <div className="w-1/3 h-full flex items-center justify-end">
          <CustomLinkBracket
            className="mix-blend-difference! w-30! text-[1.2rem]!"
            name="CodeForces"
            url="https://codeforces.com/profile/Mayanshh"
          />
        </div>
      </section>

      <section className="w-full h-61.5 mt-5 flex items-center justify-center">
        <h1 className="text-[15vw] text-black! leading-[0.90] px-4 py-2 sofiaBold tracking-[-0.07em] uppercase">
          <TextRipple
            reverse
            text="Mayansh Bangali"
            delayOffset={1}
            blur={false}
            duration={1}
            scrub={true}
          />
        </h1>
      </section>

      <section className="w-full h-13 flex flex-row items-center text-black! justify-between">
        <p className="h-full w-1/2 flex items-center justify-start uppercase splineLight text-md tracking-tighter">
          New Delhi, India &nbsp;&nbsp; IST (GMT+5:30) &nbsp; {time || "00:00 AM"}
        </p>

        {/* Hover Animation Section */}
        <motion.p 
          initial="initial"
          whileHover="hover"
          className="h-full w-1/4 flex items-center justify-start uppercase splineRegular text-md tracking-tight cursor-default"
        >
          <span className="whitespace-pre">Reference - </span>
          <span className="relative inline-grid overflow-hidden h-[1.2em]">
            {/* 1. The Visible "OL" that slides up */}
            <motion.span
              style={{ gridArea: "1 / 1" }} // Stack them in the same grid cell
              variants={{
                initial: { y: 0 },
                hover: { y: "-100%" },
              }}
              transition={swapTransition}
            >
              OL
            </motion.span>

            {/* 2. The hidden "Olha Lazarieva" that slides in */}
            <motion.span
              style={{ gridArea: "1 / 1" }} // Stack them in the same grid cell
              className="whitespace-nowrap"
              variants={{
                initial: { y: "100%" },
                hover: { y: 0 },
              }}
              transition={swapTransition}
            >
              Olha Lazarieva
            </motion.span>

            {/* 3. Invisible "Ghost" element to ensure the container is wide enough for the full name */}
            <span className="invisible h-0 pointer-events-none whitespace-nowrap">
              Olha Lazarieva
            </span>
          </span>
        </motion.p>

        <p className="h-full w-1/4 flex items-center justify-center splineLight text-gray-500 text-[0.6rem] leading-none capitalize">
          2025 All right reserved. Mayansh Bangali <br />
          Any reproduction, distribution, or use of the <br /> materials without permission is prohibited.
        </p>
      </section>
    </main>
  );
}