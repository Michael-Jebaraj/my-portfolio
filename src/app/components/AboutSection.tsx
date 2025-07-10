"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import clsx from "clsx";

const items = [
  {
    title: "About Me",
    content: "I'm a passionate developer who loves building full-stack apps.",
    position: "left",
  },
  {
    title: "Skills",
    content: "React, TypeScript, Node.js, MongoDB, Tailwind CSS, and more.",
    position: "right",
  },
  {
    title: "Journey",
    content: "Pursued B.Tech at Karunya University where I discovered my passion for full-stack development.",
    position: "left",
  },
] as const;

export default function AboutSection() {
  return (
    <section className="h-screen snap-start flex flex-col items-center justify-start bg-black pt-24 px-4 overflow-hidden">
      {/* Section Heading */}
      <h2 className="text-4xl font-bold text-white mb-8 md:mb-12 text-center">
        About Me
      </h2>

      <div className="flex w-full max-w-5xl relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-700 z-0" />

        <div className="w-full flex flex-col justify-around relative z-10">
          {items.map((item, index) => (
            <TimelineItem
              key={index}
              index={index}
              title={item.title}
              content={item.content}
              position={item.position}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  index,
  title,
  content,
  position,
}: {
  index: number;
  title: string;
  content: string;
  position: "left" | "right";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-25% 0px -25% 0px",
    once: false,
  });

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center min-h-[150px] md:min-h-[180px]"
    >
      {/* Dot */}
      <div
        className={clsx(
          "absolute left-1/2 transform -translate-x-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-white transition-colors duration-300 z-20",
          isInView ? "bg-orange-500" : "bg-gray-700"
        )}
      />
      {/* Content Box */}
      <div
        className={clsx(
          "absolute w-[calc(50%-30px)] md:w-[calc(50%-40px)] max-w-[300px] p-4 rounded-xl shadow-xl transition-all duration-500",
          isInView
            ? "opacity-100 translate-y-0 blur-0"
            : "opacity-0 translate-y-10 blur-sm",
          position === "left"
            ? "right-[55%] lg:right-[50%] mr-2 lg:mr-10 bg-zinc-800 text-left"
            : "left-[55%] lg:left-[50%] ml-2 lg:ml-10 bg-zinc-700 text-left"
        )}
      >
        <h3 className="text-base md:text-lg font-bold text-orange-500 mb-1">{title}</h3>
        <p className="text-gray-300 text-xs md:text-sm">{content}</p>
      </div>
    </div>
  );
}