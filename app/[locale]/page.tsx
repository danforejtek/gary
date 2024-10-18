import { Heading } from "@/components/heading"
import NavBar from "@/components/navbar"
import Image from "next/image"
import SaveGary from "@/components/save-gary"
import HelpGary from "@/components/help-gary"

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
        <Image src="/backgrounds/gradient.png" alt="Cover Image" layout="fill" />
      </div>
      <section id="#about" className="relative flex h-screen flex-col items-center justify-center py-2">
        <Image src={`/backgrounds/1.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <Heading className="text-6xl font-bold">Gary&apos;s story</Heading>
      </section>
      <section id="#help-gary" className="min-h-screen bg-[#061022]">
        <HelpGary />
      </section>
    </main>
  )
}
