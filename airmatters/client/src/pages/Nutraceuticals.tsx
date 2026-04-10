import { useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Zap, 
  Heart, 
  ShieldCheck, 
  Droplets,
  ArrowRight,
  Globe,
  Microscope,
  Activity,
  History,
  FlaskConical,
  Scale,
  Leaf,
  Wind,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import FloatingParticles from "@/components/FloatingParticles";
import { cn } from "@/lib/utils";

export default function Nutraceuticals() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SmoothScroll>
      <div 
        ref={containerRef} 
        className="relative bg-background overflow-visible font-lexend selection:bg-primary selection:text-white"
      >
        <FloatingParticles className="opacity-20 dark:opacity-40" />

        {/* 1. HERO AREA (Theme-Adaptive Specimen) */}
        <section className="relative pt-20 pb-8 px-4 md:px-8 flex flex-col items-center">
          <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[75vh] md:h-[80vh] w-[94%] rounded-[3rem] overflow-hidden shadow-2xl bg-card border border-border/10">
            <div className="absolute inset-0 z-0">
              <img 
                src="/images/download (1).jpg" 
                alt="Microalgae Specimen"
                className="w-full h-full object-cover opacity-90 dark:opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-background/20" />
            </div>

            {/* HUD Elements */}
            <div className="absolute left-10 top-1/2 -translate-y-1/2 space-y-8 hidden lg:block z-20">
              <div className="space-y-1">
                <div className="text-[9px] font-black text-primary/70 uppercase tracking-[0.4em]">Content_Purity</div>
                <div className="text-xs font-mono text-foreground font-bold uppercase tracking-widest">100% Organic</div>
              </div>
              <div className="space-y-1">
                <div className="text-[9px] font-black text-primary/70 uppercase tracking-[0.4em]">Bio_Availability</div>
                <div className="text-xs font-mono text-foreground font-bold uppercase tracking-widest">60% Protein</div>
              </div>
            </div>

            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-6">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-center gap-6">
                  <div className="h-px w-12 bg-primary/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Advanced Systems</span>
                  <div className="h-px w-12 bg-primary/30" />
                </div>

                <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-foreground drop-shadow-2xl">
                  Professional Performance <br />
                  <span className="premium-gradient-text italic">Nutrition.</span>
                </h1>

                <p className="max-w-2xl mx-auto text-sm md:text-lg text-foreground/80 font-medium leading-relaxed tracking-tight">
                  The only live health supplement grown right in your home. Packed with 60% bio-available protein and a full spectrum of micronutrients.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                  <Link href="/products">
                    <Button size="lg" className="rounded-xl px-12 py-7 h-auto bg-primary text-white hover:bg-primary/90 font-black uppercase tracking-widest text-xs">
                      Explore Products
                    </Button>
                  </Link>
                  <Link href="/how-it-works">
                    <Button variant="outline" size="lg" className="rounded-xl px-12 py-7 h-auto border-foreground/10 text-foreground hover:bg-foreground/5 backdrop-blur-md font-black uppercase tracking-widest text-xs">
                      The Science
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2 & 3. BIO-ANALYTICS BENTO TERMINAL (Unified Impact) */}
        <section className="py-16 px-6 md:px-12 relative overflow-hidden bg-background">
          <div className="max-w-[100rem] mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
              <div className="max-w-3xl space-y-6">
                <div className="inline-flex items-center gap-4 text-primary font-black uppercase tracking-[0.4em] text-[10px]">
                  <div className="w-12 h-px bg-primary/40" />
                  <span>Biological_Analytics</span>
                </div>
                <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-foreground">
                  The Ultimate <br /> <span className="premium-gradient-text italic font-normal">Biological Profile.</span>
                </h2>
              </div>
              <p className="text-lg text-muted-foreground font-medium max-w-sm leading-relaxed border-l-2 border-primary/20 pl-8">
                Gram for gram, microalgae is one of the most nutrient-dense foods on the planet. Superior to traditional sources for muscle recovery and cognitive focus.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-8 bg-card border border-border rounded-[3rem] p-8 md:p-16 flex flex-col justify-between relative overflow-hidden shadow-2xl group"
              >
                <div className="relative z-10 flex justify-between items-start mb-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center border border-primary/10 transition-transform group-hover:scale-110">
                        <Activity className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Status_Live</div>
                        <h3 className="text-2xl font-black text-foreground uppercase tracking-tight">Daily Yield Matrix</h3>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[9px] font-mono text-primary uppercase tracking-[0.3em] font-black">Spec_v4.0</span>
                  </div>
                </div>

                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-8 md:gap-12">
                  {[
                    { label: "Protein", p: "60%", v: 60, sub: "Amino Power" },
                    { label: "Vitamin B12", p: "80%", v: 80, sub: "Neuro Energy" },
                    { label: "Omega-3", p: "45%", v: 45, sub: "Cardio Sync" },
                    { label: "Iron", p: "35%", v: 35, sub: "O2 Transport" }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-6 group/stat">
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.v}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.2, delay: i * 0.1 }}
                          className="h-full bg-primary shadow-[0_0_20px_-5px_#22c55e]"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="text-4xl md:text-6xl font-black text-foreground tabular-nums tracking-tighter transition-transform group-hover/stat:scale-105 origin-left">
                          {stat.p}
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-primary">{stat.label}</div>
                        <div className="text-[7px] font-bold text-muted-foreground uppercase tracking-widest opacity-50">{stat.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none hidden md:block">
                  <div className="text-[150px] font-black text-foreground leading-none opacity-[0.03]">YIELD</div>
                </div>
              </motion.div>

              <div className="md:col-span-4 grid grid-cols-1 gap-6 md:gap-8">
                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-foreground text-background rounded-[2.5rem] p-8 flex flex-col justify-between border border-primary/20 relative overflow-hidden group shadow-xl"
                >
                  <div className="relative z-10 flex justify-between items-start">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                      <Zap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-[8px] font-black uppercase text-primary tracking-widest opacity-40">Protocol // Opt_Max</div>
                  </div>
                  <div className="relative z-10 mt-8">
                    <h4 className="text-sm font-black uppercase tracking-widest text-primary mb-2">Amino Profile</h4>
                    <p className="text-xs text-background/60 font-medium leading-relaxed">
                      Highly bio-available protein complex that your body absorbs instantly.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden group shadow-sm"
                >
                  <div className="relative z-10 flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-border">
                      <FlaskConical className="w-5 h-5 text-primary" />
                    </div>
                    <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[7px] font-black uppercase tracking-widest text-primary">Active</div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-sm font-black uppercase tracking-widest text-foreground">Antioxidants</h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">
                      Lutein and Carotenoids to protect cell health.
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="md:col-span-12 bg-primary text-primary-foreground rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-2xl group"
              >
                <div className="relative z-10 text-center md:text-left space-y-6">
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                    Bio-Active Performance <br /> <span className="text-primary-foreground/60">Optimized for Athletes.</span>
                  </h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                    <div className="px-4 py-2 rounded-xl bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/20 text-[9px] font-black uppercase tracking-[0.2em]">Post-Workout Optimized</div>
                  </div>
                </div>

                <div className="relative z-10 mt-8 md:mt-0 opacity-10 group-hover:opacity-30 transition-opacity">
                  <ShieldCheck className="w-32 h-32 md:w-48 md:h-48" />
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* 4. COMPACT SAFETY PROTOCOL (Theme-Aware Banner) */}
        <section className="py-16 relative overflow-hidden bg-muted/30 dark:bg-card border-y border-border">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            
            <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-10 gap-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                  <ShieldCheck className="w-4 h-4" />
                  Safety_Protocol_Sequence
                </div>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-foreground">
                  100% Pure. <span className="text-primary italic">Zero Contaminants.</span>
                </h2>
              </div>
              <p className="text-xs md:text-sm text-muted-foreground font-medium max-w-sm leading-relaxed border-l border-border pl-6">
                Through strict molecular separation, we transform atmospheric CO2 into pure, professional-grade performance nutrition.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1 relative overflow-hidden rounded-[2.5rem] border border-border">
              {[
                { 
                  t: "Physical Isolation", 
                  d: "Dust and PM2.5 are trapped in a pre-filter, ensuring raw contaminants never reach core.",
                  i: Microscope,
                  label: "In"
                },
                { 
                  t: "Molecular Shift", 
                  d: "The microalgae harmlessly consumes CO2 and breaks down VOCs at the atomic level.",
                  i: FlaskConical,
                  label: "Process"
                },
                { 
                  t: "Primal Result", 
                  d: "A 100% organic, safely edible harvest. Pristine vitality, engineered for survival.",
                  i: CheckCircle2,
                  label: "Out"
                }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "relative p-8 group flex items-start gap-6 bg-background/50 backdrop-blur-sm",
                    idx !== 2 ? "md:border-r border-border" : ""
                  )}
                >
                  <div className="shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <step.i className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="text-[8px] font-black text-primary/40 uppercase tracking-widest">{step.label}_Phase</div>
                    <h4 className="text-sm font-black uppercase tracking-tight text-foreground">{step.t}</h4>
                    <p className="text-[11px] text-muted-foreground font-medium leading-relaxed max-w-[200px]">{step.d}</p>
                  </div>
                  <div className="absolute top-8 right-8 w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. FLOATING HERITAGE (Parallax Lineage) */}
        <section className="py-20 relative overflow-hidden bg-background">
          <div className="absolute inset-0 z-0 select-none overflow-hidden max-w-[100vw]">
            <motion.div 
              style={{ y: useTransform(smoothProgress, [0.6, 0.8], [100, -100]) }}
              className="text-[40vw] font-black text-foreground/[0.03] whitespace-nowrap leading-none tracking-tighter"
            >
              ANCESTRAL ANCESTRAL
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-primary text-[10px] font-black uppercase tracking-[0.4em]">
                <History className="w-4 h-4" />
                Foundational Wisdom
              </div>
              <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-foreground leading-[0.8]">Ancient Roots, <br /> Modern Living.</h2>
            </motion.div>

            <motion.div 
              style={{ y: useTransform(smoothProgress, [0.6, 0.8], [50, -50]) }}
              className="max-w-4xl mx-auto p-12 md:p-16 rounded-[4rem] bg-card border border-border shadow-2xl relative overflow-hidden"
            >
              <Globe className="absolute -bottom-20 -right-20 w-80 h-80 text-primary/5 -z-10" />
              <p className="text-2xl md:text-4xl font-light text-foreground leading-tight italic">
                "Microalgae was a foundational, life-sustaining energy source for ancient civilizations across India and the globe."
              </p>
              <div className="h-px w-20 bg-primary/30 mx-auto my-8" />
              <p className="text-sm md:text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto uppercase tracking-wide">
                We haven't changed the biology—we have simply engineered a way to cultivate this ancient wisdom in the modern home.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6. ASYMMETRIC ROUTINE (Daily Timeline) */}
        <section className="py-20 bg-muted/20 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-12">
              <div className="space-y-4">
                <div className="text-primary text-[10px] font-black uppercase tracking-[0.6em]">Daily_Protocol</div>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-foreground leading-none">The Practical <br /> Routine.</h2>
              </div>
              <p className="text-lg text-muted-foreground font-medium max-w-sm leading-relaxed">
                Ready for immediate use. Just live nutrition from reactor to table.
              </p>
            </div>

            <div className="space-y-6">
              {[
                { time: "08:00 AM", t: "Performance Smoothies", d: "Blend into your morning shake for protein and energy.", i: Droplets, side: "right" },
                { time: "02:00 PM", t: "Direct Hydration", d: "Mix with water for quick, pre-workout absorption.", i: Wind, side: "left" },
                { time: "06:00 PM", t: "Botanical Boost", d: "Dilute excess harvest as organic liquid fertilizer.", i: Leaf, side: "right" }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: item.side === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={cn(
                    "flex flex-col md:flex-row items-stretch gap-6",
                    item.side === "left" ? "md:flex-row-reverse" : ""
                  )}
                >
                  <div className="w-full md:w-1/4 p-10 rounded-[2.5rem] bg-foreground text-background flex flex-col justify-center items-center text-center">
                    <div className="text-4xl font-black tabular-nums tracking-tighter">{item.time}</div>
                    <div className="text-[10px] font-black uppercase text-primary tracking-widest mt-2">Protocol</div>
                  </div>
                  <div className="w-full md:w-3/4 p-10 rounded-[3rem] border border-border bg-card flex items-center justify-between group overflow-hidden relative">
                    <div className="max-w-xl space-y-4 relative z-10">
                      <h4 className="text-2xl font-black uppercase tracking-tight text-foreground">{item.t}</h4>
                      <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.d}</p>
                    </div>
                    <div className="hidden sm:flex w-24 h-24 rounded-full bg-primary/5 border border-primary/10 items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <item.i className="w-10 h-10" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        <Footer />
      </div>
    </SmoothScroll>
  );
}
