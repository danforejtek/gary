import React from "react"
import { Heading } from "@/components/heading"
import { Button } from "./ui/button"
import Image from "next/image"
import { cn } from "../lib/utils"

const EarnWithGary = () => {
  return (
    <div className="flex flex-col items-center justify-normal">
      <div className="flex flex-col items-center px-96">
        <Heading className="text-6xl font-bold">Earn with Gary</Heading>
        <p className="my-5 text-5xl font-bold text-gary-blue">
          Stake your GARA coins and earn up to <Heading className="text-5xl text-[#19FB9B]"> 35% p.a.</Heading>
        </p>
        <p className="text-center text-2xl font-bold text-gary-blue">
          Gary isn&apos;t just a cute penguin, but he&apos;s also smart and knows how to make the most money. Gary
          stakes his GARA coins on the <span className="text-gary-pink">Coingarage</span> exchange with returns of up to
          35% annually, and you can too!
        </p>
        <Button
          variant="default"
          size="lg"
          className="my-2 h-14 border-none bg-gary-pink px-10 text-2xl outline-none hover:bg-gary-pink/80 dark:hover:bg-gary-pink/80"
        >
          Stake plans
        </Button>
      </div>

      <div className="mt-8 flex">
        <Image
          src={`/images/earn-with-gary/money.png`}
          alt="Gary"
          width={262}
          height={258}
          className="object-contain"
        />
        <Image
          src={`/images/earn-with-gary/gary_teacher.png`}
          alt="Gary"
          width={248}
          height={324}
          className="object-contain"
        />
        <Image
          src={`/images/earn-with-gary/table.png`}
          alt="Gary"
          width={377}
          height={260}
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default EarnWithGary
