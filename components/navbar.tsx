"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AnchorLink } from "./anchor-link"

const links = [
  { name: "Gary's story", anchor: "about" },
  { name: "Help Gary", anchor: "help-gary" },
  { name: "Earn with Gary", anchor: "earn" },
  { name: "Join us!", anchor: "save" },
  { name: "FAQ", anchor: "faq" },
  {name:"WhitePaper", href: "/whitepaper/whitepaperCG.pdf"},
]

export const NavBar = () => {
  return (
    <div className="container mx-auto hidden w-full grid-cols-[200px_1fr_200px] items-center justify-between gap-8 py-4 lg:grid">
      <div className="h-14 w-14 rounded-full">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>
      <nav className="flex flex-row justify-center">
        <ul className="flex flex-row gap-2">
          {links.map((link) => (
            <li key={link.name}>
              {link.href ? (
                <a href={link.href} target="_blank">
                  <Button variant="ghost" className="text-xl font-bold text-white">
                    {link.name}
                  </Button>
                </a>
              ) : (
                <AnchorLink anchor={link.anchor}>
                  <Button variant="ghost" className="text-xl font-bold text-white">
                    {link.name}
                  </Button>
                </AnchorLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-end">
        <AnchorLink anchor="buy-gara">
          <Button className="rounded-full border-transparent bg-[#061022] px-4 py-2 text-xl font-bold text-[#FFAE17] ring-2 ring-transparent ring-offset-0 transition-all hover:!bg-[#061022] hover:!text-gary-yellow hover:ring-gary-yellow hover:ring-offset-2">
            Buy GARA coin
          </Button>
        </AnchorLink>
      </div>
    </div>
  )
}
