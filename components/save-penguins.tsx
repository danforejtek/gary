import Image from "next/image"
import { Heading } from "./heading"
import { Button } from "./ui/button"

export const SavePenguins = () => {
  return (
    <div className="container relative mx-auto flex min-h-screen flex-col items-center py-20">
      <div className="mt-20 flex w-full flex-row flex-wrap justify-between gap-10 text-white lg:mt-60">
        <div className="relative mx-auto h-[400px] w-[300px] lg:w-[46%]">
          <Image
            src={`/images/save-penguins/gary_army.png`}
            width={385}
            height={375}
            alt=""
            className="absolute bottom-16 left-[50%] z-10 -translate-x-1/2"
          />
          <Image src={`/images/save-penguins/ice.svg`} width={740} height={187} alt="" className="absolute bottom-0" />
        </div>

        <div className="mt-12 flex w-full flex-col px-8 lg:w-[46%]">
          <Heading className="text-center text-4xl font-bold lg:text-left">Join Gary&apos;s army</Heading>
          <p className="text-center text-2xl text-white lg:text-left">
            Show your support for Gary and his penguin family, and follow Gary on social media!
          </p>
          <div className="mt-8 flex flex-row justify-center gap-2 md:gap-6 lg:justify-center">
            <Button className="h-auto w-full max-w-[80px] lg:max-w-[156px] aspect-square rounded-3xl border-none bg-[#0D1E35] hover:!bg-gary-yellow">
              <a href="https://www.facebook.com/profile.php?id=61568221981440"><Image src={`/images/save-penguins/facebook.svg`} width={80} height={80} alt="Facebook" /></a>
            </Button>
            <Button className="h-auto w-full max-w-[80px] lg:max-w-[156px] aspect-square rounded-3xl border-none bg-[#0D1E35] hover:!bg-gary-yellow">
              <a href="https://x.com/gary_help32532"><Image src={`/images/save-penguins/twitter.svg`} width={80} height={80} alt="Twitter" /></a>
            </Button>
            <Button className="h-auto w-full max-w-[80px] lg:max-w-[156px] aspect-square rounded-3xl border-none bg-[#0D1E35] hover:!bg-gary-yellow">
              <a href="https://t.me/helpgary"><Image src={`/images/save-penguins/telegram.svg`} width={80} height={80} alt="Telegram" /></a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-40 flex flex-row flex-wrap justify-between lg:mt-40 lg:gap-16">
        <div className="flex flex-col justify-center lg:w-[44%] lg:max-w-[700px]">
          <Heading className="text-center text-4xl font-bold tracking-wider text-gary-yellow lg:text-left">
            Gary got adopted
          </Heading>
          <p className="mt-4 px-6 text-center text-2xl font-bold text-white md:px-0 lg:text-left">
            Penguin designated as AP 619 was found abandoned by its colony. Since it’s too young to survive on its own,
            it was taken to a rescue station, where it will stay until it grows strong enough to be released back into
            the wild and rejoin the penguin colony in Simon`&apos;s Town. To support the efforts of this organization
            and ensure that this young penguin has everything it needs, we decided to adopt it and named him Gary. We
            are currently discussing the possibility of setting up a webcam to monitor his growth and eventual release.
          </p>
        </div>
        <div className="relative mt-20 h-[650px] w-full overflow-hidden rounded-3xl lg:mt-0 lg:w-[500px] lg:max-w-[650px]">
          <Image src={`/images/penguin.png`} sizes="650px" alt="" fill className="object-contain" />
        </div>
      </div>

      <div className="mt-40 flex flex-row flex-wrap justify-between lg:mt-0 lg:justify-center lg:gap-16">
        <div className="relative m-auto h-[400px] w-full overflow-hidden rounded-3xl lg:w-[712px] lg:max-w-[700px]">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/l-hhf3WcSQU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="object-cover"
          ></iframe>
        </div>
        <div className="flex flex-col justify-center lg:w-[44%] lg:max-w-[500px]">
          <Heading className="mt-20 text-center text-6xl font-bold leading-none tracking-normal lg:text-left lg:text-[70px]">
            Save penguins
          </Heading>
          <p className="mt-4 px-6 text-center text-xl font-bold text-white md:px-0 lg:text-left">
            African penguins are in serious trouble. Their numbers have plummeted  over the past century due to the 
            destruction of nesting sites,  egg poaching, oil spills, global  climate change, and competition for food
            resources with commercial fishing. There is hope to save these iconic species, through organisations
            focusing on saving penguins.
          </p>
          <div className="mt-10 rounded-3xl bg-[#0D1E35] px-6 py-8 text-center lg:px-16">
            <p className="text-3xl font-bold text-gary-light-blue">
              10% of all money from pre-sale will be donated to these organisations
            </p>
          </div>
          <div className="mt-4 flex flex-row flex-wrap justify-between px-6">
            <a
              href="https://savingpenguins.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-white hover:text-gary-yellow"
            >
              savingpenguins.org
            </a>
            <a
              href="https://sanccob.co.za"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl font-bold text-white hover:text-gary-yellow"
            >
              sanccob.co.za
            </a>
          </div>
        </div>
      </div>

      {/* ZAKOMENTOVÁNO DLE POZNÁMKY VE FIGMĚ */}
      {/* <div className="mx-auto mt-72 w-2/3">
        <div className="mx-auto h-[529px] w-2/3 rounded-t-3xl bg-[linear-gradient(#fff,#B1E4FF)]">
          <p className="text-5xl">Zachranmne tucnaky</p>
        </div>
        <div className="relative bottom-24 mx-auto h-60 w-2/3">
          <Image src={`/images/ice.svg`} fill className="" alt="" />
        </div>
      </div> */}
    </div>
  )
}
