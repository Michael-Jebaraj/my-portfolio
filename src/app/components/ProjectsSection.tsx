"use client";

import { useState, useRef } from "react";
import CardFlip from "./CardFlip";
import FadeInOnScroll from "./FadeInOnScroll";
import { motion, useInView } from "framer-motion";

export default function ProjectsSection() {
  const [selectedTab, setSelectedTab] = useState<"projects" | "certificates">("projects");

  const animationRef = useRef(null);
  const isInView = useInView(animationRef, { once: true, amount: 0.3 });

  const projectCards = [
    {
      title: "Old Portfolio",
      subtitle: "React + Tailwind",
      description:
        "This is my personal portfolio website\nBuilt using React\nHighlights the projects I’ve worked on\nShowcases the skills I’ve developed\nDesigned to give a clear and simple overview of what I can do",
      features: ["React", "CSS"],
      link: "https://full-stack-portfolio-wsmt.onrender.com/",
    },
    {
      title: "Portfolio Website (Current)",
      subtitle: "Next.js + Tailwind",
      description:
        "You're currently viewing this live portfolio. Built using Next.js, Tailwind, and Framer Motion and first scrollable website made by me.",
      features: ["Next.js", "Tailwind", "Framer Motion"],
      link: "",
    },
    {
      title: "MentorSpark",
      subtitle: "Internship Project",
      description: "Mentorship platform built during internship.",
      features: ["React", "Node.js", "MongoDB", "Team Collaboration"],
      link: "",
    },
    {
      title: "FitnessLibrary",
      subtitle: "Full-Stack Fitness App",
      description: "Personalized workouts and progress tracking.",
      features: ["React", "MongoDB", "Express.js", "Node.js"],
      link: "https://fitnesslibrary-1.onrender.com/",
    },
  ];

  const certificateCards = [
  {
    title: "Meta Android Developer",
    subtitle: "Meta Professional Certificate",
    description:
      "Completed Meta’s Android Developer Certificate. Learned Android frameworks, built apps, and published to Google Play Store.",
    features: ["Android", "Kotlin", "App Deployment"],
    link: "https://drive.google.com/file/d/1TD-3McQxokgF1vpCDwO-S0rBovILiQs9/view?usp=sharing",
  },
  {
    title: "Introduction to Packet Tracer",
    subtitle: "Cisco Networking Academy",
    description:
      "Gained hands-on experience with Cisco Packet Tracer to simulate and design networks.",
    features: ["Networking", "Simulation", "Cisco"],
    link: "https://drive.google.com/file/d/1vF0VE_8VzMUy0KxWjGHfo3-jdZoy4TuK/view?usp=sharing",
  },
  {
    title: "Cloud Security",
    subtitle: "Cisco Networking Academy",
    description:
      "Studied cloud infrastructure security, identity protection, and secure architecture.",
    features: ["Cloud Security", "Cybersecurity", "Cisco"],
    link: "https://drive.google.com/file/d/1yhyiWTCMaDg4yaJHjC-Zm5FP9485iqHV/view?usp=sharing", 
  },
  {
    title: "Generative AI Career Essentials",
    subtitle: "Microsoft & LinkedIn Learning",
    description:
      "Covered AI ethics, generative models, and use of AI tools across industries.",
    features: ["AI Ethics", "Generative AI", "Microsoft"],
    link: "https://drive.google.com/file/d/1LT7uLFciLdOn5y1GrYW9pEQPTK8PHMvF/view?usp=sharing",
  },
  {
    title: "Responsive Web Design",
    subtitle: "FreeCodeCamp",
    description:
      "Learned modern web design using HTML, CSS, Flexbox, and Grid through hands-on challenges.",
    features: ["HTML", "CSS", "Responsive Design"],
    link: "https://drive.google.com/file/d/1kr8M3keMxrXIMOS6-H-0edq4IUnXo5vE/view", 
  },
  {
    title: "Azure AI Fundamentals",
    subtitle: "Microsoft Certified",
    description:
      "Certified in Azure AI fundamentals including ML concepts, cognitive services, and responsible AI.",
    features: ["Azure", "AI Concepts", "Microsoft Certification"],
    link: "https://drive.google.com/file/d/1mSGrV8OvPiLOjFRIE-mbtHZlZ3HbyRZp/view", 
  },
  {
  title: "Technical English for Engineers",
  subtitle: "NPTEL Certification",
  description:
    "Completed NPTEL’s course on Technical English, enhancing professional communication..",
  features: ["Technical Writing", "Professional Communication", "NPTEL"],
  link: "https://drive.google.com/file/d/19z_cA9-2okblXlv3G9Qy62DOksiOO4_2/view", 
}
];


  const currentCards = selectedTab === "projects" ? projectCards : certificateCards;

  return (
    <section className="min-h-screen bg-black text-white py-20">
      <FadeInOnScroll>
        <h2 className="text-4xl font-bold text-center mb-10">Explore</h2>

        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setSelectedTab("projects")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedTab === "projects"
                ? "bg-orange-500 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setSelectedTab("certificates")}
            className={`px-6 py-2 rounded-full font-medium transition ${
              selectedTab === "certificates"
                ? "bg-orange-500 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
          >
            Certificates
          </button>
        </div>

        {/* Animate entire grid once on scroll only */}
        <motion.div
          ref={animationRef}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {currentCards.map((card, index) => (
            <div
              key={index}
              className="w-full max-w-[280px] h-[320px]"
            >
              <CardFlip
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                features={card.features}
                link={card.link}
                type={selectedTab === "projects" ? "project" : "certificate"}
              />
            </div>
          ))}
        </motion.div>
      </FadeInOnScroll>
    </section>
  );
}
