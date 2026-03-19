'use client'

import React, { useState, useRef, useEffect } from 'react'
import { LogoLinkWithBadge } from '@/components/CustomLink'
import Image from 'next/image'

export default function Achievements() {
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState<boolean>(false);
    const [activeImage, setActiveImage] = useState<string>(
        'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842972/nasaSpaceAppsImg_faevz6.png'
    );
    
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleMouseEnter = (imgSrc: string) => {
        if (activeImage === imgSrc && isHovered) return;
        if (hoverTimer.current) clearTimeout(hoverTimer.current);

        if (isHovered) {
            setIsHovered(false);
            setIsAnimatingOut(true);
            
            hoverTimer.current = setTimeout(() => {
                setActiveImage(imgSrc);
                setIsAnimatingOut(false);
                setTimeout(() => {
                    setIsHovered(true);
                }, 50);
            }, 400); 
        } else {
            setActiveImage(imgSrc);
            setIsAnimatingOut(false);
            hoverTimer.current = setTimeout(() => {
                setIsHovered(true);
            }, 500);
        }
    };

    const handleMouseLeave = () => {
        if (hoverTimer.current) clearTimeout(hoverTimer.current);
        if (isHovered) {
            setIsHovered(false);
            setIsAnimatingOut(true);
            setTimeout(() => {
                setIsAnimatingOut(false);
            }, 800);
        }
    };

    useEffect(() => {
        return () => {
            if (hoverTimer.current) clearTimeout(hoverTimer.current);
        };
    }, []);

    // Animation Logic
    let clipPath = 'inset(0% 0% 100% 0%)'; 
    let transition = 'clip-path 0.8s cubic-bezier(0.11, 0.82, 0.39, 0.92)'; 

    if (isHovered) {
        clipPath = 'inset(0% 0% 0% 0%)'; 
    } else if (isAnimatingOut) {
        clipPath = 'inset(100% 0% 0% 0%)'; 
    } else {
        transition = 'none';
        clipPath = 'inset(0% 0% 100% 0%)';
    }

    const links = [
        {
            icon: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:best,w_150,fl_preserve_transparency/nasa_space_apps_icon_zyxehm.png',
            hoverImg: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842972/nasaSpaceAppsImg_faevz6.png',
            name: "NASA SPACE APPS",
            url: "https://drive.google.com/file/d/1NT4hw4Qc_weCxcfI5l4AvzF4f9ihbzXr/view?usp=drive_link",
            badge: "' 2 4",
            class: "pb-1.5 pt-8"
        },
        {
            icon: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:best,w_150,fl_preserve_transparency/mumbaiHacks-logo_eh6szt.png',
            hoverImg: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842972/mumbaiHacksImg_ria3yp.png',
            name: "T.E.A.M GenAI",
            url: "https://drive.google.com/drive/u/4/folders/12o2lfBuJzrbloB2LYjV9SP-QmZ29xYaW",
            badge: "' 2 4",
            class: "pb-1.5 pt-8"
        },
        {
            icon: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:best,w_150,fl_preserve_transparency/sunacks_logo_be287l.png',
            hoverImg: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842972/sunhacksImg_rhrcqv.png',
            name: "SUNHACKS",
            url: "https://drive.google.com/drive/u/4/folders/12o2lfBuJzrbloB2LYjV9SP-QmZ29xYaW",
            badge: "' 2 5",
            class: "pb-1.5 mb-11 pt-8"
        },
        {
            icon: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:best,w_150,fl_preserve_transparency/highest_scorer_icon_ewiv4c.png',
            hoverImg: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842977/scorrerImg_xnty8u.png',
            name: "Highest Scorer Award",
            url: "https://drive.google.com/drive/u/4/folders/1ASPQoiquljxZ7hYGYj4RGKKMfWLTqNDr",
            badge: "' 2 3",
            class: "pb-1.5 pt-20"
        },
        {
            icon: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:best,w_150,fl_preserve_transparency/best_sportsmen_logo_imcsaf.png',
            hoverImg: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_1200,dpr_auto/v1773842977/scorrerImg_xnty8u.png',
            name: "Best sportsmen oty",
            url: "https://drive.google.com/drive/u/4/folders/1ASPQoiquljxZ7hYGYj4RGKKMfWLTqNDr",
            badge: "' 2 3",
            class: "pb-1.5 pt-8"
        }
    ];

    return (
        <main className="min-h-screen  relative h-fit w-full bg-(--bg-color) flex flex-col items-center justify-start overflow-x-hidden">
            <section className="w-full h-auto lg:h-[25svh] flex flex-col items-start lg:items-end justify-between px-6 lg:px-0 py-10 lg:py-0">
                <p className="text-black leading-none tracking-tighter splineLight uppercase text-lg lg:text-xl lg:pr-[45%] mb-8 lg:mb-0">
                    My expertise is confirmed <br /> by  
                    <span className="text-bold sofiaSemiBold text-xl lg:text-2xl leading-[0.80]">
                        &nbsp;many international <br /> recognitions
                    </span>
                </p>
                <p className="text-black leading-none tracking-[-0.08rem] splineLight uppercase text-lg lg:text-xl lg:pr-8">
                    <span className="text-bold sofiaSemiBold text-xl lg:text-2xl leading-[0.80] indent-1">
                        Listed In Top 20 Teams
                    </span> <br />
                    (Nasa International Space Apps Hackathon) <br />
                    Sandip University - 2024.
                </p>
            </section>
            
            <div className="w-full h-auto lg:h-[90svh] flex flex-col lg:flex-row items-center justify-center px-6 lg:px-8 py-10 mt-10">
                <div className="w-full lg:w-[30%] h-full flex flex-col items-start justify-start">
                    {links.map((item, index) => (
                        <div 
                            key={index} 
                            className="w-full" 
                            onMouseEnter={() => handleMouseEnter(item.hoverImg)} 
                            onMouseLeave={handleMouseLeave}
                            // Toggle for mobile touch
                            onClick={() => {
                                if(window.innerWidth < 1024) {
                                    handleMouseEnter(item.hoverImg);
                                }
                            }}
                        >
                            <LogoLinkWithBadge 
                                iconUrl={item.icon} 
                                badgeNumber={item.badge} 
                                arrFrom="top right" 
                                arrTo="center center"
                                className={`text-black! splineRegular text-xl lg:text-2xl! w-full ${item.class}`}
                                gapIntensity={0.35} 
                                name={item.name} 
                                url={item.url}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <figure 
                className='bg-transparent fixed lg:absolute top-1/2 lg:top-[45%] left-50 -translate-x-1/2  lg:translate-y-0 h-48 w-48 lg:h-48 lg:w-48 overflow-hidden pointer-events-none z-50 shadow-2xl rounded-lg'
                style={{
                    clipPath: clipPath,
                    transition: transition,
                }}
            >
                <div className="relative h-full w-full ">
                    <Image 
                        src={activeImage}
                        alt="Achievement Visual"
                        fill
                        sizes="(max-width: 1024px) 192px, 192px"
                        priority
                        className="object-contain object-center"
                        style={{
                            transform: isHovered ? 'scale(1)' : 'scale(1.05)',
                            transition: 'transform 1.2s cubic-bezier(0.11, 0.82, 0.39, 0.92)',
                        }}
                    />
                </div>
            </figure>
        </main>
    )
}