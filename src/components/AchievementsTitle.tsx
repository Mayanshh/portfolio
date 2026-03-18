import TextRipple from "@/animations/TextRipple";

export default function AchievementsTitle () {
    return (
        <header className="w-full h-[40vh] pt-[25vh] flex bg-(--bg-color) items-center justify-between">
            <h1 className="text-[6vw] leading-[0.90] px-4 py-2 sofiaBold tracking-[-0.05em] uppercase">
                <TextRipple 
                    text="ACHIEVEMENTS"
                    delayOffset={1} 
                    blur={false} 
                    duration={1}
                    scrub={true}
                />
            </h1>
            <p className="text-[1.8rem] sofiaBold leading-[0.8] px-8 py-2 tracking-tighter"> DSGN/5 </p>
        </header>
    )
}