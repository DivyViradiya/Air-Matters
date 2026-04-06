import { useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  Check, 
  Wind, 
  Droplets, 
  Zap, 
  Shield, 
  ArrowRight, 
  Sparkles, 
  Star, 
  Leaf, 
  Microscope, 
  ShoppingBag 
} from "lucide-react";
import BiologicalComparison from "@/components/BiologicalComparison";
import Footer from "@/components/Footer";

const products = [
  {
    id: "home",
    name: "Liquid Plant",
    tagline: "For your living room",
    price: "₹4,750",
    description: "The perfect balance of performance and aesthetics. Designed for rooms up to 500 sq ft.",
    features: ["Generates 1.6L Oxygen/day", "CO2 Reduction: 3g/day", "AI assisted monitoring", "Advanced ionizing technology"],
    image: "/images/product.png",
    popular: true,
  },
  {
    id: "pro",
    name: "Liquid Tree",
    tagline: "For offices & large spaces",
    price: "₹3,75,000",
    description: "Maximum efficiency for open plan spaces. Bio-filtering power equivalent to 15 trees.",
    features: ["Generates 700g Oxygen/day", "CO2 Reduction: 960g/day", "AI assisted monitoring", "Advanced air ionising"],
    image: "/images/liquid-tree.png",
    video: "/videos/650L 2.mp4",
    popular: false,
  },
  {
    id: "mini",
    name: "Liquid Plant Pro",
    tagline: "For bedrooms & desktops",
    price: "₹27,000",
    description: "Compact personal air revitalizer. Create a bubble of fresh air around your workspace.",
    features: ["Generates 12g Oxygen/day", "CO2 Reduction: 16g/day", "AI assisted monitoring", "Advanced ionizing tech"],
    image: "/images/liquid-plant.png",
    popular: false,
  }
];

export default function Products() {
  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Hero Section - Compact & Clean */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto relative">
          <div className="relative z-10 max-w-4xl 3xl:max-w-5xl 4xl:max-w-6xl text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl 3xl:text-8xl font-bold tracking-tighter text-foreground mb-4 font-display leading-tight"
            >
              Our Collection.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-medium text-muted-foreground leading-relaxed max-w-2xl"
            >
              Choose the perfect biological air purifier for your space. Engineered to be the last air solution you'll ever need.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 relative z-10 mb-8">
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="h-full"
            >
              <div 
                className={`glass-card glass-card-hover h-full flex flex-col relative overflow-hidden group ${product.popular ? 'border-primary/30 ring-1 ring-primary/10' : 'border-border shadow-sm'}`}
              >
                {product.popular && (
                  <div className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-black z-20 shadow-2xl flex items-center gap-1.5 uppercase tracking-widest">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                )}
                
                {/* Full-bleed Image Section */}
                <div className="aspect-square relative overflow-hidden bg-zinc-100">
                   <motion.div 
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 0.6 }}
                     className="w-full h-full"
                   >
                      {product.video ? (
                        <video 
                          src={product.video} 
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                          playsInline
                        />
                      ) : (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover" 
                        />
                      )}
                   </motion.div>
                </div>

                <div className="p-8 flex flex-col flex-grow relative z-10 bg-background/40 backdrop-blur-sm">
                  <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-1 text-foreground">{product.name}</h3>
                    <p className="text-[10px] text-primary font-black mb-4 uppercase tracking-widest opacity-80">{product.tagline}</p>
                    <div className="text-4xl font-bold tracking-tight text-foreground">{product.price}</div>
                  </div>

                  <p className="text-base text-muted-foreground font-medium mb-8 leading-relaxed flex-grow">
                    {product.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-xs font-bold text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="opacity-90">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/products/${product.id}`}>
                    <Button className="w-full text-lg h-14 rounded-2xl shadow-xl hover:shadow-primary/20 transition-all font-bold">
                      Pre-order Now
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Section (Component) */}
      <BiologicalComparison />

      {/* Pollutant Filtering Section - Compact */}
      <section className="pt-4 pb-12 overflow-hidden relative">
         <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 relative z-10">
           <div className="text-left mb-20 space-y-3">
              <div className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">Capabilities</div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">What We Filter</h2>
              <p className="text-lg text-muted-foreground font-medium max-w-2xl leading-relaxed">
                Designed to tackle the most persistent indoor pollutants.
              </p>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
             {[
               { title: "Allergens", icon: Microscope, tag: "Biological" },
               { title: "Mould & Viruses", icon: Shield, tag: "Pathogens" },
               { title: "Pet Dander", icon: Star, tag: "Physical" },
               { title: "Odours", icon: Wind, tag: "Chemical" },
               { title: "Dust", icon: Sparkles, tag: "Particulate" },
               { title: "VOCs", icon: Droplets, tag: "Chemical" },
               { title: "Pollution", icon: Zap, tag: "Environmental" },
               { title: "CO2", icon: Leaf, tag: "Core Tech" }
             ].map((item, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: i * 0.05 }}
                 className="flex flex-col items-center text-center group"
               >
                 <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-card/40 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center p-8 shadow-xl group-hover:bg-card/60 transition-all duration-500 hover:shadow-primary/10 hover:-translate-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className="w-10 h-10 md:w-12 md:h-12 mb-4 text-primary relative z-10 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                    <h4 className="font-bold text-base md:text-xl text-foreground relative z-10">{item.title}</h4>
                    <div className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 relative z-10 mt-2">{item.tag}</div>
                 </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      <Footer />
    </div>
  );
}
