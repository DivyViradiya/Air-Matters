import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Users, Target, Globe, Heart, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import TiltCard from "@/components/TiltCard";

export default function About() {
  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Hero Section - Card Contained */}
      <section className="pt-28 pb-12 px-4 md:px-8">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative h-[75vh] md:h-[80vh] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 bg-background">
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/Picsart_26-02-05_16-10-45-320.jpg')" }}
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl text-left">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest mb-8 w-fit"
            >
              <Users className="w-4 h-4" />
              <span>Who We Are</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-7xl md:text-8xl 3xl:text-9xl font-bold tracking-tighter text-white mb-6 font-display leading-[0.95] drop-shadow-2xl"
            >
              Our Story.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-2xl font-light text-white/80 mb-10 leading-relaxed max-w-2xl drop-shadow-md"
            >
              A journey from a single breath to a biological revolution in urban infrastructure.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div 
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/10"
             >
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('/images/hero.png')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest mb-4 opacity-80 bg-white/10 backdrop-blur-sm w-fit px-4 py-1.5 rounded-full border border-white/10">Founded 2024</div>
                  <h3 className="text-3xl md:text-4xl font-bold leading-tight">Reimagining the Air <br/> We Breathe</h3>
                </div>
             </motion.div>
             
             <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="space-y-10"
             >
               <div>
                 <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-[10px] mb-6 py-1.5 px-3 bg-primary/10 rounded-full border border-primary/20">
                   <Heart className="w-3 h-3" />
                   <span>The Origin Story</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">Born from a Breath</h2>
               </div>
               
               <div className="space-y-6 text-lg text-zinc-500 leading-relaxed font-medium">
                 <p>
                   Air Matters began with a simple question: <span className="text-foreground font-bold underline decoration-primary/30 underline-offset-4">Why do we accept that indoor air is worse than outdoor air?</span>
                 </p>
                 <p>
                   Our founders, a team of biologists and engineers, realized that mechanical filters were a dead-end technology. They trap dust but ignore the chemistry of the air. 
                 </p>
                 <div className="pl-6 border-l-4 border-primary/50 py-2 my-8">
                   <p className="italic text-zinc-800 text-2xl font-serif font-medium leading-relaxed">
                     "We didn't just want to clean the air; we wanted to heal it."
                   </p>
                 </div>
                 <p>
                   Inspired by the origins of life on Earth—where algae created the oxygen atmosphere we breathe today—we set out to shrink that planetary process into a device that fits in your living room.
                 </p>
               </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-transparent relative overflow-hidden">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-foreground tracking-tight">What We Stand For</h2>
            <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto leading-relaxed">
              Our core principles guide every decision we make.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: "Planetary Health", desc: "We believe individual wellness and environmental health are inseparable.", color: "emerald" },
              { icon: Target, title: "Radical Transparency", desc: "We verify our impact with data, not just claims. Hence our carbon credit program.", color: "blue" },
              { icon: Users, title: "Democratized Access", desc: "Clean air is a human right. We aim to make our technology accessible to all.", color: "primary" },
            ].map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <TiltCard className="h-full">
                  <div className="bg-background/40 backdrop-blur-sm border border-border p-10 rounded-[2.5rem] flex flex-col items-center text-center hover:shadow-xl transition-all group h-full">
                    <div className={`w-16 h-16 bg-${val.color}-500/10 rounded-2xl flex items-center justify-center mb-8 text-${val.color}-500 shadow-inner group-hover:scale-110 transition-transform`}>
                      <val.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{val.title}</h3>
                    <p className="text-zinc-500 font-medium leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="pt-24 pb-12 bg-background/50 relative">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 text-center">
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
           >
             <h2 className="text-4xl md:text-5xl font-bold mb-16 text-foreground tracking-tight">The Team</h2>
           </motion.div>
           
           <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
             {[1, 2, 3, 4].map((i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.1 }}
                 className="group"
               >
                 <TiltCard maxDeg={12}>
                   <div className="aspect-square bg-background/40 backdrop-blur-sm rounded-[2rem] mb-6 overflow-hidden shadow-sm border border-border relative">
                     <div className="absolute inset-0 bg-muted/20 flex items-center justify-center text-muted-foreground/30">
                        <Users className="w-16 h-16" />
                     </div>
                   </div>
                 </TiltCard>
                 <h3 className="font-bold text-xl mb-1 text-foreground group-hover:text-primary transition-colors">Team Member {i}</h3>
                 <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Co-Founder / Role</p>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </div>
  );
}
