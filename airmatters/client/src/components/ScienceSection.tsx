import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { TrendingUp, Leaf, Droplets, Zap } from "lucide-react";
import algaeImage from "/images/Picture4_1763972473180.png";

export default function ScienceSection() {
  const stats = [
    { icon: TrendingUp, label: "Efficiency", value: "95%", description: "CO2 conversion rate" },
    { icon: Leaf, label: "CO2 Absorbed", value: "3g", description: "Per day" },
    { icon: Droplets, label: "O2 Produced", value: "2.3g", description: "Per day" },
    { icon: Zap, label: "Lifecycle", value: "10+ years", description: "Device longevity" },
  ];

  const faqs = [
    {
      question: "How efficient is photosynthesis in the device?",
      answer: "Our optimized microalgae strains achieve 95% CO2 conversion efficiency, significantly outperforming traditional HEPA filters which only trap particles without removing CO2 or producing oxygen.",
    },
    {
      question: "What species of microalgae are used?",
      answer: "We use a proprietary blend of Chlorella vulgaris and Spirulina platensis, selected for their exceptional photosynthetic efficiency, resilience, and oxygen production rates.",
    },
    {
      question: "What is the liquid medium composition?",
      answer: "Our nutrient-rich medium contains mineral salts, trace elements, and pH buffers optimized for microalgae growth. It's completely non-toxic and safely biodegradable.",
    },
    {
      question: "How does this compare to traditional HEPA filters?",
      answer: "While HEPA filters trap particulates, they don't remove CO2 or produce oxygen. Our living system actively improves air quality by converting harmful CO2 into fresh O2, making it truly regenerative rather than just filtering.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[100rem] 3xl:max-w-[112.5rem] 4xl:max-w-[125rem] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Science & Technology
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Backed by rigorous research and cutting-edge biotechnology
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index}
                className="p-6 text-center bg-card/40 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all hover:-translate-y-1 shadow-sm"
                data-testid={`card-stat-${index}`}
              >
                <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm font-medium mb-1">{stat.label}</div>
                <div className="text-xs text-muted-foreground">{stat.description}</div>
              </Card>
            );
          })}
        </div>

        <div className="flex flex-col gap-20 max-w-4xl mx-auto">
          {/* Technical Details */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center font-display">Technical Details</h3>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card/40 backdrop-blur-sm border border-border/50 rounded-xl px-6 transition-all hover:bg-card/60 shadow-sm"
                  data-testid={`accordion-faq-${index}`}
                >
                  <AccordionTrigger className="text-left font-medium text-lg py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Microalgae Technology */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center font-display">Microalgae Technology</h3>
            <Card className="overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm shadow-lg rounded-[2rem]">
              <div className="grid md:grid-cols-2 items-center">
                <div className="p-8 md:p-12 space-y-6">
                   <p className="text-lg text-muted-foreground leading-relaxed">
                     Our proprietary microalgae strains are the biological engine of every Liquid series device. Through precision genetic optimization, we've enhanced their ability to thrive in indoor lighting conditions.
                   </p>
                   <p className="text-sm text-muted-foreground italic border-l-4 border-primary/30 pl-4">
                     High-magnification view of our proprietary microalgae strains performing photosynthesis
                   </p>
                </div>
                <div className="h-full min-h-[300px] relative">
                  <img 
                    src={algaeImage} 
                    alt="Microscopic view of microalgae cells" 
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid="img-microscopic-algae"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Research Partnerships */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center font-display">Research Partnerships</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-8 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all border-border/50 shadow-sm text-center flex flex-col items-center rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-primary">DY</span>
                </div>
                <h4 className="font-bold text-xl mb-3">DY Patil Biotechnology</h4>
                <p className="text-muted-foreground leading-relaxed">Collaborative research on microalgae working abilities</p>
              </Card>
              <Card className="p-8 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all border-border/50 shadow-sm text-center flex flex-col items-center rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-primary">CB</span>
                </div>
                <h4 className="font-bold text-xl mb-3">Crispr Bits Bangalore</h4>
                <p className="text-muted-foreground leading-relaxed">Gene modified more efficient microalgae</p>
              </Card>
              <Card className="p-8 bg-card/40 backdrop-blur-sm hover:bg-card/60 transition-all border-border/50 shadow-sm text-center flex flex-col items-center rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="font-bold text-primary">VY</span>
                </div>
                <h4 className="font-bold text-xl mb-3">Vayugnalabs</h4>
                <p className="text-muted-foreground leading-relaxed">Automation & Testing Partners</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
