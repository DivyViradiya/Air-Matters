import { motion } from "framer-motion";
import { 
  Check, 
  X, 
  Trash2, 
  RefreshCcw, 
  Wind, 
  Leaf, 
  ShieldCheck, 
  Zap,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRowProps {
  label: string;
  hepa: string;
  bioreactor: string;
  isPositive: boolean;
}

const ComparisonRow = ({ label, hepa, bioreactor, isPositive }: ComparisonRowProps) => (
  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-5 border-b border-border/10 group">
    <div className="md:col-span-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-1 group-hover:text-foreground transition-colors">
        Capability // {label}
      </h4>
    </div>
    <div className="md:col-span-4 flex items-start gap-3 opacity-60 group-hover:opacity-80 transition-opacity">
      <X className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
      <span className="text-sm font-medium text-muted-foreground">{hepa}</span>
    </div>
    <div className="md:col-span-4 flex items-start gap-3">
      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
      <span className="text-sm font-bold text-foreground">{bioreactor}</span>
    </div>
  </div>
);

export default function BiologicalComparison() {
  const comparisonData = [
    {
      label: "Pollutant Handling",
      hepa: "Passive trapping. Particles accumulate on surface over time.",
      bioreactor: "Active digestion. Microalgae consume and eliminate CO2 and organic toxins.",
      isPositive: true
    },
    {
      label: "Waste Generation",
      hepa: "High waste. Filters must be replaced and landfilled frequently.",
      bioreactor: "Zero waste. Biomass is harvested and can be used as high-grade fertilizer.",
      isPositive: true
    },
    {
      label: "Oxygen Output",
      hepa: "Zero oxygen creation. Only circulates existing stale air.",
      bioreactor: "Active generation. Produces 1.6L of fresh, clinical-grade oxygen daily.",
      isPositive: true
    },
    {
      label: "System Intelligence",
      hepa: "Mechanical only. No real-time biological monitoring.",
      bioreactor: "AI Integrated. Real-time biological sync and atmospheric analysis.",
      isPositive: true
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
          className="max-w-3xl mb-12 text-left"
        >
          <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">
            <div className="w-10 h-[1px] bg-primary/40" />
            <span>Competitive Analysis</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground mb-6">
            Active Defense <br /> <span className="premium-gradient-text italic">vs. Passive Trapping.</span>
          </h2>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl">
            HEPA filters were designed for the last century. Our bioreactors are engineered for the next. 
            Stop just trapping dust and start regenerating your atmosphere.
          </p>
        </motion.div>

        {/* Comparison Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          
          {/* Legacy Card (HEPA) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 bg-muted/5 border border-border/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Trash2 className="w-24 h-24" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-3 text-rose-500 font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
                <span>Legacy System</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-muted-foreground">Standard HEPA</h3>
              <p className="text-sm font-medium text-muted-foreground/60 leading-relaxed">
                Relies on physical mesh barriers. Inefficient for gas-phase pollutants and creates a recurring environmental burden through non-recyclable filters.
              </p>
            </div>
          </motion.div>

          {/* Next-Gen Card (Bio-Filter) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-6 bg-primary/5 border-2 border-primary/20 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group shadow-2xl shadow-primary/5"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Zap className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest text-[9px] px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Active Defense
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground">Air Matters Bio-Filter</h3>
              <p className="text-sm font-bold text-foreground/80 leading-relaxed">
                Utilizes living microalgae to chemically decompose toxins and transform CO<sub>2</sub> into fresh oxygen. A sustainable, closed-loop biological ecosystem.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Detailed Comparison Table */}
        <div className="mt-8 md:mt-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pb-4 border-b-2 border-foreground/10 items-end">
            <div className="md:col-span-4 text-[10px] font-black uppercase tracking-[0.5em] text-primary">Attribute</div>
            <div className="hidden md:block md:col-span-4 text-xs font-black uppercase tracking-widest text-muted-foreground opacity-40">Mechanical HEPA</div>
            <div className="hidden md:block md:col-span-4 text-xs font-black uppercase tracking-widest text-foreground">Bio-Bioreactor</div>
          </div>
          
          <div className="divide-y divide-border/10">
            {comparisonData.map((row, index) => (
              <ComparisonRow key={index} {...row} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
