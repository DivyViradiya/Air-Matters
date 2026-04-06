import { motion } from "framer-motion";
import { ArrowDown, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocalAQIWidget from "./LocalAQIWidget";

export default function AirMattersHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background overflow-hidden font-lexend pt-20 pb-8">
      {/* Background Decorative Gradient - Subtle */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content Area */}
          <div className="space-y-6 md:space-y-10 text-center lg:text-left">
            
            {/* Strong Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-6xl xl:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-foreground"
            >
              The Air You <br /> 
              <span className="text-primary italic">Cannot See.</span>
            </motion.h1>

            {/* The Core Fact */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="py-6 md:py-10 border-l-4 border-primary pl-6 md:pl-8 text-left"
            >
              <h2 className="text-2xl md:text-4xl font-black text-foreground uppercase tracking-tight leading-none">
                20,000 Breaths. <br />
                <span className="text-muted-foreground text-xl md:text-3xl">Every Single Day.</span>
              </h2>
            </motion.div>

            {/* The Bridge */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-xl mx-auto lg:mx-0 text-sm md:text-lg text-muted-foreground font-medium leading-relaxed"
            >
              Most of those breaths are more toxic than outdoor air. <br className="hidden md:block" />
              We built something that changes that—forever.
            </motion.p>

            {/* Simple CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="pt-4 flex justify-center lg:justify-start"
            >
              <Button 
                size="lg"
                onClick={() => {
                  const nextSection = document.getElementById('solution-bridge');
                  if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-full px-10 md:px-12 py-6 md:py-7 text-[10px] md:text-xs font-black uppercase tracking-widest gap-3 shadow-xl hover:scale-105 transition-transform group w-full sm:w-auto"
              >
                Explore the Technology
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          {/* Right Side: Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            {/* Decorative Frame Elements */}
            <div className="absolute -inset-4 border border-primary/10 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 border-t-2 border-r-2 border-primary/20 rounded-tr-[2.5rem] md:rounded-tr-[3rem]" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 md:w-24 md:h-24 border-b-2 border-l-2 border-primary/20 rounded-bl-[2.5rem] md:rounded-bl-[3rem]" />
            
            <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] lg:aspect-auto lg:h-[70vh]">
              <img 
                src="/images/10.png" 
                alt="Atmospheric Visualization" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              {/* Subtle Gradient Overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
            </div>

            {/* Micro-Label on Image */}
            <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 bg-background/80 backdrop-blur-md px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-border/50 text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              Visualizing Particulate Density // REF_10
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
