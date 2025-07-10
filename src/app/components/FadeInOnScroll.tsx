"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInOnScroll({ children, className = "" }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.4 },
      });
    } else {
      controls.start({
        opacity: 0,
        filter: "blur(6px)",
        transition: { duration: 0.2 },
      });
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, filter: "blur(6px)" }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}
