"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";

const fields = [
  {
    title: "Web Design",
    tags: ["Modern Layouts", "Responsive Designs", "SEO-Friendly", "Visual Storytelling"],
    img: "https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/vestiraImg_qacm37.png",
    info: "I create websites that stand out from the competition and bring real value to businesses."
  },
  {
    title: "AI & ML",
    tags: ["Neural Networks", "Data Analysis", "Predictive Modeling", "NLP"],
    img: "https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/velouraImg_ghqzez.png",
    info: "Integrating intelligent algorithms to automate processes and provide deep insights."
  },
  {
    title: "Fullstack",
    tags: ["Next.js", "PostgreSQL", "API Design", "Scalable Arch"],
    img: "https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/futurescapeImg_qmhvc2.png",
    info: "Building robust end-to-end applications with a focus on performance and security."
  },
  {
    title: "Systems",
    tags: ["Cloud Infrastructure", "DevOps", "Docker", "Architecture"],
    img: "https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/codehub_tu23mn.png",
    info: "Designing high-availability systems that grow with your user base."
  },
  {
    title: "UI/UX",
    tags: ["Prototyping", "User Research", "Wireframing", "Figma"],
    img: "https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto/v1773840413/manicImg_dn1vtn.png",
    info: "Focusing on the user journey to create intuitive and engaging digital experiences."
  }
];

const customEase: [number, number, number, number] = [0.11, 0.82, 0.39, 0.92];

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const tagContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.25,
      },
    },
  };

  const tagItemVariants: Variants = {
    initial: { y: "-100%", opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: customEase },
    },
    exit: { opacity: 0, transition: { duration: 0 } },
  };

  return (
    <main className="w-full min-h-screen lg:h-screen bg-(--bg-color) flex flex-col items-center justify-between overflow-x-hidden">
      
      {/* TITLE */}
      <h1 className="w-full h-auto py-12 lg:h-[35%] text-black px-6 sm:px-10 lg:px-14 text-[clamp(3.5rem,10vw,8rem)] tracking-[-0.05em] font-bold leading-none lg:pt-20 text-left flex items-center">
        SERVICES
      </h1>

      {/* CARDS */}
      <section className="
        w-full h-auto lg:h-[65%]
        flex flex-col lg:flex-row
        lg:overflow-hidden
        border-b border-black
      ">
        {fields.map((field, i) => {
          const isHovered = hovered === i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => isMobile && setHovered(hovered === i ? null : i)}
              className="
                relative
                w-full lg:w-auto
                min-h-25 lg:h-full
                border-black border-b lg:border-b-0 lg:border-r-[0.5px] border-t-[0.5px]
                flex flex-col px-6 lg:px-4
                cursor-pointer bg-(--bg-color) group min-w-0
                overflow-hidden
              "
              animate={{
                flexGrow: isMobile ? 1 : (hovered === null ? 1 : isHovered ? 2.5 : 0.75),
                height: isMobile ? (isHovered ? "auto" : "100px") : "100%"
              }}
              style={{ flexBasis: isMobile ? "auto" : 0 }}
              transition={{ duration: 0.7, ease: customEase }}
            >

              {/* HEADER */}
              <header className="min-h-25 lg:h-25 flex items-center justify-between overflow-hidden shrink-0">
                <motion.p
                  animate={{ scale: isHovered ? (isMobile ? 1.5 : 2.2) : 1 }}
                  transition={{ duration: 0.6, ease: customEase }}
                  className="font-bold tracking-tighter text-sm lg:text-lg origin-left whitespace-nowrap"
                >
                  {`00-${i + 1}`}
                </motion.p>

                <div className="overflow-hidden h-fit">
                  <motion.h3
                    animate={{ y: isHovered ? 0 : "100%" }}
                    transition={{ duration: 0.8, ease: customEase }}
                    className="font-bold text-black uppercase tracking-[-1.5px] lg:tracking-[-2.5px] text-[1.5rem] lg:text-[2.6rem]"
                  >
                    &nbsp; &nbsp;{field.title}
                  </motion.h3>
                </div>
              </header>

              {/* CENTER TITLE (Visible when not hovered) */}
              <div className="relative h-0 lg:h-20 overflow-hidden shrink-0">
                <motion.h3
                  animate={{ y: isHovered ? "-100%" : 0 }}
                  transition={{ duration: 0.8, ease: customEase }}
                  className="hidden lg:block absolute inset-0 font-bold text-black text-4xl uppercase tracking-tighter whitespace-nowrap"
                >
                  {field.title}
                </motion.h3>
              </div>

              {/* CONTENT */}
              <div className="grow flex items-start lg:items-center py-8 lg:py-0">
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.div
                      key="content"
                      initial={isMobile ? { opacity: 0, y: 10 } : { opacity: 0 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
                    >
                      <motion.ul
                        variants={tagContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex-1 flex flex-col"
                      >
                        {field.tags.map((tag, idx) => (
                          <li key={idx} className="overflow-hidden">
                            <motion.span
                              variants={tagItemVariants}
                              className="block text-lg lg:text-2xl font-bold uppercase tracking-tighter text-black/95"
                            >
                              / {tag}
                            </motion.span>
                          </li>
                        ))}
                      </motion.ul>

                      {/* Image Mask with Reveal + Unscale */}
                      <motion.div
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0 } }}
                        transition={{
                          duration: 0.8,
                          ease: customEase,
                          delay: 0.2,
                        }}
                        className="w-full lg:w-1/2 relative aspect-video rounded-sm overflow-hidden"
                      >
                        <motion.div 
                          className="relative h-full w-full"
                          initial={{ scale: 2 }}
                          animate={{ scale: 1 }}
                          transition={{
                             duration: 0.8,
                             ease: customEase,
                             delay: 0
                          }}
                        >
                          <Image
                            fill
                            src={field.img}
                            className="object-contain"
                            alt={field.title}
                            sizes="(max-width: 1024px) 100vw, 450px"
                          />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FOOTER */}
              <footer className="h-auto lg:h-30 tracking-tighter flex items-end pb-8 lg:pb-10 overflow-hidden shrink-0">
                <div className="overflow-hidden w-full">
                  <motion.p
                    initial={{ y: "-100%" }}
                    animate={{ y: isHovered ? "0%" : "-100%" }}
                    transition={
                      isHovered
                        ? { duration: 0.6, ease: customEase, delay: 0.3 }
                        : { duration: 0 }
                    }
                    className="text-gray-500 splineLight text-xs lg:text-md uppercase leading-tight max-w-full lg:max-w-[90%]"
                  >
                    {field.info}
                  </motion.p>
                </div>
              </footer>
            </motion.div>
          );
        })}
      </section>
    </main>
  );
}