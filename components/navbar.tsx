import Link from "next/link"
import React from "react"
import Image from "next/image"

const links = [
  { name: "Gary's story", href: "#about" },
  { name: "Help Gary", href: "" },
  { name: "Earn with Gary", href: "" },
  { name: "Join us!", href: "" },
  { name: "FAQ", href: "" },
]

const NavBar = () => {
  return (
    <div className="mb-36 mt-5 flex h-16 w-full items-center justify-between px-36">
      <div className="h-14 w-14 rounded-full bg-yellow-300">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>
      <nav>
        <ul className="flex">
          {links.map((link) => (
            <li key={link.name} className="ml-11 text-2xl font-normal text-white">
              <Link href={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="h-9 w-48 rounded-3xl bg-[#061022] text-2xl font-normal text-[#FFAE17]">Buy GARA coin</button>
    </div>
  )
}

export default NavBar
