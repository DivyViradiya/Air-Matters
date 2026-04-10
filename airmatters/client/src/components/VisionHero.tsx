import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, ArrowRight, Zap, Target, Activity, ShieldCheck, Cpu } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import MicroalgaeGL from "@/components/3d/MicroalgaeGL";
import { cn } from "@/lib/utils";

export default function VisionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);
  
  const bgX = useTransform(smoothX, [-0.5, 0.5], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], ["-2%", "2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["-1%", "1%"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["-1%", "1%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-24 pb-12 px-4 md:px-8 min-h-[85vh] flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-background/50 -z-20" />
      
      {/* Main Hero Container - The "Expanding Card" style but fixed/interactive */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
        className="relative w-full max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto h-[75vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden shadow-[0_48px_96px_-16px_rgba(0,0,0,0.4)] border border-white/10 glass-card bg-card"
      >
        {/* Living Background (Shader) */}
        <motion.div 
          style={{ x: bgX, y: bgY, scale: 1.05 }}
          className="absolute inset-0 z-0"
        >
          <MicroalgaeGL />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          {/* Subtle Video Overlay for Texture */}
          <video 
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            src="/videos/Microalgae_Green_Pigmentation_Video_Generation.mp4"
          />
        </motion.div>

        {/* Technical HUD Overlay Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
          {/* Corner Markers */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/30 rounded-tl-xl" />
          <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-primary/30 rounded-tr-xl" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-primary/30 rounded-bl-xl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/30 rounded-br-xl" />

          {/* Top HUD: Status Bar */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-between items-start"
          >
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Vision_Protocol_v1.0
              </span>
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">System Architecture Alpha</span>
            </div>
            
            <div className="hidden lg:flex items-center gap-8">
              <div className="text-right">
                <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Carbon_Capture</div>
                <div className="text-xs font-bold text-white uppercase tracking-widest">98.4% Efficiency</div>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div className="text-right">
                <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Impact_Scale</div>
                <div className="text-xs font-bold text-white uppercase tracking-widest">20x vs Standard</div>
              </div>
            </div>
          </motion.div>

          {/* Bottom HUD: Live Metrics */}
          <div className="flex justify-between items-end">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.8, duration: 0.8 }}
               className="flex flex-col gap-6"
             >
               <div className="flex items-center gap-4 group cursor-default">
                 <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                   <Target className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Strategic_Goal</div>
                   <div className="text-xs font-bold text-white uppercase">Biospatial Dominance</div>
                 </div>
               </div>
               
               <div className="flex items-center gap-4 group cursor-default">
                 <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-colors">
                   <Activity className="w-5 h-5" />
                 </div>
                 <div>
                   <div className="text-[8px] font-black text-white/40 uppercase tracking-[0.2em]">Bio_Response</div>
                   <div className="text-xs font-bold text-white uppercase">Real-time Bio-Sync</div>
                 </div>
               </div>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1, duration: 1 }}
               className="hidden md:flex flex-col items-end gap-2"
             >
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                   <div className="flex items-center gap-3 mb-3">
                     <ShieldCheck className="w-4 h-4 text-primary" />
                     <span className="text-[8px] font-black text-white/60 uppercase tracking-widest">Verification Status</span>
                   </div>
                   <div className="flex gap-2">
                     <div className="w-1.5 h-3 rounded-full bg-primary" />
                     <div className="w-1.5 h-3 rounded-full bg-primary" />
                     <div className="w-1.5 h-3 rounded-full bg-primary" />
                     <div className="w-1.5 h-3 rounded-full bg-primary/30" />
                   </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        <motion.div 
          style={{ x: textX, y: textY }}
          className="relative z-20 h-full flex flex-col justify-center items-center text-center px-8 md:px-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <Sparkles className="w-4 h-4" />
            <span>The Future We're Building</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-6xl sm:text-8xl md:text-[8rem] 3xl:text-[10rem] font-bold tracking-tighter text-white mb-8 font-display leading-[0.85] uppercase"
          >
            Revolutionizing <br />
            <span className="premium-gradient-text italic">Urban Life.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg md:text-xl font-medium text-white/60 mb-12 leading-relaxed max-w-2xl text-center"
          >
            Our vision is to address air and water pollution simultaneously through a new, integrated biological infrastructure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 relative z-50 pointer-events-auto"
          >
            <Link href="/about">
              <Button size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.3em] rounded-full bg-primary hover:bg-primary/90 text-white shadow-2xl transition-all transform hover:-translate-y-1">
                Our Story
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" className="h-16 px-10 text-xs font-black uppercase tracking-[0.3em] rounded-full backdrop-blur-md bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all">
                The Science
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Subtle Scroll Hint */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">Scroll Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/40 to-transparent" />
      </motion.div>
    </section>
  );
}
