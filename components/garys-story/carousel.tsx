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
    storyPosition: "absolute lg:top-[3%] lg:right-0 lg:w-[500px] lg:h-[420px] sm:top-[20%] sm:right-[10%] sm:w-[300px] sm:h-[300px]",
    textPosition: "absolute lg:top-[14%] lg:left-[2%] lg:w-[500px] lg:h-[280px] sm:top-[20%] sm:left-[5%] sm:w-[300px] sm:h-[200px]",
    garyPosition: "absolute lg:bottom-0 lg:right-[16%] lg:w-[600px] lg:h-[500px] sm:bottom-0 sm:right-[10%] sm:w-[200px] sm:h-[200px]",
  },
  {
    story: "Gary was fired for redundancy, the company wants to change the brand and Gary, who was the model for the company logo, no longer fits into the new brand ",
    text: "We're going to rebrand, and we don't need you anymore, Gary. Your job with us is done.",
    storyPosition: "absolute lg:top-[15%] lg:right-0 lg:w-[500px] lg:h-[420px] sm:top-[15%] sm:right-[5%] sm:w-[300px] sm:h-[200px]",
    textPosition: "absolute lg:top-[30%] lg:left-[20%] lg:w-[500px] lg:h-[280px] sm:top-[30%] sm:left-[10%] sm:w-[280px] sm:h-[150px]",
    garyPosition: "absolute lg:bottom-0 right-[16%] lg:w-[600px] lg:h-[500px] sm:bottom- sm:w-[300px] sm:w-[250px]",
  }, 
  {
    story: "Gary lost his job, has to pack his things and leaves the company building",
    text: "I helped them build a crypto exchange and now they want to get rid of me",
    storyPosition: "absolute lg:bottom-[3%] lg:right-0 lg:w-[420px] lg:h-[330px] sm:bottom-[10%] sm:right-[5%] sm:w-[250px] sm:h-[180px]",
    textPosition: "absolute lg:top-[55%] lg:left-[15%] lg:w-[500px] lg:h-[280px] sm:top-[55%] sm:left-[10%] sm:w-[250px] sm:h-[100px]",
    garyPosition: "absolute lg:bottom-0 lg:left-[40%] lg:w-[266px] lg:h-[344px] sm:bottom-0 sm:left-[35%] sm:w-[160px] sm:h-[200px]",
  },
  {
    story: "Gary is sad to have lost his job and wonders what he's going to do now that he's suddenly got an idea!",
    text: "",
    storyPosition: "absolute lg:bottom-0 lg:left-0 lg:w-[500px] lg:h-[420px] sm:bottom-0 sm:left-[5%] sm:w-[200px] sm:h-[150px]",
    textPosition: "absolute lg:top-1/2 lg:left-1/2 sm:top-1/2 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2",
    garyPosition: "absolute lg:bottom-[3%] lg:left-[50%] lg:w-[266px] lg:h-[344px] sm:bottom-[5%] sm:left-1/2 sm:w-[160px] sm:h-[180px] sm:transform sm:-translate-x-1/2",
  },
  {
    story: "The end",
    text: "I'll show them I'm important, sell enough GARA coin and take over the company",
    storyPosition: "absolute lg:top-1/2 lg:left-1/4 sm:top-[40%] sm:left-[20%] sm:w-[200px] sm:h-[100px]",
    textPosition: "absolute lg:top-[48%] lg:right-[18%] lg:w-[500px] lg:h-[280px] sm:top-[48%] sm:right-[15%] sm:w-[250px] sm:h-[100px]",
    garyPosition: "absolute lg:bottom-[4%] lg:left-[40%] lg:w-[266px] lg:h-[344px] sm:bottom-[5%] sm:left-[40%] sm:w-[160px] sm:h-[180px]",
  },
];

function Slide({ slideNumber, slide, carouselApi }: { slideNumber: number; slide: any; carouselApi?: CarouselApi }) {
  const [isActive, setIsActive] = useState(false);
  const slideRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    if (carouselApi) {
      carouselApi.scrollNext();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
          } else {
            setIsActive(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    const currentSlide = slideRef.current;
    if (currentSlide) {
      observer.observe(currentSlide);
    }

    return () => {
      if (currentSlide) {
        observer.unobserve(currentSlide);
      }
    };
  }, []);

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

      {/* Hand - Smaller on Mobile */}
      {slideNumber === 1 && (
        <div
          className={cn(
            "absolute w-[150px] h-[100px] sm:w-[700px] sm:h-[500px] m-0 p-0",
            isActive ? "animate-fade-in-1" : "opacity-0",
            "sm:left-0 sm:bottom-[5%] sm:transform-none",
            "left-14 top-[65%] transform -translate-x-1/2 -translate-y-1/3 sm:translate-y-0"
          )}
        >
          <Image
            src={`/images/story/slide1/hand.png`}
            alt="Pointing hand"
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* Gary’s Position */}
      {slideNumber !== 0 && (
        <div
          className={cn(
            slide.garyPosition,
            "z-100 select-none",
            isActive ? "animate-fade-in-1" : "opacity-0"
          )}
          style={
            isMobile
              ? {
                  top: "50%",
                  left: "35%",
                  width: "240px",
                  height: "240px",
                  transform: "translate(10%, 20%)",
                }
              : {}
          }
        >
          <Image
            src={`/images/story/slide${slideNumber}/gary.png`}
            fill
            alt="Gary"
            className="object-contain"
          />
        </div>
      )}

      {/* Story Background (Yellow Box) - Mobile Specific */}
      <div
        className={cn(
          slide.storyPosition,
          "hidden sm:block",
          "-z-10 select-none",
          isActive ? (slide.storySide !== "left" ? "animate-slide-in" : "animate-slide-in-left") : "opacity-0"
        )}
      > 
        <p
          className={cn(
            "z-10 text-xl font-bold",
            slideNumber === 4 ? "pl-16 pt-8" : "pb-20 pl-20 pr-16 pt-28"
          )}
        >
          {slide.story}
        </p>
        <Image
          src={`/images/story/slide${slideNumber}/text-bg.png`}
          fill
          alt="Story background"
          className="-z-10"
        />
      </div>

      {/* Mobile Yellow Box Always at Bottom */}
      {slideNumber !== 0 && (
        <div
          className={cn(
            "absolute bottom-0 left-0 w-full sm:hidden",
            isActive ? "animate-fade-in-2" : "opacity-0"
          )}
        >
          <div className="bg-[#FFDA96] h-[200px] border-t-8 border-b-8 border-black flex items-center justify-center">
            <p className="text-center text-2xl font-bold">{slide.story}</p>
          </div>
        </div>
      )}

      {/* Text Bubble */}
      {slide.text !== "" && (
      <div
        className={cn(
          slide.textPosition,
          "-z-10 select-none",
          isActive ? "animate-fade-in-2" : "opacity-0"
        )}
        style={
          isMobile
            ? {
                top: "250px", // Adjust top position for mobile
                left: "40%",  // Center horizontally
                maxWidth: "80%", // Resize for better fit on small screens
                transform: "translateX(-50%)", // Center horizontally with translate
              }
            : {}
        }
      >
        <p
          className={cn(
            "z-10 lg:py-20 py-10 text-center font-bold",
            slideNumber === 2 || (isMobile && slideNumber === 4)
              ? "text-base lg:text-2xl pl-10 lg:pr-20 pr-12"
              : "text-base lg:text-2xl lg:pl-20 pl-14 pr-10"
          )}
        >
          {slide.text}
        </p>
        <Image
          src={`/images/story/slide${isMobile && slideNumber === 4 ? 2 : slideNumber}/bubble.png`}
          fill
          alt="Text bubble"
          className="-z-10 object-contain"
        />
      </div>
    )}
    </CarouselItem>
  );
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
        <div className="absolute bottom-[230px] left-0 z-30 w-full sm:bottom-6">
          <div className="flex flex-row justify-center gap-4 py-2">
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
              );
            })}
          </div>
        </div>
      </Carousel>
    </>
  )
}