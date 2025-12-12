'use client';

import { Suspense, useRef, useState, useEffect, Component, ReactNode, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, useGLTF, Bounds, useBounds } from '@react-three/drei';
import * as THREE from 'three';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';

interface ModelProps {
  url: string;
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

function AnimatedModel({ url, autoRotate = true }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(url);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<THREE.AnimationAction[]>([]);
  const bounds = useBounds();
  
  // Clone the scene using SkeletonUtils for proper skinned mesh/animation support
  const clonedScene = useMemo(() => {
    // SkeletonUtils.clone properly clones skeletons and bones for animations
    const clone = SkeletonUtils.clone(scene) as THREE.Group;
    
    // Configure mesh properties - SkeletonUtils.clone already properly handles skeleton binding
    clone.traverse((child) => {
      if (child instanceof THREE.SkinnedMesh) {
        child.frustumCulled = false;
        // Note: Do NOT call skeleton.calculateInverses() here!
        // SkeletonUtils.clone preserves the correct inverse bind matrices from the original model.
        // Recalculating them would corrupt the skeleton and cause mesh deformations (e.g., bent tails).
      }
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    
    return clone;
  }, [scene]);

  // Calculate model normalization scale and center offset for proper positioning
  const { centerOffset, normalizedScale } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
    
    // Calculate the max dimension
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Target size for normalization - models should be roughly this size before Bounds handles them
    const targetSize = 5;
    const scale = maxDim > 0 ? targetSize / maxDim : 1;
    
    // Center the model at the geometric center (not just bottom)
    return {
      centerOffset: {
        x: -center.x,
        y: -center.y, // Center vertically at geometric center, not bottom
        z: -center.z
      },
      normalizedScale: scale
    };
  }, [clonedScene]);

  // Refresh bounds after model is positioned and scaled
  useEffect(() => {
    // Use a small delay to ensure the model is fully loaded and positioned
    const timer = setTimeout(() => {
      bounds.refresh().clip().fit();
    }, 200);
    return () => clearTimeout(timer);
  }, [bounds, url]);

  // Clone animations and retarget to the cloned scene
  const clonedAnimations = useMemo(() => {
    if (!animations || animations.length === 0) return [];
    
    // Clone each animation clip to avoid sharing state with original
    return animations.map(clip => {
      const clonedClip = clip.clone();
      
      // Optimize tracks - remove any tracks with no keyframes or problematic tracks
      clonedClip.tracks = clonedClip.tracks.filter(track => {
        // Keep tracks that have valid keyframe data
        return track.times.length > 0 && track.values.length > 0;
      });
      
      // Reset the clip duration based on the tracks
      clonedClip.resetDuration();
      
      return clonedClip;
    });
  }, [animations]);

  // Setup animations
  useEffect(() => {
    if (clonedAnimations.length > 0) {
      // Stop any existing animations first
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        actionsRef.current = [];
      }
      
      // Create new mixer for the cloned scene
      mixerRef.current = new THREE.AnimationMixer(clonedScene);
      
      // Find the best animation clip to play
      // Priority: walk/locomotion animations > run > idle > loop > longest clip
      // Exclude: get_up, stand, sit, lay, sleep type animations
      const findBestClip = () => {
        const clipNames = clonedAnimations.map(c => c.name.toLowerCase());
        
        // Patterns to exclude (non-locomotion, setup animations)
        const excludePatterns = ['get_up', 'getup', 'stand_up', 'standup', 'sit', 'lay', 'sleep', 'rest', 'down'];
        
        // Filter out excluded animations if there are other options
        const filteredAnimations = clonedAnimations.filter((clip, index) => {
          const name = clipNames[index];
          const isExcluded = excludePatterns.some(pattern => name.includes(pattern));
          return !isExcluded;
        });
        
        // Use filtered list if available, otherwise use all animations
        const animationsToSearch = filteredAnimations.length > 0 ? filteredAnimations : clonedAnimations;
        const namesToSearch = animationsToSearch.map(c => c.name.toLowerCase());
        
        // Look for locomotion animations first (walking is most natural for pet display)
        const locomotionPriorities = ['walk', 'walking', 'trot', 'run', 'running', 'move'];
        for (const priority of locomotionPriorities) {
          const index = namesToSearch.findIndex(name => name.includes(priority));
          if (index !== -1) {
            return animationsToSearch[index];
          }
        }
        
        // Then look for other common animations
        const otherPriorities = ['idle', 'loop', 'anim', 'take'];
        for (const priority of otherPriorities) {
          const index = namesToSearch.findIndex(name => name.includes(priority));
          if (index !== -1) {
            return animationsToSearch[index];
          }
        }
        
        // Fall back to the longest clip from filtered list (most likely the main animation)
        return animationsToSearch.reduce((longest, clip) => 
          clip.duration > longest.duration ? clip : longest
        , animationsToSearch[0]);
      };
      
      const bestClip = findBestClip();
      
      // Create action with proper settings for smooth looping
      const action = mixerRef.current.clipAction(bestClip);
      
      // Reset action state completely
      action.stop();
      action.reset();
      
      // Configure for smooth infinite looping
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.clampWhenFinished = false;
      action.zeroSlopeAtStart = true;
      action.zeroSlopeAtEnd = true;
      
      // Use default time scale and full weight
      action.setEffectiveTimeScale(1);
      action.setEffectiveWeight(1);
      
      // Enable the action and play
      action.enabled = true;
      action.play();
      
      actionsRef.current = [action];
    }

    return () => {
      if (mixerRef.current) {
        actionsRef.current.forEach(action => action.stop());
        actionsRef.current = [];
        mixerRef.current.stopAllAction();
        mixerRef.current = null;
      }
    };
  }, [clonedScene, clonedAnimations]);

  useFrame((state, delta) => {
    // Update animation mixer with clamped delta to prevent large jumps
    if (mixerRef.current) {
      // Clamp delta to prevent animation glitches from large time jumps
      const clampedDelta = Math.min(delta, 0.1);
      mixerRef.current.update(clampedDelta);
    }
    
    // Auto rotate the group
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef} scale={normalizedScale}>
      <group position={[centerOffset.x, centerOffset.y, centerOffset.z]}>
        <primitive object={clonedScene} />
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
  autoRotate?: boolean;
  className?: string;
  petType?: 'dog' | 'cat';
}

// Inner canvas content with model or fallback
function CanvasContent({ 
  modelUrl, 
  autoRotate, 
  petType,
  useFallback
}: { 
  modelUrl: string; 
  autoRotate: boolean; 
  petType: 'dog' | 'cat';
  useFallback: boolean;
}) {
  return (
    <>
      {/* Lighting setup for better visibility */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        position={[-5, 5, -5]}
        intensity={0.5}
      />
      <spotLight
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={1}
        intensity={0.8}
        castShadow
      />
      
      <Suspense fallback={<LoadingSpinner />}>
        {/* Bounds component to auto-fit the model in view */}
        <Bounds key={modelUrl} fit clip observe margin={1.8}>
          {useFallback ? (
            <FallbackPet type={petType} autoRotate={autoRotate} />
          ) : (
            <ModelErrorBoundary fallback={<FallbackPet type={petType} autoRotate={autoRotate} />}>
              <AnimatedModel key={modelUrl} url={modelUrl} autoRotate={autoRotate} />
            </ModelErrorBoundary>
          )}
        </Bounds>
        
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.5}
          scale={10}
          blur={2.5}
          far={5}
        />
        <Environment preset="apartment" />
      </Suspense>
      
      {/* Camera controls - key forces reset on model change */}
      <OrbitControls
        key={modelUrl}
        enablePan={false}
        enableZoom={true}
        minDistance={2}
        maxDistance={15}
        autoRotate={false}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function Model3DViewer({
  modelUrl,
  autoRotate = true,
  className = '',
  petType = 'dog',
}: Model3DViewerProps) {
  const [useFallback, setUseFallback] = useState(false);
  const [canvasError, setCanvasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Only use fallback if no model URL provided
  useEffect(() => {
    if (!modelUrl || modelUrl === '') {
      setUseFallback(true);
    } else {
      setUseFallback(false);
    }
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
        camera={{ position: [0, 2, 6], fov: 35 }}
        shadows
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false
        }}
        onError={() => setCanvasError(true)}
        style={{ touchAction: 'none' }}
      >
        <CanvasContent
          key={modelUrl}
          modelUrl={modelUrl}
          autoRotate={autoRotate}
          petType={petType}
          useFallback={useFallback}
        />
      </Canvas>
    </div>
  );
}
