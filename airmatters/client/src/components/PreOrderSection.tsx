import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Mail, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function PreOrderSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Added to Waitlist",
        description: "We'll notify you as soon as pre-orders go live.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-24 bg-background relative overflow-hidden font-lexend transition-colors duration-500">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl aspect-square bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="bg-card border border-border rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 overflow-hidden relative shadow-2xl">
          
          {/* Decorative lines */}
          <div className="absolute top-0 right-0 p-8 opacity-5 md:opacity-10 pointer-events-none">
            <Zap className="w-24 h-24 md:w-32 md:h-32 text-primary" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-primary">Priority Access: Open</span>
              </motion.div>

              <div className="space-y-4 md:space-y-6">
                <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">
                  Be the first to <br />
                  <span className="premium-gradient-text italic font-normal">Breathe better.</span>
                </h2>
                <p className="text-base md:text-xl text-muted-foreground font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
                  Join the exclusive waitlist for our Q3 2026 deployment. Early adopters receive founding-member pricing and priority hardware allocation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-60">Starting at</span>
                  <div className="text-3xl md:text-4xl font-black text-foreground tabular-nums">₹4,750</div>
                </div>
                <div className="text-[10px] font-black text-primary uppercase tracking-widest px-3 py-1 rounded-md bg-primary/5 border border-primary/10">
                  Pre-Order pricing
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <Link 
                  href="/products"
                  className="px-8 py-4 bg-foreground text-background rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2 group shadow-xl"
                >
                  View Catalog
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border border-border bg-foreground/5 backdrop-blur-sm">
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">30-Day Bio-Guarantee</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-background/40 border border-border rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 backdrop-blur-xl shadow-2xl relative z-10"
              >
                <div className="space-y-6 md:space-y-8">
                  <div className="text-center space-y-2">
                    <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-foreground">Join the Waitlist</h3>
                    <p className="text-[11px] md:text-sm text-muted-foreground font-medium uppercase tracking-widest opacity-60">No credit card required. Just your interest.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        type="email" 
                        placeholder="Enter your email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-12 h-14 md:h-16 bg-background border-border rounded-xl focus:border-primary transition-all text-base font-medium"
                      />
                    </div>
                    <Button 
                      disabled={isSubmitting}
                      className="w-full h-14 md:h-16 rounded-xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs md:text-sm shadow-xl active:scale-95 transition-all"
                    >
                      {isSubmitting ? "Adding..." : "Secure My Spot"}
                    </Button>
                  </form>

                  <div className="grid grid-cols-1 gap-3 pt-4 border-t border-border">
                    {[
                      "Early Bird Allocation",
                      "Founding Member Tokens",
                      "Beta Testing Opportunities"
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3 text-[8px] md:text-[9px] font-black uppercase tracking-widest text-muted-foreground/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
