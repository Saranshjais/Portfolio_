import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../../store';

export default function DataCore({ count = 5000 }) {
  const pointsRef = useRef();
  const { pointer, viewport } = useThree();
  
  // Read active shape from global state
  const activeShape = useStore(state => state.activeShape);

  // Generate target shapes
  const [positions, colors, shapes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    // Arrays for different target geometries
    const shapes = {
      sphere: new Float32Array(count * 3),
      barChart: new Float32Array(count * 3),
      galaxy: new Float32Array(count * 3),
      clusters: new Float32Array(count * 3)
    };

    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // --- 1. SPHERE ---
      const rSphere = 1.5 + Math.random() * 2;
      const thetaS = 2 * Math.PI * Math.random();
      const phiS = Math.acos(2 * Math.random() - 1);
      shapes.sphere[i3] = rSphere * Math.sin(phiS) * Math.cos(thetaS);
      shapes.sphere[i3+1] = rSphere * Math.sin(phiS) * Math.sin(thetaS);
      shapes.sphere[i3+2] = rSphere * Math.cos(phiS);

      // --- 2. BAR CHART (Abstract grid of bars) ---
      // 10x10 grid of bars
      const gridX = Math.floor(Math.random() * 10) - 5;
      const gridZ = Math.floor(Math.random() * 10) - 5;
      // Height based on grid position (pseudo-random data)
      const maxH = Math.abs(Math.sin(gridX * 0.5) * Math.cos(gridZ * 0.5)) * 3 + 0.5;
      const h = Math.random() * maxH;
      // Scatter slightly within the bar width
      shapes.barChart[i3] = gridX * 0.5 + (Math.random() * 0.3 - 0.15);
      shapes.barChart[i3+1] = h - 2; // Offset Y
      shapes.barChart[i3+2] = gridZ * 0.5 + (Math.random() * 0.3 - 0.15);

      // --- 3. GALAXY (Swirling plane) ---
      const radiusG = Math.random() * 4;
      const spinAngle = radiusG * 1.5; // the further out, the more it spins
      const angleG = Math.random() * Math.PI * 2 + spinAngle;
      shapes.galaxy[i3] = Math.cos(angleG) * radiusG;
      shapes.galaxy[i3+1] = (Math.random() - 0.5) * 0.5; // Thin plane
      shapes.galaxy[i3+2] = (Math.sin(angleG) * radiusG) - 2; // Push back on Z axis

      // --- 4. CLUSTERS (Two distinct balls for Positive/Negative Sentiment) ---
      const isPositive = Math.random() > 0.5;
      const clusterOffset = isPositive ? 2 : -2;
      const rCluster = Math.random() * 1.5;
      const thetaC = 2 * Math.PI * Math.random();
      const phiC = Math.acos(2 * Math.random() - 1);
      shapes.clusters[i3] = (rCluster * Math.sin(phiC) * Math.cos(thetaC)) + clusterOffset;
      shapes.clusters[i3+1] = rCluster * Math.sin(phiC) * Math.sin(thetaC);
      shapes.clusters[i3+2] = rCluster * Math.cos(phiC);

      // Set initial positions to sphere
      positions[i3] = shapes.sphere[i3];
      positions[i3+1] = shapes.sphere[i3+1];
      positions[i3+2] = shapes.sphere[i3+2];
      
      // Cybernetic Color palette
      const mixedColor = color.setHSL(0.5 + (Math.random() * 0.1), 0.9, 0.6 + Math.random() * 0.4);
      colors.set([mixedColor.r, mixedColor.g, mixedColor.b], i3);
    }
    
    return [positions, colors, shapes];
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      
      // Slower rotation when morphed to let user see shape
      const rotSpeed = activeShape === 'sphere' ? 0.05 : 0.01;
      pointsRef.current.rotation.y += rotSpeed * 0.1;
      
      const posAttribute = pointsRef.current.geometry.attributes.position;
      const targetShape = shapes[activeShape] || shapes.sphere;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Target position
        const tx = targetShape[i3];
        const ty = targetShape[i3 + 1];
        const tz = targetShape[i3 + 2];
        
        // Current position
        let cx = posAttribute.array[i3];
        let cy = posAttribute.array[i3 + 1];
        let cz = posAttribute.array[i3 + 2];
        
        // Adding organic noise ONLY to the sphere to keep other shapes readable
        let noiseX = 0, noiseY = 0, noiseZ = 0;
        if (activeShape === 'sphere') {
          const noise = Math.sin(time * 2 + tx * 10) * 0.05;
          noiseX = tx * noise;
          noiseY = ty * noise;
          noiseZ = tz * noise;
        }
        
        // Smooth interpolation (lerp) towards target
        // Speed up lerp slightly if not sphere for snappier transitions
        const lerpSpeed = activeShape === 'sphere' ? 0.05 : 0.1;
        
        cx = THREE.MathUtils.lerp(cx, tx + noiseX, lerpSpeed);
        cy = THREE.MathUtils.lerp(cy, ty + noiseY, lerpSpeed);
        cz = THREE.MathUtils.lerp(cz, tz + noiseZ, lerpSpeed);
        
        // Write back
        posAttribute.array[i3] = cx;
        posAttribute.array[i3 + 1] = cy;
        posAttribute.array[i3 + 2] = cz;
      }
      
      posAttribute.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
