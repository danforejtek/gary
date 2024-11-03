export function Rounds() {
  return (
    <div className="mx-2">
      <div className="my-2 flex w-full flex-row justify-center gap-2">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-[#0D1E35] px-6 py-2">
          <p className="text-xs font-bold leading-none text-white">
            1<sup>st</sup> round
          </p>
          <p className="text-xl font-bold leading-none text-gary-yellow">$0.10</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-gary-input-blue px-6 py-2">
          <p className="text-xs font-bold leading-none text-[#0D1E35]">
            2<sup>nd</sup> round
          </p>
          <p className="text-xl font-bold leading-none text-gary-pink">$0.12</p>
        </div>
      </div>
      <div className="my-2 flex w-full flex-row justify-center gap-2">
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-gary-input-blue px-6 py-2">
          <p className="text-xs font-bold leading-none text-[#0D1E35]">
            3<sup>rd</sup> round
          </p>
          <p className="text-xl font-bold leading-none text-gary-pink">$0.15</p>
        </div>
        <div className="flex flex-1 flex-col items-center gap-1 rounded-xl bg-gary-input-blue px-6 py-2">
          <p className="text-xs font-bold leading-none text-[#0D1E35]">Listing</p>
          <p className="text-xl font-bold leading-none text-gary-pink">$0.20</p>
        </div>
      </div>
    </div>
  )
}
