import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Database, 
  Activity, 
  Coins, 
  ShieldCheck, 
  Globe, 
  ArrowRight, 
  Cpu, 
  Wallet,
  Leaf,
  CheckCircle2,
  TrendingUp,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import DataBars3D from "@/components/3d/DataBars3D";

export default function CarbonCredits() {
  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      {/* Hero Section - Card Contained */}
      <section className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[75vh] md:h-[80vh] flex flex-col justify-center rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-zinc-900">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Indie Game Background.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-12 md:py-0 max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl">


            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-display leading-[0.95] drop-shadow-2xl"
            >
              The Air You <br />
              Breathe, <br />
              <span className="text-primary">Tokenized.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl font-light text-white/90 mb-8 leading-relaxed max-w-2xl drop-shadow-md"
            >
              Turn carbon capture into digital value. Verify your impact on the blockchain and earn rewards for every breath you clean.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full bg-primary hover:bg-primary/90 text-white shadow-xl transition-all transform hover:-translate-y-1">
                Start Earning
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full backdrop-blur-sm bg-white/20 border-white/10 text-white hover:bg-white/30 transition-all">
                Whitepaper
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content: Protocol & Dashboard */}
      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 space-y-8">
          
          {/* Top Section: The Eco-Protocol (Full Width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-none"
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
                  The Eco-Protocol
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                  How it Works
                </h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                  From biological capture to blockchain verification in four automated steps.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { t: "Capture", d: "Microalgae absorbs CO2 from your space.", i: Leaf },
                  { t: "Measure", d: "IoT sensors calculate the exact mass.", i: Cpu },
                  { t: "Verify", d: "Data is hashed and recorded on-chain.", i: Database },
                  { t: "Earn", d: "Tokens are minted directly to your wallet.", i: Wallet }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-4 p-6 bg-white rounded-[2rem] border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                      <item.i className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">{item.t}</h4>
                      <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Dashboard/Trust Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-12 border border-white/5 relative overflow-hidden group h-full">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] -mr-32 -mb-32 group-hover:bg-emerald-500/10 transition-colors" />
                
                <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                      <ShieldCheck className="w-3 h-3" />
                      Trustless Verification
                    </div>
                    <h3 className="text-3xl font-bold text-white tracking-tight">Don't Trust. <br/> Verify.</h3>
                    <p className="text-zinc-400 font-medium leading-relaxed">
                      Rooted in physical data collected from your device. No middlemen, no double-counting.
                    </p>
                  </div>
                  
                  {/* 3D Dashboard Chart */}
                  <div className="bg-void/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-leaf-green/20 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-pulse/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none" />
                    <DataBars3D 
                      title="Daily AIR Token Yield"
                      unit=" AIR"
                      data={[
                        { label: "Mon", value: 42, color: "#2c7d3b" },
                        { label: "Tue", value: 58, color: "#3a9e46" },
                        { label: "Wed", value: 45, color: "#2c7d3b" },
                        { label: "Thu", value: 89, color: "#7dd87a" }, // peak
                        { label: "Fri", value: 64, color: "#56b452" },
                        { label: "Sat", value: 71, color: "#56b452" },
                        { label: "Sun", value: 50, color: "#3a9e46" },
                      ]}
                    />
                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center relative z-10 pointer-events-none">
                       <div className="space-y-1">
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Total Balance</span>
                          <div className="text-xl font-mono font-bold text-white tracking-widest">2,450.00</div>
                       </div>
                       <div className="space-y-1 text-right">
                          <span className="text-[8px] font-black uppercase tracking-widest text-muted-foreground">Status</span>
                          <div className="flex items-center justify-end gap-1.5 mt-1">
                            <div className="w-2 h-2 rounded-full bg-pulse shadow-pulse-glow animate-pulse" />
                            <span className="text-[10px] font-bold text-pulse uppercase tracking-[0.2em]">Mining</span>
                          </div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image/Visual Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-5 bg-white rounded-[3rem] border border-zinc-100 shadow-xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
                {/* Replace src with your actual image path */}
                <img 
                  src="/images/website image 2.jpg" 
                  alt="Protocol Visualization"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Visualizing Impact</div>
                  <h4 className="text-xl font-bold">Nature x Blockchain</h4>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-zinc-100 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 group">
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-zinc-900 tracking-tight">Invest in the Future</h3>
                <p className="text-zinc-500 font-medium">Your lungs get fresh air. Your wallet gets fresh value.</p>
              </div>
              <Link href="/products">
                <Button size="lg" className="h-16 px-10 rounded-2xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold group/btn shadow-xl">
                  Get Your Device
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
