import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Zap, Droplets, Wind, Leaf } from "lucide-react";

const slides = [
  {
    title: "Biological Engine",
    desc: "Powered by Chlorella Vulgaris, our systems consume CO2 and release fresh, medical-grade oxygen.",
    icon: Leaf,
    color: "bg-primary",
    image: "/images/2L mk1.2.png"
  },
  {
    title: "Advanced Ionization",
    desc: "Active neutralization of PM2.5, VOCs, and pathogens using high-density biological filtration.",
    icon: Zap,
    color: "bg-blue-500",
    image: "/images/2L mk1.3.png"
  },
  {
    title: "Smart Ecosystem",
    desc: "Autonomous medium refreshing and nutrient delivery controlled by our proprietary AI engine.",
    icon: Droplets,
    color: "bg-emerald-500",
    image: "/images/2L mk1.4.png"
  },
  {
    title: "Future Infrastructure",
    desc: "Scalable solutions from desktop units to urban-scale Liquid Trees for entire city blocks.",
    icon: Wind,
    color: "bg-cyan-500",
    image: "/images/product.png"
  }
];

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-24 left-12 md:left-24 z-20">
          <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4">
            <span className="w-12 h-[2px] bg-primary" />
            <span>The Tech Stack</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] text-foreground">
            How It <br /> <span className="text-primary italic">Works.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {slides.map((slide, idx) => (
            <div key={idx} className="group relative w-[85vw] md:w-[45vw] h-[65vh] flex-shrink-0">
              <div className="absolute inset-0 rounded-[3rem] overflow-hidden border-2 border-primary/10 shadow-2xl bg-card/20 backdrop-blur-sm">
                <img 
                  src={slide.image} 
                  alt={slide.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className={`w-14 h-14 rounded-2xl ${slide.color} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                    <slide.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 leading-none">
                    {slide.title}
                  </h3>
                  <p className="text-white/70 font-medium text-lg max-w-sm leading-relaxed mb-8">
                    {slide.desc}
                  </p>
                  <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest group/btn hover:text-primary transition-colors">
                    Explore Depth <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-2" />
                  </button>
                </div>
              </div>
              
              {/* Massive background number */}
              <div className="absolute -top-12 -right-8 pointer-events-none select-none opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="text-[15rem] font-black leading-none">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
