import React from "react"
import { Heading } from "@/components/heading"
import { GarysRoadmap } from "@/components/garys-roadmap"
import { BuyGara } from "@/components/buy-gara-widget/widget"

const HelpGary = () => {
  return (
    <div className="container mx-auto flex flex-col justify-center">
      <div className="container mx-auto mt-44 flex flex-col items-center">
        <Heading className="text-center text-6xl font-bold">Help Gary reach his goals</Heading>
        <Heading className="mt-1 uppercase text-gary-light-blue">1 gara sold = 1 vote</Heading>
      </div>

      <div className="container mx-auto mt-16 grid justify-between lg:grid-cols-[1fr_auto]">
        <div className="lg:pr-24">
          <GarysRoadmap />
        </div>
        <div className="mt-20 h-[788px] lg:mt-0">
          <BuyGara />
        </div>
      </div>
    </div>
  )
}

export default HelpGary
