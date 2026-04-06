import { useRef } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Leaf, 
  Wind, 
  Droplets, 
  Zap, 
  Sparkles, 
  LayoutDashboard, 
  Activity, 
  Coins, 
  Heart, 
  CheckCircle2,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Loader2
} from "lucide-react";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-transparent">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Header Section - Card Contained */}
      <section className="pt-28 pb-6 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative min-h-[40vh] md:min-h-[45vh] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 bg-background/5 backdrop-blur-md">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: "url('/images/675b0a116f854ecee24b83d4_Algae Water2.png')" }}
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          </div>
          
          {/* Animated Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 animate-pulse" />

          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 py-12 max-w-4xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white text-xs font-bold uppercase tracking-widest mb-6 w-fit"
            >
              <LayoutDashboard className="w-4 h-4 text-primary" />
              <span>User Dashboard</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white mb-4 font-display leading-tight drop-shadow-2xl"
            >
              Welcome, {user?.name?.split(' ')[0] || 'Bio-Citizen'}. <br />
              <span className="text-primary text-3xl sm:text-5xl md:text-6xl">Your Ecosystem is Active.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl font-light text-white/90 mb-0 leading-relaxed max-w-2xl drop-shadow-lg mt-4"
            >
              Monitor your impact, manage your devices, and track your earned carbon credits in real-time.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 space-y-8">
        
        {/* Stats Section - Compact Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "O2 Produced", value: "14.2L", icon: Wind, color: "accent" },
            { label: "CO2 Captured", value: "8.4kg", icon: Leaf, color: "primary" },
            { label: "Credits Earned", value: "124 AIR", icon: Coins, color: "amber" },
            { label: "Health Score", value: "98/100", icon: Heart, color: "rose" },
          ].map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-card/60 backdrop-blur-md border border-border p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all group"
            >
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform",
                stat.color === 'primary' ? "bg-primary/10 text-primary" : (stat.color === 'accent' ? "bg-accent/10 text-accent" : `bg-${stat.color}-500/10 text-${stat.color}-500`)
              )}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Live Monitor & Device Status */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch pb-24">
          
          {/* Live Monitor Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-card/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-border relative overflow-hidden group flex flex-col"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mb-32 group-hover:bg-primary/10 transition-colors" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 text-primary font-bold text-[10px] uppercase tracking-widest">
                    <Activity className="w-3 h-3" /> Live Feed
                  </div>
                  <h3 className="text-3xl font-bold text-foreground tracking-tight">Air Quality Index</h3>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Active
                </div>
              </div>

              {/* Data Visualization Placeholder */}
              <div className="bg-background/40 rounded-[2.5rem] p-8 border border-border shadow-2xl flex-grow flex items-center justify-center min-h-[200px]">
                 <div className="text-center space-y-4">
                    <div className="flex justify-center gap-4">
                       {[40, 70, 55, 90, 60, 85].map((h, i) => (
                         <div key={i} className="w-3 bg-primary/20 rounded-full relative overflow-hidden h-24">
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: `${h}%` }}
                              transition={{ duration: 1, delay: i * 0.1 }}
                              className="absolute bottom-0 left-0 w-full bg-primary"
                            />
                         </div>
                       ))}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">System Synchronized</div>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                {[
                  { l: "PM2.5", v: "12 μg/m³", s: "Good" },
                  { l: "VOCs", v: "0.4 ppm", s: "Normal" },
                  { l: "CO2", v: "420 ppm", s: "Optimal" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-background/40 rounded-2xl p-4 border border-border">
                    <div className="text-[8px] font-black uppercase tracking-widest text-muted-foreground mb-1">{item.l}</div>
                    <div className="text-lg font-bold text-foreground">{item.v}</div>
                    <div className="text-[8px] font-bold text-primary uppercase">{item.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Device Status Column */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Status Card */}
            <div className="bg-card/60 backdrop-blur-md rounded-[3rem] p-8 md:p-10 border border-border flex flex-col h-full">
              <div className="mb-10 space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  <Zap className="w-3 h-3" /> Device Health
                </div>
                <h3 className="text-2xl font-bold text-foreground tracking-tight">Liquid Plant Pro</h3>
              </div>

              <div className="space-y-4">
                {[
                  { t: "Medium Health", d: "Change in 12 days", v: "85%", i: Droplets, c: "primary" },
                  { t: "Ionizer Status", d: "Optimal Performance", v: "Active", i: Sparkles, c: "accent" },
                  { t: "Network Sync", d: "Last seen 2m ago", v: "Cloud", i: ShieldCheck, c: "primary" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-5 bg-background/40 border border-border shadow-sm rounded-[2rem]">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shadow-inner",
                        item.c === 'primary' ? "bg-primary/10 text-primary" : (item.c === 'accent' ? "bg-accent/10 text-accent" : `bg-${item.c}-500/10 text-${item.c}-500`)
                      )}>
                        <item.i className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground">{item.t}</div>
                        <div className="text-[10px] text-muted-foreground font-medium">{item.d}</div>
                      </div>
                    </div>
                    <div className="text-sm font-black text-foreground">{item.v}</div>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-10">
                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl">
                  System Diagnostics
                </Button>
              </div>
            </div>
          </motion.div>

        </div>

        <section className="pb-24 border-t border-zinc-100 pt-24">
          <FAQSection />
        </section>
      </div>

      <Footer />
    </div>
  );
}
