import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Procedural bioreactor placeholder geometry.
 * A CylinderGeometry body + TorusGeometry rings + ConeGeometry cap,
 * grouped to approximate an algae photobioreactor form.
 *
 * TODO: Replace this component with a useGLTF-loaded real model
 *       by swapping the import in Home.tsx / BioReactorGL.tsx.
 *       The outer <group> transform interface remains identical.
 */

interface PlaceholderBioreactorProps {
  scale?: number;
  position?: [number, number, number];
  primaryColor?: string;
  emissiveIntensity?: number;
}

export function PlaceholderBioreactor({
  scale = 1,
  position = [0, 0, 0],
  primaryColor = "#56b452",
  emissiveIntensity = 0.2,
}: PlaceholderBioreactorProps) {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef  = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Gentle idle sway
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08;
    // Inner glow pulse
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = emissiveIntensity + Math.sin(t * 1.5) * 0.08;
    }
  });

  const mat = new THREE.MeshStandardMaterial({
    color: primaryColor,
    emissive: primaryColor,
    emissiveIntensity,
    roughness: 0.3,
    metalness: 0.15,
    transparent: true,
    opacity: 0.92,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#a8f5a4",
    transparent: true,
    opacity: 0.18,
    roughness: 0.05,
    metalness: 0,
    transmission: 0.85,
    thickness: 0.5,
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Main cylinder body (glass) */}
      <mesh material={glassMat}>
        <cylinderGeometry args={[0.55, 0.55, 3.2, 32, 1, true]} />
      </mesh>

      {/* Inner liquid core */}
      <mesh ref={glowRef} material={mat}>
        <cylinderGeometry args={[0.44, 0.44, 3.0, 32]} />
      </mesh>

      {/* Ring bands — 4 evenly spaced */}
      {[-1.1, -0.37, 0.37, 1.1].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={mat}>
          <torusGeometry args={[0.58, 0.05, 8, 32]} />
        </mesh>
      ))}

      {/* Top cap */}
      <mesh position={[0, 1.7, 0]} material={mat}>
        <coneGeometry args={[0.56, 0.4, 32]} />
      </mesh>

      {/* Bottom base */}
      <mesh position={[0, -1.7, 0]} rotation={[Math.PI, 0, 0]} material={mat}>
        <coneGeometry args={[0.56, 0.3, 32]} />
      </mesh>

      {/* Top pipe nozzle */}
      <mesh position={[0, 2.0, 0]} material={mat}>
        <cylinderGeometry args={[0.08, 0.08, 0.45, 16]} />
      </mesh>

      {/* Outer ambient glow sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Rising bubble particles */}
      <BubbleParticles color={primaryColor} />
    </group>
  );
}

function BubbleParticles({ color }: { color: string }) {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 60;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.35;
    positions[i * 3]     = Math.cos(angle) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3.0;
    positions[i * 3 + 2] = Math.sin(angle) * r;
  }

  useFrame(() => {
    if (!pointsRef.current) return;
    const pos = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      pos.array[i * 3 + 1] += 0.004;
      if (pos.array[i * 3 + 1] > 1.5) pos.array[i * 3 + 1] = -1.5;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
