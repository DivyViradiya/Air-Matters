import { Input } from "@/components/ui/input";
import { 
  Twitter, 
  Linkedin, 
  Instagram, 
  Youtube, 
  ArrowUpRight, 
  Globe,
  ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.getElementById('main-footer')?.getBoundingClientRect();
      if (rect) {
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscription Confirmed",
      description: "You've been added to our primary mailing list.",
    });
    setEmail("");
  };

  const currentYear = new Date().getFullYear();

  const sections = [
    {
      title: "Solutions",
      links: [
        { label: "Liquid Plant Pro", href: "/products" },
        { label: "Liquid Tree", href: "/products" },
        { label: "Carbon Protocol", href: "/carbon-credits" },
        { label: "Future Biomass", href: "/nutraceuticals" }
      ]
    },
    {
      title: "Company",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "The Science", href: "/how-it-works" },
        { label: "Vision 2030", href: "/vision" },
        { label: "Research", href: "/about" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/how-it-works" },
        { label: "Media Kit", href: "/about" },
        { label: "Contact", href: "/about" },
        { label: "Support", href: "/about" }
      ]
    }
  ];

  return (
    <footer id="main-footer" className="relative pt-16 pb-8 overflow-hidden bg-background border-t border-border font-lexend transition-colors duration-500">
      {/* Desktop Cursor Glow */}
      <motion.div 
        className="hidden lg:block absolute pointer-events-none z-0 opacity-20 blur-[120px] w-[500px] h-[500px] rounded-full bg-primary"
        style={{
          left: springX,
          top: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="space-y-6">
              <Link href="/">
                <div className="flex items-center justify-center lg:justify-start gap-3 cursor-pointer group">
                  <img src="/images/original logo.png" alt="Air Matters" className="h-8 md:h-10 w-auto dark:brightness-100 brightness-0 opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
              
              <h2 className="text-3xl md:text-4xl font-black tracking-tighter leading-[1.1] text-foreground uppercase">
                Engineering <br className="hidden lg:block" />
                the <span className="premium-gradient-text italic font-normal">future</span> <br className="hidden lg:block" />
                of air.
              </h2>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <p className="text-[10px] md:text-xs text-muted-foreground font-black uppercase tracking-widest">Biological Intelligence Feed</p>
              <form onSubmit={handleNewsletterSubmit} className="relative group w-full">
                <Input
                  type="email"
                  placeholder="Terminal Email Access"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 bg-card border-border focus:border-primary/40 focus:ring-0 transition-all rounded-xl text-sm font-medium pr-24"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-foreground text-background text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  Join
                </button>
              </form>
            </div>

            <div className="flex justify-center lg:justify-start gap-6">
              {[Twitter, Linkedin, Instagram, Youtube].map((Icon, idx) => (
                <a 
                  key={idx} 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-all hover:scale-110 active:scale-90 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:grid lg:col-span-7 grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 lg:pl-12 pt-2">
            {sections.map((section) => (
              <div key={section.title} className="space-y-6 text-left">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href}
                        className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-all flex items-center group gap-1 cursor-pointer"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Navigation - Mobile */}
          <div className="md:hidden w-full border-t border-border mt-12">
            <Accordion type="single" collapsible className="w-full">
              {sections.map((section) => (
                <AccordionItem key={section.title} value={section.title} className="border-border px-2">
                  <AccordionTrigger className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/50 py-6 hover:no-underline cursor-pointer">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-4 pb-6 pl-2">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link 
                            href={link.href}
                            className="text-[13px] font-bold text-muted-foreground hover:text-primary transition-all block py-1 cursor-pointer"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 pb-4 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-10 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground/60">
            
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
              <span className="opacity-40">© {currentYear} Air Matters // Bio-Protocol v2.0.4</span>
              <div className="flex items-center gap-2 text-primary bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
                <Globe className="w-3 h-3" />
                India Terminal
              </div>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors cursor-pointer">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors cursor-pointer">Terms</Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors cursor-pointer">Security</Link>
            </div>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 hover:text-primary transition-all cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-primary transition-colors bg-card shadow-sm">
                <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform text-primary" />
              </div>
              <span className="text-[8px] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">System Return</span>
            </button>

          </div>
        </div>
      </div>
    </footer>

  );
}
