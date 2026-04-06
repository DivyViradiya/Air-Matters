import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

interface SpecimenLensProps {
  image: string;
  label: string;
  className?: string;
  scrollProgress: any;
  range: [number, number];
  parallax: number;
}

export default function SpecimenLens({ image, label, className, scrollProgress, range, parallax }: SpecimenLensProps) {
  const y = useTransform(scrollProgress, range, [0, parallax]);
  const scale = useTransform(scrollProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const opacity = useTransform(scrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      style={{ y, scale, opacity }}
      className={`absolute z-30 ${className}`}
    >
      <div className="relative group">
        {/* The Lens */}
        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-2 border-primary/40 overflow-hidden shadow-[0_20px_50px_rgba(86,180,82,0.3)] bg-black relative">
          <img 
            src={image} 
            alt={label} 
            className="w-full h-full object-cover scale-150 group-hover:scale-125 transition-transform duration-[2s] ease-out"
          />
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] mix-blend-overlay" />
          
          {/* Scanning Line inside lens */}
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-primary/40 z-10"
          />
        </div>

        {/* Technical Label */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-primary/20 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">{label}</span>
          </div>
        </div>

        {/* Connector Line (Decorative) */}
        <div className="absolute top-1/2 left-full w-12 h-px bg-primary/20 -translate-y-1/2 origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
      </div>
    </motion.div>
  );
}
