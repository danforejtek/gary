import React from "react"
import { Heading } from "@/components/heading"
import Image from "next/image"

const garysRoadMapData = [
  {
    votes: 500000,
    title: "Unemployment compensation",
    description: "Gary will be still unemployed, but he won't starve.",
    img: "unenployment.png",
  },
  {
    votes: 1000000,
    title: "RESCUE OF PENGUINS",
    description:
      "GARY will be able to send part of all the money from the pre-sale to save his penguin family in Antarctica.",
    img: "rescue.png",
  },
  {
    votes: 2000000,
    title: "NEW JOB FOR GARY",
    description: "Gary will get new job in company and will be able to enforce at least 2 GARA airdrops.",
    img: "new_job.png",
  },
  {
    votes: 5000000,
    title: "GARY'S PROMOTION",
    description:
      "Gary will gain more influence in the company and push listing of GARA coin on selected exchanges in the top 50.",
    img: "promotion.png",
  },
  {
    votes: 10000000,
    title: "Seat on the board of directors",
    description:
      "GARY will use his influence in the company and list GARA coin on some of the top 10 crypto exchanges.",
    img: "",
  },
  {
    votes: 20000000,
    title: "Taking over",
    description:
      "GARY will become king and gain control of the exchange Coingarage and rename it Coinguin. As the first act of his reign, he will burn 15% of the total supply of GARA coin.",
    img: "assumption.png",
  },
  {
    votes: 50000000,
    title: "SPREAD OF INFLUENCE",
    description:
      "GARY gains a huge influx of power and quickly expands his influence worldwide. He will use money from the pre-sale for marketing and development of new products which will use GARA coin.",
    img: "influence.png",
  },
]

const GarysRoadmap = () => (
  <div className="flex w-full flex-col text-white">
    <div className="mb-4 flex h-44 flex-col">
      {garysRoadMapData.map((item, index) => {
        const { votes, title, description, img } = item
        return (
          <div key={index} className="flex">
            <p className="mr-7 flex items-center justify-center">IMG kolečko</p>
            <div className="mb-5 flex w-full items-center justify-between rounded-3xl bg-[#0D1E35]">
              <div className="my-6 ml-11 flex w-[620px] flex-col">
                <p className="text-xl font-bold text-gary-light-blue">{votes}</p>
                <p className="text-4xl font-bold text-gary-yellow">{title}</p>
                <span className="text-2xl font-bold">{description}</span>
              </div>
              <div className="relative mr-5 flex h-32 w-32 items-center justify-center">
                <Image src={`/images/help-gary/${img}`} alt="Gary" fill className="object-contain" />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  </div>
)

export default GarysRoadmap
