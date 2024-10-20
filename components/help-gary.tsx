import React from "react"
import { Heading } from "@/components/heading"
import GarysRoadmap from "./garys-roadmap"
import { BuyGara } from "@/components/buy-gara-widget/widget"

const HelpGary = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="container mx-auto mt-44 flex flex-col items-center">
        <Heading className="text-6xl font-bold">Help Gary reach his goals</Heading>
        <Heading className="mt-1 uppercase text-gary-light-blue">1 gara sold = 1 vote</Heading>
      </div>

      <div className="container mx-auto mt-16 grid grid-cols-[1fr_auto] justify-between">
        <div className="pr-24">
          <GarysRoadmap />
        </div>
        <div className="h-[788px]">
          <BuyGara />
        </div>
      </div>
    </div>
  )
}

export default HelpGary
