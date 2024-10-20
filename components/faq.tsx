import React from "react"
import { Heading } from "./heading"

const faqData = [
  {
    title: "What is GARA coin?",
    text: "GARA coin is a meme and utility token of the fast growing Coingarage exchange and has many uses. From paying a range of fees, to using the exchange&apos;s services and products, to fueling a trading bot, new uses will continue to emerge as the exchange&apos;s ecosystem grows.",
  },
  {
    title: "GARA Coin Burning Mechanism",
    text: "In order to more smoothly evolve the value of the GARA coin, a burning mechanism has been implemented that will gradually burn GARA coins based on their increasing usage until only 200,000,000 of the original 900,000,000 remain.",
  },
  {
    title: "Tokenomics",
    text: "10% GARA in OTC form after admission to trading on the issuer&apos;s trading platform, 11% Stake rewards, 11% Reserved for public pre-sale, 10% Angel investors, 22% company reserves, 11% founding team, 10% for marketing use, 15% to be burned if requirements are met",
  },
]

const Faq = () => (
  <div className="flex flex-col items-center justify-center">
    <Heading className="text-left text-6xl font-bold leading-none tracking-normal">FAQ</Heading>
    <div className="mb-96 mt-16 flex flex-col gap-10">
      {faqData.map((faq, index) => (
        <div key={index} className="mx-auto flex w-3/5 flex-col gap-4 rounded-3xl bg-[#0D1E35] px-16 py-12">
          <Heading className="text-4xl font-bold">{faq.title}</Heading>
          <p className="text-2xl font-bold text-white">{faq.text}</p>
        </div>
      ))}
    </div>
  </div>
)

export default Faq
