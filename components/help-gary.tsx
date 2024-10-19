import React from "react"
import { Heading } from "@/components/heading"
import GarysRoadmap from "./garys-roadmap"
import { BuyGara } from "@/components/buy-gara-widget/widget"

const HelpGary = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mb-28 mt-44 flex flex-col items-center">
        <Heading className="text-6xl font-bold">Help Gary reach his goals</Heading>
        <Heading className="mt-1 uppercase text-gary-light-blue">1 gara sold = 1 vote</Heading>
      </div>

      <div className="ml-36 mr-44 flex justify-between">
        <div className="h-[1500px] w-[926px]">
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
