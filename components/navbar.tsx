import Link from "next/link"
import React from "react"
import Image from "next/image"

const links = [
  { name: "Gary's story", href: "#about" },
  { name: "Help Gary", href: "#help-gary" },
  { name: "Earn with Gary", href: "" },
  { name: "Join us!", href: "" },
  { name: "FAQ", href: "" },
]

const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-between py-4 container mx-auto">
      <div className="h-14 w-14 rounded-full bg-yellow-300">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>
      <nav>
        <ul className="flex">
          {links.map((link) => (
            <li key={link.name} className="ml-11 text-2xl font-bold text-white">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="h-9 w-48 rounded-3xl bg-[#061022] text-2xl font-bold text-[#FFAE17]">Buy GARA coin</button>
    </div>
  )
}

export default NavBar
