"use client"

import { ArrowDown } from "lucide-react"

export const ScrollToComicsButton = () => {
  const handleClick = () => {
    // scroll to element id
    if (document) {
      document.getElementById("about").scrollIntoView({ behavior: "smooth" })
    }
  }
  return (
    <div className="m-auto block text-center">
      <div className="mt-16 flex flex-col items-center">
        <p
          className="cursor-pointer rounded-full bg-[#061022] p-2 px-6 text-center text-2xl font-bold text-[#FFAE17] ring-2 transition-all hover:border-transparent hover:ring-gary-yellow"
          onClick={handleClick}
        >
          Find out how you can help Gary
        </p>
      </div>
      <button onClick={handleClick} className="animate-slow-bounce">
        <ArrowDown className="z-10 mt-4 size-28 text-white" />
      </button>
    </div>
  )
}
