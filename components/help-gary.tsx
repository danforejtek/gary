import { Heading } from "@/components/heading"
import { GarysRoadmap } from "@/components/garys-roadmap"
import { BuyGara } from "@/components/buy-gara-widget/widget"
import Image from "next/image"

export const HelpGary = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="container mx-auto mt-20 flex flex-col items-center lg:mt-44">
        <Heading className="text-center text-6xl font-bold">Help Gary reach his goals</Heading>
        <Heading className="mt-1 text-center uppercase text-gary-light-blue">1 gara sold = 1 vote</Heading>
      </div>

      <div className="container mx-auto mt-16 grid justify-center gap-8 lg:grid-cols-[1fr_auto] lg:justify-between">
        <GarysRoadmap />
        <div className="relative mt-20 lg:mt-0">
          <BuyGara className="sticky top-0" />
          <div className="absolute -bottom-[7.5rem] -left-3 h-[160px] w-[106%]">
            <Image src="/images/ice_buy_gara.svg" fill />
          </div>
        </div>
      </div>
    </div>
  )
}
