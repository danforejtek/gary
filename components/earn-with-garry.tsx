import React from "react"
import { Heading } from "@/components/heading"
import { Button } from "./ui/button"
import Image from "next/image"

const EarnWithGary = () => {
  return (
    <div className="flex flex-col items-center justify-normal">
      <div className="flex flex-col items-center px-96">
        <Heading className="text-6xl font-bold">Earn with Gary</Heading>
        <p className="my-5 text-5xl font-bold text-gary-blue">Stake your GARA coins and earn up to 35% p.a.</p>
        <p className="text-center text-2xl font-bold text-gary-blue">
          Gary isn&apos;t just a cute penguin, but he&apos;s also smart and knows how to make the most money. Gary
          stakes his GARA coins on the Coingarage exchange with returns of up to 35% annually, and you can too!
        </p>
        <Button>Stake plans</Button>
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
