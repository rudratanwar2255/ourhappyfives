import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';
import littleParthiImg from '../assets/little-parthi.jpg';

// Check for reduced motion
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(media.matches);
    const handler = () => setReduced(media.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// 3D Heart geometry helper using cubic Bezier curves
function createHeartShape() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.35);
  shape.bezierCurveTo(0, 0.55, -0.25, 0.7, -0.45, 0.45);
  shape.bezierCurveTo(-0.7, 0.15, -0.3, -0.2, 0, -0.5);
  shape.bezierCurveTo(0.3, -0.2, 0.7, 0.15, 0.45, 0.45);
  shape.bezierCurveTo(0.25, 0.7, 0, 0.55, 0, 0.35);
  return shape;
}

function FloatingHearts({ count = 8, reduced = false }: { count?: number; reduced?: boolean }) {
  const geom = useMemo(() => new THREE.ShapeGeometry(createHeartShape(), 8), []);
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 14,
      z: -2 - Math.random() * 8,
      s: 0.16 + Math.random() * 0.28,
      r: Math.random() * Math.PI,
      sp: 0.12 + Math.random() * 0.22,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current || reduced) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, idx) => {
      const p = particles[idx];
      if (p) {
        child.position.y = p.y + Math.sin(time * p.sp + p.r) * 0.7;
        child.rotation.z = Math.sin(time * p.sp * 0.5 + p.r) * 0.25;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, idx) => (
        <mesh key={idx} geometry={geom} position={[p.x, p.y, p.z]} scale={p.s}>
          <meshBasicMaterial color="#fba4b8" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ reduced }: { reduced: boolean }) {
  useFrame((state) => {
    const scrollYProgress =
      typeof window === 'undefined'
        ? 0
        : window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
    const time = reduced ? 0 : state.clock.elapsedTime;

    state.camera.position.x += (Math.sin(time * 0.08) * 0.3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-scrollYProgress * 2.8 - state.camera.position.y) * 0.03;
    state.camera.position.z += (6 - scrollYProgress * 1.2 - state.camera.position.z) * 0.03;
    state.camera.lookAt(0, state.camera.position.y * 0.4, -5);
  });

  return null;
}

export const StarField: React.FC = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Background Photo (Vivid & Clear) */}
      <img
        src={littleParthiImg}
        alt="Background"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center filter brightness-90 saturate-[1.1] contrast-[1.02]"
      />

      {/* Warm Tulip-Rose Gradient Overlay (Translucent so photo shines through) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#140510]/45 via-[#2a0920]/20 to-[#140510]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(251,164,184,0.15)_0%,rgba(240,181,166,0.06)_50%,transparent_80%)]" />

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-10">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: false, powerPreference: 'high-performance' }}
          camera={{ position: [0, 0, 6], fov: 60 }}
        >
          <Stars
            radius={60}
            depth={40}
            count={reduced ? 250 : 700}
            factor={3}
            saturation={0}
            fade
            speed={reduced ? 0 : 0.3}
          />
          <FloatingHearts count={reduced ? 4 : 8} reduced={reduced} />
          <CameraRig reduced={reduced} />
        </Canvas>
      </div>
    </div>
  );
};
