"use client"
import CountdownTimer from "@/components/countdown-timer"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import React from "react"

const SaveGary = () => (
  <div className="relative mb-20 flex flex-col items-center space-y-28">
    <p className="text-center text-2xl font-bold text-gary-blue">
      The cutest and most determined penguin in the crypto world
    </p>
    <div>
      <p className="mb-4 text-2xl font-bold text-gary-blue">Gary doesn&apos;t have much time left</p>
      <CountdownTimer />
    </div>
    <Image src={`/images/gary_happy.png`} alt="Gary" width={357} height={396} className="absolute -right-80" />
    <div className="flex flex-col items-center pt-40">
      <p className="text-center text-4xl font-normal text-white">Find out how you can help Gary</p>
      <ArrowDown className="mt-4 h-44 w-44 text-white" />
    </div>
  </div>
)
export default SaveGary
