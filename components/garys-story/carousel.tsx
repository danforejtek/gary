"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"

const slides = [
  {
    story:
      "Gary was fired for redundancy, the company wants to change the brand and Gary, who was the model for the company logo, no longer fits into the new brand ",
    text: "We're going to rebrand, and we don't need you anymore, Gary. Your job with us is done.",
    storyPosition: "absolute top-[3%] right-0 w-[500px] h-[420px]",
    textPosition: "absolute top-[14%] left-[2%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-0 right-[16%] w-[600px] h-[500px]",
  },
  {
    story: "Gary lost his job, has to pack his things and leaves the company building",
    text: "I helped them build a crypto exchange and now they want to get rid of me",
    storyPosition: "absolute bottom-[3%] right-0 w-[420px] h-[330px]",
    textPosition: "absolute top-[14%] left-[2%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-0 left-[40%] w-[266px] h-[344px]",
  },
  {
    story: "Gary is sad to have lost his job and wonders what he's going to do now that he's suddenly got an idea!",
    text: "",
    storyPosition: "absolute bottom-0 left-0 w-[500px] h-[420px]",
    textPosition: "absolute top-1/2 left-1/2",
    garyPosition: "absolute bottom-[4%] left-[50%] w-[266px] h-[344px]",
  },
  {
    story: "",
    text: "They won't just get rid of me, I'll show them I'm important, sell enough GARA coin and take over the company",
    storyPosition: "absolute top-1/4 left-1/4",
    textPosition: "absolute top-[18%] right-[12%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-[4%] left-[40%] w-[266px] h-[344px]",
  },
]

export function GarysStoryCarousel() {
  return (
    <Carousel
      opts={{
        loop: false,
      }}
    >
      <CarouselPrevious />
      <CarouselContent className="ml-0 h-screen w-screen">
        {slides.map((slide, index) => {
          const slideNumber = index + 1
          return (
            <CarouselItem key={slideNumber} className="relative h-full w-full pl-0">
              <Image
                src={`/images/story/slide${slideNumber}/bg.jpg`}
                alt={`Slide ${slideNumber}`}
                className="-z-20 object-cover"
                fill
              />
              <div className={slide.garyPosition}>
                <Image src={`/images/story/slide${slideNumber}/gary.png`} fill alt="Gary" className="-z-10" />
              </div>
              {slide.story !== "" ? (
                <div className={slide.storyPosition}>
                  <p className="z-10 pb-20 pl-24 pr-16 pt-28 text-xl font-bold">{slide.story}</p>
                  <Image src={`/images/story/slide${slideNumber}/text-bg.png`} fill alt="Gary" className="-z-10" />
                </div>
              ) : null}
              {slide.text !== "" ? (
                <div className={slide.textPosition}>
                  <p className="z-10 px-12 py-24 text-center text-2xl font-bold">{slide.text}</p>
                  <Image src={`/images/story/slide${slideNumber}/bubble.png`} fill alt="Gary" className="-z-10" />
                </div>
              ) : null}
            </CarouselItem>
          )
        })}
        {/* <CarouselNext /> */}
      </CarouselContent>
    </Carousel>
  )
}
