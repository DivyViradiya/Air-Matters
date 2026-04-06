import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { 
  Wind, 
  Microscope, 
  Sun, 
  ArrowRight, 
  TrendingUp, 
  Leaf, 
  Droplets, 
  Zap, 
  Sparkles,
  CheckCircle2,
  Beaker,
  Activity,
  ShieldCheck,
  Globe
} from "lucide-react";
import BioReactorGL from "@/components/3d/BioReactorGL";
import Footer from "@/components/Footer";
import algaeImage from "/images/Picture4_1763973837980.png";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  const step4Ref = useRef<HTMLDivElement>(null);

  const step1InView = useInView(step1Ref, { amount: 0.5 });
  const step2InView = useInView(step2Ref, { amount: 0.5 });
  const step3InView = useInView(step3Ref, { amount: 0.5 });
  const step4InView = useInView(step4Ref, { amount: 0.5 });
  const computedStep = step4InView ? 3 : step3InView ? 2 : step2InView ? 1 : 0;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[70vh] md:h-[75vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
          <motion.div 
            style={{ y, opacity }}
            className="absolute inset-0 z-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url('/images/676d27e585bb78d01eb86247_Article 1 - Chlorella -p-2000.jpeg')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </motion.div>
          
          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs font-bold uppercase tracking-widest mb-8 w-fit"
            >
              <Microscope className="w-4 h-4" />
              <span>Bio-Tech Innovation</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-display leading-[1.1] drop-shadow-2xl"
            >
              The Science <br />
              Behind <span className="text-primary italic">Chlorella.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg md:text-xl font-light text-white/90 mb-10 leading-relaxed max-w-xl drop-shadow-md"
            >
              Discover how we're harnessing 2 billion years of evolution to revolutionize indoor air purification through biological engineering.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="h-14 md:h-16 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl transition-all transform hover:-translate-y-1"
                >
                  Join the Revolution
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Science Article - Bento Grid Layout */}
      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">
            
            {/* 1. Large Feature: Ancient Solution (Col 8) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 bg-background/40 backdrop-blur-sm rounded-[2.5rem] p-10 md:p-14 border border-border shadow-sm flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">Ancient Solution for <br/><span className="text-primary italic">Modern Challenges</span></h2>
              <div className="prose prose-lg prose-emerald text-muted-foreground font-medium leading-relaxed max-w-2xl space-y-4">
                <p>
                  As indoor air quality becomes a critical health factor, we've looked to nature's most resilient organisms for an answer. Microalgae, specifically <span className="text-primary font-bold">Chlorella</span>, are emerging as the most effective biological engine for ecological air restoration. 
                </p>
                <p>
                  Whether in corporate offices, bustling cafeterias, or shared residential spaces, this microscopic wonder is fundamentally changing our understanding of clean air.
                </p>
              </div>
            </motion.div>

            {/* 2. Stat Card: Technical Superiority (Col 4) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-background/60 backdrop-blur-sm rounded-[2.5rem] p-8 border border-border shadow-sm flex flex-col justify-center relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl transition-colors group-hover:bg-primary/10" />
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <div className="text-4xl font-black text-foreground italic">20x</div>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">
                    More efficient at CO2 capture <br/>than traditional terrestrial trees.
                  </div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <div className="text-4xl font-black text-foreground italic">100%</div>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">
                    Biological & waste-free. <br/>Byproducts serve as plant nutrition.
                  </div>
                </div>

                <div className="w-full h-px bg-border/50" />

                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <div className="text-4xl font-black text-foreground italic">Low</div>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">
                    Energy footprint. Optimized <br/>LEDs simulate perfect sunlight.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Equal Significance: Chlorella and Spirulina */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 bg-background/60 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-border shadow-sm flex flex-col group"
            >
              <div className="h-64 overflow-hidden relative">
                <img src="/images/chlorella-microalgae.png" alt="Chlorella" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20 backdrop-blur-md">
                    Carbon Engine
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-foreground">Chlorella Vulgaris</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The primary biological engine for carbon capture. Chlorella's fast growth rate and high density make it the most efficient organism for stripping CO2 from stagnant indoor air.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="text-primary font-black text-xl">95%</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">CO2 Efficiency</div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                    <div className="text-primary font-black text-xl">2bn+</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Years Evolution</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-6 bg-background/60 backdrop-blur-sm rounded-[2.5rem] overflow-hidden border border-border shadow-sm flex flex-col group"
            >
              <div className="h-64 overflow-hidden relative">
                <img src="/images/istockphoto-1159565520-612x612.jpg" alt="Spirulina" className="w-full h-full object-cover" />
                <div className="absolute bottom-4 left-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20 backdrop-blur-md">
                    Oxygen Multiplier
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <h3 className="text-3xl font-bold text-foreground">Spirulina Platensis</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Known for its exceptional oxygen production and robustness. Spirulina provides the necessary resilience to the ecosystem, ensuring consistent performance in varying environments.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <div className="text-blue-400 font-black text-xl">3x</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Oxygen Output</div>
                  </div>
                  <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                    <div className="text-blue-400 font-black text-xl">100%</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-bold">Non-Toxic</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 4. Highlight: Why it Matters (Col 12 - Full Width now) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-background/40 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border shadow-sm relative overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 gap-10 items-center h-full">
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-foreground">Why Indoor Air Matters</h3>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Activity className="w-6 h-6 text-primary shrink-0" />
                      <p className="text-base text-muted-foreground font-medium leading-relaxed">High CO2 levels decrease concentration by 15% and increase fatigue. Our dual-algae system actively reverses this buildup.</p>
                    </div>
                    <div className="flex gap-4">
                      <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                      <p className="text-base text-muted-foreground font-medium leading-relaxed">Removes VOCs and fine particulates that trigger allergies, respiratory issues, and sick building syndrome.</p>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10 flex flex-col justify-center">
                   <p className="text-lg text-muted-foreground font-medium italic mb-4">
                     "Investing in living solutions to purify indoor air is no longer a luxury—it's a necessity for human cognitive health and long-term well-being."
                   </p>
                   <div className="w-full h-1.5 bg-primary/20 rounded-full" />
                </div>
              </div>
            </motion.div>

            {/* 5. Process Step: Absorption (Col 6) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 bg-primary/5 backdrop-blur-sm rounded-[2.5rem] p-10 border border-primary/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">1</div>
                <h4 className="font-bold text-xl text-foreground">CO2 Sequestration</h4>
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Our systems draw in stagnant air, allowing the Chlorella culture to consume carbon dioxide as its primary fuel source for growth.
              </p>
            </motion.div>

            {/* 6. Process Step: Oxygen (Col 6) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 bg-primary/5 backdrop-blur-sm rounded-[2.5rem] p-10 border border-primary/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-lg">2</div>
                <h4 className="font-bold text-xl text-foreground">Oxygen Enrichment</h4>
              </div>
              <p className="text-muted-foreground font-medium leading-relaxed">
                Through optimized photosynthesis, the algae enriches the air with fresh, life-giving oxygen before releasing it back to your space.
              </p>
            </motion.div>

            {/* 7. Bottom CTA: Choice (Col 12) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-12 bg-background/40 backdrop-blur-sm rounded-[2.5rem] p-10 border border-border shadow-sm"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                     <Globe className="w-8 h-8" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold text-foreground">An Ecological Revolution</h3>
                     <p className="text-muted-foreground font-medium">A 100% natural, circular biological filter with zero waste.</p>
                   </div>
                </div>
                <Link href="/products">
                  <Button className="h-14 md:h-16 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-all transform hover:-translate-y-1">
                    Join the Revolution
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Miniature Biosphere Visualization Section */}
      <section className="pt-24 pb-12 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Leaf className="w-3 h-3" /> Core Technology
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold mb-8 text-foreground tracking-tight leading-tight">A Miniature <br/> Biosphere</h2>
                 <p className="text-xl text-muted-foreground leading-relaxed mb-12 font-light">
                   At the heart of every device is a living culture of microalgae. These microscopic organisms are the world's most efficient oxygen producers, responsible for 50% of the oxygen we breathe today.
                 </p>
                 
                 <div className="flex items-center gap-6 p-6 rounded-3xl bg-background/40 border border-border backdrop-blur-sm">
                   <img 
                     src={algaeImage} 
                     alt="Microscopic view" 
                     className="w-20 h-20 rounded-2xl object-cover shadow-lg shrink-0"
                   />
                   <div>
                     <h4 className="font-bold text-lg text-foreground mb-1">Proprietary Strains</h4>
                     <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                       Genetically optimized blend of <em>Chlorella vulgaris</em> and <em>Spirulina platensis</em>.
                     </p>
                   </div>
                 </div>
              </motion.div>
            </div>
            <div className="relative" ref={step1Ref}>
              <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full -z-10" />
              <BioReactorGL activeStep={computedStep} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
