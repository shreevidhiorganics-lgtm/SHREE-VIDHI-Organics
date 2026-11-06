"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function AmbientGlow() {
  const [mounted, setMounted] = useState(false);

  const springConfig = { damping: 28, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed pointer-events-none z-10 rounded-full blur-[80px] opacity-40 transition-opacity duration-700 hidden md:block"
      style={{
        left: mouseX,
        top: mouseY,
        width: 320,
        height: 320,
        transform: "translate(-50%, -50%)",
        background: "radial-gradient(circle, rgba(24, 35, 28, 0.16) 0%, rgba(197, 168, 114, 0.18) 45%, transparent 70%)",
      }}
    />
  );
}
