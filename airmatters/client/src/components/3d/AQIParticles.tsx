import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useQueryClient } from "@tanstack/react-query";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import * as THREE from "three";

// AQI breakpoints → color lerp
function aqiToColor(aqi: number): THREE.Color {
  const good     = new THREE.Color("#56b452"); // bio-vibrant
  const moderate = new THREE.Color("#f59e0b"); // signal-amber
  const hazard   = new THREE.Color("#ef4444"); // hazard-red

  if (aqi <= 50) return good.clone();
  if (aqi <= 150) {
    const t = (aqi - 50) / 100;
    return good.clone().lerp(moderate, t);
  }
  const t = Math.min((aqi - 150) / 200, 1);
  return moderate.clone().lerp(hazard, t);
}

interface AQIParticlesProps {
  count?: number;
  size?: number;
  opacity?: number;
  className?: string;
}

/**
 * AQI Particle Field — a 3D volume whose color and opacity
 * reflect the live air quality data from TanStack Query cache.
 */
export default function AQIParticles({ count = 2000, size = 0.025, opacity = 0.4, className }: AQIParticlesProps) {
  const paused = useReducedMotion();

  return (
    <div className={cn("w-full h-full absolute inset-0 pointer-events-none", className)} aria-hidden="true">
      <CanvasErrorBoundary>
        <Canvas
          frameloop={paused ? "demand" : "always"}
          camera={{ position: [0, 0, 4], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{ background: "transparent" }}
        >
          <ParticleField paused={paused} count={count} size={size} baseOpacity={opacity} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}

function ParticleField({ paused, count, size, baseOpacity }: { paused: boolean; count: number; size: number; baseOpacity: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const queryClient = useQueryClient();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, [count]);

  const speeds = useMemo(() => {
    return new Float32Array(count).map(() => 0.002 + Math.random() * 0.005);
  }, [count]);

  useFrame((state) => {
    if (paused || !pointsRef.current) return;

    // Fetch current AQI from TanStack Query cache
    const aqiData = queryClient.getQueryData<any>(["/api/air-quality"]);
    const pm25 = aqiData?.current?.pm2_5 ?? 25;

    const particleColor = aqiToColor(pm25);
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    mat.color = particleColor;
    mat.opacity = (baseOpacity * 0.8) + Math.min(pm25 / 300, 0.4);

    const pos = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      // Upward movement
      pos.array[i * 3 + 1] += speeds[i];
      
      // Slight horizontal drift
      pos.array[i * 3] += Math.sin(time * 0.5 + i) * 0.001;

      if (pos.array[i * 3 + 1] > 5) {
        pos.array[i * 3 + 1] = -5;
      }
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#56b452"
        size={size}
        transparent
        opacity={baseOpacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
