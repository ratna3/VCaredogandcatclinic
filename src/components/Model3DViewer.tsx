'use client';

import { Suspense, useRef, useState, useEffect, Component, ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  onError?: () => void;
}

// Error Boundary class component
class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Fallback animated pet when model can't load
function FallbackPet({ type = 'dog', autoRotate = true }: { type?: 'dog' | 'cat'; autoRotate?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bounceRef = useRef(0);

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.5;
      }
      // Subtle bounce animation
      bounceRef.current = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      groupRef.current.position.y = bounceRef.current;
    }
  });

  const bodyColor = type === 'dog' ? '#8B4513' : '#808080';
  const earColor = type === 'dog' ? '#654321' : '#606060';

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 0.6, 8, 16]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.7, 0.3]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.2, 1, 0.3]} rotation={[0, 0, -0.3]}>
        <coneGeometry args={[0.1, 0.25, 8]} />
        <meshStandardMaterial color={earColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, 1, 0.3]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.1, 0.25, 8]} />
        <meshStandardMaterial color={earColor} roughness={0.8} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.12, 0.75, 0.58]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.12, 0.75, 0.58]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Nose */}
      <mesh position={[0, 0.6, 0.62]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.5, 0.15]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, -0.5, 0.15]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, -0.5, -0.15]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.2, -0.5, -0.15]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.1, -0.5]} rotation={[0.5, 0, 0]}>
        <capsuleGeometry args={[0.05, 0.3, 4, 8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

function AnimatedModel({ url, scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(scene);
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.play();
      });
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
    };
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <primitive object={scene.clone()} scale={scale} />
    </group>
  );
}

function LoadingSpinner() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[0.5, 0.1, 16, 32]} />
      <meshStandardMaterial color="#0f766e" />
    </mesh>
  );
}

// Error fallback component for the canvas
function CanvasErrorFallback({ type }: { type?: 'dog' | 'cat' }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-royal-50 to-royal-100 rounded-xl">
      <div className="text-center">
        <div className="text-6xl mb-4">{type === 'cat' ? '🐱' : '🐕'}</div>
        <p className="text-royal-600 text-sm">Interactive 3D Model</p>
      </div>
    </div>
  );
}

interface Model3DViewerProps {
  modelUrl: string;
  scale?: number;
  autoRotate?: boolean;
  className?: string;
  petType?: 'dog' | 'cat';
}

// Inner canvas content with model or fallback
function CanvasContent({ 
  modelUrl, 
  scale, 
  autoRotate, 
  petType,
  useFallback
}: { 
  modelUrl: string; 
  scale: number; 
  autoRotate: boolean; 
  petType: 'dog' | 'cat';
  useFallback: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
      <Suspense fallback={<LoadingSpinner />}>
        {useFallback ? (
          <FallbackPet type={petType} autoRotate={autoRotate} />
        ) : (
          <ModelErrorBoundary fallback={<FallbackPet type={petType} autoRotate={autoRotate} />}>
            <AnimatedModel url={modelUrl} scale={scale} autoRotate={autoRotate} />
          </ModelErrorBoundary>
        )}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />
        <Environment preset="studio" />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={10}
        autoRotate={false}
      />
    </>
  );
}

export default function Model3DViewer({
  modelUrl,
  scale = 1,
  autoRotate = true,
  className = '',
  petType = 'dog',
}: Model3DViewerProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [canvasError, setCanvasError] = useState(false);

  // Check if the model URL is valid (not empty)
  useEffect(() => {
    // If no model URL or it's clearly invalid, use fallback
    if (!modelUrl || modelUrl === '') {
      setUseFallback(true);
      return;
    }

    // Try to check if the model exists
    fetch(modelUrl, { method: 'HEAD' })
      .then(response => {
        if (!response.ok) {
          setUseFallback(true);
        }
      })
      .catch(() => {
        setUseFallback(true);
      });
  }, [modelUrl]);

  if (canvasError) {
    return (
      <div className={`canvas-container ${className}`}>
        <CanvasErrorFallback type={petType} />
      </div>
    );
  }

  return (
    <div className={`canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 1, 4], fov: 50 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        onError={() => setCanvasError(true)}
      >
        <CanvasContent
          modelUrl={modelUrl}
          scale={scale}
          autoRotate={autoRotate}
          petType={petType}
          useFallback={useFallback}
        />
      </Canvas>
    </div>
  );
}
