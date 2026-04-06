import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { PlaceholderBioreactor } from "./PlaceholderBioreactor";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface HeroBioreactorSceneProps {
  scrollProgress: number; // 0 = top, 1 = bottom of hero section
  paused: boolean;
}

function CameraController({ scrollProgress, paused }: HeroBioreactorSceneProps) {
  const { camera } = useThree();
  const targetZ = useRef(6);

  useFrame((_, delta) => {
    // Map scroll 0→1 to camera Z 6→12
    const desiredZ = 6 + scrollProgress * 6;
    targetZ.current += (desiredZ - targetZ.current) * (paused ? 0 : delta * 2);
    camera.position.z = targetZ.current;
    camera.position.y = paused ? 0 : Math.sin(_.clock.elapsedTime * 0.2) * 0.1;
  });

  return null;
}

function Scene({ scrollProgress, paused }: HeroBioreactorSceneProps) {
  return (
    <>
      <ambientLight intensity={0.5} color="#b8e8b6" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.4}
        color="#7dd87a"
        castShadow={false}
      />
      <pointLight position={[-4, -3, 2]} intensity={0.6} color="#2c7d3b" />

      <CameraController scrollProgress={scrollProgress} paused={paused} />

      <Suspense fallback={null}>
        <Float
          speed={paused ? 0 : 1.4}
          rotationIntensity={paused ? 0 : 0.4}
          floatIntensity={paused ? 0 : 0.6}
        >
          <PlaceholderBioreactor
            scale={1.1}
            position={[0.8, -0.2, 0]}
            primaryColor="#56b452"
            emissiveIntensity={0.25}
          />
        </Float>

        <Environment preset="city" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.8}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

interface HeroBioreactorProps {
  scrollYProgress: number;
}

export default function HeroBioreactor({ scrollYProgress }: HeroBioreactorProps) {
  const paused = useReducedMotion();

  return (
    <CanvasErrorBoundary
      fallback={
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero.png')" }}
        />
      }
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <Scene scrollProgress={scrollYProgress} paused={paused} />
      </Canvas>
    </CanvasErrorBoundary>
  );
}
