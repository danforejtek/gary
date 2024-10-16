"use client";

import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const CountdownTimer = ({ className }: { className?: string }) => {
  const t = useTranslations("GARA.garaDepo.timer");
  // Set the target date/time
  const targetDate = new Date("2024-10-27T23:59").getTime();

  // State to hold remaining time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Function to calculate the time difference
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => calculateTimeLeft(), 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, []);

  return (
    <div className={cn("flex items-center justify-start space-x-2", className)}>
      {/* Days */}
      <div className="flex w-[74px] flex-col items-center rounded-xl p-2 font-heading shadow-md md:min-w-[80px] bg-gary-blue">
        <div className="text-2xl font-bold text-white md:text-3xl">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-sm font-bold text-white">{t("day")}</div>
      </div>

      {/* Hours */}
      <div className="pb-8 text-2xl font-bold text-primary md:text-3xl">:</div>

      <div className="flex w-[74px] flex-col items-center rounded-xl p-2 font-heading shadow-md md:min-w-[80px] bg-gary-blue">
        <div className="text-2xl font-bold text-white md:text-3xl">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-sm font-bold text-white">{t("hours")}</div>
      </div>

      {/* Minutes */}
      <div className="pb-8 text-2xl font-bold text-primary md:text-3xl">:</div>

      <div className="flex w-[74px] flex-col items-center rounded-xl p-2 font-heading shadow-md md:min-w-[80px] bg-gary-blue">
        <div className="text-2xl font-bold text-white md:text-3xl">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-sm font-bold text-white">{t("minutes")}</div>
      </div>

      {/* Seconds */}
      <div className="pb-8 text-2xl font-bold text-primary md:text-3xl">:</div>

      <div className="flex w-[74px] flex-col items-center rounded-xl p-2 font-heading shadow-md md:min-w-[80px] bg-gary-blue">
        <div className="text-2xl font-bold text-white md:text-3xl">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-sm font-bold text-white">{t("seconds")}</div>
      </div>
    </div>
  );
};

export default CountdownTimer;
