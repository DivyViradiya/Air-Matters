import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { 
  TrendingUp, 
  ArrowDown,
  ArrowLeftRight,
  FileCheck,
  Tag,
  TreePine,
  Lock,
  Car,
  Trees,
  ChevronDown,
  Globe,
  Zap,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import { useState, useRef } from "react";
import SmoothScroll from "@/components/SmoothScroll";

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 md:py-5 flex items-center justify-between text-left group transition-colors"
      >
        <span className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-muted-foreground transition-transform duration-300", isOpen && "rotate-180 text-primary")} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-muted-foreground leading-relaxed max-w-3xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function CarbonCredits() {
  const howItWorksRef = useRef<HTMLDivElement>(null);

  const scrollToHowItWorks = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-background selection:bg-primary selection:text-white font-lexend overflow-hidden">
        {/* Hero Section */}
        <section className="pt-24 pb-6 px-4 md:px-8">
          <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative min-h-[40vh] flex flex-col justify-center items-start rounded-[3rem] overflow-hidden shadow-2xl border border-border bg-card px-8 md:px-24 py-8 text-left">

            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-60 transition-opacity"
                style={{ backgroundImage: "url('/images/Indie Game Background.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-primary/10 dark:from-black/80 dark:via-black/30 dark:to-emerald-950/10" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[9px] font-black uppercase tracking-widest"
              >
                <TrendingUp className="w-3 h-3" />
                Proof of Purification Protocol
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-foreground font-display leading-[0.9] drop-shadow-2xl"
              >
                The Air You <br />
                Breathe, <br />
                <span className="premium-gradient-text italic font-normal">Tokenized.</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed drop-shadow-md max-w-xl"
              >
                Every breath your device cleans earns you AIR tokens. <br />
                <span className="text-foreground font-bold border-b border-primary/40 pb-1">Real value, automatically verified on-chain.</span>
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 items-start"
              >
                <Button 
                  onClick={scrollToHowItWorks}
                  size="lg" 
                  className="h-14 px-10 text-base font-bold rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 transition-all transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  See how it works
                  <ArrowDown className="ml-2 w-4 h-4" />
                </Button>
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="h-14 px-10 text-base font-bold rounded-xl backdrop-blur-sm bg-card/20 border border-border text-foreground hover:bg-card/40 transition-all w-full sm:w-auto">
                    Start Earning
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div ref={howItWorksRef} className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 space-y-20 py-16">
          
          {/* 1. Token Utility Section */}
          <section className="space-y-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                <div className="w-8 h-px bg-primary/40" />
                <span>Value Proposition</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9] mb-6">
                What are <br /> <span className="premium-gradient-text italic font-normal">AIR Tokens Worth?</span>
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                The #1 question: "What can I actually do with them?" Your AIR tokens represent verified environmental work and ecosystem utility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { t: "Trade on DEX", d: "Convert AIR tokens to other assets on decentralized exchanges.", i: ArrowLeftRight },
                { t: "Carbon Certificates", d: "Redeem for official carbon offset certificates for your business or personal use.", i: FileCheck },
                { t: "Product Discounts", d: "Use tokens to get exclusive pricing on future Air Matters hardware and filters.", i: Tag },
                { t: "Donate to Nature", d: "Directly fund verified global reforestation projects through our non-profit partners.", i: TreePine },
                { t: "Hold and Stake", d: "Secure the network and earn additional rewards by participating in protocol governance.", i: Lock },
                { t: "Ecosystem Access", d: "Gain priority access to limited edition drops and beta software features.", i: Zap }
              ].map((path, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-[2.5rem] bg-transparent border border-border dark:border-white/10 hover:border-primary/40 transition-colors group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <path.i className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-black text-foreground uppercase tracking-tight mb-3">{path.t}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed font-medium">{path.d}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-transparent border border-border dark:border-white/10 rounded-[2rem] p-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground rounded-lg font-black uppercase text-[10px] tracking-widest mb-4">
                Roadmap Status
              </div>
              <p className="text-foreground font-bold text-lg">
                AIR token utility launches <span className="premium-gradient-text italic">Q3 2025.</span>
              </p>
              <p className="text-muted-foreground text-sm mt-2">Join the waitlist to be among the first to participate in the full economy.</p>
            </div>
          </section>

          {/* 2. Real World Carbon Impact */}
          <section className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                  <div className="w-8 h-px bg-primary/40" />
                  <span>Physical Reality</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground leading-[0.9]">
                  Tangible <br /> <span className="premium-gradient-text italic font-normal">Environmental Impact.</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium">
                  AIR tokens aren't just numbers on a screen. They represent the literal removal of CO<sub>2</sub> from your immediate surroundings.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { l: "Driving Equivalent", v: "120km driven", d: "CO2 sequestered every 30 days", i: Car },
                  { l: "Tree Power", v: "20 Large Plants", d: "Purification power of a small indoor forest", i: Trees },
                  { l: "Atmospheric Restoration", v: "99.9% Purity", d: "Clinical grade output at the source", i: Globe }
                ].map((stat, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <stat.i className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{stat.l}</div>
                      <div className="text-2xl font-black text-foreground leading-tight">{stat.v}</div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="glass-card p-12 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
                <div className="relative z-10 space-y-8">
                  <div className="text-[10px] font-black text-primary uppercase tracking-[0.4em]">Global Network Impact</div>
                  <div className="space-y-2">
                    <div className="text-6xl md:text-8xl font-mono font-bold text-foreground tracking-tighter tabular-nums">42,804.12</div>
                    <div className="text-2xl font-black text-muted-foreground uppercase tracking-widest italic">TONNES OF CO<sub>2</sub> OFFSET</div>
                  </div>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Air Matters devices have collectively offset enough carbon to ground 15,000 trans-atlantic flights.
                  </p>
                  <div className="flex items-center justify-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest pt-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Network Growing Daily
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. FAQ Section */}
          <section className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
                <div className="w-8 h-px bg-primary/40" />
                <span>Knowledge Base</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">FAQ</h2>
              <p className="text-muted-foreground font-medium">Everything you need to know about the Air Matters token economy.</p>
            </div>

            <div className="max-w-4xl mx-auto border-t border-border">
              {[
                { 
                  q: "Is this real money?", 
                  a: "AIR tokens represent a digital asset with value backed by verified carbon sequestration. While they can be traded on exchanges, their primary utility is within the Air Matters ecosystem for product redemptions, offsets, and governance." 
                },
                { 
                  q: "Do I need a crypto wallet?", 
                  a: "No technical knowledge is required. We provide a completely guided, automatic wallet setup during your device onboarding. You can view your balance and impact directly in the Air Matters app." 
                },
                { 
                  q: "What happens if token value drops?", 
                  a: "Your environmental impact is the constant. The primary value of the device is the air it purifies for you. Tokens are a bonus representation of that physical work; their value may fluctuate, but the oxygen produced does not." 
              },
              { 
                q: "How is the carbon measurement verified?", 
                a: "Every device is equipped with precision IoT biomass sensors that measure the physical growth of the algae colonies in real-time. This 'Proof of Growth' data is cross-referenced with air quality sensors and committed to the blockchain." 
              },
              { 
                q: "I don't know anything about crypto — can I still participate?", 
                a: "Absolutely. We've designed the experience to be as simple as using any smart home device. All 'crypto' elements happen in the background. You just clean your air and watch your rewards grow." 
              },
              { 
                q: "What blockchain is this on?", 
                a: "The protocol is built on the Polygon network to ensure high transaction efficiency, near-zero fees, and a minimal environmental footprint consistent with our mission." 
              }
            ].map((faq, idx) => (
              <FAQItem key={idx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Bottom Industrial CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card p-12 md:p-20 text-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.05),transparent_70%)]" />
          <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary text-primary-foreground rounded-xl font-black uppercase text-[10px] tracking-[0.3em]">
              System Ready for Deployment
            </div>
            <h3 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-foreground leading-none">
              Initialize <br />
              <span className="premium-gradient-text italic font-normal">Your Protocol.</span>
            </h3>
            <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Join the global network of biological air purification. Start earning AIR tokens today.
            </p>
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/products">
                <Button size="lg" className="h-16 px-12 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black uppercase tracking-widest text-xs shadow-xl transition-all hover:-translate-y-1">
                  Get Your Device
                </Button>
              </Link>
              <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Network Slots Available
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      <Footer />
    </div>
    </SmoothScroll>
  );
}
