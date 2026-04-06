import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { CanvasErrorBoundary } from "@/components/CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import * as THREE from "three";

// ── GLSL Shaders ─────────────────────────────────────────────
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2  uMouse;
  varying vec2 vUv;

  // 2D pseudo-random hash
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  // Voronoi — returns (dist-to-nearest, dist-to-edge)
  vec2 voronoi(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float d1 = 8.0, d2 = 8.0;
    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2  g = vec2(float(x), float(y));
        vec2  h = hash2(i + g);
        // Animate cell centres slowly
        h = 0.5 + 0.5 * sin(uTime * 0.4 + 6.28 * h);
        vec2  r = g + h - f;
        float d = dot(r, r);
        if (d < d1) { d2 = d1; d1 = d; }
        else if (d < d2) { d2 = d; }
      }
    }
    return vec2(sqrt(d1), sqrt(d2));
  }

  void main() {
    // Mouse parallax — subtle UV offset ±0.02
    vec2 uv = vUv + uMouse * 0.02;

    // Scale for cell density
    vec2 v = voronoi(uv * 6.0);

    // Cell interior: dark green
    vec3 cellColor = vec3(0.04, 0.16, 0.08);   // #0a2914
    // Cell walls: bright bio-vibrant
    vec3 wallColor = vec3(0.10, 0.42, 0.22);   // #1a6b38

    // Cell wall = narrow band around edge
    float edge = smoothstep(0.04, 0.08, v.y - v.x);
    // Pulsing glow on cell boundaries driven by time + position
    float pulse = 0.5 + 0.5 * sin(uTime * 0.6 + v.x * 8.0);

    vec3 color = mix(wallColor * (0.7 + 0.3 * pulse), cellColor, edge);

    // Add subtle division lines (micro-cell)
    float microEdge = smoothstep(0.01, 0.025, v.x);
    color = mix(vec3(0.34, 0.84, 0.48) * 0.25, color, microEdge);

    // Vignette
    float vig = 1.0 - dot(vUv - 0.5, vUv - 0.5) * 1.6;
    color *= vig;

    gl_FragColor = vec4(color, 0.95);
  }
`;

// ── Scene ────────────────────────────────────────────────────
function VoronoiPlane({ paused }: { paused: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    if (!paused) {
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Smooth mouse interpolation
    const m = mat.uniforms.uMouse.value as THREE.Vector2;
    m.lerp(mouseRef.current, 0.03);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime:  { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * MicroalgaeGL — fullscreen Voronoi GLSL shader canvas.
 * Replaces the CSS MicroalgaeBackground on the Vision page.
 * Position: absolute inset-0 z-0, pointer-events-none.
 * Page content at z-10 sits above undisturbed.
 */
export default function MicroalgaeGL() {
  const paused = useReducedMotion();

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit]"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <CanvasErrorBoundary>
        <Canvas
          frameloop={paused ? "demand" : "always"}
          camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          orthographic
          style={{ background: "transparent" }}
        >
          <VoronoiPlane paused={paused} />
          <EffectComposer>
            <Bloom
              intensity={1.3}
              luminanceThreshold={0.15}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
          </EffectComposer>
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}
