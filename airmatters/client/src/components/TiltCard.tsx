import { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxDeg?: number;
}

/**
 * TiltCard — CSS 3D perspective tilt that follows the cursor, with a specular shine overlay.
 * Uses framer-motion useSpring for smooth tracking and spring-back on mouse leave.
 * No Three.js required — pure CSS transform.
 */
export default function TiltCard({ children, className = "", maxDeg = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rotateX = useSpring(0, { stiffness: 280, damping: 30, mass: 0.5 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 30, mass: 0.5 });

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Normalize to -1 → +1 relative to card center
    const nx = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
    const ny = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
    rotateY.set( nx * maxDeg);
    rotateX.set(-ny * maxDeg);
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width)  * 100,
      y: ((e.clientY - rect.top)  / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setMousePos({ x: 50, y: 50 });
  };

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={`relative ${className}`}
    >
      {children}

      {/* Specular shine overlay — follows cursor position */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-200"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(125, 216, 122, 0.07) 0%, transparent 65%)`,
          zIndex: 10,
        }}
      />
    </motion.div>
  );
}
