import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, Sparkles, ShieldCheck, Zap, Globe, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const faqCategories = [
  {
    id: "maintenance",
    label: "Ops & Care",
    icon: Zap,
    questions: [
      {
        q: "How often do I need to change the medium?",
        a: "The microalgae medium typically needs refreshing every 4-6 months. Our smart sensors monitor nutrient density and will notify you via the app when a refresh is required."
      },
      {
        q: "Is it difficult to set up?",
        a: "It's a 'plug-and-breathe' system. Add the starter culture, fill with water, and connect to Wi-Fi. The automated internal systems handle light cycles and nutrient flow."
      },
      {
        q: "How much energy does it consume?",
        a: "Very little. High-efficiency LED grow lights and silent air pumps consume less than 15W—equivalent to a single standard LED bulb."
      }
    ]
  },
  {
    id: "safety",
    label: "Safety & Scale",
    icon: ShieldCheck,
    questions: [
      {
        q: "Is it safe for homes with pets and children?",
        a: "Yes, we use Chlorella Vulgaris, a non-toxic, food-grade microalgae. The bioreactor is hermetically sealed in medical-grade glass, ensuring zero external exposure."
      },
      {
        q: "What room size can it handle?",
        a: "Liquid Plant Pro handles up to 500 sq ft. For larger areas or open-plan offices, our industrial-scale Liquid Trees cover up to 2,500 sq ft."
      }
    ]
  },
  {
    id: "general",
    label: "Network & Access",
    icon: Globe,
    questions: [
      {
        q: "What is the expected pricing?",
        a: "Our range starts from ₹4,750 for the Liquid Plant (Desktop) up to ₹3,75,000 for industrial-scale Liquid Trees. We also offer medium refill subscriptions."
      },
      {
        q: "Who can use Air Matters?",
        a: "Anyone seeking medical-grade air. It's ideal for urban apartments, workspaces, and individuals sensitive to VOCs or urban pollutants."
      },
      {
        q: "When will the product be available?",
        a: "We are currently in final beta. Priority pre-orders are open now, with global shipping commencing in Q3 2026."
      }
    ]
  }
];

const FAQItem = ({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div 
      className={cn(
        "group border-b border-border/50 transition-all duration-500",
        isOpen ? "bg-primary/[0.02]" : "hover:bg-muted/30"
      )}
    >
      <button 
        onClick={onClick}
        className="w-full py-8 flex items-center justify-between text-left px-4"
      >
        <span className={cn(
          "text-lg md:text-xl font-black uppercase tracking-tight transition-colors duration-300",
          isOpen ? "text-primary" : "text-foreground/80"
        )}>
          {q}
        </span>
        <div className={cn(
          "w-8 h-8 rounded-full border border-border flex items-center justify-center transition-all duration-500",
          isOpen ? "rotate-180 bg-primary border-primary text-white" : "group-hover:border-primary/50"
        )}>
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 px-4 max-w-3xl">
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                {a}
              </p>
              <div className="mt-6 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-primary/40">
                <Info className="w-3 h-3" />
                Verified Documentation // Log_{Math.floor(Math.random() * 9000) + 1000}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<string | null>("maintenance-0");
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <section className="py-12 md:py-24 max-w-7xl mx-auto px-6 relative z-10 border-t border-border/10 font-lexend transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        
        {/* Technical Header */}
        <div className="lg:col-span-4 space-y-8 md:space-y-12 lg:sticky lg:top-32 h-fit text-center lg:text-left">
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 py-1.5 px-4 bg-primary/10 rounded-full border border-primary/20"
            >
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-primary">Support Intel</span>
            </motion.div>
            
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-none text-foreground uppercase">
              Common <br className="hidden md:block" />
              <span className="premium-gradient-text italic font-normal">Queries.</span>
            </h2>
            
            <p className="text-sm md:text-xl text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto lg:mx-0">
              Synthesized answers regarding our biological purification hardware and protocol.
            </p>
          </div>

          <div className="space-y-4 pt-6 md:pt-8 border-t border-border/10 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-4 group cursor-help w-full justify-center lg:justify-start">
              <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center group-hover:border-primary/50 transition-colors shadow-sm">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground">Live Support</div>
                <div className="text-xs text-muted-foreground font-medium underline underline-offset-4 cursor-pointer hover:text-primary transition-colors">Open Terminal</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ List / Mobile Category Tabs */}
        <div className="lg:col-span-8 space-y-8 md:space-y-16">
          {/* Mobile Only: Category Selector */}
          {isMobile && (
            <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide no-scrollbar -mx-2 px-2">
              {faqCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "whitespace-nowrap px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 shrink-0",
                    activeCategory === cat.id 
                      ? "bg-primary text-white border-primary shadow-glow-sm" 
                      : "bg-card text-muted-foreground border-border"
                  )}
                >
                  <cat.icon className="w-3 h-3" />
                  {cat.label}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-12">
            {faqCategories.filter(cat => !isMobile || cat.id === activeCategory).map((category) => (
              <div key={category.id} className="space-y-4">
                <div className="flex items-center gap-3 mb-6 lg:mb-8">
                  <category.icon className="w-4 h-4 text-primary" />
                  <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] text-muted-foreground/60">
                    {category.label}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
                </div>

                <div className="space-y-0 border-t border-border/50">
                  {category.questions.map((faq, idx) => {
                    const itemKey = `${category.id}-${idx}`;
                    return (
                      <FAQItem 
                        key={itemKey}
                        q={faq.q}
                        a={faq.a}
                        isOpen={openIndex === itemKey}
                        onClick={() => setOpenIndex(openIndex === itemKey ? null : itemKey)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
