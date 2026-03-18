import Link from "next/dist/client/link";

import TextRipple from "@/animations/TextRipple";
import { CustomLinkArrow } from "./CustomLink";
import { Underline } from "./Underline";
import ImageReveal from "@/animations/ImageReveal";


export default function Hero () {

    // set the latest project to the 1st one and its name Futurescape for now, will change later when more projects are added.
    const LatestProject = {
        projectName : "Futurescape",
        linkTitle : "Recent Work",
        url : "https://futurescapestudios.vercel.app/"
    }

    return (
        <section id='hero-section' className="h-[170svh] w-full flex flex-col items-center justify-start" >
            <h1 className="text-[13.85rem] relative z-2 !whitespace-nowrap font-black tracking-[-1.2rem] leading-[0.90] sofiaBold mt-35 uppercase">
                  <TextRipple 
                    text="creative &nbsp; developer"
                    delayOffset={0.1} 
                    blur={false} 
                    duration={0.8}
                />
            </h1>
            <p className="text-black h-fit w-full text-right text-md tracking-[22px] -mt-3 uppercase">Based in india</p>
            <div className="relative top-[1.5%] graySecondaryColor h-[28%] w-[40%]">
                <figure  className="absolute bottom-[6%] left-[40%] z-1 h-[25rem] w-[20rem] ">
                {/* <Image  className="h-full w-full object-cover object-center" src={ProfileImg} alt='AN IMAGE WAS HERE' /> */}
                <ImageReveal
                 className="h-full w-full"
                 src='https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto/v1773840413/portrait-image_msf2dv.jpg'
                 alt="AN IMAGE WAS HERE"
                 duration={1.2}
                 easing={[0.11, 0.82, 0.39, 0.92]}
                />
                </figure>
                <ul className="absolute left-[0] bottom-[6%] h-[80%] w-[39.5%] flex flex-col items-start justify-end gap-1 p-2 py-6">
                    <li className="text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ Web Design (UI/UX)</li>
                    <li className="text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ Architecture</li>
                    <li className="text-[1.9rem] text-left leading-none tracking-tighter uppercase">/ FullStack Dev.</li>
                </ul>
            </div>
            <aside className="relative flex items-center justify-center top-7 h-[12%] w-[28%] flex items-center justify-center gap-4">
                <p className="text-md uppercase tracking-tight text-center leading-[1.1] splineLight">
                    I design immersive, interactive interfaces and engineer scalable web systems built for performance, precision, and growth.
                </p>
            </aside>
            <aside className="relative flex flex-col items-start justify-start p-2 top-7 left-[50%] -translate-x-[50%] h-fit w-[17%]">
                <CustomLinkArrow className="text-black text-[1.2rem] leading-[1] splineLight tracking-tighter leading-[1]" arrFrom="bottom right" arrTo="center center" animateUnderline={false} name={LatestProject.linkTitle} url={LatestProject.url} />
                <Link href={LatestProject.url} className="text-black transition-all duration-300 
          ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] hover:text-[#6f6f6f] text-[3rem] uppercase tracking-tighter leading-[1]">{LatestProject.projectName}</Link>
            </aside>
            <aside className="relative flex flex-col items-start justify-start py-2 top-7 left-[-32.5%] -translate-x-[50%] h-fit w-[17%]">
                <CustomLinkArrow className="text-black text-[1.2rem] leading-[1] splineLight tracking-tighter leading-[1] whitespace-nowrap" arrFrom="bottom right" arrTo="center center" animateUnderline={false} name="AVAILABLE FOR collaboration" url={LatestProject.url} />
                <Link href="mailto:mayanshbangali49@gmail.com" className="transition-all duration-300 
          ease-[cubic-bezier(0.11, 0.82, 0.39, 0.92)] text-black hover:text-[#6f6f6f] text-[2.2rem] sofiaSemiBold indent-19 tracking-tight leading-[1]">
                    <Underline lineClassName="bg-black mt-8" className="inline-block">
                        mayanshbangali49@gmail.com
                    </Underline>
                </Link>
            </aside>
        </section>
    );
}