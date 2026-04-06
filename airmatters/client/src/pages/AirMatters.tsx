import { motion } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import AirMattersHero from "@/components/AirMattersHero";
import AirQualitySection from "@/components/AirQualitySection";
import ScientificFactsSection from "@/components/ScientificFactsSection";
import BiologicalComparison from "@/components/BiologicalComparison";
import PollutantBreakdown from "@/components/PollutantBreakdown";
import AirMattersFinalCTA from "@/components/AirMattersFinalCTA";

export default function AirMatters() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <SmoothScroll>
        <div className="bg-background selection:bg-primary selection:text-white">
          
          {/* 1. Immersive Hero Section */}
          <AirMattersHero />

          {/* 2. Atmospheric Monitoring Terminal (Shared from Home) */}
          <AirQualitySection />

          {/* 3. Scientific Verification Section */}
          <ScientificFactsSection />

          {/* 4. Competitive Analysis Section */}
          <BiologicalComparison />

          {/* 5. Target Pollutant Breakdown */}
          <PollutantBreakdown />

          {/* 6. Final Conversion Bridge */}
          <AirMattersFinalCTA />

          {/* 8. Footer */}
          <Footer />
        </div>
      </SmoothScroll>
    </motion.div>
  );
}
