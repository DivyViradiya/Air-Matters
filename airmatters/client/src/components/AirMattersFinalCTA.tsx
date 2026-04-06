import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowRight, 
  ShoppingBag, 
  Info, 
  Wind, 
  Zap,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AirMattersFinalCTA() {
  return (
    <section className="py-16 bg-background relative overflow-hidden font-lexend">
      {/* Background Aesthetic Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full opacity-30 animate-pulse" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        {/* Main Hook */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-6 mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px]">
            <Sparkles className="w-4 h-4" />
            <span>The Biological Path Forward</span>
          </div>
          <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-foreground">
            Now You <br /> <span className="premium-gradient-text italic">Know.</span>
          </h2>
          <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
            Ignorance was bliss. Knowledge is defense. <br className="hidden md:block" />
            Here's what you can do about your air quality today.
          </p>
        </motion.div>

        {/* Split Intent Path */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">

          {/* Path 1: Action (Commercial Intent) */}
          <Link href="/products">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-foreground text-background rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-left overflow-hidden cursor-pointer shadow-2xl transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <ShoppingBag className="w-32 h-32 md:w-48 md:h-48" />
              </div>

              <div className="relative z-10 space-y-6 md:space-y-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] mb-6">
                    <Zap className="w-4 h-4 fill-primary" />
                    <span>Direct Intervention</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                    Deploy <br /> Defense.
                  </h3>
                  <p className="text-background/60 font-medium text-sm md:text-base max-w-[280px]">
                    Ready to transform your space into a clinical-grade bio-ecosystem.
                  </p>
                </div>

                <div className="pt-4 md:pt-8">
                  <div className="inline-flex items-center justify-center gap-4 px-6 md:px-8 py-4 md:py-5 bg-primary text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.2em] group-hover:scale-105 transition-transform w-full sm:w-auto">
                    Shop Bio-Reactors
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Path 2: Education (Informational Intent) */}
          <Link href="/how-it-works">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="group relative bg-card border border-border/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 text-left overflow-hidden cursor-pointer shadow-xl transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 group-hover:opacity-10 transition-opacity">
                <Info className="w-32 h-32 md:w-48 md:h-48" />
              </div>

              <div className="relative z-10 space-y-6 md:space-y-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[10px] mb-6">
                    <ShieldCheck className="w-4 h-4" />
                    <span>In-Depth Logic</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
                    View the <br /> Sequence.
                  </h3>
                  <p className="text-muted-foreground font-medium text-sm md:text-base max-w-[280px]">
                    Still researching? Explore the complex biological engineering behind our tech.
                  </p>
                </div>

                <div className="pt-4 md:pt-8">
                  <div className="inline-flex items-center justify-center gap-4 px-6 md:px-8 py-4 md:py-5 border-2 border-primary/20 hover:border-primary/40 text-foreground rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-[0.2em] group-hover:bg-primary/5 transition-all w-full sm:w-auto">
                    How it works
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>

      </div>
    </section>
  );
}
