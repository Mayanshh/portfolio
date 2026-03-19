'use client'

import Project from "@/components/Project"

const projects = [
  {
    title: "futurescape studios",
    imageUrl: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/futurescapeImg_qmhvc2.png',
    video: "https://res.cloudinary.com/djd1tenw9/video/upload/f_auto,q_auto:low,vc_auto,br_800k/video2_mllmms.mp4",
    link: "https://futurescapestudios.vercel.app/",
    repo: "https://github.com/Mayanshh/futurescape",
    tags: ['immersive UI','motion design','Next.js architecture']
  },
  {
    title: "Vestira",
    imageUrl: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/vestiraImg_qacm37.png',
    video: "https://res.cloudinary.com/djd1tenw9/video/upload/f_auto,q_auto:low,vc_auto,br_800k/video4_hxfxtg.mp4",
    link: "https://vestira.onrender.com/",
    repo: "https://github.com/Mayanshh/Vestira",
    tags: ['REST API integration','authentication flow','responsive commerce UI']
  },
  {
    title: "Veloura",
    imageUrl: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/velouraImg_ghqzez.png',
    video: "https://res.cloudinary.com/djd1tenw9/video/upload/f_auto,q_auto:low,vc_auto,br_800k/video3_rmflex.mp4",
    link: "https://veloura-creative.netlify.app/",
    repo: "https://github.com/Mayanshh/Veloura",
    tags: ['luxury brand identity','micro-interactions','conversion-focused design']
  },
  {
    title: "CodeHub India",
    imageUrl: 'https://res.cloudinary.com/djd1tenw9/image/upload/f_auto,q_auto,w_1200/codehub_tu23mn.png',
    video: "https://res.cloudinary.com/djd1tenw9/video/upload/f_auto,q_auto:low,vc_auto,br_800k/video1_mtssbu.mp4",
    link: "https://codehubindia.vercel.app/",
    repo: "https://github.com/Mayanshh/CodeHub",
    tags: ['developer platform','community features','scalable architecture']
  }
]

export default function Works() {
  return (
    <main className="h-auto lg:h-[400svh] min-h-full w-full bg-(--bg-color) py-10 lg:py-4 px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between">

      {/* LEFT COLUMN */}
      <section className="w-full lg:w-1/2 min-h-full lg:h-screen flex flex-col items-center justify-start py-0 lg:py-[20vh]">
        
        {/* Project: Vestira */}
        <Project
          src={projects[1].imageUrl}
          title={projects[1].title}
          video={projects[1].video}
          link={projects[1].link}
          tags={projects[1].tags}
          className="mt-12 lg:mt-[100vh]"
        />

        {/* Project: CodeHub India */}
        <Project
          src={projects[3].imageUrl}
          title={projects[3].title}
          video={projects[3].video}
          link={projects[3].link}
          tags={projects[3].tags}
          className="mt-12 lg:mt-[150vh]"
        />

      </section>

      {/* RIGHT COLUMN */}
      <section className="w-full lg:w-1/2 min-h-full lg:h-screen flex flex-col items-center justify-start py-0 lg:py-[20vh]">
        
        {/* Project: futurescape studios */}
        <Project
          src={projects[0].imageUrl}
          title={projects[0].title}
          video={projects[0].video}
          link={projects[0].link}
          tags={projects[0].tags}
          className="mt-12 lg:mt-0"
        />

        {/* Project: Veloura */}
        <Project
          src={projects[2].imageUrl}
          title={projects[2].title}
          video={projects[2].video}
          link={projects[2].link}
          tags={projects[2].tags}
          className="mt-12 lg:mt-[150vh]"
        />

      </section>

    </main>
  )
}