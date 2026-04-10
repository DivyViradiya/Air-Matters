import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Shield, User as UserIcon, Activity, Database, Zap, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Systems" },
    { 
      label: "Solutions",
      children: [
        { href: "/air-matters", label: "Biological Purification", description: "Our core technology transforming CO2 into oxygen." },
        { href: "/carbon-credits", label: "Protocol & Credits", description: "Measuring and monetizing your environmental impact." },
        { href: "/nutraceuticals", label: "Yield Systems", description: "High-value nutritional byproducts from our networks." },
      ]
    },
    { href: "/products", label: "Products" },
    { href: "/vision", label: "Vision" },
    { href: "/how-it-works", label: "Engineering" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
      isScrolled ? "pt-2" : "pt-4 md:pt-6"
    )}>
      <div className="max-w-[120rem] mx-auto px-4 md:px-6 grid grid-cols-12 items-center">

        {/* Left: Brand Identity */}
        <div className="col-span-8 md:col-span-3 flex justify-start items-center gap-4 md:gap-6">
          <Link href="/">
            <div className="flex items-center gap-3 md:gap-4 cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <img 
                  src="/images/original%20logo.png" 
                  alt="Air Matters" 
                  className="h-10 md:h-14 w-auto relative z-10 transition-transform group-hover:scale-105" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-2xl font-extrabold uppercase tracking-[-0.05em] text-foreground leading-[0.8] font-syne xl:block" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Air <br /> <span className="text-primary italic">Matters</span>
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center: HUD Navigation Capsule (Hidden on mobile) */}
        <div className="hidden lg:col-span-6 lg:flex justify-center">
          <div className={cn(
            "px-2 py-1.5 rounded-full border transition-all duration-500 flex items-center gap-1",
            isScrolled 
              ? "bg-background shadow-2xl border-primary/20" 
              : "bg-background/40 backdrop-blur-3xl border-border/10 shadow-sm"
          )}>
            <div className="flex items-center">
              {links.map((link) => {
                const isActive = location === link.href || link.children?.some(c => location === c.href);

                if (link.children) {
                  return (
                    <NavigationMenu key={link.label}>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className={cn(
                            "bg-transparent hover:bg-primary/5 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all h-10 border-none outline-none focus:bg-primary/5",
                            isActive ? "text-primary bg-primary/5" : "text-foreground/70"
                          )}>
                            {link.label}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="bg-background rounded-[2rem] p-4 shadow-2xl w-80 mt-4 grid grid-cols-1 gap-1 border border-border/40">
                              {link.children.map((child) => (
                                <li key={child.label}>
                                  <Link href={child.href}>
                                    <NavigationMenuLink
                                      asChild
                                      className={cn(
                                        "block w-full cursor-pointer px-5 py-4 rounded-xl border border-transparent transition-all group/item",
                                        location === child.href
                                          ? "text-primary border-primary/10 bg-primary/5"
                                          : "text-foreground/70 hover:border-border/10 hover:bg-muted/50 hover:text-primary"
                                      )}
                                    >
                                      <div>
                                        <div className="text-[10px] font-black tracking-widest mb-1 uppercase group-hover/item:translate-x-1 transition-transform">{child.label}</div>
                                        <div className="text-[9px] leading-relaxed text-muted-foreground font-medium opacity-60">{child.description}</div>
                                      </div>
                                    </NavigationMenuLink>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  );
                }

                return (
                  <Link 
                    key={link.label} 
                    href={link.href}
                    className={cn(
                      "px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all h-10 flex items-center justify-center whitespace-nowrap",
                      isActive 
                        ? "text-primary bg-primary/5 shadow-[inset_0_0_10px_rgba(86,180,82,0.05)]" 
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Auth & Toggle */}
        <div className="col-span-4 md:col-span-3 flex justify-end items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="p-1 bg-primary/5 rounded-full border border-primary/10 hidden sm:block">
              <ThemeToggle />
            </div>
            {user ? (
              <Link href="/profile">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 cursor-pointer hover:bg-primary/20 transition-all group">
                  <UserIcon className="w-3 h-3 md:w-4 md:h-4 text-primary group-hover:scale-110 transition-transform" />
                </div>
              </Link>
            ) : (
              <div className="hover:scale-105 active:scale-95 transition-transform hidden sm:block">
                  <Link href="/login">
                    <Button size="sm" className="rounded-xl px-7 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:-translate-y-0.5 h-11">
                      Login
                    </Button>
                  </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden ml-1">
             <button
               onClick={() => setIsOpen(!isOpen)}
               className="p-2 md:p-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-all"
             >
               {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
             </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Technical Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden fixed inset-0 z-[110] bg-background/98 backdrop-blur-3xl flex flex-col p-6 pt-24 overflow-y-auto"
          >
            <div className="absolute top-6 right-6 flex items-center gap-4">
               <div className="p-1 bg-primary/5 rounded-full border border-primary/10">
                 <ThemeToggle />
               </div>
               <button onClick={() => setIsOpen(false)} className="p-3 rounded-full bg-primary/10 text-primary">
                 <X className="h-6 w-6" />
               </button>
            </div>

            <div className="space-y-10">
              <div className="text-[10px] font-black text-primary uppercase tracking-[0.5em] mb-6 border-b border-primary/20 pb-4">System Access Point</div>
              <div className="grid gap-6">
                {links.map((link) => (
                  <div key={link.label} className="space-y-4">
                    {link.href ? (
                      <Link href={link.href} onClick={() => setIsOpen(false)}>
                        <div className="group cursor-pointer">
                          <div className="text-3xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors flex items-center justify-between">
                            {link.label}
                            <ArrowRight className="w-6 h-6 text-primary" />
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{link.label}</div>
                        <div className="grid gap-4 pl-4 border-l border-primary/20">
                          {link.children?.map((child) => (
                            <Link key={child.label} href={child.href} onClick={() => setIsOpen(false)}>
                              <div className="group cursor-pointer">
                                <div className="text-xl font-black uppercase tracking-tighter text-foreground/80 group-hover:text-primary transition-colors">
                                  {child.label}
                                </div>
                                <div className="text-[9px] text-muted-foreground font-medium uppercase tracking-widest opacity-60">{child.description}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/10 flex flex-col gap-8">
               <div className="flex justify-between items-center">
                 <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Neural Sync: Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Database className="w-3.5 h-3.5 text-primary" />
                      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted-foreground">Protocol: v2.0.4</span>
                    </div>
                 </div>
                 {!user && (
                    <Link href="/login">
                      <Button onClick={() => setIsOpen(false)} size="sm" className="rounded-xl px-7 font-bold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90 text-white transition-all hover:-translate-y-0.5 h-11">
                        Login
                      </Button>
                    </Link>
                 )}
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
