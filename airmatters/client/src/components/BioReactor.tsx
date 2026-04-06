import { motion } from "framer-motion";
import { ArrowDown, Wind, Droplets } from "lucide-react";

const BioReactor = () => {
  const particleCount = 25; // Drifting algae cells
  const bubbleCount = 15;   // Rising air bubbles

  const particleVariants = {
    animate: (i: number) => ({
      opacity: [0.4, 0.8, 0.4],
      y: [Math.random() * 400, Math.random() * 400],
      x: [Math.random() * 160 - 80, Math.random() * 160 - 80],
      transition: {
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
        delay: i * 0.2,
      },
    }),
  };

  const bubbleVariants = {
    animate: (i: number) => ({
      y: [400, -20],
      opacity: [0, 1, 0],
      x: [Math.random() * 140 - 70, Math.random() * 140 - 70],
      transition: {
        duration: Math.random() * 3 + 4,
        repeat: Infinity,
        ease: "linear" as const,
        delay: i * 0.5,
      },
    }),
  };

  return (
    <section className="relative w-full flex justify-center items-center py-12 bg-transparent">
      <div className="relative w-48 h-80 md:w-64 md:h-[450px] flex justify-center items-center">
        
        {/* --- Cylinder Outer Frame (Glass) --- */}
        <div className="relative w-full h-full rounded-[3rem] border-2 border-border/30 overflow-hidden shadow-[0_20px_60px_-15px_rgba(126,37,13,0.15)] bg-gradient-to-b from-card/80 via-card/40 to-card/90 backdrop-blur-md">
          
          {/* Glass Refraction / Shine Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/5 pointer-events-none z-30" />
          <div className="absolute left-6 top-0 bottom-0 w-3 bg-white/20 blur-md z-30" />
          
          {/* Algae Water Base Layer - Thematic Green Tint */}
          <div className="absolute inset-0 bg-primary/[0.03] mix-blend-multiply z-10" />

          {/* Rising Bubbles */}
          {Array.from({ length: bubbleCount }).map((_, i) => (
            <motion.div
              key={`bubble-${i}`}
              className="absolute rounded-full bg-white/20 blur-[1px] z-20"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: "50%",
              }}
              variants={bubbleVariants}
              animate="animate"
              custom={i}
            />
          ))}

          {/* Drifting Algae Particles */}
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full will-change-transform z-20"
              style={{
                background: `rgba(86, 180, 82, ${Math.random() * 0.6 + 0.4})`,
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                boxShadow: "0 0 12px rgba(86, 180, 82, 0.5)",
                left: "50%",
              }}
              variants={particleVariants}
              animate="animate"
              custom={i}
            />
          ))}
        </div>

        {/* Cylinder Top Cap */}
        <div className="absolute -top-4 w-[105%] h-8 bg-zinc-800 rounded-full border-b-4 border-zinc-900 shadow-xl z-40 flex items-center justify-center">
           <div className="w-1/2 h-1 bg-primary/20 rounded-full animate-pulse" />
        </div>

        {/* Cylinder Bottom Base */}
        <div className="absolute -bottom-4 w-[110%] h-12 bg-zinc-900 rounded-full border-t-2 border-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-40 flex flex-col items-center justify-center">
           <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 animate-pulse" />
        </div>

        {/* Outer Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[80px] -z-10" />
      </div>
    </section>
  );
};

export default BioReactor;
