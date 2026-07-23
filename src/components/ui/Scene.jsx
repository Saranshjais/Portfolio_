import { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import DataCore from './DataCore';

function CameraRig() {
  const { camera, pointer } = useThree();
  
  useFrame((state) => {
    // Advanced Camera Flight:
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollProgress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Pull camera back on smaller screens to keep the sphere fully in view
    const isMobile = state.size.width < 768;
    const baseZ = isMobile ? 16 : 8;
    const zoomAmount = isMobile ? 10 : 5;
    
    // As we scroll down, we fly towards the core
    const targetZ = baseZ - (scrollProgress * zoomAmount);  
    
    // Subtle mouse parallax
    const targetX = (pointer.x * Math.PI) / 2;
    const targetY = (pointer.y * Math.PI) / 2;
    
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
    
    // Always look at the center, but add slight rotation based on scroll
    camera.lookAt(0, 0, 0);
    camera.rotation.z = scrollProgress * Math.PI * 0.2;
  });
  
  return null;
}

export default function Scene() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#020202']} />
        
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#00f0ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#ff003c" />
        
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
          <DataCore count={5000} />
        </Float>
        
        <CameraRig />
        
        {/* Cinematic Post-Processing */}
        <EffectComposer disableNormalPass>
          <Bloom 
            luminanceThreshold={0.2} 
            mipmapBlur 
            intensity={1.0} 
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
