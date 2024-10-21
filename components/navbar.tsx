import Link from "next/link"
import React from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const links = [
  { name: "Gary's story", href: "#about" },
  { name: "Help Gary", href: "#help-gary" },
  { name: "Earn with Gary", href: "#earn" },
  { name: "Join us!", href: "#save" },
  { name: "FAQ", href: "#faq" },
]

const NavBar = () => {
  return (
    <div className="container mx-auto grid w-full grid-cols-[200px_1fr_200px] items-center justify-between gap-8 py-4">
      <div className="h-14 w-14 rounded-full">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>
      <nav className="flex flex-row justify-center">
        <ul className="flex flex-row gap-2">
          {links.map((link) => (
            <li key={link.name}>
              <Button variant="ghost" asChild className="text-xl font-bold text-white">
                <Link href={link.href}>{link.name}</Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center justify-end">
        <Button className="rounded-full bg-[#061022] px-4 py-2 text-xl font-bold text-[#FFAE17]">Buy GARA coin</Button>
      </div>
    </div>
  )
}

export default NavBar
