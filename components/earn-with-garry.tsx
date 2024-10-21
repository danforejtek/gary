import React from "react"
import { Heading } from "@/components/heading"
import { Button } from "./ui/button"
import Image from "next/image"

const EarnWithGary = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-normal">
      <div className="flex flex-col items-center gap-6">
        <Heading className="text-6xl font-bold">Earn with Gary</Heading>
        <p className="my-5 text-4xl font-bold text-gary-blue">
          Stake your GARA coins and earn up to <Heading className="inline text-5xl text-[#19FB9B]">35% p.a.</Heading>
        </p>
        <p className="max-w-[800px] text-center text-2xl font-bold text-gary-blue">
          Gary isn&apos;t just a cute penguin, but he&apos;s also smart and knows how to make the most money. Gary
          stakes his GARA coins on the <span className="text-gary-pink">Coingarage</span> exchange with returns of up to
          35% annually, and you can too!
        </p>
        <Button
          variant="default"
          size="lg"
          className="bg-gary-pink hover:bg-gary-pink/80 dark:hover:bg-gary-pink/80 my-2 h-14 border-none px-10 text-2xl outline-none"
        >
          Stake plans
        </Button>
      </div>

      <div className="relative mt-32 flex">
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
          className="absolute bottom-4 left-48 object-contain"
        />
        <Image
          src={`/images/earn-with-gary/table.png`}
          alt="Gary"
          width={377}
          height={260}
          className="ml-40 object-contain"
        />
      </div>
    </div>
  )
}

export default EarnWithGary
