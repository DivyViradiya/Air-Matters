import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Text } from "@react-three/drei";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

interface BarDataItem {
  label: string;
  value: number;  // raw value
  color: string;  // hex
}

interface DataBars3DProps {
  data: BarDataItem[];
  title?: string;
  unit?: string;
}

function Bars({ data, unit = "", paused }: { data: BarDataItem[]; unit?: string; paused: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const scalesRef = useRef<number[]>(data.map(() => 0));
  const targetScalesRef = useRef<number[]>(data.map(() => 0));
  const triggered = useRef(false);

  const maxVal = Math.max(...data.map(d => d.value), 1);
  const SPACING = 1.1;
  const MAX_HEIGHT = 3.0;

  // IntersectionObserver to trigger animation
  const domRef = useRef<HTMLDivElement>(null);

  // Normalize: value / max → 0..1, then * MAX_HEIGHT
  useMemo(() => {
    targetScalesRef.current = data.map(d => (d.value / maxVal) * MAX_HEIGHT);
  }, [data, maxVal]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    data.forEach((item, i) => {
      // Spring approach to target
      scalesRef.current[i] += (targetScalesRef.current[i] - scalesRef.current[i]) * delta * 2.5;
      const h = Math.max(scalesRef.current[i], 0.01);
      dummy.position.set(
        (i - (data.length - 1) / 2) * SPACING,
        h / 2 - MAX_HEIGHT / 2,
        0
      );
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, new THREE.Color(item.color));
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  // Start animation immediately (since the component mounts when visible)
  useMemo(() => {
    setTimeout(() => {
      triggered.current = true;
    }, 100);
  }, []);

  return (
    <group position={[0, 0, 0]}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, data.length]}>
        <boxGeometry args={[0.6, 1, 0.6]} />
        <meshStandardMaterial metalness={0.3} roughness={0.4} vertexColors />
      </instancedMesh>

      {/* Label texts */}
      {data.map((item, i) => (
        <group key={item.label} position={[(i - (data.length - 1) / 2) * SPACING, -MAX_HEIGHT / 2 - 0.5, 0]}>
          <Html center distanceFactor={6}>
            <div className="text-center pointer-events-none">
              <div className="text-[9px] font-mono text-white/60 uppercase tracking-wider whitespace-nowrap px-1">
                {item.label}
              </div>
              <div className="text-[11px] font-mono font-bold whitespace-nowrap" style={{ color: item.color }}>
                {item.value}{unit}
              </div>
            </div>
          </Html>
        </group>
      ))}

      {/* Floor grid */}
      <gridHelper args={[data.length * SPACING + 1, data.length, "#2c7d3b", "#142c16"]}
        position={[0, -MAX_HEIGHT / 2 - 0.02, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

/**
 * DataBars3D — 3D instanced bar chart.
 * Pass data array with label, value, color.
 * Bars animate height 0 → value on mount.
 * Replace flat stat cards on CarbonCredits and Nutraceuticals pages.
 */
export default function DataBars3D({ data, title, unit = "" }: DataBars3DProps) {
  const paused = useReducedMotion();

  return (
    <div className="w-full relative" style={{ height: 360 }}>
      {title && (
        <div className="absolute top-0 left-0 text-xs font-mono font-bold text-muted-foreground uppercase tracking-widest px-2 pt-2 pointer-events-none z-10">
          {title}
        </div>
      )}
      <CanvasErrorBoundary>
        <Canvas
          frameloop="always"
          camera={{ position: [0, 1.5, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.7} color="#b8e8b6" />
          <directionalLight position={[4, 8, 4]} intensity={1.2} />
          <pointLight position={[-4, 4, -4]} intensity={0.5} color="#56b452" />

          <Suspense fallback={null}>
            <Bars data={data} unit={unit} paused={paused} />
          </Suspense>

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={!paused}
            autoRotateSpeed={0.6}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2.1}
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
