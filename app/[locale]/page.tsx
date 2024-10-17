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
      </section>
      <div className="relative -mb-12 -mt-16 h-48 w-full">
        <Image src="/backgrounds/gradient.png" alt="Cover Image" layout="fill" />
      </div>
      {/* <div className="z-10 -mb-12 -mt-12 h-24 bg-gradient-to-b from-[#0E203E] via-[#0E203E] to-[transparent]"></div> */}
      <section id="#about" className="relative flex h-screen flex-col items-center justify-center py-2">
        {/* <div className="absolute inset-0 z-10 -mt-12 h-24 bg-gradient-to-b from-[#0E203E] via-[#0E203E] to-[transparent]"></div> */}
        <Image src={`/backgrounds/1.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <Heading className="text-6xl font-bold">Gary&apos;s story</Heading>
        {/* <BuyGara /> */}
      </section>
      <section id="#help-gary" className="min-h-screen bg-[#061022]">
        <HelpGary />
      </section>
    </main>
  )
}
