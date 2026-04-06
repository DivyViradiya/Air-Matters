import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Check, 
  Leaf, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Sprout, 
  ArrowRight,
  Droplets,
  Microscope,
  Scale,
  Globe,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import DataBars3D from "@/components/3d/DataBars3D";

export default function Nutraceuticals() {
  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      {/* Hero Section - Card Contained */}
      <section className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[75vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/20 bg-background/5 backdrop-blur-md">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/download (1).jpg')" }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 backdrop-blur-sm border border-lime-500/20 text-lime-400 text-xs font-bold uppercase tracking-widest mb-8 w-fit"
            >
              <Sprout className="w-4 h-4" />
              <span>Sustainable Nutrition</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-display leading-[1.1] drop-shadow-2xl"
            >
              Nature's Tiny <br />
              <span className="text-lime-500">Superfood.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl font-light text-white/80 mb-10 leading-relaxed max-w-2xl drop-shadow-md"
            >
              Unlock the power of microalgae. Grown from clean air, packed with essential nutrients, and harvested for your health.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products">
                <Button size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full bg-lime-600 hover:bg-lime-500 text-white shadow-xl transition-all transform hover:-translate-y-1">
                  Explore Products
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="h-14 md:h-16 px-10 text-lg font-bold rounded-full backdrop-blur-sm bg-white/5 border-white/10 text-white hover:bg-white/10 transition-all">
                  The Science
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content: Nutrition & Sustainability */}
      <section className="py-24 relative overflow-hidden bg-transparent">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 space-y-8">
          
          {/* Top Section: Nutritional Powerhouse (Full Width) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-xl"
          >
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-4 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-600 text-[10px] font-bold uppercase tracking-widest">
                  Nutritional Breakdown
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                  A Nutritional Powerhouse
                </h2>
                <p className="text-muted-foreground font-medium text-lg leading-relaxed">
                  Microalgae offer a complete biological profile with zero compromises.
                </p>
              </div>

              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { t: "Antioxidants", d: "Lutein & Carotenoids for eye health.", i: Zap },
                  { t: "Omega-3 & 6", d: "Crucial for heart and brain health.", i: Heart },
                  { t: "Immune Support", d: "Natural defense system strengthening.", i: ShieldCheck },
                  { t: "Complete Protein", d: "All 9 essential amino acids.", i: Droplets }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-4 p-6 bg-background/40 backdrop-blur-sm rounded-[2rem] border border-border shadow-sm hover:shadow-md transition-all">
                    <div className="w-10 h-10 rounded-xl bg-lime-500/10 flex items-center justify-center text-lime-600">
                      <item.i className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-foreground">{item.t}</h4>
                      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Sustainability Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7"
            >
              <div className="bg-card/60 backdrop-blur-md rounded-[3rem] p-8 md:p-12 border border-border relative overflow-hidden group h-full flex flex-col">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: "url('/images/Picsart_26-02-05_16-08-17-010.jpg')" }}
                  />
                  <div className="absolute inset-0 bg-background/60" />
                </div>
                
                <div className="relative z-10 space-y-8 flex flex-col h-full">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-white/10 text-muted-foreground text-[10px] font-bold uppercase tracking-widest">
                      <Globe className="w-3 h-3" />
                      Future of Food
                    </div>
                    <h3 className="text-3xl font-bold text-foreground tracking-tight">Solution for a <br/> Growing World</h3>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                      Grows 10x faster than traditional crops using 95% less water. Zero arable land required.
                    </p>
                  </div>
                  
                  <div className="mt-auto relative z-20">
                    <div className="bg-void/80 backdrop-blur-xl rounded-[2.5rem] p-4 border border-leaf-green/20 shadow-2xl overflow-hidden relative" style={{ height: "300px" }}>
                      <DataBars3D 
                        title="Nutritional Density"
                        unit="%"
                        data={[
                          { label: "Protein", value: 60, color: "#2c7d3b" },
                          { label: "Iron", value: 35, color: "#3a9e46" },
                          { label: "B12", value: 80, color: "#7dd87a" },
                          { label: "Zinc", value: 25, color: "#56b452" },
                          { label: "Omega3", value: 45, color: "#3a9e46" },
                        ]}
                      />
                    </div>
                  </div>

                  <div className="pt-8 mt-auto">
                    <Link href="/products">
                      <Button className="w-full h-16 rounded-2xl bg-lime-600 hover:bg-lime-500 text-white font-bold shadow-xl">
                        Explore Collection
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
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
              className="lg:col-span-5 bg-card/40 backdrop-blur-md rounded-[3rem] border border-border shadow-xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-zinc-100 flex items-center justify-center">
                <img 
                  src="/images/microscopic_algae_cells.png" 
                  alt="Superfood Visual"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 text-white">
                  <div className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-1">Microscopic Precision</div>
                  <h4 className="text-xl font-bold">Nature's Technology</h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
