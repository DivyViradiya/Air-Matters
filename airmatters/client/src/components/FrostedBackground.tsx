import React, { Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";

// ── Inner scene ─────────────────────────────────────────────
function TorusKnotScene({ paused }: { paused: boolean }) {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (paused || !meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.12;
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <>
      <Stars
        radius={120}
        depth={60}
        count={3000}
        factor={4}
        saturation={0.3}
        fade
        speed={paused ? 0 : 0.3}
      />
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusKnotGeometry args={[1.2, 0.35, 128, 32]} />
        {/* @ts-ignore — MeshDistortMaterial has a slightly non-standard prop interface */}
        <MeshDistortMaterial
          color="#56b452"
          distort={0.4}
          speed={paused ? 0 : 1.2}
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>
      {/* Ambient fog sync happens via Canvas fog prop below */}
    </>
  );
}

// ── CSS blob fallback (shown if WebGL fails) ─────────────────
function CSSBlobFallback() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <div
        className="absolute top-[-10%] right-[-5%] w-[40vw] h-[40vw] bg-primary/10 dark:bg-primary/20 rounded-full mix-blend-screen dark:mix-blend-overlay filter blur-[100px] animate-blob will-change-transform"
        style={{ animationDelay: "0ms" }}
      />
      <div
        className="absolute bottom-[10%] left-[-10%] w-[35vw] h-[35vw] bg-secondary/10 dark:bg-secondary/20 rounded-full mix-blend-screen dark:mix-blend-overlay filter blur-[100px] animate-blob will-change-transform"
        style={{ animationDelay: "4000ms" }}
      />
      <div
        className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] bg-primary/5 dark:bg-primary/15 rounded-full mix-blend-screen dark:mix-blend-overlay filter blur-[80px] animate-blob will-change-transform"
        style={{ animationDelay: "2000ms" }}
      />
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────
export default function FrostedBackground() {
  const prefersReduced = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const fogColor = isDark ? "#080f09" : "#f2faf2";
  const fogNear  = isDark ? 60 : 80;
  const fogFar   = isDark ? 130 : 160;

  return (
    <>
      {/* CSS blob layer — always rendered as true background */}
      <div className="fixed inset-0 -z-10 bg-background pointer-events-none" />

      {/* WebGL layer */}
      <CanvasErrorBoundary fallback={<CSSBlobFallback />}>
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: -5 }}
          aria-hidden="true"
        >
          <Canvas
            frameloop="always"
            camera={{ position: [0, 0, 40], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
            style={{ background: "transparent" }}
          >
            <fog attach="fog" args={[fogColor, fogNear, fogFar]} />
            <Suspense fallback={null}>
              <TorusKnotScene paused={prefersReduced} />
            </Suspense>
          </Canvas>
        </div>
      </CanvasErrorBoundary>

      {/* Gradient overlay blob — CSS complement to the 3D stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -4 }}>
        <div
          className="absolute top-[-10%] right-[-5%] w-[42vw] h-[42vw] bg-primary/8 dark:bg-primary/15 rounded-full filter blur-[120px] animate-blob will-change-transform"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="absolute bottom-[5%] left-[-8%] w-[36vw] h-[36vw] bg-secondary/6 dark:bg-secondary/12 rounded-full filter blur-[100px] animate-blob will-change-transform"
          style={{ animationDelay: "4000ms" }}
        />
        <div
          className="absolute top-[30%] left-[15%] w-[28vw] h-[28vw] bg-pulse/4 dark:bg-pulse/8 rounded-full filter blur-[80px] animate-glow-pulse will-change-transform"
          style={{ animationDelay: "2000ms" }}
        />
      </div>
    </>
  );
}
