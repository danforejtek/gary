import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

const SaveGary = () => {
  return (
    <>
      <p className="text-gary-blue text-2xl font-bold">
        The cutest and most determined penguin in the crypto world
      </p>
      <div className="flex h-[340px]">
        <p className="text-gary-blue text-2xl font-bold mt-20">
          Gary doesnt have much time to left
          <div className="h-16 border-2 border-red-300 mt-4">HODINY</div>
        </p>
        <Image
          className="mt-8 absolute right-80 -z-10"
          src={`/images/gary_happy.png`}
          alt=""
          width={357}
          height={396}
        />
      </div>
      <div className="mt-52 flex flex-col items-center">
        <p className="text-white font-normal text-4xl">
          Find out how you can help Gary
        </p>
        <div className="">
          <ArrowDown className=" text-white h-40 w-44 mt-10" />
        </div>
      </div>
      ;
    </>
  );
};

export default SaveGary;
