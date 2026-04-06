import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { Wind, Leaf, Globe, Cpu, Zap, Activity, ShieldCheck, Database, Radio, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(value);
  
  useEffect(() => {
    const controls = { value: displayValue };
    const duration = 0.8;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = displayValue + (value - displayValue) * ease;
      
      setDisplayValue(current);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [value]);

  return <span className="tabular-nums">{displayValue.toFixed(displayValue % 1 === 0 ? 0 : 1)}{suffix}</span>;
};

export default function BentoImpact() {
  const [units, setUnits] = useState(5);
  const containerRef = useRef(null);
  
  const oxygen = units * 1.6;
  const co2 = units * 3;
  const natureEq = units * 15;

  return (
    <section ref={containerRef} className="py-12 md:py-24 bg-background relative overflow-hidden font-lexend transition-colors duration-500">
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 md:gap-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[9px]">
              <div className="w-10 h-px bg-primary/40" />
              <span>Measurable Reality</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">
              Biological <br /> <span className="premium-gradient-text italic font-normal">Impact.</span>
            </h2>
          </div>
          <p className="text-sm md:text-xl text-muted-foreground font-medium max-w-md leading-relaxed opacity-80">
            Translating microscopic photosynthesis into planet-scale ecological restoration data.
          </p>
        </div>

        {/* The Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          
          {/* 1. Main Impact Engine (Large) */}
          <div className="md:col-span-8 bg-card border border-border rounded-[2.5rem] p-6 md:p-12 flex flex-col justify-between relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Activity className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Module_Active</div>
                    <div className="text-lg md:text-xl font-black text-foreground uppercase tracking-tighter">Impact Engine</div>
                  </div>
                </div>
                <p className="text-muted-foreground font-medium text-sm md:text-lg max-w-sm">
                  Calculate the biological displacement of carbon based on your installation density.
                </p>
              </div>

              <div className="bg-background/50 backdrop-blur-sm border border-border px-6 py-4 rounded-2xl flex items-baseline gap-2 w-full md:w-auto justify-center md:justify-start">
                <span className="text-4xl md:text-6xl font-black text-foreground tabular-nums">{units}</span>
                <span className="text-[8px] md:text-[10px] text-primary uppercase tracking-widest font-black opacity-60">Units</span>
              </div>
            </div>

            <div className="relative z-10 mt-10 md:mt-16 space-y-10 md:space-y-16">
              {/* Range Slider Section */}
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type="range" min="1" max="100" value={units} 
                    onChange={(e) => setUnits(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-foreground/10 dark:bg-foreground/5 rounded-full appearance-none cursor-pointer accent-primary transition-all"
                  />
                  <div className="absolute top-0 left-0 h-1.5 bg-primary/30 rounded-full pointer-events-none" style={{ width: `${units}%` }} />
                </div>
                <div className="flex justify-between text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
                  <span>Minimum Deployment</span>
                  <span>Maximum Density</span>
                </div>
              </div>

              {/* Results Grid - Strict 3-column on mobile */}
              <div className="grid grid-cols-3 gap-3 md:gap-12">
                {[
                  { label: "Oxygen", val: oxygen, suffix: "L", icon: Wind, color: "text-primary" },
                  { label: "Carbon", val: co2, suffix: "g", icon: Leaf, color: "text-primary" },
                  { label: "Nature", val: natureEq, suffix: "X", icon: Globe, color: "text-blue-500" }
                ].map((stat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-2 opacity-40">
                      <stat.icon className={cn("w-3 h-3 md:w-4 md:h-4", stat.color)} />
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <div className="text-xl md:text-5xl font-black text-foreground leading-none">
                      <Counter value={stat.val} suffix={stat.suffix} />
                    </div>
                    <div className="text-[7px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="absolute -bottom-20 -right-20 w-64 md:w-96 h-64 md:h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          </div>

          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-6">
            {/* 2. Efficiency Micro-Card */}
            <div className="bg-[#0A0A0A] dark:bg-[#0A0A0A] text-white rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-between border border-primary/20 relative overflow-hidden group shadow-xl transition-transform active:scale-[0.98]">
              <div className="relative z-10 flex justify-between items-start">
                <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                  <Zap className="w-3.5 h-3.5 md:w-5 md:h-5 text-primary" />
                </div>
                <div className="hidden md:block text-right font-mono text-[7px] opacity-40 uppercase tracking-widest">
                  Protocol // Opt_Max
                </div>
              </div>
              <div className="relative z-10 mt-4 md:mt-6">
                <div className="text-3xl md:text-6xl font-black tracking-tighter leading-none mb-1 md:mb-2 text-primary">20X</div>
                <div className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-white leading-tight">Efficiency</div>
                <p className="hidden md:block text-white/40 font-medium text-[10px] md:text-xs mt-3 leading-relaxed">
                  Outperforming terrestrial trees in CO2 conversion.
                </p>
              </div>
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-px w-full bg-white mb-4 transform -rotate-12 translate-y-10" />
                ))}
              </div>
            </div>

            {/* 3. Bio-Sync AI Live Status */}
            <div className="bg-card border border-border rounded-[1.5rem] md:rounded-[2.5rem] p-4 md:p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm transition-transform active:scale-[0.98]">
              <div className="flex justify-between items-center mb-2 md:mb-4">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-border">
                    <Cpu className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                  </div>
                  <h4 className="hidden md:block text-xs md:text-sm font-black uppercase tracking-widest text-foreground">AI Sync</h4>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 md:py-1 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-primary">Live</span>
                </div>
              </div>
              
              <div className="space-y-3 md:space-y-4 mt-2 md:mt-0">
                <div className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-foreground leading-tight">Neural Link</div>
                <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    className="h-full w-1/3 bg-primary"
                  />
                </div>
                <p className="hidden md:block text-[9px] text-muted-foreground font-medium uppercase tracking-widest">
                  Nutrient optimization.
                </p>
              </div>
            </div>
          </div>

          {/* 4. Planetary Health Call to Action (Large) */}
          <div className="md:col-span-12 bg-primary text-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl">
            <div className="relative z-10 text-center md:text-left space-y-4 md:space-y-6 w-full md:w-auto">
              <h3 className="text-2xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Redesigning <br /> Planetary Wellness.
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                <Link href="/register">
                  <button className="w-full sm:w-auto px-8 py-4 md:px-10 md:py-5 bg-white text-primary rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3">
                    Join Revolution
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] opacity-60">
                  // Start Your Biological Legacy
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-6 md:mt-0 opacity-10 md:opacity-20 transition-opacity">
              <Globe className="w-32 h-32 md:w-64 md:h-64 animate-spin-slow" />
            </div>

            <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-white/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
          </div>

        </div>
      </div>
    </section>
  );
}
