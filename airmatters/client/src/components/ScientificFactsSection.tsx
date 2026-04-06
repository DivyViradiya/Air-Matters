import { motion } from "framer-motion";
import { 
  Brain, 
  Moon, 
  Activity, 
  Quote, 
  ExternalLink, 
  Info,
  TrendingUp,
  ShieldCheck,
  Zap,
  Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FactCardProps {
  icon: any;
  title: string;
  stat: string;
  description: string;
  source: string;
  sourceUrl: string;
  color: string;
  delay: number;
}

const FactCard = ({ icon: Icon, title, stat, description, source, sourceUrl, color, delay }: FactCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group relative bg-card border border-border/10 rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    {/* Decorative background accent */}
    <div className={cn("absolute -right-8 -top-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rounded-full", color)} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center border transition-transform group-hover:scale-110", color.replace('bg-', 'bg-').replace('text-', 'bg-') + "/10", color.replace('bg-', 'border-').replace('text-', 'border-') + "/20")}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted/50 border border-border/50">
          <Info className="w-3 h-3 text-muted-foreground" />
          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Verified Data</span>
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground">{title}</h3>
        <div className="text-4xl md:text-5xl font-black text-foreground tracking-tighter leading-none">
          {stat}
        </div>
        <p className="text-base text-muted-foreground font-medium leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-10 pt-6 border-t border-border/10 flex items-center justify-between">
        <a 
          href={sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 group/link"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-primary group-hover/link:underline">Source: {source}</span>
          <ExternalLink className="w-2.5 h-2.5 text-primary opacity-0 group-hover/link:opacity-100 transition-opacity" />
        </a>
        <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-pulse" />
      </div>
    </div>
  </motion.div>
);

export default function ScientificFactsSection() {
  const facts = [
    {
      icon: TrendingUp,
      title: "Atmospheric Toxicity",
      stat: "5X More Polluted",
      description: "Indoor air quality can be up to five times worse than outdoor air, as pollutants become trapped in confined spaces.",
      source: "Environmental Protection Agency (EPA)",
      sourceUrl: "https://www.epa.gov/report-environment/indoor-air-quality",
      color: "text-primary",
      delay: 0.1
    },
    {
      icon: Brain,
      title: "Cognitive Performance",
      stat: "50% Drop in Logic",
      description: "High CO2 concentrations in standard offices reduce strategic thinking and decision-making performance by half.",
      source: "Harvard T.H. Chan School of Public Health",
      sourceUrl: "https://www.hsph.harvard.edu/healthybuildings/study-indoor-air-quality-impacts-cognitive-function/",
      color: "text-blue-500",
      delay: 0.2
    },
    {
      icon: Moon,
      title: "Sleep Optimization",
      stat: "18% Better Recovery",
      description: "Fresh air circulation and reduced CO2 levels during sleep are directly correlated with improved REM recovery cycles.",
      source: "Technical University of Denmark",
      sourceUrl: "https://pubmed.ncbi.nlm.nih.gov/26478961/",
      color: "text-indigo-500",
      delay: 0.3
    }
  ];

  return (
    <section className="py-16 bg-background relative overflow-hidden font-lexend">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 md:mb-16 gap-8 text-left"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
              <div className="w-10 h-[1px] bg-primary/40" />
              <span>Academic Verification</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground">
              Science <br /> <span className="premium-gradient-text italic">Unfiltered.</span>
            </h2>
          </div>
          <div className="max-w-md space-y-4">
            <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed opacity-80">
              We don't just measure air; we measure human potential. The data is clear: the air you breathe is the fuel for your brain.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <Briefcase className="w-5 h-5 text-primary shrink-0" />
              <p className="text-[11px] md:text-xs font-bold text-foreground/80 leading-snug">
                <span className="text-primary uppercase font-black tracking-widest text-[9px] block mb-1">Personal Relevance</span>
                If you work from home, your air quality directly affects your output every single day.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {facts.map((fact, index) => (
            <FactCard key={index} {...fact} />
          ))}
        </div>

        {/* Bottom Verification Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-center gap-x-12 gap-y-6 py-6 border-y border-border/10 opacity-30 grayscale contrast-125"
        >
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Verified Research Partners</span>
          <div className="h-4 w-px bg-foreground/20 hidden md:block" />
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <span className="text-[10px] md:text-xs font-black">EPA.GOV</span>
            <span className="text-[10px] md:text-xs font-black">HARVARD</span>
            <span className="text-[10px] md:text-xs font-black">WHO.INT</span>
            <span className="text-[10px] md:text-xs font-black">LANSET</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
