import Link from "next/link";
import React from "react";
import Image from "next/image";

const links = [
  "Gary's story",
  "Help Gary",
  "Earn with Gary",
  "Join us!",
  "FAQ",
];

const NavBar = () => {
  return (
    <div className="w-full px-36 flex items-center justify-between h-16 mt-5 mb-36">
      <div className="bg-yellow-300 rounded-full w-14 h-14">
        <Image src="/logo.png" alt="Gary" width={60} height={60} />
      </div>
      <nav>
        <ul className="flex">
          {links.map((link) => (
            <li key={link} className="text-white font-normal text-2xl ml-11">
              <Link href={link}>{link}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="bg-[#061022] w-48 h-9 text-[#FFAE17] font-normal text-2xl rounded-3xl">
        Buy GARA coin
      </button>
    </div>
  );
};

export default NavBar;
