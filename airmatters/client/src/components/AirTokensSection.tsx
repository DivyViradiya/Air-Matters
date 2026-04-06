import { useState, useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";
import { Link } from "wouter";
import { Coins, TrendingUp, ShieldCheck, ArrowRight, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function AnimatedCounter({ value, decimals = 2 }: { value: number; decimals?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  const display = useTransform(spring, (current) => 
    current.toLocaleString(undefined, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  );

  return <motion.span ref={ref}>{display}</motion.span>;
}

export default function AirTokensSection() {
  const [yieldMultiplier, setYieldMultiplier] = useState(1.0);
  
  return (
    <section className="relative py-12 md:py-24 overflow-hidden bg-background font-lexend transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.05] dark:opacity-[0.03] pointer-events-none text-foreground" 
           style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="absolute top-0 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <Zap className="w-3 h-3 text-primary fill-primary" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol: Proof of Breath</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-4 md:space-y-6"
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                BREATHE CLEAN. <br />
                <span className="premium-gradient-text italic font-normal">EARN ASSETS.</span>
              </h2>
              <p className="text-sm md:text-xl text-muted-foreground font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Your device earns AIR tokens every day. The cleaner your air, the more you earn. Biological survival transformed into a digital asset class.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pt-2 md:pt-4"
            >
              <Link 
                href="/carbon-credits"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-foreground text-background px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Explore Economy
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 md:gap-8 pt-8 border-t border-border">
              <div className="space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  Verified Yield
                </div>
                <div className="text-xl md:text-2xl font-black text-foreground tabular-nums">100%</div>
              </div>
              <div className="space-y-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-2 text-[8px] md:text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <TrendingUp className="w-3 h-3 text-primary" />
                  Network APR
                </div>
                <div className="text-xl md:text-2xl font-black text-foreground tabular-nums">12.4%</div>
              </div>
            </div>
          </div>

          {/* Right Content: Yield Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mt-8 md:mt-0"
          >
            <div className="relative aspect-square max-w-[300px] md:max-w-md mx-auto lg:ml-auto group">
              {/* Outer Ring System */}
              <div className="absolute inset-0 rounded-full border border-primary/10 group-hover:border-primary/20 transition-colors duration-500" />
              <div className="absolute inset-4 rounded-full border border-dashed border-primary/5 animate-[spin_30s_linear_infinite]" />
              
              {/* Main Visualization Card */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 md:p-12">
                <div className="mb-4 md:mb-8 relative">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
                  <div className="relative w-14 h-14 md:w-20 md:h-20 bg-card border border-border rounded-2xl flex items-center justify-center shadow-2xl">
                    <Coins className="w-7 h-7 md:w-10 md:h-10 text-primary animate-pulse" />
                  </div>
                </div>

                <div className="space-y-1 md:space-y-2 mb-6 md:mb-8">
                  <div className="text-[8px] md:text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.3em]">Estimated Daily Yield</div>
                  <div className="text-4xl md:text-7xl font-black tracking-tighter text-foreground tabular-nums flex items-baseline justify-center gap-2">
                    <AnimatedCounter value={12.85 * yieldMultiplier} />
                    <span className="text-sm md:text-2xl text-primary italic font-normal">AIR</span>
                  </div>
                </div>

                <div className="w-full bg-card/50 border border-border backdrop-blur-md rounded-2xl p-4 md:p-6 space-y-4 shadow-xl">
                  <div className="flex justify-between items-center text-[8px] md:text-[10px] font-black uppercase tracking-widest">
                    <span className="text-muted-foreground">Air Purity Bonus</span>
                    <span className="text-emerald-500">+{((yieldMultiplier - 1) * 100).toFixed(0)}%</span>
                  </div>
                  
                  <input 
                    type="range" 
                    min="1" 
                    max="2.5" 
                    step="0.05"
                    value={yieldMultiplier}
                    onChange={(e) => setYieldMultiplier(parseFloat(e.target.value))}
                    className="w-full h-1 bg-foreground/10 rounded-full appearance-none cursor-pointer accent-primary"
                  />
                  
                  <div className="flex justify-between items-center text-[7px] md:text-[8px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    <span>Base Yield</span>
                    <span>Max Efficiency</span>
                  </div>
                </div>

                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="mt-6 md:mt-8 flex items-center gap-2 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-primary/60"
                >
                  <Sparkles className="w-3 h-3" />
                  Live Network Sync
                </motion.div>
              </div>

              {/* Orbital Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-card border border-border p-3 md:p-4 rounded-xl shadow-xl backdrop-blur-md z-20"
              >
                <div className="text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">Asset Value</div>
                <div className="text-sm md:text-lg font-black text-foreground">$4.20</div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
