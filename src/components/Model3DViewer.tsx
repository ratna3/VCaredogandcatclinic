'use client';

import { Suspense, useRef, useState, useEffect, Component, ReactNode, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Center, Bounds } from '@react-three/drei';
import * as THREE from 'three';

interface ModelProps {
  url: string;
  targetSize?: number;
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

function AnimatedModel({ url, targetSize = 2, position = [0, 0, 0], rotation = [0, 0, 0], autoRotate = true }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Calculate auto-scale to normalize model size
  const autoScale = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDimension = Math.max(size.x, size.y, size.z);
    if (maxDimension === 0) return 1;
    return targetSize / maxDimension;
  }, [clonedScene, targetSize]);

  // Calculate center offset to center the model
  const centerOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [-center.x * autoScale, -center.y * autoScale, -center.z * autoScale] as [number, number, number];
  }, [clonedScene, autoScale]);

  useEffect(() => {
    // Setup animation mixer for the cloned scene
    if (animations && animations.length > 0) {
      mixerRef.current = new THREE.AnimationMixer(clonedScene);
      
      animations.forEach((clip) => {
        const action = mixerRef.current!.clipAction(clip);
        action.reset();
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = false;
        action.play();
      });
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
    };
  }, [clonedScene, animations]);

  useFrame((state, delta) => {
    // Update animation mixer
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    // Auto rotate the group
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      <group position={centerOffset}>
        <primitive object={clonedScene} scale={autoScale} />
      </group>
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
  targetSize?: number;
}

// Inner canvas content with model or fallback
function CanvasContent({ 
  modelUrl, 
  targetSize, 
  autoRotate, 
  petType,
  useFallback
}: { 
  modelUrl: string; 
  targetSize: number; 
  autoRotate: boolean; 
  petType: 'dog' | 'cat';
  useFallback: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <spotLight
        position={[-5, 5, 5]}
        angle={0.3}
        penumbra={1}
        intensity={0.6}
        castShadow
      />
      <Suspense fallback={<LoadingSpinner />}>
        {useFallback ? (
          <FallbackPet type={petType} autoRotate={autoRotate} />
        ) : (
          <ModelErrorBoundary fallback={<FallbackPet type={petType} autoRotate={autoRotate} />}>
            <AnimatedModel url={modelUrl} targetSize={targetSize} autoRotate={autoRotate} />
          </ModelErrorBoundary>
        )}
        <ContactShadows
          position={[0, -1.2, 0]}
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
        target={[0, 0, 0]}
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
  targetSize = 2,
}: Model3DViewerProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 400, height: 400 });

  // Responsive container sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Calculate responsive target size based on container
  const responsiveTargetSize = useMemo(() => {
    const minDimension = Math.min(containerSize.width, containerSize.height);
    // Base target size of 2, scaled down for smaller containers
    const baseSize = targetSize * scale;
    if (minDimension < 300) return baseSize * 0.7;
    if (minDimension < 400) return baseSize * 0.85;
    return baseSize;
  }, [containerSize, targetSize, scale]);

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
    <div ref={containerRef} className={`canvas-container ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 4], fov: 45 }}
        shadows
        gl={{ antialias: true, alpha: true }}
        onError={() => setCanvasError(true)}
        style={{ touchAction: 'none' }}
      >
        <CanvasContent
          modelUrl={modelUrl}
          targetSize={responsiveTargetSize}
          autoRotate={autoRotate}
          petType={petType}
          useFallback={useFallback}
        />
      </Canvas>
    </div>
  );
}
