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
    <button onClick={handleClick} className="animate-slow-bounce">
      <ArrowDown className="z-10 mt-4 size-28 text-white" />
    </button>
  )
}
