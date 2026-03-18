import TextRipple from "@/animations/TextRipple"

export default function ConnectTitle() {
    return (
        <header className="w-full h-[50svh] flex flex-col py-2 px-2 items-center justify-center">
            <p className="leading-[0.90] sofiaSemiBold tracking-tight text-2xl py-2 uppercase">LET'S START THE CONVERSATION</p>
            <h1 className="text-[7vw] leading-[0.90] px-6 pt-1 pb-5 sofiaBold tracking-[-0.05em] uppercase">
                <TextRipple 
                    text="Great &nbsp; Work"
                    delayOffset={1} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>
            <p className="leading-[0.90] splineRegular tracking-[1.25rem] py-2 text-sm uppercase">Start's With</p>
            <h1 className="text-[7vw] leading-[0.90] px-4 pt-1 sofiaBold tracking-[-0.05em] uppercase">
                <TextRipple 
                    text="Great &nbsp; collabs"
                    delayOffset={1.005} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>
        </header>
    )
}