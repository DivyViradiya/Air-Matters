import { motion } from "framer-motion";
import { 
  Wind, 
  Brain, 
  Skull, 
  AlertCircle, 
  Users, 
  Baby, 
  Building2, 
  ShieldAlert,
  Activity,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PollutantCardProps {
  id: string;
  name: string;
  chemical: string;
  impact: string;
  demographic: string;
  demoIcon: any;
  icon: any;
  color: string;
  delay: number;
}

const PollutantCard = ({ 
  id, name, chemical, impact, demographic, demoIcon: DemoIcon, icon: Icon, color, delay 
}: PollutantCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="group relative bg-card border border-border/10 rounded-[2rem] p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden"
  >
    {/* Animated HUD Corner */}
    <div className={cn("absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 opacity-10 group-hover:opacity-30 transition-opacity rounded-tr-[2rem]", color.replace('text-', 'border-'))} />
    
    <div className="relative z-10 space-y-6">
      <div className="flex justify-between items-start">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110", color.replace('text-', 'bg-') + "/10", color.replace('text-', 'border-') + "/20")}>
          <Icon className={cn("w-6 h-6", color)} />
        </div>
        <div className="text-right">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground leading-none mb-1">Target_Ref</div>
          <div className="text-xs font-mono font-bold text-foreground opacity-60">ID: {id}</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-black text-foreground uppercase tracking-tighter">{name}</h3>
          <span className={cn("text-xs font-bold font-mono", color)}>{chemical}</span>
        </div>
        <p className="text-sm font-medium text-muted-foreground leading-relaxed min-h-[40px]">
          {impact}
        </p>
      </div>

      {/* Neutralization Progress Visualization */}
      <div className="space-y-2">
        <div className="flex justify-between items-end">
          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Neutralization_Index</span>
          <span className={cn("text-[10px] font-black font-mono", color)}>99.8%</span>
        </div>
        <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "99.8%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: delay + 0.5, ease: "easeOut" }}
            className={cn("h-full rounded-full", color.replace('text-', 'bg-'))}
          />
        </div>
      </div>

      {/* At-Risk Demographic */}
      <div className="pt-6 border-t border-border/10 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center shrink-0">
          <DemoIcon className="w-4 h-4 text-muted-foreground" />
        </div>
        <div>
          <div className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">High_Risk_Demographic</div>
          <div className="text-[11px] font-bold text-foreground leading-none">{demographic}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function PollutantBreakdown() {
  const pollutants = [
    {
      id: "PTL_01",
      name: "Fine Dust",
      chemical: "PM 2.5",
      impact: "Penetrates deep into lungs and enters bloodstream, causing cardiovascular stress.",
      demographic: "Children & Elderly",
      demoIcon: Baby,
      icon: Wind,
      color: "text-primary",
      delay: 0.1
    },
    {
      id: "PTL_02",
      name: "Carbon Flux",
      chemical: "CO2",
      impact: "High levels cause \"brain fog,\" fatigue, and a 50% reduction in cognitive speed.",
      demographic: "WFH Professionals",
      demoIcon: Brain,
      icon: Activity,
      color: "text-blue-500",
      delay: 0.2
    },
    {
      id: "PTL_03",
      name: "Vapors",
      chemical: "VOCs",
      impact: "Released by furniture and paints; causes persistent headaches and dizziness.",
      demographic: "New Homeowners",
      demoIcon: Building2,
      icon: Skull,
      color: "text-amber-500",
      delay: 0.3
    },
    {
      id: "PTL_04",
      name: "Combust",
      chemical: "NOx",
      impact: "Triggers asthma, reduces lung function, and increases respiratory infection risk.",
      demographic: "Urban Residents",
      demoIcon: Users,
      icon: ShieldAlert,
      color: "text-rose-500",
      delay: 0.4
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
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6">
              <div className="w-10 h-[1px] bg-primary/40" />
              <span>Target Analysis</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.85] text-foreground mb-8">
              Microscopic <br /> <span className="premium-gradient-text italic">Adversaries.</span>
            </h2>
            <p className="text-lg text-muted-foreground font-medium leading-relaxed max-w-2xl">
              Knowledge is the first layer of defense. Our bio-reactor is engineered to identify and neutralize the four primary threats to your respiratory health.
            </p>
          </div>
        </motion.div>

        {/* Pollutants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pollutants.map((pollutant) => (
            <PollutantCard key={pollutant.id} {...pollutant} />
          ))}
        </div>

      </div>
    </section>
  );
}
