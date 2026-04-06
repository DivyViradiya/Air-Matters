import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { 
  Check, 
  ArrowLeft, 
  ArrowRight, 
  Wind, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  Star, 
  Leaf, 
  Microscope,
  Cpu,
  Activity,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import BiologicalComparison from "@/components/BiologicalComparison";

const productData = {
  "home": {
    name: "Liquid Plant",
    tagline: "The Future of Home Air",
    price: "₹4,750",
    description: "The perfect balance of performance and aesthetics. Designed for living rooms and larger bedrooms up to 500 sq ft. This isn't just an air purifier; it's a living piece of furniture that regenerates your environment.",
    longDescription: "Our entry-level bioreactor utilizes a proprietary blend of microalgae strains specifically optimized for indoor environments. It silently draws in air, strips it of CO2 and particulate matter, and releases a continuous stream of fresh, clinical-grade oxygen.",
    features: [
      "Generates 1.6L Oxygen/day",
      "CO2 Reduction: 3g/day",
      "AI assisted monitoring",
      "Advanced ionizing technology",
      "Silent 20dB operation",
      "Low maintenance cycle (30 days)"
    ],
    specs: [
      { label: "Coverage", value: "500 sq ft" },
      { label: "Dimensions", value: '12" x 12" x 24"' },
      { label: "Weight", value: "4.5 kg (Empty)" },
      { label: "Power", value: "12W LED Peak" }
    ],
    image: "/images/product.png"
  },
  "pro": {
    name: "Liquid Tree",
    tagline: "Corporate Bio-Infrastructure",
    price: "₹3,75,000",
    description: "Maximum efficiency for open plan spaces, offices, and commercial environments. Bio-filtering power equivalent to 15 fully grown trees.",
    longDescription: "The Liquid Tree is a high-capacity industrial bioreactor. It features advanced fluid dynamics to maximize algae-to-air interface, ensuring rapid CO2 sequestration and massive oxygen output. Integrated with Building Management Systems (BMS) for automated air quality balancing.",
    features: [
      "Generates 700g Oxygen/day",
      "CO2 Reduction: 960g/day",
      "BMS Integration",
      "Advanced air ionising",
      "IoT Carbon Credit mining",
      "Automatic nutrient dosing"
    ],
    specs: [
      { label: "Coverage", value: "5,000 sq ft" },
      { label: "Dimensions", value: "4' x 4' x 8'" },
      { label: "Weight", value: "120 kg (Empty)" },
      { label: "Power", value: "150W System Peak" }
    ],
    image: "/images/liquid-tree.png"
  },
  "mini": {
    name: "Liquid Plant Pro",
    tagline: "Personal Air Sanctuary",
    price: "₹27,000",
    description: "Compact personal air revitalizer. Create a bubble of fresh air around your workspace or bedside. Engineered for focused concentration and deeper sleep.",
    longDescription: "Designed for the desktop, the Liquid Plant Pro focuses on high-density filtration in a small footprint. It uses high-intensity internal LEDs to boost photosynthetic rates, providing immediate localized air improvement.",
    features: [
      "Generates 12g Oxygen/day",
      "CO2 Reduction: 16g/day",
      "Concentration booster mode",
      "USB-C powered",
      "HEPA secondary filter",
      "Smart App controls"
    ],
    specs: [
      { label: "Coverage", value: "Personal Bubble" },
      { label: "Dimensions", value: '6" x 6" x 10"' },
      { label: "Weight", value: "1.2 kg" },
      { label: "Power", value: "5W USB-C" }
    ],
    image: "/images/liquid-plant.png"
  }
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = productData[id as keyof typeof productData];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/products">
            <Button>Back to Collection</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      
      {/* Product Hero */}
      <section className="pt-40 pb-12 px-6">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto">
          <Link href="/products">
            <button className="flex items-center gap-2 text-zinc-400 hover:text-primary transition-colors mb-12 group">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Collection</span>
            </button>
          </Link>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Image Gallery Placeholder */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden bg-background/40 backdrop-blur-sm border border-border group shadow-2xl"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute top-8 left-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground text-[10px] font-black uppercase tracking-widest shadow-sm">
                  <Sparkles className="w-3 h-3 text-primary" />
                  Premium Bio-Reactor
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <div className="space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-primary font-black text-xs uppercase tracking-[0.3em]">{product.tagline}</div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground leading-none">
                  {product.name}
                </h1>
                <div className="text-4xl font-bold text-foreground pt-4">{product.price}</div>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-muted-foreground font-medium leading-relaxed"
              >
                {product.description}
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 gap-4"
              >
                <Button size="lg" className="h-16 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-3">
                  Pre-order Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-16 rounded-2xl border-border hover:bg-background/50 text-foreground font-bold text-lg transition-all">
                  Inquire Now
                </Button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-10 border-t border-border"
              >
                <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-6">Key Capabilities</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description Section */}
      <section className="py-24 bg-zinc-50/50">
        <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
                How It Reinvents <br /> Your Environment
              </h2>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">
                {product.longDescription}
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-8">
                {[
                  { l: "Efficiency", v: "High", i: Activity },
                  { l: "Operation", v: "Silent", i: Wind },
                  { l: "Connectivity", v: "IoT Ready", i: Cpu },
                  { l: "Sustainability", v: "Circular", i: Leaf }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 bg-background/40 backdrop-blur-sm border border-border shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-background/50 flex items-center justify-center text-primary shadow-inner">
                      <item.i className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.l}</div>
                      <div className="text-base font-bold text-foreground">{item.v}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="lg:col-span-5">
              <div className="bg-background/40 backdrop-blur-sm rounded-[3rem] p-10 md:p-14 border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32" />
                
                <h3 className="text-2xl font-bold text-foreground mb-10 tracking-tight">Technical Specs</h3>
                <div className="space-y-6">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between items-center py-4 border-b border-border last:border-0">
                      <span className="text-muted-foreground font-bold text-sm uppercase tracking-widest">{spec.label}</span>
                      <span className="text-foreground font-bold text-lg">{spec.value}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-primary shrink-0" />
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Comes with a 2-year manufacturer warranty and a complementary algae nutrient starter pack.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Comparison Component */}
      <BiologicalComparison />

      <Footer />
    </div>
  );
}
