"use client"
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnchorLink } from "./anchor-link";

const links = [
  { name: "Gary's story", anchor: "about" },
  { name: "Help Gary", anchor: "help-gary" },
  { name: "Earn with Gary", anchor: "earn" },
  { name: "Join us!", anchor: "save" },
  { name: "FAQ", anchor: "faq" },
  { name: "WhitePaper", href: "/whitepaper/whitepaperCG.pdf" },
];

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container mx-auto w-full py-4 lg:grid lg:grid-cols-[200px_1fr_200px] lg:items-center lg:justify-between lg:gap-8">
      <div className="hidden lg:block h-14 w-14 rounded-full">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>

      <nav className="hidden lg:flex lg:justify-center">
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

      <div className="hidden lg:flex lg:items-center lg:justify-end">
        <AnchorLink anchor="buy-gara">
          <Button className="rounded-full border-transparent bg-[#FFAE17] px-4 py-2 text-xl font-bold text-[#061022] ring-2 ring-transparent ring-offset-0 transition-all hover:bg-[#e69e15] hover:text-[#061022]">
            Buy GARA coin
          </Button>
        </AnchorLink>
      </div>

      <button
        className="fixed top-4 right-4 z-50 lg:hidden focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? (
          <Image src="/icons/close.svg" alt="Close" width={30} height={30} />
        ) : (
          <Image src="/icons/burger-menu.svg" alt="Menu" width={30} height={30} />
        )}
      </button>

      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black bg-opacity-90">
          <div className="mb-8">
            <Image src="/logo.png" alt="Gary" width={100} height={100} />
          </div>

          <ul className="flex flex-col gap-6 text-center">
            {links.map((link) => (
              <li key={link.name}>
                {link.href ? (
                  <a
                    href={link.href}
                    target="_blank"
                    className="text-2xl font-bold text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                ) : (
                  <AnchorLink anchor={link.anchor}>
                    <span
                      className="text-2xl font-bold text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.name}
                    </span>
                  </AnchorLink>
                )}
              </li>
            ))}
          </ul>
          
          <div className="mt-8">
            <AnchorLink anchor="buy-gara">
              <Button className="rounded-full border-transparent bg-[#FFAE17] px-6 py-3 text-2xl font-bold text-[#061022] ring-2 ring-transparent ring-offset-0 transition-all hover:bg-[#e69e15] hover:text-[#061022]">
                Buy GARA coin
              </Button>
            </AnchorLink>
          </div>

          <div className="mt-8 flex flex-row gap-4">
            <Button className="h-12 w-12 rounded-full border-none bg-[#0D1E35] hover:!bg-gary-yellow flex items-center justify-center">
              <Image src={`/images/save-penguins/facebook.svg`} width={24} height={24} alt="Facebook" />
            </Button>
            <Button className="h-12 w-12 rounded-full border-none bg-[#0D1E35] hover:!bg-gary-yellow flex items-center justify-center">
              <Image src={`/images/save-penguins/twitter.svg`} width={24} height={24} alt="Twitter" />
            </Button>
            <Button className="h-12 w-12 rounded-full border-none bg-[#0D1E35] hover:!bg-gary-yellow flex items-center justify-center">
              <Image src={`/images/save-penguins/telegram.svg`} width={24} height={24} alt="Telegram" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
