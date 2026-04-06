import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { PlaceholderBioreactor } from "./PlaceholderBioreactor";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

// Feature annotation labels positioned in 3D space
const ANNOTATIONS = [
  { position: [0.8,  1.8,  0.4] as [number,number,number], label: "Industrial Aesthetic",   sub: "Durable, user-friendly build"   },
  { position: [-0.9, 0.5, 0.4]  as [number,number,number], label: "Indoor Optimized",       sub: "Any indoor environment"         },
  { position: [1.0, -0.8, 0.4]  as [number,number,number], label: "Secure Suspension",      sub: "Top hook for ceiling mount"     },
  { position: [-0.8, -1.5, 0.4] as [number,number,number], label: "Precision Stand",        sub: "Surface-placed configuration"   },
];

function ProductScene({ paused }: { paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} color="#b8e8b6" />
      <directionalLight position={[4, 6, 3]} intensity={1.6} color="#7dd87a" />
      <pointLight position={[-3, -2, 2]} intensity={0.7} color="#2c7d3b" />

      <Float speed={paused ? 0 : 1.0} rotationIntensity={paused ? 0 : 0.2} floatIntensity={paused ? 0 : 0.4}>
        <PlaceholderBioreactor
          scale={1.0}
          primaryColor="#56b452"
          emissiveIntensity={0.3}
        />
        {/* 3D annotation labels */}
        {ANNOTATIONS.map((ann) => (
          <Html key={ann.label} position={ann.position} distanceFactor={4} zIndexRange={[0, 10]}>
            <div className="flex items-start gap-2 pointer-events-none select-none">
              <div className="w-2 h-2 mt-1 rounded-full flex-shrink-0 bg-bio-vibrant shadow-pulse-glow" />
              <div>
                <div className="text-[11px] font-display font-bold text-white leading-tight whitespace-nowrap drop-shadow-lg">
                  {ann.label}
                </div>
                <div className="text-[9px] font-mono text-white/60 whitespace-nowrap leading-tight">
                  {ann.sub}
                </div>
              </div>
            </div>
          </Html>
        ))}
      </Float>

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.6} luminanceThreshold={0.5} luminanceSmoothing={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/**
 * ProductModelViewer — interactive 3D view of the product.
 * OrbitControls with autoRotate. Drag overrides autoRotate temporarily.
 * Annotation labels for key product features in 3D space.
 * Pointer events are ENABLED here (only interactive canvas on the page).
 *
 * TODO: Replace PlaceholderBioreactor with useGLTF('/models/product.glb')
 */
export default function ProductModelViewer() {
  const paused = useReducedMotion();

  return (
    <div className="w-full aspect-video rounded-[3rem] overflow-hidden border-2 border-border/30 bg-black shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] relative">
      <CanvasErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-card/20">
            <span className="text-muted-foreground text-sm font-mono">3D viewer unavailable</span>
          </div>
        }
      >
        <Canvas
          frameloop="always"
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          style={{ background: "#040a05" }}
        >
          <color attach="background" args={["#040a05"]} />
          <fog attach="fog" args={["#040a05", 10, 20]} />

          <ProductScene paused={paused} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!paused}
            autoRotateSpeed={1.2}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.4}
          />
        </Canvas>
      </CanvasErrorBoundary>

      {/* Corner bracket overlays */}
      <div className="absolute top-6 left-6 w-6 h-6 border-t-2 border-l-2 border-bio-vibrant/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-6 h-6 border-b-2 border-r-2 border-bio-vibrant/40 pointer-events-none" />

      {/* Controls hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-void/80 border border-leaf-green/20 rounded-full px-3 py-1.5 backdrop-blur-sm pointer-events-none">
        <span className="text-[10px] font-mono text-white/50 uppercase tracking-wider">Drag to rotate</span>
      </div>
    </div>
  );
}
