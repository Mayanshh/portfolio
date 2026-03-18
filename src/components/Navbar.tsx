import { CustomLinkBracket , CustomLinkArrow } from "./CustomLink";

export default function Navbar() {
    return (
        <nav className="min-w-screen bg-none! w-full h-20 text-white mix-blend-difference! fixed z-999 flex flex-row items-center justify-between px-12 mt-4 py-2">
            <h1 className="text-[2rem] mix-blend-difference! text-left leading-[0.70] indent-5 tracking-[-0.05em] sofiaBold uppercase">
                Mayansh <br /> Bangali
            </h1>
            <ul className="flex flex-row splineLight mix-blend-difference! items-center justify-center w-[60%] p-2 gap-24">
                <CustomLinkBracket name="About Me" url="/about" />
                <CustomLinkBracket name="Works" url="/works" />
                <CustomLinkBracket name="Services" url="/services" />
                <CustomLinkBracket name="Connect" url="/connect" />
            </ul>
            <CustomLinkArrow arrFrom="top right" arrTo="center center" className='mix-blend-difference! w-35!' name="Contact me" url="/connect" />
        </nav>
    );
}