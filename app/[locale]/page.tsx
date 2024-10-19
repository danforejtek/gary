import { Heading } from "@/components/heading"
import NavBar from "@/components/navbar"
import Image from "next/image"
import SaveGary from "@/components/save-gary"
import HelpGary from "@/components/help-gary"
import { GarysStoryCarousel } from "@/components/garys-story/carousel"
import EarnWithGary from "@/components/earn-with-garry"
import SavePenguins from "@/components/save-penguins"

export default function Home() {
  return (
    <main>
      <section id="#home" className="relative flex h-screen flex-1 flex-col items-center justify-start">
        <NavBar />
        <Image src={`/backgrounds/0.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <div className="flex h-full flex-1 flex-col">
          <SaveGary />
        </div>
        <Image
          src={`/images/gary_happy.png`}
          alt="Gary"
          width={357}
          height={396}
          className="absolute right-[8%] top-[50%] -z-10 -translate-y-[30%]"
        />
      </section>
      <div className="relative -mb-12 -mt-16 h-48 w-full">
        <Image src="/backgrounds/gradient.png" alt="Cover Image" fill />
      </div>
      <section id="#about" className="relative h-screen w-screen">
        <GarysStoryCarousel />
        {/* <Image src={`/backgrounds/1.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <Heading className="text-6xl font-bold">Gary&apos;s story</Heading> */}
      </section>
      <section id="#help-gary" className="min-h-screen bg-gary-blue pb-60">
        <HelpGary />
      </section>
      <div className="relative -mb-12 -mt-16 h-48 w-full">
        <Image src="/backgrounds/gradient.png" alt="Cover Image" fill />
      </div>
      <section id="earn" className="relative flex h-screen flex-col justify-center object-cover">
        {/* BG todo - nemáme obrázek pro tento slide, dočasně použit stejný jako na uvodním */}
        <Image src={`/backgrounds/0.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <EarnWithGary />
      </section>
      <div className="relative -mb-16 -mt-10 h-60 w-full">
        <Image src={`/backgrounds/ice.svg`} alt="Cover Image" className="object-cover" fill />
      </div>
      <section className="h-sceen -mt-44 flex bg-gary-blue">
        <SavePenguins />
      </section>
    </main>
  )
}
