"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/heading"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    story: "",
    text: "",
    storyPosition: "absolute top-[3%] right-0 w-[500px] h-[420px]",
    textPosition: "absolute top-[14%] left-[2%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-0 right-[16%] w-[600px] h-[500px]",
  },
  {
    story:
      "Gary was fired for redundancy, the company wants to change the brand and Gary, who was the model for the company logo, no longer fits into the new brand ",
    text: "We're going to rebrand, and we don't need you anymore, Gary. Your job with us is done.",
    storyPosition: "absolute top-[15%] right-0 w-[500px] h-[420px]",
    textPosition: "absolute top-[30%] left-[20%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-0 right-[16%] w-[600px] h-[500px]",
  },
  {
    story: "Gary lost his job, has to pack his things and leaves the company building",
    text: "I helped them build a crypto exchange and now they want to get rid of me",
    storyPosition: "absolute bottom-[3%] right-0 w-[420px] h-[330px]",
    textPosition: "absolute top-[35%] left-[15%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-0 left-[40%] w-[266px] h-[344px]",
  },
  {
    story: "Gary is sad to have lost his job and wonders what he's going to do now that he's suddenly got an idea!",
    text: "",
    storySide: "left",
    storyPosition: "absolute bottom-0 left-0 w-[500px] h-[420px]",
    textPosition: "absolute top-1/2 left-1/2",
    garyPosition: "absolute bottom-[3%] left-[50%] w-[266px] h-[344px]",
  },
  {
    story: "",
    text: "They won't just get rid of me, I'll show them I'm important, sell enough GARA coin and take over the company",
    storyPosition: "absolute top-1/4 left-1/4",
    textPosition: "absolute top-[18%] right-[12%] w-[500px] h-[280px]",
    garyPosition: "absolute bottom-[4%] left-[40%] w-[266px] h-[344px]",
  },
]

function Slide({ slideNumber, slide, carouselApi }: { slideNumber: number; slide: any; carouselApi?: CarouselApi }) {
  const [isActive, setIsActive] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext()
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true)
          } else {
            setIsActive(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    const currentSlide = slideRef.current
    if (currentSlide) {
      observer.observe(currentSlide)
    }

    return () => {
      if (currentSlide) {
        observer.unobserve(currentSlide)
      }
    }
  }, [])

  return (
    <CarouselItem ref={slideRef} className="relative h-full w-full pl-0">
      <Image
        src={`/images/story/slide${slideNumber}/bg.jpg`}
        alt={`Slide ${slideNumber}`}
        className="-z-20 select-none object-cover"
        fill
      />
      {slideNumber === 0 ? (
        <div className="flex h-full w-full flex-col items-center overflow-hidden">
          <Heading className="mt-20 text-6xl font-bold">Gary&apos;s story</Heading>
          <Button
            onClick={handleNext}
            size="lg"
            className="mt-[30vh] border-none bg-black/70 px-10 py-10 text-3xl hover:!bg-black/80"
          >
            Click for continue
          </Button>
        </div>
      ) : null}

      <div className={cn(slide.garyPosition, "-z-10 select-none", isActive ? "animate-fade-in-1" : "opacity-0")}>
        <Image src={`/images/story/slide${slideNumber}/gary.png`} fill alt="Gary" className="-z-10" />
      </div>
      {slide.story !== "" ? (
        <div
          className={cn(
            slide.storyPosition,
            "-z-10 select-none",
            isActive ? (slide.storySide !== "left" ? "animate-slide-in" : "animate-slide-in-left") : "opacity-0"
          )}
        >
          <p className="z-10 pb-20 pl-24 pr-16 pt-28 text-xl font-bold">{slide.story}</p>
          <Image src={`/images/story/slide${slideNumber}/text-bg.png`} fill alt="Story background" className="-z-10" />
        </div>
      ) : null}
      {slide.text !== "" ? (
        <div className={cn(slide.textPosition, "-z-10 select-none", isActive ? "animate-fade-in-2" : "opacity-0")}>
          <p className="z-10 py-20 pl-20 text-center text-2xl font-bold">{slide.text}</p>
          <Image src={`/images/story/slide${slideNumber}/bubble.png`} fill alt="Text bubble" className="-z-10" />
        </div>
      ) : null}
    </CarouselItem>
  )
}

export function GarysStoryCarousel() {
  const [current, setCurrent] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <>
      <Carousel
        setApi={setApi}
        opts={{
          loop: false,
        }}
      >
        <CarouselContent className="ml-0 h-screen w-screen" ref={carouselRef}>
          {slides.map((slide, index) => {
            const slideNumber = index
            return (
              <Slide key={slideNumber} data-index={index} slideNumber={slideNumber} slide={slide} carouselApi={api} />
            )
          })}
        </CarouselContent>
        {/* next slide button */}
        {current !== 0 ? (
          <Button
            onClick={() => api?.scrollPrev()}
            variant="ghost"
            className="absolute left-0 top-1/2 z-20 size-24 h-screen -translate-y-1/2 transform rounded-none bg-transparent p-0 transition-all hover:bg-black/20"
          >
            <ChevronLeft className="size-24 stroke-white" />
          </Button>
        ) : null}
        {current !== slides?.length - 1 ? (
          <Button
            onClick={() => api?.scrollNext()}
            variant="ghost"
            className="absolute right-0 top-1/2 z-20 size-24 h-screen -translate-y-1/2 transform rounded-none bg-black/10 p-0 transition-all hover:bg-black/20"
          >
            <ChevronRight className="size-24 stroke-white" />
          </Button>
        ) : null}
        <div className="absolute bottom-0 left-0 z-30 w-full">
          <div className="flex flex-row justify-center gap-4 py-6">
            {slides.map((_, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  variant="ghost"
                  className={cn(
                    "size-6 bg-white/80 p-0 transition-all hover:bg-gary-light-blue",
                    current === index ? "bg-gary-light-blue" : ""
                  )}
                ></Button>
              )
            })}
          </div>
        </div>
      </Carousel>
    </>
  )
}
