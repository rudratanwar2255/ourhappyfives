import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleHeartProps {
  reduced?: boolean;
}

// 2D Heart curve shape for 3D extrusion
function createHeart3DShape() {
  const shape = new THREE.Shape();
  const x = 0, y = 0;
  shape.moveTo(x, y + 0.35);
  shape.bezierCurveTo(x, y + 0.55, x - 0.28, y + 0.75, x - 0.52, y + 0.5);
  shape.bezierCurveTo(x - 0.8, y + 0.18, x - 0.35, y - 0.25, x, y - 0.65);
  shape.bezierCurveTo(x + 0.35, y - 0.25, x + 0.8, y + 0.18, x + 0.52, y + 0.5);
  shape.bezierCurveTo(x + 0.28, y + 0.75, x, y + 0.55, x, y + 0.35);
  return shape;
}

export const ParticleHeart: React.FC<ParticleHeartProps> = ({ reduced = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const outerWireRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const sparklesRef = useRef<THREE.Points>(null);

  // 3D Extruded Heart Geometry
  const extrudeGeom = useMemo(() => {
    const shape = createHeart3DShape();
    const extrudeSettings = {
      depth: 0.28,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08,
    };
    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  // Dense Heart Particle Shell (1500 particles)
  const [particlePositions, particleColors] = useMemo(() => {
    const count = reduced ? 600 : 1600;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const c1 = new THREE.Color('#ffffff');
    const c2 = new THREE.Color('#fba4b8');
    const c3 = new THREE.Color('#fb7185');
    const c4 = new THREE.Color('#fed7aa');

    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 0.65 + Math.random() * 0.45;

      // Parametric Heart Formula
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      pos[i * 3] = (x / 16) * r * 1.55 + (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 1] = (y / 16) * r * 1.55 + (Math.random() - 0.5) * 0.12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.6;

      // Color variation
      const mix = Math.random();
      const pickedColor = mix < 0.35 ? c1 : mix < 0.7 ? c2 : mix < 0.9 ? c3 : c4;
      col[i * 3] = pickedColor.r;
      col[i * 3 + 1] = pickedColor.g;
      col[i * 3 + 2] = pickedColor.b;
    }

    return [pos, col];
  }, [reduced]);

  // Orbiting Celestial Sparkles Ring (350 particles)
  const sparklePositions = useMemo(() => {
    const count = 350;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.1;
      const radius = 1.6 + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius * 0.5 + (Math.random() - 0.5) * 0.3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.8;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Realistic double-beat heartbeat pulse (lub-dub)
    const beatCycle = (time * 1.8) % Math.PI;
    let pulse = 1.0;
    if (beatCycle < 0.35) {
      pulse = 1.0 + Math.sin(beatCycle * (Math.PI / 0.35)) * 0.18;
    } else if (beatCycle > 0.45 && beatCycle < 0.75) {
      pulse = 1.0 + Math.sin((beatCycle - 0.45) * (Math.PI / 0.3)) * 0.12;
    }

    if (groupRef.current) {
      groupRef.current.scale.setScalar(reduced ? 1.05 : pulse * 1.1);
      if (!reduced) {
        groupRef.current.rotation.y = Math.sin(time * 0.6) * 0.35;
        groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.08;
      }
    }

    if (outerWireRef.current && !reduced) {
      outerWireRef.current.rotation.y = -time * 0.3;
      outerWireRef.current.rotation.x = Math.sin(time * 0.5) * 0.15;
    }

    if (sparklesRef.current && !reduced) {
      sparklesRef.current.rotation.z = time * 0.4;
      sparklesRef.current.rotation.y = Math.sin(time * 0.3) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Glowing Crystal 3D Heart Core */}
      <mesh ref={coreMeshRef} geometry={extrudeGeom} scale={1.25}>
        <meshPhysicalMaterial
          color="#fb7185"
          emissive="#fb7185"
          emissiveIntensity={0.85}
          roughness={0.15}
          metalness={0.25}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* 2. Outer Luminous Neon Wireframe Shell */}
      <mesh ref={outerWireRef} geometry={extrudeGeom} scale={1.35}>
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 3. High-Density Glowing Particle Swarm */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
            count={particlePositions.length / 3}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
            count={particleColors.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.95}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* 4. Orbiting Celestial Sparkle Rings */}
      <points ref={sparklesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[sparklePositions, 3]}
            count={sparklePositions.length / 3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color="#fed7aa"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Point Lights for rich dynamic 3D illumination */}
      <pointLight position={[0, 0, 3]} intensity={2.5} color="#ffffff" />
      <pointLight position={[-2, 2, 2]} intensity={2} color="#fb7185" />
      <pointLight position={[2, -2, 2]} intensity={1.5} color="#fed7aa" />
    </group>
  );
};
