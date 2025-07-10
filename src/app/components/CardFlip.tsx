"use client";

import { cn } from "@/components/utils";
import { ArrowRight, Repeat2, ExternalLink } from "lucide-react";
import { useState } from "react";

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
  link?: string;
  type?: "project" | "certificate"; // differentiate button label
}

export default function CardFlip({
  title = "Project Title",
  subtitle = "Subtitle",
  description = "Description about the project or certificate.",
  features = ["Feature A", "Feature B", "Feature C"],
  link = "#",
  type = "project", // default to project
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const isProject = type === "project";
  const buttonLabel = isProject ? "View Site" : "View Certificate";

  return (
    <div
      className="relative w-full max-w-[280px] h-[320px] group [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative w-full h-full transition-all duration-700",
          "[transform-style:preserve-3d]",
          isFlipped ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
        )}
      >
        {/* Front Side */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-2xl overflow-hidden",
            "border border-zinc-200 dark:border-zinc-700 shadow-md",
            "[backface-visibility:hidden] bg-zinc-100 dark:bg-zinc-900"
          )}
        >
          <div className="flex flex-col justify-between h-full p-6">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1">{subtitle}</p>
            </div>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-sm text-orange-500 font-medium">Hover to view</span>
              <Repeat2 className="w-4 h-4 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full rounded-2xl overflow-hidden",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "p-6 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 flex flex-col justify-between"
          )}
        >
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-3">
              {description}
            </p>
            <ul className="text-sm text-zinc-700 dark:text-zinc-200 space-y-1">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 text-orange-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Button */}
          {link ? (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="mt-4 inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
  >
    {buttonLabel} <ExternalLink className="ml-2 w-4 h-4" />
  </a>
) : (
  <button
    onClick={() => {
  if (title === "Portfolio Website (Current)") {
    alert("You are already viewing this portfolio ✌️😎");
  } else if (title === "MentorSpark") {
    alert("I haven’t hosted it yet 😅");
  } else {
    alert("No link available.");
  }
}}

    className="mt-4 inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-orange-500 text-white text-sm font-medium hover:bg-orange-600 transition"
  >
    {buttonLabel} <ExternalLink className="ml-2 w-4 h-4" />
  </button>
)}

        </div>
      </div>
    </div>
  );
}
