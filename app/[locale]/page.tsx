import { Heading } from "@/components/heading";
import NavBar from "@/components/navbar";
import Image from "next/image";
import SaveGary from "@/components/save-gary";
import { BuyGara } from "@/components/buy-gara-widget/widget";

export default function Home() {
  return (
    <main>
      <section
        id="#home"
        className="flex flex-col items-center justify-start h-screen py-2 relative"
      >
        <Image
          src={`/backgrounds/0.jpg`}
          alt="Cover Image"
          className="object-cover -z-10"
          fill
        />
        <NavBar />
        <Heading className="text-[5rem] tracking-normal font-bold">
          Save penguin Gary
        </Heading>
        <SaveGary />
      </section>

      <section
        id="#about"
        className="flex flex-col items-center justify-center h-screen py-2 relative"
      >
        <div className="absolute -mt-12 inset-0 bg-gradient-to-b from-[#0E203E] via-[#0E203E] to-[transparent] z-10 h-24"></div>
        <Image
          src={`/backgrounds/1.jpg`}
          alt="Cover Image"
          className="object-cover -z-10"
          fill
        />
        <Heading className="text-6xl font-bold">Gary&apos;s story</Heading>
        {/* <BuyGara /> */}
      </section>
    </main>
  );
}
