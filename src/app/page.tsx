import Hero from "@/components/Hero"
import About from "./about/page";
import Works from "./works/page";
import AboutTitle from "@/components/AboutTitle";
import RecentWorksTitle from "@/components/RecentWorksTitle";
import Scene from "@/components/Scene"
import Services from "./services/page";
import AchievementsTitle from "@/components/AchievementsTitle";
import Achievements from "./achievements/page";
import Connect from "./connect/page";

export default function Home() {
  return (
    <main id='home' className={`bg-(--bg-color) sofiaBold min-h-full h-auto overflow-hidden! w-full flex flex-col items-start justify-center `}>
      <Hero />
      <AboutTitle />
      <About />
      <RecentWorksTitle />
      <Works />
      <Scene />
      <Services />
      <AchievementsTitle />
      <Achievements />
      <Connect />
    </main>
  );
}