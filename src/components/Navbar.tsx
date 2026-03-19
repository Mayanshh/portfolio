"use client";
import Link from 'next/link';
import { useState, useEffect } from "react";
import { motion, Transition } from "framer-motion";
import { CustomLinkBracket, CustomLinkArrow } from "./CustomLink";
import { useDevice } from "@/hooks/useDevice"; // Assuming your hook is located here
import { Underline } from "@/components/Underline";
import TextRipple from '@/animations/TextRipple';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [time, setTime] = useState("");
    const { isMobile, isDesktop } = useDevice();

    // Time Logic
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

    // Motion Transition Logic
    const swapTransition: Transition = {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
    };

    const navItems = [
        { name: "About Me", url: "/about" },
        { name: "Works", url: "/works" },
        { name: "Services", url: "/services" },
        { name: "Connect", url: "/connect" },
    ];

    return (
        <>
            <nav className="fixed top-0 left-0 z-999 flex w-full flex-row items-center justify-between mix-blend-difference! px-6 py-4 mt-2 lg:mt-4 lg:h-20 lg:px-12 lg:py-2 text-white">
                {/* Logo Section */}
                <h1 className="sofiaBold text-[1.8rem] leading-[0.8] tracking-[-0.05em] uppercase text-left indent-2 lg:text-[2rem] lg:leading-[0.70] lg:indent-5">
                    Mayansh <br /> Bangali
                </h1>

                {/* Desktop Navigation: Strictly Unchanged */}
                <ul className="splineLight hidden flex-row items-center justify-center mix-blend-difference! gap-12 lg:flex lg:w-[60%] lg:gap-24">
                    {navItems.map((item) => (
                        <CustomLinkBracket key={item.name} name={item.name} url={item.url} />
                    ))}
                </ul>

                {/* Right Section: Desktop CTA & Mobile Toggle */}
                <div className="flex items-center gap-8">
                    <div className="hidden md:block">
                        <CustomLinkArrow
                            arrFrom="top right"
                            arrTo="center center"
                            className='mix-blend-difference! w-28 lg:w-35!'
                            name="Contact me"
                            url="/connect"
                        />
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="flex flex-col justify-center items-end gap-1.5 w-8 h-8 lg:hidden focus:outline-none z-1000"
                        aria-label="Toggle Menu"
                    >
                        <span className={`h-px bg-white transition-all duration-500 ease-out ${isMenuOpen ? 'w-8 rotate-45 translate-y-1.75' : 'w-8'}`} />
                        <span className={`h-px bg-white transition-all duration-500 ease-out ${isMenuOpen ? 'opacity-0' : 'w-5'}`} />
                        <span className={`h-px bg-white transition-all duration-500 ease-out ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-1.75' : 'w-6'}`} />
                    </button>
                </div>
            </nav>

            {/* Fullscreen Mobile Overlay */}
            <div className={`fixed inset-0 z-998 bg-(--bg-color) flex flex-col items-center justify-start transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] lg:hidden ${isMenuOpen ? 'clip-path-open' : 'clip-path-closed'}`}>

                {/* Inner Scrollable Container */}
                <div className="w-full h-full m flex flex-col items-center px-6 overflow-y-auto no-scrollbar">

                    {/* 1. Spacer/Top Section */}
                    <section className="w-full mt-30 h-auto flex flex-col items-center justify-between gap-1"></section>

                    {/* 2. Socials Row */}
                    <section className="w-full mt-10 mb-15 h-auto py-5 text-white! flex flex-wrap items-center justify-center gap-6">
                        <CustomLinkArrow arrFrom="top right" arrTo="center center" className="mix-blend-difference! w-28 text-[1.4rem]!" name="About Me" url="/about" />
                        <CustomLinkArrow arrFrom="top right" arrTo="center center" className="mix-blend-difference! w-28 text-[1.4rem]!" name="Works" url="/works" />
                        <CustomLinkArrow arrFrom="top right" arrTo="center center" className="mix-blend-difference! w-26 text-[1.4rem]!" name="Services" url="/services" />
                        <CustomLinkArrow arrFrom="top right" arrTo="center center" className="mix-blend-difference! w-26 text-[1.4rem]!" name="Connect" url="/connect" />
                    </section>

                    {/* 3. Mobile Contact (Phone & Email) */}
                    <section className="w-full mt-5 flex flex-col items-center justify-center border-y border-black/5 py-8">
                        <Link
                            href="tel:+918262043082"
                            className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[8vw] md:text-3xl sofiaBold leading-[0.90] uppercase text-center"
                        >
                            <Underline lineClassName="bg-black mt-1" className="inline-block">
                                +91 826 204 30 82
                            </Underline>
                        </Link>
                        <Link
                            href="mailto:mayanshbangali49@gmail.com"
                            className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[6.5vw] md:text-2xl sofiaBold leading-[0.90] text-center break-all "
                        >
                            <Underline lineClassName="bg-black" className="inline-block">
                                mayanshbangali49@gmail.com
                            </Underline>
                        </Link>
                    </section>

                    {/* 4. Competitive Coding */}
                    <section className="w-full mt-10 mb h-auto flex flex-row items-end justify-between text-white! gap-4 no-scrollbar">
                        <CustomLinkBracket className="mix-blend-difference! shrink-0 w-28 text-[1.1rem]!" name="LeetCode" url="https://www.leetcode.com/u/Mayanshh" />
                        <CustomLinkBracket className="mix-blend-difference! shrink-0 w-24 text-[1.1rem]!" name="CodeChef" url="https://www.codechef.com/users/mayansh" />
                    </section>

                    {/* 6. Footer Bottom Bar */}
                    <section className="w-full h-auto py-2 flex flex-col items-center text-black! justify-between gap-8 mt-auto border-t border-black/5">
                        <p className="w-full flex items-center justify-between uppercase splineLight text-xs tracking-tighter">
                            <span>Nashik, IN</span>
                            <span>{time || "00:00 AM"} IST</span>
                        </p>

                        <motion.p initial="initial" whileHover="hover" className="flex items-center justify-center uppercase splineRegular text-sm tracking-tight cursor-default">
                            <span className="whitespace-pre">Ref - </span>
                            <span className="relative inline-grid overflow-hidden h-[1.2em]">
                                <motion.span style={{ gridArea: "1 / 1" }} variants={{ initial: { y: 0 }, hover: { y: "-100%" } }} transition={swapTransition}>OL</motion.span>
                                <motion.span style={{ gridArea: "1 / 1" }} className="whitespace-nowrap" variants={{ initial: { y: "100%" }, hover: { y: 0 } }} transition={swapTransition}>Olha Lazarieva</motion.span>
                            </span>
                        </motion.p>

                        <p className="splineLight text-gray-400 text-[0.65rem] leading-tight text-center pb-6">
                            © 2026 All right reserved. Mayansh Bangali <br />
                            Unauthorized reproduction is prohibited.
                        </p>
                    </section>
                </div>
            </div>

            <style jsx>{`
                .clip-path-closed {
                    clip-path: circle(0% at 90% 5%);
                }
                .clip-path-open {
                    clip-path: circle(150% at 90% 5%);
                }
            `}</style>
        </>
    );
}