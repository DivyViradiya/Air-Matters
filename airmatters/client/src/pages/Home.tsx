import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Leaf, 
  Wind, 
  Cpu,
  History,
  Globe,
  Milestone,
  Scan,
  Activity,
  Droplets
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import BentoImpact from "@/components/BentoImpact";
import AirTokensSection from "@/components/AirTokensSection";
import ProcessTeaser from "@/components/HowItWorksSection";
import PreOrderSection from "@/components/PreOrderSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import AirQualitySection from "@/components/AirQualitySection";
import HeroSection from "@/components/HeroSection";
import HomeSkeleton from "@/components/HomeSkeleton";

export default function Home() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Minimum 1.2s loading to show the skeleton structure and prevent flicker
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HomeSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <SmoothScroll>
            <div ref={containerRef} className="bg-background selection:bg-primary selection:text-white">
              
              {/* 1. Immersive 3D Parallax Hero */}
              <HeroSection />

              {/* 2. Atmospheric Monitoring Terminal */}
              <AirQualitySection />

              {/* 4. Impact Bento Grid */}
              <BentoImpact />

              {/* 4.5. AIR Tokens Protocol */}
              <AirTokensSection />

              {/* 5. How It Works Teaser */}
              <ProcessTeaser />

              {/* 5.5. Pre-Order & Waitlist */}
              <PreOrderSection />

              {/* 6. FAQ Section */}
              <FAQSection />

              {/* 8. Footer */}
              <Footer />
            </div>
          </SmoothScroll>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
