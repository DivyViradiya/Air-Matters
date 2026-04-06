import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { PlaceholderBioreactor } from "./PlaceholderBioreactor";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

// Camera presets for each "How It Works" step
const CAMERA_PRESETS = [
  { x: 0,  y: 1.5, z: 6.5 },   // Step 1 — front overview
  { x: 2.5, y: 0.5, z: 5 },    // Step 2 — right side (algae input)
  { x: -2,  y: 2,  z: 5.5 },   // Step 3 — upper left (gas exchange)
  { x: 0,  y: -1, z: 7 },      // Step 4 — bottom wide (output)
] as const;

// Flowing particle stream (algae/CO2 flow visualization)
function FlowParticles({ paused }: { paused: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const COUNT = 120;

  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const t = i / COUNT;
    positions[i * 3]     = Math.sin(t * Math.PI * 6) * 0.8;
    positions[i * 3 + 1] = t * 4 - 2;
    positions[i * 3 + 2] = Math.cos(t * Math.PI * 6) * 0.3;
  }

  useFrame((state) => {
    if (paused || !pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    for (let i = 0; i < COUNT; i++) {
      const t = (i / COUNT + time * 0.12) % 1;
      pos.array[i * 3]     = Math.sin(t * Math.PI * 6) * 0.7;
      pos.array[i * 3 + 1] = t * 4 - 2;
      pos.array[i * 3 + 2] = Math.cos(t * Math.PI * 6) * 0.3;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#7dd87a"
        size={0.05}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraRig({ step, paused }: { step: number; paused: boolean }) {
  const { camera } = useThree();
  const target = CAMERA_PRESETS[Math.min(step, 3)];

  useFrame((_, delta) => {
    if (paused) return;
    const speed = delta * 1.8;
    camera.position.x += (target.x - camera.position.x) * speed;
    camera.position.y += (target.y - camera.position.y) * speed;
    camera.position.z += (target.z - camera.position.z) * speed;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

interface BioReactorGLProps {
  activeStep?: number; // 0-3, driven by scroll position
}

function Scene({ step, paused }: { step: number; paused: boolean }) {
  return (
    <>
      <ambientLight intensity={0.6} color="#b8e8b6" />
      <directionalLight position={[3, 5, 2]} intensity={1.5} color="#7dd87a" />
      <pointLight position={[-3, -2, 1]} intensity={0.8} color="#2c7d3b" />

      <CameraRig step={step} paused={paused} />

      <Suspense fallback={null}>
        <PlaceholderBioreactor
          scale={1.3}
          primaryColor="#56b452"
          emissiveIntensity={0.3 + step * 0.1}
        />
        <FlowParticles paused={paused} />
        <Environment preset="forest" />
      </Suspense>

      <EffectComposer>
        <Bloom intensity={0.7} luminanceThreshold={0.5} luminanceSmoothing={0.8} mipmapBlur />
      </EffectComposer>
    </>
  );
}

/**
 * BioReactorGL — full Canvas replacing BioReactor.tsx
 * Pass activeStep (0-3) from the parent page to drive camera position.
 *
 * TODO: Replace PlaceholderBioreactor with useGLTF('/models/bioreactor.glb')
 *       and highlight individual mesh nodes per step via emissive intensity.
 */
export default function BioReactorGL({ activeStep = 0 }: BioReactorGLProps) {
  const paused = useReducedMotion();

  return (
    <div className="w-full h-[500px] md:h-[600px] relative rounded-[2rem] overflow-hidden" aria-hidden="true">
      <CanvasErrorBoundary
        fallback={
          <div className="w-full h-full flex items-center justify-center bg-card/30 rounded-[2rem] border border-border">
            <div className="text-muted-foreground text-sm">3D preview unavailable</div>
          </div>
        }
      >
        <Canvas
          frameloop="always"
          camera={{ position: [0, 1.5, 6.5], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: "transparent" }}
        >
          <color attach="background" args={["#050d06"]} />
          <fog attach="fog" args={["#050d06", 12, 25]} />
          <Scene step={activeStep} paused={paused} />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
