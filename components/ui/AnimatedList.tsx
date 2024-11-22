"use client";

import { cn } from "@/lib/server/utils";
import { AnimatedList } from "@/components/magicui/animated-list";
import { notificationData } from "../achievementList";
import Image from 'next/image'
interface Item {
  name: string;
  description: string;
  icon: string;
  time: string;
}
const Notification = ({ name, description, icon, time }: Item) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          
        >
        <Image
        src={`/images/${icon}`}
        alt="icpc"
        height={400}
        width={300}
      />
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{name}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

interface AnimatedListDemoProps {
  className?: string;
  type?: 'gsoc' | 'lfx' | 'icpc' | 'sih';
  repeatCount?: number;
}

export function AnimatedListDemo({
  className,
  type = 'gsoc',
  repeatCount = 10,
}: AnimatedListDemoProps) {
  const selected = notificationData[type];
  
  const repeatedNotifications = Array.from(
    { length: repeatCount }, 
    () => selected
  ).flat();

  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg  bg-background md:shadow-xl",
        className,
      )}
    >
      <AnimatedList>
        {repeatedNotifications.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}