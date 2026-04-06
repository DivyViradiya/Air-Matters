import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Sparkles, TreePine, Leaf } from "lucide-react";
import productImage from "/images/product.png";

export default function ProductsSection() {
  const products = [
    {
      id: "liquid-plant",
      name: "Liquid Plant",
      tagline: "Desktop Air Revolution",
      capacity: "5 Liters",
      image: productImage,
      price: "Starting at ₹27,000",
      features: [
        "Equivalent to 20 traditional plants",
        "Compact desktop design",
        "LED photosynthesis system",
        "Low maintenance",
        "Real-time CO₂ monitoring"
      ],
      badge: "Most Popular",
      badgeVariant: "default" as const,
    },
    {
      id: "liquid-plant-pro",
      name: "Liquid Plant Pro",
      tagline: "Smart Air Intelligence",
      capacity: "10 Liters",
      features: [
        "AI-powered air quality optimization",
        "Smart monitoring & analytics",
        "Advanced air purification integrated",
        "App-controlled settings",
        "Automated maintenance alerts",
        "Voice assistant compatible"
      ],
      price: "Starting at ₹4,750",
      badge: "AI Powered",
      badgeVariant: "secondary" as const,
    },
    {
      id: "liquid-tree",
      name: "Liquid Tree",
      tagline: "Commercial-Grade Purification",
      capacity: "250-600 Liters",
      features: [
        "Customizable capacity (250-600L)",
        "AI-powered air quality optimization",
        "Smart monitoring dashboard",
        "Advanced filtration system",
        "Modular scalable design",
        "Industrial-grade performance"
      ],
      price: "Custom Quote",
      badge: "Enterprise",
      badgeVariant: "default" as const,
    },
    {
      id: "hybrid-green",
      name: "Hybrid Green Integration",
      tagline: "Nature's Complete Ecosystem",
      capacity: "Custom Design",
      features: [
        "Living algae purifiers + traditional plants",
        "Flowering & medicinal plants integration",
        "Bamboo & native trees (location-based)",
        "Miyawaki method forest design",
        "Self-sustaining ecosystem",
        "Tailored plant-algae combinations",
        "Long-term ecological & health benefits"
      ],
      price: "Custom Design",
      badge: "Ecosystem",
      badgeVariant: "secondary" as const,
      isCustom: true,
    },
  ];

  return (
    <section className="py-24 bg-accent/30">
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Products We Make
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From desktop solutions to complete ecosystems, we offer bio-tech air purification for every need
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="glass-card border-2 flex flex-col hover-elevate"
              data-testid={`card-product-${product.id}`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <Badge variant={product.badgeVariant} className="mb-3">
                      {product.badge}
                    </Badge>
                    <CardTitle className="text-3xl font-display mb-2">{product.name}</CardTitle>
                    <CardDescription className="text-lg">{product.tagline}</CardDescription>
                  </div>
                  {product.id === "liquid-plant" && product.image && (
                    <div className="p-6 bg-card/20 backdrop-blur-sm rounded-2xl border border-border/20">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  {product.isCustom ? (
                    <TreePine className="w-5 h-5 text-primary" />
                  ) : product.id === "liquid-plant-pro" || product.id === "liquid-tree" ? (
                    <Sparkles className="w-5 h-5 text-primary" />
                  ) : (
                    <Leaf className="w-5 h-5 text-primary" />
                  )}
                  <span className="font-medium">{product.capacity}</span>
                </div>
              </CardHeader>

              <CardContent className="flex-1">
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3" data-testid={`feature-${product.id}-${index}`}>
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="flex flex-col gap-3">
                <div className="w-full flex items-center justify-between">
                  <span className="text-2xl font-bold" data-testid={`price-${product.id}`}>{product.price}</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  variant={product.id === "liquid-plant" ? "default" : "outline"}
                  data-testid={`button-learn-more-${product.id}`}
                >
                  {product.isCustom || product.price === "Custom Quote" ? "Get Custom Quote" : "Learn More"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="overflow-hidden border-border/50 bg-card/40 backdrop-blur-sm shadow-lg rounded-[2rem] inline-block p-6">
            <p className="text-lg font-medium mb-2">Need help choosing the right solution?</p>
            <p className="text-muted-foreground mb-4">Our experts can help design the perfect air purification system for your space</p>
            <Button variant="default" size="lg" data-testid="button-contact-expert" className="bg-primary text-primary-foreground hover:bg-accent">
              Contact an Expert
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
}
