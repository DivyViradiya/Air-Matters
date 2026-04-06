import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Globe, Sprout, Target, ArrowRight, Sparkles, TrendingUp, Calendar, MapPin, CheckCircle2, Leaf, Lightbulb, Users, Zap, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import MicroalgaeGL from "@/components/3d/MicroalgaeGL";
import Footer from "@/components/Footer";

export default function Vision() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Hero Section - Card Contained Parallax */}
      <section ref={heroRef} className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[75vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 bg-background/5 backdrop-blur-md">
          {/* Voronoi GLSL Microalgae Background */}
          <div className="absolute inset-0 z-0">
            <MicroalgaeGL />
          </div>

          {/* Parallax Background — overlaid above shader */}
          <motion.div 
            style={{ y, opacity }}
            className="absolute inset-0 z-[1]"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center scale-110"
              style={{ backgroundImage: "url('/images/Picture2.jpg')", opacity: 0.25 }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
                        <motion.div 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8 }}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-8 w-fit"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>The Future We're Building</span>
                        </motion.div>
            
                        <motion.h1 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-display leading-[1.1] drop-shadow-2xl"
                        >
                          Revolutionizing <br />
                          Urban Life.
                        </motion.h1>
            
                        <motion.p 
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.8, delay: 0.4 }}
                          className="text-lg md:text-2xl font-light text-white/90 mb-10 leading-relaxed max-w-2xl drop-shadow-md"
                        >
                          Our vision is to address air and water pollution simultaneously through a new, integrated biological infrastructure.
                        </motion.p>
            
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.6 }}
                          className="flex flex-col sm:flex-row gap-4"
                        >
                          <Link href="/about">
                            <Button size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl transition-all transform hover:-translate-y-1">
                              Our Story
                              <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                          </Link>
                          <Link href="/how-it-works">
                            <Button size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full backdrop-blur-sm bg-white/20 border-white/10 text-white hover:bg-white/30 transition-all">
                              The Science
                            </Button>
                          </Link>
                        </motion.div>          </div>
        </div>
      </section>

      {/* Impact by the Numbers - Redesigned */}
      <section className="py-12 bg-transparent relative z-10 -mt-20">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border bg-background/40 backdrop-blur-sm border border-border py-10 rounded-[2rem] shadow-sm"
          >
            {[
              { number: "20x", label: "Efficiency vs Trees", icon: TrendingUp, color: "text-primary" },
              { number: "100%", label: "Sustainable Energy", icon: Globe, color: "text-accent" },
              { number: "365", label: "Days Clean Air", icon: Calendar, color: "text-primary" },
              { number: "50+", label: "Target Cities", icon: MapPin, color: "text-orange-500" },
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center px-6">
                <div className={`w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center mb-4 ${stat.color} shadow-inner`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground tracking-tighter mb-1">{stat.number}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section className="pt-0 pb-12 -mt-8 bg-transparent relative overflow-hidden">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { t: "The Concept", i: Target, c: "We are rewriting urban biological code. By fusing microalgae photobioreactors with hybrid matrices, we transform dead spaces into carbon sinks.", b: "primary" },
              { t: "The Execution", i: Sparkles, c: "From road dividers to airport rooftops, we treat every square foot as a lung, integrated with next-gen bio-cleansing infrastructure.", b: "emerald" },
              { t: "The Promise", i: Globe, c: "Universal access to pristine air. We are democratizing respiratory health through high-efficiency spatial bio-engineering.", b: "blue" }
            ].map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`glass-card glass-card-hover h-full p-8 relative overflow-hidden border-${card.b}-500/20`}>
                  <div className={`w-12 h-12 bg-${card.b}-500/10 rounded-xl flex items-center justify-center mb-6 shadow-inner text-${card.b}-500`}>
                    <card.i className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{card.t}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base font-medium">
                    {card.c}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Roadmap: Multi-Phased Journey */}
      <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[150px] -z-10 animate-pulse" />

        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">A Multi-Phased Journey</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              From localized proof of concept to a national movement, each phase builds upon technical validation.
            </p>
          </motion.div>

          <div className="relative space-y-32">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-blue-500/20 to-emerald-500/20 -translate-x-1/2" />

            {[
              { p: "Phase 01", t: "Years 1-2", h: "Foundation & Validation", d: "Proving viability in controlled environments. Finalizing prototype and establish pilot project.", r: ["20-30% Reduction in PM2.5", "Operational O&M Blueprint"], i: Target, color: "primary" },
              { p: "Phase 02", t: "Years 3-5", h: "Scaling & Standardization", d: "Expanding modular units across diverse climates. Launching 3-5 major urban projects.", r: ["Proven Regional Scalability", "Tangible Public Use Cases"], i: TrendingUp, color: "blue", rev: true },
              { p: "Phase 03", t: "Years 6-10+", h: "Nationwide Integration", d: "Partnering with governments for national policy integration and decentralized networks.", r: ["Measurable National Impact", "Societal Transformation"], i: Globe, color: "emerald" }
            ].map((phase, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-16 ${phase.rev ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Text Content */}
                <div className={`md:w-1/2 ${phase.rev ? 'md:text-left' : 'md:text-right'} space-y-4`}>
                  <div className="flex flex-col gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${phase.color === 'primary' ? 'text-primary/60' : `text-${phase.color}-500/60`}`}>{phase.p}</span>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-[10px] w-fit uppercase tracking-widest",
                      phase.color === 'primary' ? "bg-primary/10 text-primary" : `bg-${phase.color}-500/10 text-${phase.color}-500`,
                      phase.rev ? '' : 'md:ml-auto'
                    )}>
                      <Calendar className="w-3 h-3" /> {phase.t}
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{phase.h}</h3>
                  <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium max-w-xl shadow-none">{phase.d}</p>
                </div>
                
                {/* Central Node */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
                   <div className={cn(
                     "w-14 h-14 rounded-2xl bg-white border z-10 shadow-xl flex items-center justify-center relative group",
                     phase.color === 'primary' ? "border-primary/20" : `border-${phase.color}-500/20`
                   )}>
                      <div className={cn(
                        "absolute inset-0 rounded-2xl animate-ping group-hover:animate-none scale-150 opacity-0 group-hover:opacity-100 transition-all",
                        phase.color === 'primary' ? "bg-primary/5" : `bg-${phase.color}-500/5`
                      )} />
                      <phase.i className={cn(
                        "w-6 h-6 relative z-20",
                        phase.color === 'primary' ? "text-primary" : `text-${phase.color}-500`
                      )} />
                   </div>
                </div>

                {/* Results Card */}
                <div className="md:w-1/2 w-full p-8 bg-card/40 backdrop-blur-sm rounded-[2.5rem] border border-white/10 shadow-sm hover:shadow-md transition-all group/card">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      phase.color === 'primary' ? "bg-primary/10 text-primary" : `bg-${phase.color}-500/10 text-${phase.color}-500`
                    )}>
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs uppercase tracking-widest text-zinc-400">Target Milestones</h4>
                  </div>
                  <ul className="space-y-4">
                    {phase.r.map((res, i) => (
                      <li key={i} className="flex items-center gap-4 text-sm md:text-base font-bold text-zinc-800 group-hover/card:translate-x-1 transition-transform">
                        <CheckCircle2 className={cn(
                          "w-5 h-5 shrink-0",
                          phase.color === 'primary' ? "text-primary" : `text-${phase.color}-500`
                        )} />
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Impact Loop */}
      <section className="py-12 md:py-16 bg-transparent relative overflow-hidden">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <motion.div 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Cycle of National Transformation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium">
              Moving beyond single metrics to a holistic model for urban development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { i: Leaf, t: "Environmental Health", d: "Reduced illness and decreased stress through cleaner biomes.", c: "primary" },
              { i: Lightbulb, t: "Productivity Engine", d: "Healthier populations are more creative and focused.", c: "yellow" },
              { i: TrendingUp, t: "Economic Renaissance", d: "Green job creation and competitive city advantages.", c: "accent" },
              { i: Users, t: "National Pride", d: "India becomes a visionary leader in sustainable living.", c: "primary" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="bg-background/40 backdrop-blur-sm border border-border p-8 rounded-[2rem] flex flex-col items-center text-center hover:shadow-lg transition-all h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-inner",
                    item.c === 'primary' ? "bg-primary/10 text-primary" : (item.c === 'accent' ? "bg-accent/10 text-accent" : `bg-${item.c}-500/10 text-${item.c}-500`)
                  )}>
                    <item.i className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold mb-3 text-foreground">{item.t}</h3>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    {item.d}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
