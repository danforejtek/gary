import Image from "next/image"
import React from "react"
import { Heading } from "./heading"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"

const SavePenguins = () => {
  return (
    <div className="container relative mx-auto mb-40 flex min-h-screen flex-col items-center">
      <div className="container mx-auto mt-40 flex flex-row flex-wrap lg:mt-60 lg:gap-16">
        <div className="flex flex-col justify-center lg:w-[44%] lg:max-w-[700px]">
          <Heading className="text-center text-6xl font-bold leading-none tracking-normal lg:text-left">
            Save penguins
          </Heading>
          <p className="mt-4 text-center text-2xl font-bold text-white lg:text-left">
            African penguins are in serious trouble. Their numbers have plummeted  over the past century due to the 
            destruction of nesting sites,  egg poaching, oil spills, global  climate change, and competition for food
            resources with commercial fishing. There is hope to save this iconic species, through the African
            Penguin Nest Project.
          </p>
          <div className="mt-10 rounded-3xl bg-[#0D1E35] px-16 py-8 text-center">
            <p className="text-3xl font-bold text-gary-light-blue">
              10% of all money from pre-sale will be donated to African Penguin Nest Project
            </p>
            <p className="mt-4 text-3xl font-bold text-white transition-colors hover:text-gary-yellow">
              <a href="www.savingpenguins.org" target="_blank" rel="noopener noreferrer">
                www.savingpenguins.org
              </a>
            </p>
          </div>
        </div>
        <div className="relative h-auto w-full overflow-hidden rounded-3xl lg:w-[712px] lg:max-w-[700px]">
          <Image src={`/images/penguins.png`} sizes="800px" alt="" fill className="object-cover" />
        </div>
      </div>

      <div className="flex w-full flex-row flex-wrap justify-between gap-10 text-white lg:mt-60">
        <div className="relative mx-auto h-[400px] w-[300px] lg:w-[46%]">
          <Image
            src={`/images/save-penguins/gary_army.png`}
            width={385}
            height={375}
            alt=""
            className="absolute bottom-16 left-[50%] z-10 -translate-x-1/2"
          />
          <Image src={`/images/save-penguins/ice.svg`} width={740} height={187} alt="" className="absolute bottom-0" />
        </div>

        <div className="mt-12 flex w-full flex-col px-8 lg:mt-0 lg:w-[46%]">
          <Heading className="text-4xl font-bold">Join Gary&apos;s army</Heading>
          <p className="text-2xl text-white">
            Show your support for Gary and his penguin family, and follow Gary on social media!
          </p>
          <div className="flex flex-row">
            <Button className="mr-4 mt-8 size-28 rounded-3xl bg-[#0D1E35] lg:size-[156px]">
              <Image src={`/images/save-penguins/facebook.svg`} width={104} height={104} alt="" />
            </Button>
            <Button className="mr-4 mt-8 size-28 rounded-3xl bg-[#0D1E35] lg:size-[156px]">
              <Image src={`/images/save-penguins/twitter.svg`} width={80} height={80} alt="" />
            </Button>
            <Button className="mr-4 mt-8 size-28 rounded-3xl bg-[#0D1E35] lg:size-[156px]">
              <Image src={`/images/save-penguins/telegram.svg`} width={87} height={87} alt="" />
            </Button>
          </div>
        </div>
      </div>

      {/* ZAKOMENTOVÁNO DLE POZNÁMKY VE FIGMĚ */}
      {/* <div className="mx-auto mt-72 w-2/3">
        <div className="mx-auto h-[529px] w-2/3 rounded-t-3xl bg-[linear-gradient(#fff,#B1E4FF)]">
          <p className="text-5xl">Zachranmne tucnaky</p>
        </div>
        <div className="relative bottom-24 mx-auto h-60 w-2/3">
          <Image src={`/images/ice.svg`} fill className="" alt="" />
        </div>
      </div> */}
    </div>
  )
}

export default SavePenguins
