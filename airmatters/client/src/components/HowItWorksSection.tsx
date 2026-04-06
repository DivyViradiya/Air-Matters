import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValueEvent } from "framer-motion";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  {
    id: "stage-1",
    title: "CO2 Sequestration",
    subtitle: "PHASE_01 // INTAKE",
    description: "Multi-vortex induction system accelerates ambient air into the primary bio-chamber. Microalgae colonies initiate metabolic carbon-stripping at the molecular level.",
    data: [
      { label: "Intake Velocity", value: "8.4 m/s" },
      { label: "CO2 PPM Delta", value: "-420ppm" }
    ],
    targetY: "80%",
    color: "#10B981"
  },
  {
    id: "stage-2",
    title: "Pathogen Defense",
    subtitle: "PHASE_02 // NEUTRALIZE",
    description: "Biological scrubbing agents and proprietary protein-binding layers trap and neutralize 99.98% of PM2.5, VOCs, and airborne viral structures.",
    data: [
      { label: "Bio-Filtration", value: "99.98%" },
      { label: "Active Nodes", value: "1,240/cm²" }
    ],
    targetY: "50%",
    color: "#0EA5E9"
  },
  {
    id: "stage-3",
    title: "Oxygen Restoration",
    subtitle: "PHASE_03 // SATURATE",
    description: "Through hyper-optimized photosynthesis, clinical-grade O2 is pressurized and released, creating a biological 'purity bubble' in the surrounding space.",
    data: [
      { label: "O2 Purity", value: "99.8%" },
      { label: "Saturation Radius", value: "15m" }
    ],
    targetY: "20%",
    color: "#10B981"
  }
];

const TechnicalLabel = ({ title, subtitle, description, data, color, isActive }: any) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : -30 }}
    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    className="relative pl-8 md:pl-12 border-l-2 border-primary/20 space-y-8 py-4 w-full"
  >
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ color }} />
        <span className="font-mono text-[10px] font-black tracking-[0.4em] uppercase" style={{ color }}>{subtitle}</span>
      </div>
      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9] break-words">
        {title.split(' ')[0]} <br />
        <span className="premium-gradient-text italic">{title.split(' ')[1]}</span>
      </h3>
    </div>
    
    <p className="text-base text-muted-foreground font-medium leading-relaxed max-w-sm">
      {description}
    </p>

    <div className="grid grid-cols-2 gap-8 pt-6 border-t border-border/10">
      {data.map((item: any, i: number) => (
        <div key={i} className="space-y-1">
          <div className="text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">{item.label}</div>
          <div className="text-sm font-mono font-bold text-foreground uppercase tracking-tight">{item.value}</div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SchematicCallout = ({ x, y, label, sublabel, isActive, side = "left" }: any) => (
  <motion.g animate={{ opacity: isActive ? 1 : 0.2 }} className="transition-opacity duration-500">
    <line 
      x1={side === "left" ? x - 60 : x + 60} 
      y1={y} 
      x2={x} 
      y2={y} 
      className={cn("stroke-current", isActive ? "text-primary" : "text-muted-foreground/30")} 
      strokeWidth="1" 
    />
    <path 
      d={side === "left" 
        ? `M ${x-60} ${y-15} L ${x-70} ${y-15} L ${x-70} ${y+15} L ${x-60} ${y+15}`
        : `M ${x+60} ${y-15} L ${x+70} ${y-15} L ${x+70} ${y+15} L ${x+60} ${y+15}`
      }
      className={cn("fill-none stroke-current", isActive ? "text-primary" : "text-muted-foreground/20")}
      strokeWidth="1"
    />
    <text 
      x={side === "left" ? x - 80 : x + 80} 
      y={y - 5} 
      textAnchor={side === "left" ? "end" : "start"}
      className={cn("font-mono text-[8px] font-black uppercase tracking-widest", isActive ? "fill-foreground" : "fill-muted-foreground/30")}
    >
      {label}
    </text>
    <text 
      x={side === "left" ? x - 80 : x + 80} 
      y={y + 10} 
      textAnchor={side === "left" ? "end" : "start"}
      className={cn("font-mono text-[6px] font-bold uppercase tracking-[0.2em]", isActive ? "fill-primary" : "fill-muted-foreground/20")}
    >
      {sublabel}
    </text>
  </motion.g>
);

const ReactorSchematic = ({ stage }: { stage: number }) => {
  return (
    <div className="relative w-full h-[650px] flex items-center justify-center">
      <motion.div 
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          scale: [1, 1.05, 1],
          backgroundColor: stage === 2 ? "#0EA5E9" : "#10B981"
        }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute w-[600px] h-[600px] rounded-full blur-[160px] pointer-events-none"
      />

      <div className="relative z-10 w-full h-full max-w-[550px]">
        <svg viewBox="0 0 500 650" className="w-full h-full drop-shadow-[0_0_30px_rgba(0,0,0,0.15)] overflow-visible">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-foreground/5" />
            </pattern>
          </defs>

          {/* Main Reactor Body shifted left */}
          <rect x="120" y="50" width="300" height="550" rx="24" className="fill-card/40 stroke-border/40" strokeWidth="2" />
          <rect x="125" y="55" width="290" height="540" rx="20" className="fill-none stroke-foreground/5" strokeWidth="1" />
          
          {/* Phase 1: Intake (Bottom) */}
          <g transform="translate(135, 450)">
            <rect width="270" height="130" rx="16" className="fill-emerald-500/5 stroke-emerald-500/10" strokeWidth="1" />
            <motion.path 
              d="M 90 65 Q 135 20 180 65 Q 135 110 90 65" 
              className="fill-none stroke-emerald-500/20" 
              strokeWidth="1"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "135px 65px" }}
            />
            <circle cx="135" cy="65" r="4" className="fill-emerald-500/40" />
            {stage === 1 && (
              <motion.line
                x1="10" x2="260"
                animate={{ y: [10, 120, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="stroke-primary/40"
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />
            )}
          </g>

          {/* Phase 2: Scrubbing (Middle) */}
          <g transform="translate(135, 260)">
            <rect width="270" height="130" rx="16" className="fill-sky-500/5 stroke-sky-500/10" strokeWidth="1" />
            {[...Array(5)].map((_, i) => (
              <line key={i} x1="20" y1={30 + i*18} x2="250" y2={30 + i*18} className="stroke-sky-500/10" strokeWidth="1" />
            ))}
            <motion.rect 
              x="20" y="20" width="230" height="90" rx="8" 
              className="fill-none stroke-sky-500/20" 
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, 20] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {stage === 2 && (
              <motion.line
                x1="10" x2="260"
                animate={{ y: [10, 120, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="stroke-sky-500/40"
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />
            )}
          </g>

          {/* Phase 3: Emission (Top) */}
          <g transform="translate(135, 70)">
            <rect width="270" height="130" rx="16" className="fill-emerald-500/5 stroke-emerald-500/10" strokeWidth="1" />
            {[...Array(18)].map((_, i) => (
              <circle key={i} cx={30 + (i%6)*42} cy={30 + Math.floor(i/6)*35} r="2" className="fill-emerald-500/20" />
            ))}
            {stage === 3 && (
              <motion.line
                x1="10" x2="260"
                animate={{ y: [10, 120, 10] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="stroke-primary/40"
                strokeWidth="1.5"
                strokeDasharray="2 4"
              />
            )}
          </g>

          {/* Bubbles / Particles */}
          <AnimatePresence>
            {[...Array(40)].map((_, i) => (
              <motion.circle
                key={i}
                r={1 + Math.random() * 2}
                fill={stage === 2 ? "#0EA5E9" : "#10B981"}
                initial={{ 
                  x: 130 + Math.random() * 280, 
                  y: 100 + Math.random() * 450,
                  opacity: 0
                }}
                animate={{
                  y: stage === 1 ? [550, 450] : stage === 2 ? [380, 270] : [200, 60],
                  opacity: [0, 0.7, 0],
                  scale: [0.5, 1.2, 0.5]
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 3
                }}
              />
            ))}
          </AnimatePresence>

          {/* Callouts shifted left */}
          <SchematicCallout 
            x={120} y={515} 
            label="INLET_VORTEX" 
            sublabel="STATUS: OPTIMAL // 8.4m/s" 
            isActive={stage === 1} 
            side="left" 
          />
          <SchematicCallout 
            x={120} y={325} 
            label="BIO_SCRUBBER" 
            sublabel="GRID_ACTIVE // 99.98% EFF" 
            isActive={stage === 2} 
            side="left" 
          />
          <SchematicCallout 
            x={120} y={135} 
            label="O2_EMISSION" 
            sublabel="PURITY: 99.8% // SAT_ON" 
            isActive={stage === 3} 
            side="left" 
          />

          {/* Center Activity Indicators shifted left */}
          <circle cx="270" cy="60" r="2" className={cn("transition-colors duration-300", stage === 3 ? "fill-emerald-500 animate-pulse" : "fill-emerald-500/20")} />
          <circle cx="270" cy="325" r="2" className={cn("transition-colors duration-300", stage === 2 ? "fill-sky-500 animate-pulse" : "fill-sky-500/20")} />
          <circle cx="270" cy="590" r="2" className={cn("transition-colors duration-300", stage === 1 ? "fill-emerald-500 animate-pulse" : "fill-emerald-500/20")} />
        </svg>
      </div>
    </div>
  );
};

export default function HowItWorksSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeStage, setActiveStage] = useState(1);
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isMobile) {
      let nextStage = 1;
      if (latest < 0.3) nextStage = 1;
      else if (latest < 0.6) nextStage = 2;
      else nextStage = 3;
      if (nextStage !== activeStage) setActiveStage(nextStage);
    }
  });

  // --- MOBILE EXPERIENCE ---
  if (isMobile) {
    return (
      <section className="py-12 bg-background relative overflow-hidden font-lexend transition-colors duration-500">
        {/* Background Technical Grid */}
        <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none text-foreground" 
             style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-10">
          
          {/* Mobile Header */}
          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[9px]">
              <div className="w-8 h-px bg-primary/40" />
              <span>Bio-Process Sequence</span>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter text-foreground leading-none">
              Biological <br />
              <span className="premium-gradient-text italic font-normal">Sequence.</span>
            </h2>
          </div>

          {/* Phase Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => setActiveStage(s)}
                className={cn(
                  "flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shrink-0",
                  activeStage === s 
                    ? "bg-primary text-white border-primary shadow-glow-sm" 
                    : "bg-card text-muted-foreground border-border"
                )}
              >
                <span className="font-mono text-[10px] font-black uppercase tracking-widest">P.0{s}</span>
                <span className="text-[10px] font-bold uppercase tracking-tight">{stages[s-1].title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Stage Card */}
          <motion.div 
            key={activeStage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-[2.5rem] p-6 space-y-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.03] pointer-events-none">
              <Search className="w-32 h-32" />
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[8px] font-black tracking-[0.3em] text-primary uppercase">{stages[activeStage-1].subtitle}</span>
                </div>
                <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest border border-border px-2 py-1 rounded-md">Diagnostic_OK</div>
              </div>

              <div className="space-y-4">
                <h3 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none">
                  {stages[activeStage-1].title}
                </h3>
                <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                  {stages[activeStage-1].description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                {stages[activeStage-1].data.map((item: any, idx: number) => (
                  <div key={idx} className="space-y-1">
                    <div className="text-[7px] font-black text-muted-foreground uppercase tracking-widest leading-none">{item.label}</div>
                    <div className="text-xs font-mono font-bold text-foreground uppercase tracking-tight">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* In-Card Mini Schematic */}
            <div className="relative h-48 md:h-64 w-full flex items-center justify-center bg-background/40 rounded-[1.5rem] border border-border/50">
               <div className="scale-50 md:scale-75 origin-center">
                 <ReactorSchematic stage={activeStage} />
               </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-muted-foreground/40">
            <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-pulse" />
            Live_Telemetry Verification active
          </div>
        </div>
      </section>
    );
  }

  // --- DESKTOP EXPERIENCE (Original) ---
  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background font-lexend selection:bg-primary selection:text-white transition-colors duration-500">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-start overflow-hidden pt-32 pb-24">
        
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none text-foreground" 
             style={{ 
               backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_80%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col h-full">
          
          <motion.div 
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
              y: useTransform(scrollYProgress, [0, 0.1], [0, 20])
            }}
            className="text-left mb-8 space-y-4 shrink-0"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-none">
              Biological <br className="md:hidden" />
              <span className="premium-gradient-text italic underline decoration-primary/20 underline-offset-8">Sequence.</span>
            </h2>
          </motion.div>

          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center">
            
            <div className="relative h-full flex items-center justify-center lg:justify-start pr-8 md:pr-0 -translate-y-16 md:-translate-y-24">
              <AnimatePresence mode="wait">
                {stages.map((stage, i) => (
                  activeStage === i + 1 && (
                    <div key={stage.id} className="absolute inset-0 flex items-center">
                      <TechnicalLabel {...stage} isActive={activeStage === i + 1} />
                    </div>
                  )
                ))}
              </AnimatePresence>
            </div>

            <div className="hidden lg:flex h-full items-center justify-center -translate-y-20 md:-translate-y-32 lg:translate-x-24">
              <ReactorSchematic stage={activeStage} />
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 shrink-0 z-20">
          <div className="flex items-center gap-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <motion.div 
                  animate={{ 
                    scale: activeStage === s ? 1.2 : 1,
                    backgroundColor: activeStage === s ? "var(--primary)" : "rgba(120,120,120,0.1)"
                  }}
                  className={cn(
                    "w-3 h-3 rounded-full border border-primary/20 transition-all",
                  )} 
                />
                <span className={cn(
                  "font-mono text-[8px] font-black uppercase tracking-widest",
                  activeStage === s ? "text-primary" : "text-muted-foreground/30"
                )}>P.0{s}</span>
              </div>
            ))}
          </div>
          
          <div className="w-64 h-1 bg-foreground/5 rounded-full overflow-hidden relative">
            <motion.div 
              style={{ scaleX: smoothProgress, transformOrigin: "left" }}
              className="absolute inset-0 bg-primary"
            />
          </div>
          
          <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground/50">
            <Search className="w-3 h-3" />
            <span>Diagnostic Sync: Active</span>
          </div>
        </div>

      </div>
    </section>
  );
}
