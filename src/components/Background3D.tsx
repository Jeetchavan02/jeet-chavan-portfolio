import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Wireframe, PresentationControls, Float, MeshWobbleMaterial } from "@react-three/drei";
import { MotionValue } from "framer-motion";
import * as THREE from "three";

function GeometricStructure({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!groupRef.current || !meshRef.current) return;

    // Direct scroll-linked physics
    // scrollYProgress goes from 0 (top) to 1 (bottom of sticky container)
    const progress = scrollYProgress.get();

    // Scale up slightly based on scroll to create depth
    const scale = 1 + progress * 0.8;
    groupRef.current.scale.set(scale, scale, scale);

    // Add a slight pull up to sell the depth
    groupRef.current.position.y = progress * 4;

    // Ambient float is handled by <Float> now, but we can still spin it slowly
    groupRef.current.rotation.y += delta * 0.2;
    groupRef.current.rotation.z = progress * Math.PI;
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <PresentationControls 
          global 
          config={{ mass: 2, tension: 500 }} 
          snap={{ mass: 4, tension: 150 }} 
          rotation={[0.13, 0.1, 0]} 
          polar={[-Math.PI / 3, Math.PI / 3]} 
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          {/* Main Cyberpunk Tech Core */}
          <mesh ref={meshRef} scale={1.8}>
            <torusKnotGeometry args={[9, 1.5, 256, 32]} />
            <MeshWobbleMaterial color="#7c3aed" factor={0.4} speed={2} wireframe opacity={0.6} transparent />
          </mesh>
          
          {/* Inner pulsating core */}
          <mesh scale={6}>
            <icosahedronGeometry args={[1, 1]} />
            <meshBasicMaterial color="#000000" />
            <Wireframe
              simplify={true}
              fillOpacity={0}
              strokeOpacity={0.8}
              stroke={"#ffffff"}
              thickness={0.04}
            />
          </mesh>
        </PresentationControls>
      </Float>
    </group>
  );
}

export function Background3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  return (
    <div className="absolute inset-0 z-0 opacity-60 cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 30], fov: 45 }}>
        <fog attach="fog" args={["#000000", 15, 45]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#7c3aed" />
        <GeometricStructure scrollYProgress={scrollYProgress} />
      </Canvas>
    </div>
  );
}
