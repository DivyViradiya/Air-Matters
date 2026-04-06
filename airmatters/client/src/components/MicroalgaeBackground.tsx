import { useEffect, useRef } from "react";

export default function MicroalgaeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.005; // Reduced factor
      const moveY = (clientY - window.innerHeight / 2) * 0.005;

      containerRef.current.style.setProperty('--move-x', `${moveX}px`);
      containerRef.current.style.setProperty('--move-y', `${moveY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none select-none z-[-1] bg-background">
      {/* Floating Particles Only */}
      <div 
        ref={containerRef} 
        className="w-full h-full relative transition-transform duration-1000 ease-out"
        style={{ transform: 'translate(var(--move-x, 0), var(--move-y, 0))' } as any}
      >
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/20 dark:bg-primary/10 backdrop-blur-[1px] animate-float-up"
            style={{
              width: `${Math.random() * 30 + 5}px`,
              height: `${Math.random() * 30 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
              opacity: Math.random() * 0.3 + 0.1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
