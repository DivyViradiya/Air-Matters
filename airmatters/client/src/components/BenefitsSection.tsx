import { Leaf, Droplets, Volume2, Wrench, RefreshCw, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Leaf,
      title: "Carbon-Negative",
      description: "Actively removes CO2 from your environment while producing fresh oxygen, contributing to a healthier planet.",
    },
    {
      icon: Droplets,
      title: "Living Ecosystem",
      description: "Our microalgae create a self-sustaining biological system that adapts and thrives in your space.",
    },
    {
      icon: Volume2,
      title: "Silent Operation",
      description: "Whisper-quiet performance lets you enjoy clean air without disruptive noise.",
    },
    {
      icon: Wrench,
      title: "Low Maintenance",
      description: "Simple Monthly medium replacement is all you need to keep your purifier running optimally.",
    },
    {
      icon: RefreshCw,
      title: "Renewable Medium",
      description: "Sustainable microalgae medium can be composted or used as fertilizer after replacement.",
    },
    {
      icon: Smartphone,
      title: "Smart Monitoring",
      description: "Real-time tracking of air quality, CO2 levels, and system performance via mobile app.",
    },
  ];

  return (
    <section className="section-spacing bg-transparent">
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Revolutionary Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Experience air purification reimagined with living technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="glass-card glass-card-hover p-10"
                data-testid={`card-benefit-${index}`}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-inner">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{benefit.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
