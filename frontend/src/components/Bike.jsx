// 📁 components/ChainHealth3D.jsx

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function Chain() {
  const chainRef = useRef();
  const [rotationSpeed, setRotationSpeed] = useState(0.05); // simulate smooth chain
  const [daysPassed, setDaysPassed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysPassed((prev) => prev + 1);
      if (daysPassed >= 30) {
        setRotationSpeed(0.01); // slower, rusty feel
      }
    }, 2000); // simulate 1 day = 2 sec for demo

    return () => clearInterval(interval);
  }, [daysPassed]);

  useFrame(() => {
    if (chainRef.current) {
      chainRef.current.rotation.z += rotationSpeed;
    }
  });

  return (
    <mesh ref={chainRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.2, 0.1, 16, 100]} />
      <meshStandardMaterial color={daysPassed >= 30 ? '#8D6E63' : '#4CAF50'} />
    </mesh>
  );
}

export default function ChainHealth3D() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Chain />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
