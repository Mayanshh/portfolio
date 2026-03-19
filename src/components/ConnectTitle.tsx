import TextRipple from "@/animations/TextRipple"

export default function ConnectTitle() {
    return (
        <header className="w-full h-[50svh] flex flex-col py-6 lg:py-2 px-4 lg:px-2 items-center justify-center overflow-hidden">
            {/* Subtitle 1 */}
            <p className="leading-[0.90] sofiaSemiBold tracking-tight text-xl lg:text-2xl py-2 uppercase text-center">
                LET'S START THE CONVERSATION
            </p>

            {/* Main Title 1 */}
            <h1 className="text-[15vw] lg:text-[7vw] leading-[0.90] px-6 pt-1 pb-5 sofiaBold tracking-[-0.05em] uppercase text-center">
                <TextRipple 
                    text="Great &nbsp; Work"
                    delayOffset={1} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>

            {/* Middle Label - Reduced tracking for mobile */}
            <p className="leading-[0.90] splineRegular tracking-[0.4rem] lg:tracking-[1.25rem] py-4 lg:py-2 text-sm lg:text-sm uppercase text-center">
                Starts With
            </p>

            {/* Main Title 2 */}
            <h1 className="text-[15vw] lg:text-[7vw] leading-[0.90] px-4 pt-1 sofiaBold tracking-[-0.05em] uppercase text-center">
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