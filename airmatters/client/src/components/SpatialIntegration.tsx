import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "wouter";
import { 
  Building2, 
  Activity,
  Moon,
  BrainCircuit,
  ArrowRight,
  Sparkles
} from "lucide-react";

const useCases = [
  {
    id: "office",
    category: "Cognitive Optimization",
    title: "Home Office",
    desc: "Boost concentration by 15% with reduced CO2 levels. Stay sharp and productive during deep work sessions with biological oxygen injection.",
    stat: "15% Concentration Boost",
    icon: BrainCircuit,
    image: "/images/2L mk1.2.png",
    color: "#56B452", // Brand Green
    bgGradient: "from-emerald-500/5 via-background to-background"
  },
  {
    id: "bedroom",
    category: "Restorative Sanctuary",
    title: "Bedroom",
    desc: "Experience deep, restorative sleep in an oxygen-rich environment. Wake up naturally refreshed as our system stabilizes nighttime air chemistry.",
    stat: "Deep Sleep Optimization",
    icon: Moon,
    image: "/images/2L mk1.3.png",
    color: "#0EA5E9", // Pulse Blue
    bgGradient: "from-blue-500/5 via-background to-background"
  },
  {
    id: "corporate",
    category: "ESG Infrastructure",
    title: "Corporate",
    desc: "Meet sustainable ESG goals with scalable biological infrastructure. Healthier teams, cleaner brand image, and optimized office wellness.",
    stat: "ESG Compliance Ready",
    icon: Building2,
    image: "/images/2L mk1.4.png",
    color: "#2C7D3B", // Leaf Green
    bgGradient: "from-cyan-500/5 via-background to-background"
  }
];

export default function SpatialIntegration() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-[400vh] bg-background"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* --- DYNAMIC BACKGROUND ATMOSPHERE --- */}
        <div className="absolute inset-0 z-0">
          {useCases.map((useCase, i) => {
            const step = 1 / useCases.length;
            const start = i * step;
            const end = (i + 1) * step;
            const opacity = useTransform(smoothProgress, [start - 0.1, start, end, end + 0.1], [0, 1, 1, 0]);
            
            return (
              <motion.div
                key={`bg-${useCase.id}`}
                style={{ opacity }}
                className={`absolute inset-0 bg-gradient-to-br ${useCase.bgGradient} transition-colors duration-1000`}
              />
            );
          </motion.div>
          </div>

          {/* --- CONTENT LAYOUT --- */}
        <div className="relative w-full max-w-[120rem] h-full flex flex-col px-6 lg:px-20 py-24">
          
          {/* Top Header Row */}
          <div className="flex justify-between items-start z-20 w-full mb-auto">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="max-w-xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px w-12 bg-primary/40" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Integration Strategy</span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter leading-none text-foreground font-lexend">
                Spatial <span className="premium-gradient-text italic">Adaptation.</span>
              </h2>
            </motion.div>

            <div className="hidden lg:flex flex-col items-end gap-2 text-right opacity-40 font-mono text-[8px] uppercase tracking-widest pt-2">
              <div>// BIO_SYNC_MODULE_v4</div>
              <div>// ADAPTIVE_O2_FLUX</div>
            </div>
          </div>

          {/* Central Experience Stage */}
          <div className="relative flex-1 w-full flex items-center justify-center mb-auto">
            {useCases.map((useCase, index) => {
              const step = 1 / useCases.length;
              const start = index * step;
              const end = (index + 1) * step;
              
              // Refined transform ranges for smooth flow
              const contentOpacity = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
              const contentScale = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [0.95, 1, 1, 0.95]);
              const contentY = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], [40, 0, 0, -40]);
              const pointerEvents = useTransform(smoothProgress, [start, start + 0.1, end - 0.1, end], ["none", "auto", "auto", "none"]);

              return (
                <motion.div
                  key={useCase.id}
                  style={{ opacity: contentOpacity, scale: contentScale, y: contentY, pointerEvents }}
                  className="absolute inset-0 flex flex-col lg:grid lg:grid-cols-12 items-center gap-12 lg:gap-20"
                >
                  {/* Left Side: Product Showcase (Larger use of space) */}
                  <div className="lg:col-span-7 relative w-full h-[40vh] lg:h-full flex items-center justify-center group">
                    {/* Perspective Aura */}
                    <div 
                      className="absolute inset-0 blur-[140px] opacity-10 rounded-full transition-colors duration-1000"
                      style={{ backgroundColor: useCase.color }}
                    />
                    
                    {/* Main Image in Premium Frame */}
                    <div className="relative z-10 w-full h-full bg-card/10 dark:bg-white/5 backdrop-blur-md border border-white/10 rounded-[4rem] flex items-center justify-center p-8 lg:p-20 shadow-2xl transition-all duration-700 group-hover:border-primary/20">
                      <img 
                        src={useCase.image} 
                        alt={useCase.title}
                        className="w-full h-full object-contain drop-shadow-[0_40px_40px_rgba(0,0,0,0.3)] select-none pointer-events-none transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Technical Detail Corner */}
                      <div className="absolute bottom-10 right-10 flex items-center gap-3 px-4 py-2 rounded-2xl bg-background/40 border border-white/5 backdrop-blur-xl">
                        <Sparkles className="w-3.5 h-3.5 text-primary" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-foreground font-mono">Precision_Built</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Information (Clean and aligned) */}
                  <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left font-lexend">
                    <div className="flex items-center gap-3 mb-6">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner"
                        style={{ backgroundColor: `${useCase.color}15`, color: useCase.color }}
                      >
                        <useCase.icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-0.5">
                          {useCase.category}
                        </span>
                        <div className="h-[1px] w-full bg-primary/20" />
                      </div>
                    </div>

                    <h3 className="text-4xl lg:text-6xl font-black uppercase tracking-tighter text-foreground mb-8">
                      {useCase.title}
                    </h3>
                    
                    <p className="text-lg lg:text-xl text-muted-foreground font-medium leading-relaxed mb-12 opacity-90 max-w-md">
                      {useCase.desc}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
                      <div className="flex items-center gap-4 px-6 py-4 bg-foreground/5 rounded-3xl border border-foreground/5 w-full sm:w-auto">
                        <Activity className="w-5 h-5 text-primary" />
                        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-foreground">
                          {useCase.stat}
                        </span>
                      </div>
                      
                      <Link href="/products">
                        <button className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary transition-all">
                          <span>Explore System</span>
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center transition-transform group-hover:translate-x-2">
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Progress Navigation */}
          <div className="mt-auto w-full flex justify-between items-end z-20">
            <div className="flex gap-4">
              {useCases.map((_, i) => {
                const step = 1 / useCases.length;
                const isActive = useTransform(smoothProgress, [i * step, (i + 1) * step], [1, 0]);
                return (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="w-16 h-1 bg-foreground/5 rounded-full overflow-hidden">
                      <motion.div 
                        style={{ scaleX: isActive, transformOrigin: "left" }}
                        className="absolute inset-0 bg-primary"
                      />
                    </div>
                    <span className="text-[8px] font-black font-mono opacity-30 uppercase tracking-widest">Stage_0{i + 1}</span>
                  </div>
                );
              })}
            </div>

            <motion.div 
              style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0.3]) }}
              className="flex items-center gap-4 text-muted-foreground"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Continue Descent</span>
              <div className="w-8 h-[1px] bg-muted-foreground/30" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
