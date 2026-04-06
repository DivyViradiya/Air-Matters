import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Star, Leaf } from "lucide-react";

export default function FeaturedProducts() {
  return (
    <section id="featured-products" className="py-24 bg-accent/5">
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Meet the Future
            </h2>
            <p className="text-lg text-muted-foreground">
              Our flagship biological air purifiers are designed to fit seamlessly into your life.
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="hidden md:flex gap-2">
              View All Models <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="relative rounded-3xl overflow-hidden bg-card border border-border shadow-xl">
          <div className="grid lg:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-center order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 text-primary font-bold tracking-wider text-sm uppercase mb-4">
                <Leaf className="w-4 h-4" />
                <span>Flagship Model</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold font-display mb-6">Liquid Plant Pro</h3>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The world's first smart algae-based air purifier. It doesn't just filter dust—it consumes CO2 and releases fresh oxygen, creating a healthier, more productive environment for your home.
              </p>
              
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-medium">30% CO2 Reduction in 1 hour</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-medium">Generates 1.6L of Oxygen daily</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="h-12 px-8 text-lg rounded-full">
                    Pre-order Now
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="ghost" size="lg" className="h-12 px-8 text-lg rounded-full">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative bg-accent/20 h-96 lg:h-auto order-1 lg:order-2">
               {/* Image Placeholder */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src="/images/product.png" 
                    alt="Liquid Plant Pro" 
                    className="max-h-[80%] max-w-[80%] object-contain drop-shadow-2xl mix-blend-multiply opacity-90 hover:scale-105 transition-transform duration-700"
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/products">
            <Button variant="outline" className="w-full">
              View All Models
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
