import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "wouter";
import { Box, Database, Radio, Cpu, FlaskConical, Dna, Zap, Wind, Maximize, ShieldCheck, Activity, ThermometerSun } from "lucide-react";
import { cn } from "@/lib/utils";
import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import FloatingParticles from "./FloatingParticles";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  // ... rest of the component
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  // --- DESKTOP ANIMATION MAPPINGS ---
  const cardWidth = useTransform(smoothProgress, [0, 0.45], ["45%", "94%"]);
  const cardHeight = useTransform(smoothProgress, [0, 0.45], ["50vh", "88vh"]);
  const cardRadius = useTransform(smoothProgress, [0, 0.45], ["40px", "64px"]);
  const cardZ = useTransform(smoothProgress, [0, 0.45], [0, 60]);
  
  const bgScale = useTransform(smoothProgress, [0, 1], [1.1, 1.4]);
  const bgOpacity = useTransform(smoothProgress, [0, 0.1, 0.8, 1], [0.5, 0.8, 0.8, 0.2]);
  const bgTextY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const bgTextOpacity = useTransform(smoothProgress, [0, 0.2, 0.5], [0.05, 0.08, 0]);

  const titleY = useTransform(smoothProgress, [0.15, 0.45], [120, -100]);
  const titleOpacity = useTransform(smoothProgress, [0.15, 0.4], [0, 1]);
  const titleScale = useTransform(smoothProgress, [0.15, 0.45], [0.85, 1]);

  const hud1Op = useTransform(smoothProgress, [0.25, 0.35], [0, 1]);
  const hud2Op = useTransform(smoothProgress, [0.35, 0.45], [0, 1]);
  const hud3Op = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
  const hud4Op = useTransform(smoothProgress, [0.55, 0.65], [0, 1]);

  const sectionScale = useTransform(smoothProgress, [0.85, 1], [1, 0.92]);
  const sectionOpacity = useTransform(smoothProgress, [0.85, 1], [1, 0]);

  // --- MOBILE EXPERIENCE ---
  if (isMobile) {
    // Professional Industrial Animation Mappings
    const imageScale = useTransform(smoothProgress, [0, 0.4], [1, 1.05]);
    const infoOpacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);
    const cardRevealOp = useTransform(smoothProgress, [0.2, 0.4], [0, 1]);
    
    return (
      <section ref={containerRef} className="relative h-[220vh] bg-background font-lexend overflow-visible transition-colors duration-500">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start pt-20 px-6 overflow-hidden">
          
          {/* Background Technical Grid */}
          <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none text-foreground" 
               style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          {/* Precision Specimen Frame */}
          <motion.div 
            style={{ scale: imageScale }}
            className="relative z-10 w-full max-h-[50vh] min-h-[300px] rounded-[2.5rem] overflow-hidden border border-border bg-card shadow-2xl"
          >
            <AspectRatio.Root ratio={4/5}>
              <video 
                autoPlay loop muted playsInline
                className="absolute inset-0 w-full h-full object-cover dark:mix-blend-normal mix-blend-multiply opacity-90 dark:opacity-100"
                src="/videos/GIF1.mp4"
              />
            </AspectRatio.Root>
            {/* Calibration Corner Markers */}
            <div className="absolute top-6 left-6 w-6 h-6 border-t border-l border-primary/40 pointer-events-none" />
            <div className="absolute top-6 right-6 w-6 h-6 border-t border-r border-primary/40 pointer-events-none" />
            <div className="absolute bottom-6 left-6 w-6 h-6 border-b border-l border-primary/40 pointer-events-none" />
            <div className="absolute bottom-6 right-6 w-6 h-6 border-b border-r border-primary/40 pointer-events-none" />
            
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Professional Heading Block */}
          <div className="relative z-10 mt-6 text-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-0"
            >
              <h1 className="text-5xl font-black uppercase tracking-tighter text-foreground leading-none">
                NATURE
              </h1>
              <h1 className="text-5xl font-black uppercase tracking-tighter premium-gradient-text italic leading-none">
                PERFECTED.
              </h1>
            </motion.div>

            {/* Dynamic Metric Card */}
            <motion.div 
              style={{ opacity: infoOpacity }}
              className="mt-6 border border-border rounded-[1.25rem] overflow-hidden bg-card/50 backdrop-blur-md shadow-sm"
            >
              <div className="grid grid-cols-2 divide-x divide-border">
                <div className="p-5 text-left flex flex-col justify-center">
                  <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2">Oxygen Output</div>
                  <div className="text-3xl font-black text-foreground tabular-nums flex items-baseline gap-1">
                    1.6L <span className="text-[10px] font-bold text-muted-foreground tracking-widest">/DAY</span>
                  </div>
                </div>
                <div className="p-5 text-left flex flex-col justify-center pl-6">
                  <div className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-2">CO2 Sequestration</div>
                  <div className="text-3xl font-black text-foreground tabular-nums flex items-baseline gap-1">
                    3.0G <span className="text-[10px] font-bold text-muted-foreground tracking-widest">/DAY</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Deploy Button */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4"
            >
              <Link href="/products">
                <button className="w-full py-[1.125rem] bg-foreground text-background rounded-[1.25rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                  Deploy Bio-Filter
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </button>
              </Link>
            </motion.div>

            {/* Feature Cards Reveal */}
            <motion.div 
              style={{ opacity: cardRevealOp }}
              className="mt-6 grid grid-cols-2 gap-3 pb-12"
            >
              {[
                { label: "Bio-Active", icon: Wind, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20", desc: "VOC & PM2.5 elimination" },
                { label: "AI Sync", icon: Activity, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20", desc: "Real-time bio-monitoring" }
              ].map((card, i) => (
                <div key={i} className="bg-card border border-border p-3.5 rounded-[1.25rem] flex flex-col items-center text-center gap-3 shadow-sm h-full">
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border", card.bg, card.border)}>
                    <card.icon className={cn("w-5 h-5", card.color)} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[8px] font-black text-foreground uppercase tracking-widest">{card.label}</div>
                    <p className="text-[9px] text-muted-foreground leading-tight font-medium line-clamp-2">{card.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-10 right-10 flex flex-col items-center gap-2">
            <div className="w-12 h-[2px] bg-foreground/5 relative overflow-hidden">
              <motion.div 
                style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                className="absolute inset-0 bg-primary h-full"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // --- DESKTOP EXPERIENCE (Original) ---
  return (
    <section 
      ref={containerRef} 
      className="relative h-[400vh] bg-background overflow-visible transition-colors duration-700"
    >
      <motion.div 
        style={{ scale: sectionScale, opacity: sectionOpacity }}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-20"
      >
        {/* --- DYNAMIC BACKGROUND LAYERS --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <FloatingParticles className="opacity-20 dark:opacity-40" />
          
          <motion.div 
            style={{ y: bgTextY, opacity: bgTextOpacity }}
            className="absolute inset-0 flex items-center justify-center select-none"
          >
            <h1 className="text-[30vw] font-black uppercase tracking-tighter text-foreground leading-none">
              OXYGEN
            </h1>
          </motion.div>

          <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-primary/5 dark:bg-primary/10 blur-[120px] rounded-full animate-blob" />
          <div className="absolute bottom-1/4 -right-1/4 w-[50%] h-[50%] bg-[#0EA5E9]/5 blur-[100px] rounded-full animate-blob [animation-delay:2s]" />
          
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
            style={{ 
              backgroundImage: `linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} 
          />
        </div>

        {/* --- MAIN HERO WINDOW --- */}
        <motion.div 
          style={{ 
            width: cardWidth, 
            height: cardHeight, 
            borderRadius: cardRadius,
            z: cardZ
          }}
          className="relative z-10 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] bg-card border border-border/10 group"
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              style={{ scale: bgScale, opacity: bgOpacity }}
              className="absolute inset-0 w-full h-full"
            >
              <video 
                autoPlay loop muted playsInline
                className="w-full h-full object-cover mix-blend-luminosity dark:mix-blend-normal"
                src="/videos/GIF1.mp4"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/40" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40" />
            </motion.div>

            {/* --- HUD OVERLAYS (DATA DRIVEN) --- */}
            
            {/* Left Column: Technical Specs */}
            <motion.div 
              style={{ opacity: hud1Op }}
              className="absolute left-10 top-1/2 -translate-y-1/2 space-y-10 hidden lg:block"
            >
              <div className="space-y-2">
                <div className="text-[9px] font-black text-primary/70 uppercase tracking-[0.4em]">Oxygen_Generation</div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-foreground/80 font-bold uppercase tracking-widest">1.6L / DAY</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-[9px] font-black text-[#0EA5E9]/70 uppercase tracking-[0.4em]">CO2_Sequestration</div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-foreground/80 font-bold uppercase tracking-widest">3G / DAY</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: AI & Tech */}
            <motion.div 
              style={{ opacity: hud2Op }}
              className="absolute right-10 top-1/2 -translate-y-1/2 space-y-6 hidden lg:block text-right"
            >
              <div className="flex items-center gap-4 justify-end opacity-60">
                <div className="text-right">
                  <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-1">Intelligence</div>
                  <div className="text-[10px] font-bold text-foreground uppercase">AI Assisted Monitoring</div>
                </div>
                <Activity className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-center gap-4 justify-end opacity-60">
                <div className="text-right">
                  <div className="text-[8px] font-mono text-muted-foreground uppercase tracking-widest leading-none mb-1">Purification</div>
                  <div className="text-[10px] font-bold text-foreground uppercase">Advanced Ionizing</div>
                </div>
                <Zap className="w-4 h-4 text-[#0EA5E9]" />
              </div>
            </motion.div>

            {/* Center: Main Descriptive Reveal */}
            <motion.div 
              style={{ y: titleY, opacity: titleOpacity, scale: titleScale }}
              className="flex flex-col items-center text-center space-y-6 px-6 relative z-20 font-lexend"
            >
              <div className="flex items-center gap-6">
                <div className="h-px w-12 bg-primary/30" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Advanced Bio-Tech</span>
                <div className="h-px w-12 bg-primary/30" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground drop-shadow-sm">
                Nature <br /> 
                <span className="premium-gradient-text italic">Perfected.</span>
              </h1>
              
              <p className="max-w-xl text-sm md:text-lg text-muted-foreground font-medium leading-relaxed tracking-tight opacity-90">
                Our entry-level bioreactor utilizes a proprietary blend of microalgae strains to silently strip CO<sub>2</sub> and particulates, releasing fresh, clinical-grade oxygen.
              </p>
            </motion.div>

            {/* Sticky Bottom Button */}
            <motion.div 
              style={{ opacity: titleOpacity }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 pointer-events-auto"
            >
              <Link href="/products">
                <div className="group relative cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#0EA5E9] rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
                  <button className="relative px-10 py-5 bg-foreground text-background rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">
                    Deploy Bio-Filter
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  </button>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Corner HUD Indicators */}
          <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-end">
            <div className="flex justify-between items-end">
              <motion.div style={{ opacity: hud4Op }} className="hidden sm:flex glass-card border px-5 py-3 rounded-2xl items-center gap-4 bg-background/20">
                <Maximize className="w-5 h-5 text-[#0EA5E9]" />
                <div className="text-left">
                  <div className="text-[9px] font-black text-muted-foreground leading-none mb-1.5 uppercase tracking-widest">Form_Factor</div>
                  <div className="text-[11px] font-black text-foreground leading-none tracking-tight uppercase">12" x 12" x 24"</div>
                </div>
              </motion.div>

              {/* Consolidated Protocol & Specs Card */}
              <motion.div style={{ opacity: hud4Op }} className="glass-card border-2 border-primary/20 p-6 rounded-3xl min-w-[260px] bg-background/40 backdrop-blur-2xl shadow-2xl pointer-events-auto">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1.5">System_Status</div>
                    <div className="text-[10px] font-black text-foreground uppercase">Bio-Protocol v4</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="text-[7px] font-black text-muted-foreground uppercase tracking-[0.2em]">Maintenance</div>
                      <div className="text-[10px] font-bold text-primary font-mono uppercase">30 Days</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[7px] font-black text-muted-foreground uppercase tracking-[0.2em]">Acoustics</div>
                      <div className="text-[10px] font-bold text-foreground font-mono uppercase">20dB Silent</div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-foreground/5" />

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <div className="text-[7px] font-black text-muted-foreground uppercase tracking-[0.2em]">Coverage</div>
                      <div className="text-[10px] font-bold text-foreground font-mono uppercase">500 SQ FT</div>
                    </div>
                    <div className="space-y-1 text-right">
                      <div className="text-[7px] font-black text-muted-foreground uppercase tracking-[0.2em]">Peak_Power</div>
                      <div className="text-[10px] font-bold text-foreground font-mono uppercase">12W LED</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* --- SCROLL PROGRESS LINE --- */}
        <div className="absolute bottom-10 left-10 right-10 flex flex-col items-center gap-4">
          <div className="w-full max-w-[200px] h-px bg-foreground/10 relative overflow-hidden">
            <motion.div 
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-primary h-full"
            />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">System Sequence Progress</span>
        </div>

      </motion.div>
    </section>
  );
}
