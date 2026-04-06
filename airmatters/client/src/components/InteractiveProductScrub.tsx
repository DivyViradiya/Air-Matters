import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { RotateCcw, Box, Check } from "lucide-react";
import ProductModelViewer from "@/components/3d/ProductModelViewer";

const InteractiveProductScrub = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [status, setStatus] = useState<"idle" | "configuring" | "ready">("idle");
  const [playCount, setPlayCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if component is in view to trigger auto-play
  const isInView = useInView(containerRef, { 
    amount: 0.6, 
    once: false 
  });

  // Handle Playback Logic
  const startPlaybackSequence = () => {
    if (!videoRef.current || isAnimating) return;
    
    setIsAnimating(true);
    setPlayCount(0);
    setStatus("configuring");
    videoRef.current.play();
  };

  // Auto-trigger when entering view
  useEffect(() => {
    if (isInView && !isAnimating && playCount === 0) {
      startPlaybackSequence();
    }
  }, [isInView]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const nextCount = playCount + 1;
      
      if (nextCount < 2) {
        setPlayCount(nextCount);
        video.currentTime = 0;
        video.play();
      } else {
        setStatus("ready");
        video.currentTime = 0; 
        setIsAnimating(false);
        setPlayCount(2); 
        setTimeout(() => setStatus("idle"), 1500);
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, [playCount, isAnimating]);

  const handleManualActivation = () => {
    if (isAnimating) return;
    setPlayCount(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsAnimating(true);
      setStatus("configuring");
    }
  };

  const [viewMode, setViewMode] = useState<"video" | "3d">("video");

  const features = [
    { title: "Industrial Aesthetic", desc: "Sleek, modern aesthetic with a durable, user-friendly build." },
    { title: "Indoor Optimized", desc: "Versatile design optimized for any indoor environment." },
    { title: "Secure Suspension", desc: "Integrated top hook for secure suspended configurations." },
    { title: "Precision Stand", desc: "Retractable stand for elegant surface placement." }
  ];

  return (
    <section ref={containerRef} className="py-32 px-6 relative bg-transparent overflow-hidden">
      <div className="max-w-[80rem] mx-auto text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-card border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-8 mx-auto">
            <Box className="w-3.5 h-3.5" />
            <span>Premium Industrial Design</span>
          </div>
          
          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-foreground leading-[0.8] mb-6">
            Versatile <br /> 
            <span className="premium-gradient-text">Placement.</span>
          </h2>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1 p-1 bg-card/40 border border-border/30 rounded-2xl">
            <button
              onClick={() => setViewMode("video")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-150",
                viewMode === "video" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <RotateCcw className="w-3.5 h-3.5" /> Video
            </button>
            <button
              onClick={() => setViewMode("3d")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-150",
                viewMode === "3d" ? "bg-primary text-white shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Box className="w-3.5 h-3.5" /> 3D View
            </button>
          </div>
        </div>

        {/* Main media area */}
        <AnimatePresence mode="wait">
          {viewMode === "video" ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative max-w-4xl mx-auto mb-20 group" onClick={handleManualActivation}
            >
              <div className="relative aspect-video md:aspect-[16/9] rounded-[3rem] overflow-hidden border-2 border-border/30 bg-black shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:scale-[1.01] group-hover:border-primary/40">
                <video
                  ref={videoRef}
                  src="/videos/GIF1.mp4"
                  className="w-full h-full object-cover"
                  playsInline
                  muted
                  preload="auto"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Corner Markers */}
                <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-primary/40 pointer-events-none" />
                <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-primary/40 pointer-events-none" />
              </div>

              {/* Floating HUD Badge on Video */}
              <div className="absolute bottom-10 left-10 glass-card border-2 px-4 py-2.5 rounded-2xl shadow-2xl hidden md:block z-20 w-fit">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <RotateCcw className={`w-5 h-5 text-primary ${isAnimating ? "animate-spin" : ""}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-[9px] font-black uppercase tracking-wider text-muted-foreground leading-none mb-1">Feature Sync</div>
                    <div className="text-xs font-black text-foreground leading-none whitespace-nowrap">Retractable Stand</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="relative max-w-4xl mx-auto mb-20"
            >
              <ProductModelViewer />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modular Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-8 border-2 text-left group/card hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover/card:bg-primary/20 transition-colors">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-black text-foreground mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Integrated Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 py-6 px-10 rounded-3xl glass-card border-2 max-w-3xl mx-auto shadow-2xl">
          <button
            onClick={handleManualActivation}
            disabled={isAnimating}
            className={cn(
              "group relative flex items-center gap-4 px-8 py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-500",
              !isAnimating 
                ? "bg-primary text-white shadow-[0_15px_30px_rgba(34,197,94,0.3)] hover:shadow-[0_20px_40px_rgba(34,197,94,0.4)] hover:-translate-y-1" 
                : "bg-muted/20 text-muted-foreground cursor-not-allowed"
            )}
          >
            <AnimatePresence mode="wait">
              {!isAnimating ? (
                <motion.div 
                  key="play" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex items-center gap-3"
                >
                  <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>Re-deploy Stand</span>
                </motion.div>
              ) : (
                <motion.div 
                  key="status"
                  className="flex items-center gap-3"
                >
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>{status}ING...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <div className="flex items-center gap-4">
            <div className="relative w-3 h-3">
              <div className={`absolute inset-0 rounded-full bg-primary animate-ping opacity-40 ${isAnimating ? "animate-none" : ""}`} />
              <div className="relative w-full h-full rounded-full bg-primary shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-primary leading-none mb-1">System Status</div>
              <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                {isAnimating ? "Actuated" : "Mechanics Primed"}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default InteractiveProductScrub;
