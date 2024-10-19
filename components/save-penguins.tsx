import Image from "next/image"
import React from "react"
import { Heading } from "./heading"

const SavePenguins = () => {
  return (
    <div className="mb-40 min-h-screen">
      <div className="mt-40 flex gap-40 px-40">
        <div className="flex flex-col justify-center">
          <Heading className="text-left text-8xl font-bold leading-none tracking-normal">Save penguins</Heading>
          <p className="mt-4 text-2xl font-bold text-white">
            African penguins are in serious trouble. Their numbers have plummeted  over the past century due to the 
            destruction of nesting sites,  egg poaching, oil spills, global  climate change, and competition for food
            resources with commercial fishing. There is hope to save this iconic species, through the African
            Penguin Nest Project.
          </p>
          <div className="mt-10 rounded-3xl bg-[#0D1E35] px-16 py-8 text-center">
            <p className="text-3xl font-bold text-gary-light-blue">
              10% of all money from pre-sale will be donated to African Penguin Nest Project
            </p>
            <p className="mt-4 text-3xl font-bold text-white">www.savingpenguins.org/</p>
          </div>
        </div>
        <Image src={`/images/penguins.png`} width={712} height={712} alt="" />
      </div>

      <div className="relative flex text-white">
        <div>
          <Image src={`/images/save-penguins/gary_army.png`} width={385} height={375} alt="" />
          <Image src={`/images/save-penguins/ice.svg`} width={385} height={375} alt="" />
        </div>

        <div>
          <Heading className="text-4xl font-bold">Join Gary&apos;s army</Heading>
          <p className="text-2xl text-white">
            Show your support for Gary and his penguin family, and follow Gary on social media!
          </p>
          <div>
            <Image src={`/images/save-penguins/twitter.svg`} width={50} height={50} alt="" />
            <Image src={`/images/save-penguins/facebook.svg`} width={50} height={50} alt="" />
            <Image src={`/images/save-penguins/instagram.svg`} width={50} height={50} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SavePenguins
