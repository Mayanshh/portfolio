import TextRipple from "@/animations/TextRipple"

export default function RecentWorksTitle() {
    return (
        <header className="w-full h-fit flex items-center justify-center">
            <h1 className="text-[18vw] lg:text-[6vw] tracking-[-0.08em] leading-[0.90] px-4 py-2 sofiaBold  uppercase">
                <TextRipple 
                    text="RECENT &nbsp; WORKS"
                    delayOffset={1} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>
        </header>
    )
}