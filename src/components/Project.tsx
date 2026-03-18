import Image, { StaticImageData } from "next/image"
import { CustomLinkArrow } from "@/components/CustomLink"
import dynamic from "next/dynamic"

// Lazy load heavy component
const CursorVideoReveal = dynamic(() => import('@/components/CursorVideoReveal'), {
  ssr: false,
})

interface ProjectInterface {
  src: string | StaticImageData
  video: string
  title: string
  link: string
  tags: string[]
  className?: string
}

export default function Project({
  src,
  title,
  link,
  tags,
  className,
  video
}: ProjectInterface) {

  return (
    <div className={`relative w-[90%] h-[58vh] ${className}`}>

      {/* IMAGE + VIDEO CONTAINER */}
      <div className="relative h-[42.5vh] w-full overflow-hidden">

        <Image
          src={src}
          alt={title}
          fill   // ✅ FIX: required for responsive container
          className="object-contain object-center"
          sizes="(max-width: 768px) 100vw, 90vw"
          priority={false}
        />

        {/* Video reveal */}
        <CursorVideoReveal videoSrc={video} />
      </div>

      {/* CONTENT */}
      <aside className="h-[calc(58vh-42.5vh)] w-full flex flex-col items-start justify-start">

        {/* TITLE + LINK */}
        <div className="h-[30%] w-full flex flex-row items-start justify-between py-2">

          <h2 className="text-[1.5rem] leading-[0.80] sofiaBold uppercase">
            {title}
          </h2>

          <CustomLinkArrow
            className="text-[0.8rem] text-white max-w-28"
            name="Visit Live"
            url={link}
            arrFrom="bottom right"
            arrTo="center center"
            arrSize={18}
          />
        </div>

        {/* TAGS */}
        <ul className="w-full h-full text-[#6c6c6c] text-[1rem] flex flex-col items-start justify-center gap-1 splineLight tracking-tighter leading-[0.90]">
          {tags.map((tag, index) => (
            <li
              className="uppercase"
              key={`${tag}-${index}`}
            >
              {tag}
            </li>
          ))}
        </ul>

      </aside>
    </div>
  )
}