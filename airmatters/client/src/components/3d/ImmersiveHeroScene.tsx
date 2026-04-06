import { Suspense, useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, ChromaticAberration } from "@react-three/postprocessing";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { readThemeColors, ThemeColors } from "@/hooks/use-theme-sync";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { MotionValue, useMotionValueEvent } from "framer-motion";
import * as THREE from "three";

// ── Genesis Particle Swarm ────────────────────────────────
function GenesisSwarm({
  scrollRef,
  color,
  accentColor,
}: {
  scrollRef: React.MutableRefObject<number>;
  color: string;
  accentColor: string;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 4000;

  const [positions, speeds, offsets, phases] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 6 + Math.random() * 8;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      spd[i] = 0.015 + Math.random() * 0.06;
      off[i] = Math.random() * Math.PI * 2;
      ph[i]  = Math.random() * Math.PI * 2;
    }
    return [pos, spd, off, ph];
  }, []);

  const colorsAttr = useMemo(() => {
    const c = new Float32Array(count * 3);
    const primary = new THREE.Color(color);
    const accent  = new THREE.Color(accentColor);
    for (let i = 0; i < count; i++) {
      const mix = Math.random();
      const col = primary.clone().lerp(accent, mix * 0.4);
      c[i * 3]     = col.r;
      c[i * 3 + 1] = col.g;
      c[i * 3 + 2] = col.b;
    }
    return c;
  }, [color, accentColor]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;
    const scroll = scrollRef.current;

    // Phase 0: 0-0.15: nebula -> vortex (convergence)
    // Phase 1-2: 0.15-0.75: vortex state
    // Phase 3: 0.75-1.0: disperse
    const vortex = Math.max(0, Math.min(1, scroll / 0.15));
    const disperse = Math.max(0, Math.min(1, (scroll - 0.75) / 0.25));

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const t = time * speeds[i] + offsets[i];

      // Nebula origin position (spherical with drift)
      const ox = positions[idx]     + Math.sin(t + phases[i]) * 0.3;
      const oy = positions[idx + 1] + Math.cos(t * 0.7 + phases[i]) * 0.3;
      const oz = positions[idx + 2] + Math.sin(t * 0.5) * 0.3;

      // Vortex target
      const angle = offsets[i] + time * 0.3 * speeds[i] * 15;
      const radius = 1.5 + (offsets[i] / (Math.PI * 2)) * 4;
      const vx = Math.cos(angle) * radius;
      const vy = (offsets[i] / (Math.PI * 2) - 0.5) * 6;
      const vz = Math.sin(angle) * radius;

      // Disperse outward
      const scale = 1 + disperse * 2;

      pos.array[idx]     = THREE.MathUtils.lerp(ox, vx, vortex) * scale;
      pos.array[idx + 1] = THREE.MathUtils.lerp(oy, vy, vortex) * scale;
      pos.array[idx + 2] = THREE.MathUtils.lerp(oz, vz, vortex) * scale;
    }
    pos.needsUpdate = true;
    pointsRef.current.rotation.y += 0.0006;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colorsAttr, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        vertexColors
        sizeAttenuation
      />
    </points>
  );
}

// ── Aurora Sphere (background glow) ──────────────────────
function AuroraSphere({ isDark, color }: { isDark: boolean; color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={12}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isDark ? 0.04 : 0.015}
        side={THREE.BackSide}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

// ── Scene Controller (camera reacts to scroll + mouse) ───
function SceneController({
  scrollRef,
  isDark,
  colors,
}: {
  scrollRef: React.MutableRefObject<number>;
  isDark: boolean;
  colors: ThemeColors;
}) {
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state, delta) => {
    const scroll = scrollRef.current;
    const cam = state.camera;
    const target = new THREE.Vector3();

    // Phase 0: 0-0.15: Entry/Convergence
    if (scroll < 0.15) {
      const t = scroll / 0.15;
      target.set(Math.sin(t) * 2, 0, 7 - t * 2);
    } 
    // Phase 1: 0.15-0.45: Bloom
    else if (scroll < 0.45) {
      const t = (scroll - 0.15) / 0.3;
      target.set(2 + Math.sin(t * 1.5) * 2, t * 1.5, 5 + t * 4);
    } 
    // Phase 2: 0.45-0.75: Reveal
    else if (scroll < 0.75) {
      const t = (scroll - 0.45) / 0.3;
      target.set(Math.sin(t * Math.PI) * 1.5, 1.5 + t, 9 + t * 3);
    } 
    // Phase 3: 0.75-1.0: Lock
    else {
      const t = (scroll - 0.75) / 0.25;
      target.set(0, 2 + t, 12 + t * 5);
    }

    cam.position.lerp(target, delta * 1.8);
    cam.position.x += mouseRef.current.x * 0.3;
    cam.position.y += mouseRef.current.y * 0.3;
    cam.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={isDark ? 0.15 : 0.5} />
      <spotLight
        position={[8, 8, 8]}
        intensity={isDark ? 2 : 1}
        color={colors.primary}
        penumbra={1}
      />
      <pointLight position={[-6, -4, -4]} intensity={1} color={colors.pulse} />
      <AuroraSphere isDark={isDark} color={colors.primary} />
      <GenesisSwarm scrollRef={scrollRef} color={colors.primary} accentColor={colors.pulse} />
      <Environment preset={isDark ? "night" : "apartment"} />
    </>
  );
}

// ── Main Export ───────────────────────────────────────────
export default function ImmersiveHeroScene({
  scrollProgressValue,
}: {
  scrollProgressValue: MotionValue<number>;
}) {
  const [isDark, setIsDark] = useState(false);
  const [colors, setColors] = useState<ThemeColors>(readThemeColors());
  const scrollRef = useRef<number>(0);
  const paused = useReducedMotion();

  // Subscribe to scroll MotionValue without re-renders
  useMotionValueEvent(scrollProgressValue, "change", (v) => {
    scrollRef.current = v;
  });

  useEffect(() => {
    const check = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
      setColors(readThemeColors());
    };
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <CanvasErrorBoundary>
      <Canvas
        frameloop={paused ? "demand" : "always"}
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <SceneController scrollRef={scrollRef} isDark={isDark} colors={colors} />
          <EffectComposer enableNormalPass={false}>
            <Bloom
              intensity={isDark ? 1.2 : 0.3}
              luminanceThreshold={0.2}
              mipmapBlur
            />
            <ChromaticAberration offset={new THREE.Vector2(0.0008, 0.0008)} />
            <Vignette eskil={false} offset={0.15} darkness={isDark ? 0.7 : 0.4} />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
