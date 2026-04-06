import { Activity, Droplets, Leaf, Zap } from "lucide-react";

export default function ProductSection() {
  const specs = [
    { icon: Leaf, label: "CO2 Absorption", value: "3g/day" },
    { icon: Activity, label: "O2 Production", value: "2.3g/day" },
    { icon: Droplets, label: "Liquid Medium", value: "2L" },
    { icon: Zap, label: "Power", value: "2.16 kWh/month" },
  ];

  return (
    <section id="product-section" className="py-24 bg-background">
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/images/product.png" 
              alt="Living Air Purifier Device" 
              className="rounded-2xl w-full"
              data-testid="img-product"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
                Next-Gen Living Air Purifier
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We harness the power of biology and technology, engineering a new generation of air purifiers that are fundamentally different, better, and more innovative.
              </p>
            </div>

            <p className="text-base leading-relaxed text-foreground">
              Our devices don't just filter old air; they actively produce new, clean air through living microalgae that perform photosynthesis. This creates a carbon-negative cycle that sets us apart from traditional air purifiers.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {specs.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div 
                    key={index} 
                    className="bg-card border border-card-border rounded-xl p-6 hover-elevate"
                    data-testid={`card-spec-${index}`}
                  >
                    <Icon className="w-6 h-6 text-primary mb-3" />
                    <div className="text-sm text-muted-foreground mb-1">{spec.label}</div>
                    <div className="text-2xl font-bold">{spec.value}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
