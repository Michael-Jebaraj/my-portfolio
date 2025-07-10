"use client";

import { useEffect, useState } from "react";
import ShimmerText from "./ShimmerText";
import TypewriterTitle from "./TypewriterTitle";
import SocialButton from "./SocialButton";
import StarBorder from "@/components/StarBorder";
import FadeInOnScroll from "./FadeInOnScroll";
import AboutSection from "./AboutSection";
import ProjectsSection from "./ProjectsSection";
import { FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactSection from "./ContactSection";

const techSequences = [
  { text: "| React |", deleteAfter: true, pauseAfter: 900 },
  { text: "| JavaScript |", deleteAfter: true, pauseAfter: 900 },
  { text: "| TypeScript |", deleteAfter: true, pauseAfter: 900 },
  { text: "| Full Stack Developer |", deleteAfter: false, pauseAfter: 1800 },
];

export default function HomeSection() {
  const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialAnimationComplete(true);
    }, 1500); // Adjust timing as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll scroll-smooth snap-y snap-mandatory bg-black text-white">
      {/* Hero Section */}
      <section className="snap-start min-h-screen flex flex-col justify-center items-center px-4 relative">
        <div className="absolute top-5 right-5 md:right-8 z-20">
          <StarBorder
            as="a"
            href="https://drive.google.com/file/d/1q_nmBqWdtrUI6HwhJTMXkLRozOyeR5eS/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            color="cyan"
            speed="4s"
          >
            <FileText className="inline w-5 h-5 mr-2" />
            Resume
          </StarBorder>
        </div>

        <AnimatePresence>
  {!initialAnimationComplete ? (
    <motion.div
      key="initial-name"
      initial={{ opacity: 0, scale: 1, y: 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ y: -160, scale: 0.7, opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
    >
      <ShimmerText
        text="J Michael Jebaraj"
        className="text-[28px] xs:text-[36px] sm:text-[50px] md:text-[70px] font-bold text-center"
      />
    </motion.div>
  ) : (
    <motion.div
      key="final-name"
      initial={{ opacity: 0, y: 100, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center justify-center flex-1 gap-[6px] leading-tight text-center px-4"
    >
      <ShimmerText
        text="J Michael Jebaraj"
        className="text-[28px] xs:text-[36px] sm:text-[50px] md:text-[70px] font-bold text-center"
      />
      <ShimmerText
        text="Portfolio"
        className="text-[18px] xs:text-[24px] sm:text-[32px] md:text-[42px] tracking-wider text-gray-300"
      />
      <div className="text-[12px] xs:text-[14px] sm:text-[16px] md:text-[18px] text-gray-400 font-medium min-h-[24px]">
        <TypewriterTitle
          sequences={techSequences}
          typingSpeed={60}
          startDelay={500}
          autoLoop={true}
          loopDelay={1000}
        />
      </div>
      <div className="mt-6 sm:mt-8">
        <StarBorder color="lime" speed="6s">
          <SocialButton />
        </StarBorder>
      </div>
    </motion.div>
  )}
</AnimatePresence>


      </section>

      <div className="h-[2px] w-[90%] mx-auto bg-zinc-400 opacity-60 my-2 rounded-full" />
      
      {/* About Section */}
      <section id="about" className="snap-start min-h-screen w-full">
        <FadeInOnScroll>
          <AboutSection />
        </FadeInOnScroll>
      </section>
      
      <div className="h-[2px] w-[90%] mx-auto bg-zinc-400 opacity-60 my-2 rounded-full" />
      
      {/* Projects Section */}
      <section id="projects" className="snap-start min-h-screen w-full">
        <FadeInOnScroll>
          <ProjectsSection />
        </FadeInOnScroll>
      </section>
      <div className="h-[2px] w-[90%] mx-auto bg-zinc-400 opacity-60 my-2 rounded-full" />
      <section id="contact" className="snap-start min-h-screen w-full">
  <FadeInOnScroll>
    <ContactSection />
  </FadeInOnScroll>
</section>

    </main>
  );
}