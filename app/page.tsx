import { Heading } from "@/components/heading";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section
        id="#home"
        className="flex flex-col items-center justify-center h-screen py-2 relative"
      >
        <Image
          src={`/backgrounds/0.jpg`}
          alt="Cover Image"
          className="object-cover -z-10"
          fill
        />
        <Heading className="text-[5rem] tracking-normal font-bold">
          Save penguin Gary
        </Heading>
        <p className="text-gary-blue text-2xl font-bold">
          The cutest and most determined penguin in the crypto world
        </p>
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
        <Heading className="text-6xl font-bold">Gary's story</Heading>
      </section>
    </main>
  );
}
