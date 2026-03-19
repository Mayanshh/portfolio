import TextRipple from "@/animations/TextRipple"

export default function AboutTitle() {
    return (
        <header className="w-full h-[30svh] lg:h-[50svh] flex items-center justify-center">
            <h1 className="text-[26vw] lg:text-[16vw] tracking-[-0.08em] leading-[0.90] px-4 py-2 sofiaBold  uppercase">
                <TextRipple 
                    text="ABOUT &nbsp; ME"
                    delayOffset={1} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>
        </header>
    )
}