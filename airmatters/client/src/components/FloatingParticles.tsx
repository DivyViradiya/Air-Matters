import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
}

export default function FloatingParticles({ className }: { className?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate fewer particles for performance
    const count = 12;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: i,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 4 + 2}px`, // 2px to 6px
        animationDuration: `${Math.random() * 10 + 10}s`, // 10s to 20s
        animationDelay: `${Math.random() * 5}s`,
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/30 blur-[1px] animate-float-up"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
            opacity: Math.random() * 0.5 + 0.1,
          }}
        />
      ))}
    </div>
  );
}
