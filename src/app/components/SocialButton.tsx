"use client";

import { useState } from "react";
import { Mail, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/components/utils";
import { FaWhatsapp } from "react-icons/fa";

export default function SocialButton({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [, setActiveIndex] = useState<number | null>(null);

  const shareButtons = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/jmichaeljebaraj",
    },
    {
      icon: Github,
      label: "GitHub",
      url: "https://github.com/Michael-Jebaraj",
    },
    {
      icon: Mail,
      label: "Email",
      url: "mailto:michaeljebaraj29@gmail.com",
    },
    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      disabled: true,
    },
  ];

  const handleShare = (index: number) => {
    const selected = shareButtons[index];

    if (selected.disabled) {
      alert("WhatsApp contact coming soon!");
      return;
    }

    setActiveIndex(index);
    setTimeout(() => setActiveIndex(null), 300);

    window.open(selected.url, "_blank");
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{ opacity: isVisible ? 0 : 1 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <div
          className={cn(
            "cursor-pointer min-w-36 sm:min-w-40 text-center bg-black text-white px-4 py-2 rounded-[20px] border border-black/10 transition-colors duration-200",
            className
          )}
        >
          Contact Me
        </div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 flex items-center h-[44px] overflow-hidden rounded-[20px]"
        animate={{ width: isVisible ? "auto" : 0 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
      >
        {shareButtons.map((button, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={button.label}
            onClick={() => handleShare(i)}
            className={cn(
              "h-full w-10 flex items-center justify-center",
              "bg-black text-white",
              i === 0 && "rounded-l-[20px]",
              i === shareButtons.length - 1 && "rounded-r-[20px]",
              "border-r border-white/10 last:border-r-0",
              "hover:bg-gray-900 transition-colors duration-200"
            )}
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
          >
            <button.icon className="w-4 h-4" />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}