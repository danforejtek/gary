"use client"
import CountdownTimer from "@/components/countdown-timer"
import { Heading } from "@/components/heading"
import { ArrowDown } from "lucide-react"
import Image from "next/image"
import React from "react"

const SaveGary = () => (
  <div className="relative mb-8 mt-12 flex h-full flex-1 flex-col items-center justify-between">
    <div>
      <Heading className="text-center text-[5rem] font-bold leading-none tracking-normal">Save penguin Gary</Heading>
      <p className="mt-4 text-center text-2xl font-bold text-gary-blue">
        The cutest and most determined penguin in the crypto world
      </p>
    </div>
    <div className="pt-6">
      <p className="mb-4 text-center text-2xl font-bold text-gary-blue">Gary doesn&apos;t have much time left</p>
      <CountdownTimer />
    </div>
    <div className="flex flex-col items-center">
      <p className="text-center text-2xl font-bold text-white">Find out how you can help Gary</p>
    </div>
    <ArrowDown className="mt-4 size-28 text-white" />
  </div>
)
export default SaveGary
