"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/components/utils"; // make sure this is a working util or replace with clsx

interface TabItem {
  id: string;
  title: string;
  color: string;
  cardContent: React.ReactNode;
}

const WaveformPath = () => (
  <motion.path
    d="M0 50 C 20 40, 40 30, 60 50 C 80 70, 100 60, 120 50 C 140 40, 160 30, 180 50 C 200 70, 220 60, 240 50 C 260 40, 280 30, 300 50 C 320 70, 340 60, 360 50 C 380 40, 400 30, 420 50 L 420 100 L 0 100 Z"
    initial={false}
    animate={{
      x: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Infinity,
      },
    }}
  />
);

const TABS: TabItem[] = [
  {
    id: "Projects",
    title: "Projects",
    color: "bg-blue-500 hover:bg-blue-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 420 100" preserveAspectRatio="none">
            <motion.g className="fill-blue-500 stroke-blue-500" style={{ strokeWidth: 1 }} animate={{ opacity: 0.15 }}>
              <WaveformPath />
            </motion.g>
            <motion.g className="fill-blue-500 stroke-blue-500" style={{ strokeWidth: 1, transform: "translateY(10px)" }} animate={{ opacity: 0.1 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-6 relative z-10 text-white space-y-2">
          <h3 className="text-2xl font-bold">Projects</h3>
          <p className="text-sm text-white/70">Explore my latest web development projects.</p>
        </div>
      </div>
    ),
  },
  {
    id: "Certificates",
    title: "Certificates",
    color: "bg-emerald-500 hover:bg-emerald-600",
    cardContent: (
      <div className="relative h-full">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 420 100" preserveAspectRatio="none">
            <motion.g className="fill-emerald-500 stroke-emerald-500" style={{ strokeWidth: 1 }} animate={{ opacity: 0.15 }}>
              <WaveformPath />
            </motion.g>
            <motion.g className="fill-emerald-500 stroke-emerald-500" style={{ strokeWidth: 1, transform: "translateY(10px)" }} animate={{ opacity: 0.1 }}>
              <WaveformPath />
            </motion.g>
          </svg>
        </div>
        <div className="p-6 relative z-10 text-white space-y-2">
          <h3 className="text-2xl font-bold">Certificates</h3>
          <p className="text-sm text-white/70">Browse through my professional certifications.</p>
        </div>
      </div>
    ),
  },
];

export default function SmoothTab() {
  const [selected, setSelected] = React.useState<string>(TABS[0].id);
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });
  const buttonRefs = React.useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;
      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };
    requestAnimationFrame(() => updateDimensions());
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = TABS.findIndex((item) => item.id === selected);
    const newIndex = TABS.findIndex((item) => item.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
  };

  const selectedItem = TABS.find((item) => item.id === selected);

  return (
    <div className="flex flex-col h-full w-full max-w-lg mx-auto">
      {/* Tabs on top */}
      <div
        ref={containerRef}
        className="relative flex justify-between gap-1 bg-background border rounded-xl py-1 px-1 mb-6"
      >
        <motion.div
          className={cn("absolute rounded-lg z-[1]", selectedItem?.color)}
          animate={{
            width: dimensions.width - 8,
            x: dimensions.left + 4,
            opacity: 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          style={{ height: "calc(100% - 8px)", top: "4px" }}
        />
        <div className="flex w-full z-10 gap-1">
          {TABS.map((tab) => {
            const isSelected = tab.id === selected;
            return (
              <button
                key={tab.id}
                ref={(el: HTMLButtonElement | null) => {
  if (el) buttonRefs.current.set(tab.id, el);
}}

                onClick={() => handleTabClick(tab.id)}
                className={cn(
                  "flex-1 text-center py-2 px-4 rounded-lg text-sm font-medium transition-all",
                  isSelected
                    ? "text-white"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Card content below */}
      <div className="relative h-60 rounded-xl overflow-hidden border bg-card">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={selectedItem?.id}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                x: d > 0 ? "100%" : "-100%",
                opacity: 0,
                filter: "blur(8px)",
                scale: 0.95,
                position: "absolute",
              }),
              center: {
                x: 0,
                opacity: 1,
                filter: "blur(0)",
                scale: 1,
                position: "absolute",
              },
              exit: (d: number) => ({
                x: d < 0 ? "100%" : "-100%",
                opacity: 0,
                filter: "blur(8px)",
                scale: 0.95,
                position: "absolute",
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full"
          >
            {selectedItem?.cardContent}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
