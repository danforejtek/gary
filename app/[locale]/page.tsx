import { Heading } from "@/components/heading"
import NavBar from "@/components/navbar"
import Image from "next/image"
import SaveGary from "@/components/save-gary"

export default function Home() {
  return (
    <main>
      <section id="#home" className="relative flex h-screen flex-col items-center justify-start py-2">
        <Image src={`/backgrounds/0.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <NavBar />
        <Heading className="text-[5rem] font-bold tracking-normal">Save penguin Gary</Heading>
        <SaveGary />
      </section>

      <section id="#about" className="relative flex h-screen flex-col items-center justify-center py-2">
        <div className="absolute inset-0 z-10 -mt-12 h-24 bg-gradient-to-b from-[#0E203E] via-[#0E203E] to-[transparent]"></div>
        <Image src={`/backgrounds/1.jpg`} alt="Cover Image" className="-z-10 object-cover" fill />
        <Heading className="text-6xl font-bold">Gary&apos;s story</Heading>
        {/* <BuyGara /> */}
      </section>
    </main>
  )
}
