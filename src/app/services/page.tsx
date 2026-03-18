"use client";

import { useState } from "react";
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

  const tagContainerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
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
    <main className="w-full h-screen bg-(--bg-color) flex flex-col items-center justify-between overflow-hidden">
      <h1 className="w-full h-[35%] text-black px-14 text-[clamp(4rem,10vw,8rem)] tracking-[-0.05em] font-bold leading-none pt-20 text-left flex items-center">
        SERVICES
      </h1>

      <section className="w-full h-[65%] flex flex-row border-b border-black overflow-hidden">
        {fields.map((field, i) => {
          const isHovered = hovered === i;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative h-full border-black border-r-[0.5px] border-t-[0.5px] flex flex-col px-6 cursor-pointer bg-(--bg-color) group min-w-0"
              animate={{
                flexGrow: hovered === null ? 1 : isHovered ? 2.5 : 0.75,
              }}
              style={{ flexBasis: 0 }}
              transition={{ duration: 0.7, ease: customEase } // Smooth expand
              }
            >
              {/* HEADER */}
              <header className="h-25 flex items-center justify-between overflow-hidden">
                <motion.p
                  animate={{ scale: isHovered ? 2.2 : 1 }}
                  transition={{ duration: 0.6, ease: customEase } }
                  className="font-bold tracking-tighter text-lg origin-left whitespace-nowrap"
                >
                  {`00-${i + 1}`}
                </motion.p>

                <div className="overflow-hidden h-fit">
                  <motion.h3
                    animate={{ y: isHovered ? 0 : "100%" }}
                    transition={{ duration: 0.8, ease: customEase }}
                    className="font-bold text-black uppercase tracking-[-2.5px] text-[2.6rem]"
                  >
                    &nbsp; &nbsp;{field.title}
                  </motion.h3>
                </div>
              </header>

              {/* CENTER TITLE */}
              <div className="relative h-20 overflow-hidden">
                <motion.h3
                  animate={{ y: isHovered ? "-100%" : 0 }}
                  transition={{ duration: 0.8, ease: customEase }
                  }
                  className="absolute inset-0 font-bold text-black text-4xl uppercase tracking-tighter whitespace-nowrap"
                >
                  {field.title}
                </motion.h3>
              </div>

              {/* CONTENT */}
              <div className="grow flex items-center h-[70%]">
                <AnimatePresence mode="wait">
                  {isHovered && (
                    <motion.div
                      key="content"
                      className="w-full flex flex-row items-center justify-between gap-8"
                    >
                      <motion.ul
                        variants={tagContainerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex-1 flex flex-col gap-0"
                      >
                        {field.tags.map((tag, idx) => (
                          <li key={idx} className="overflow-hidden">
                            <motion.span
                              variants={tagItemVariants}
                              className="block text-2xl font-bold uppercase tracking-tighter whitespace-nowrap text-black/95"
                            >
                              / &nbsp; {tag}
                            </motion.span>
                          </li>
                        ))}
                      </motion.ul>

                      <motion.div
                        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                        exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0 } }}
                        transition={{
                          duration: 0.8,
                          ease: customEase,
                          delay: 0.2, // Faster image appearance
                        }}
                        className="w-112.5 relative aspect-video rounded-sm overflow-hidden"
                      >
                        <Image
                          fill
                          src={field.img}
                          className="object-cover"
                          alt={field.title}
                          sizes="450px"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* FOOTER */}
              <footer className="h-30 tracking-tighter flex items-end pb-10 overflow-hidden">
                <div className="overflow-hidden w-full">
                  <motion.p
                    initial={{ y: "-100%" }}
                    animate={{ y: isHovered ? "0%" : "-100%" }}
                    transition={isHovered 
                        ? { duration: 0.6, ease: customEase, delay: 0.3 } 
                        : { duration: 0 }
                    }
                    className="text-gray-500 splineLight text-md uppercase leading-none max-w-[90%]"
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