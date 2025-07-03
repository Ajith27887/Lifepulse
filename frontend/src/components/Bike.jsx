import React, { useRef, useEffect, useState } from 'react';

const BikeOilMonitor = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const oilMeshRef = useRef(null);
  const tankMeshRef = useRef(null);
  const animationRef = useRef(null);
  const THREE = useRef(null);
  
  const [oilLevel, setOilLevel] = useState(100);
  const [lastRefill, setLastRefill] = useState(new Date());
  const [isLowAlert, setIsLowAlert] = useState(false);
  const [isDangerAlert, setIsDangerAlert] = useState(false);
  const [daysSinceRefill, setDaysSinceRefill] = useState(0);
  const [oilChangeInterval, setOilChangeInterval] = useState(30);
  const [showMonitor, setShowMonitor] = useState(true);
  const [threeLoaded, setThreeLoaded] = useState(false);

  // Load Three.js
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = () => {
      THREE.current = window.THREE;
      setThreeLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Calculate oil level based on real-world days
  const calculateOilLevel = (refillDate) => {
    const now = new Date();
    const daysDiff = Math.floor((now - refillDate) / (1000 * 60 * 60 * 24));
    setDaysSinceRefill(daysDiff);
    
    const dailyReduction = 100 / oilChangeInterval;
    const calculatedLevel = Math.max(0, 100 - (daysDiff * dailyReduction));
    
    return calculatedLevel;
  };

  // Update oil level based on real date
  useEffect(() => {
    const updateOilLevel = () => {
      const newLevel = calculateOilLevel(lastRefill);
      setOilLevel(newLevel);
    };

    updateOilLevel();
    const interval = setInterval(updateOilLevel, 60000);
    
    return () => clearInterval(interval);
  }, [lastRefill, oilChangeInterval]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!threeLoaded || !mountRef.current || !THREE.current) return;

    const T = THREE.current;

    // Scene setup
    const scene = new T.Scene();
    scene.background = new T.Color(0x1a1a2e);
    sceneRef.current = scene;

    // Camera
    const camera = new T.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    // Renderer
    const renderer = new T.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    rendererRef.current = renderer;
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new T.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new T.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Oil tank (outer container)
    const tankGeometry = new T.CylinderGeometry(2, 2, 6, 32);
    const tankMaterial = new T.MeshPhongMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.3,
      side: T.DoubleSide
    });
    const tankMesh = new T.Mesh(tankGeometry, tankMaterial);
    tankMesh.castShadow = true;
    tankMesh.receiveShadow = true;
    scene.add(tankMesh);
    tankMeshRef.current = tankMesh;

    // Oil (inner liquid)
    const oilGeometry = new T.CylinderGeometry(1.9, 1.9, 6, 32);
    const oilMaterial = new T.MeshPhongMaterial({
      color: 0x8B4513,
      transparent: true,
      opacity: 0.8,
      shininess: 100
    });
    const oilMesh = new T.Mesh(oilGeometry, oilMaterial);
    oilMesh.position.y = -3;
    scene.add(oilMesh);
    oilMeshRef.current = oilMesh;

    // Tank base
    const baseGeometry = new T.CylinderGeometry(2.5, 2.5, 0.5, 32);
    const baseMaterial = new T.MeshPhongMaterial({ color: 0x666666 });
    const baseMesh = new T.Mesh(baseGeometry, baseMaterial);
    baseMesh.position.y = -3.5;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    scene.add(baseMesh);

    // Tank cap
    const capGeometry = new T.CylinderGeometry(1.5, 1.5, 0.3, 32);
    const capMaterial = new T.MeshPhongMaterial({ color: 0x444444 });
    const capMesh = new T.Mesh(capGeometry, capMaterial);
    capMesh.position.y = 3.3;
    capMesh.castShadow = true;
    scene.add(capMesh);

    // Oil level indicator rings
    for (let i = 0; i < 5; i++) {
      const ringGeometry = new T.RingGeometry(2.1, 2.3, 32);
      const ringMaterial = new T.MeshBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.5
      });
      const ringMesh = new T.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.y = -2 + i * 1.2;
      ringMesh.rotation.x = Math.PI / 2;
      scene.add(ringMesh);
    }

    // Ground
    const groundGeometry = new T.PlaneGeometry(20, 20);
    const groundMaterial = new T.MeshPhongMaterial({ color: 0x2d2d2d });
    const ground = new T.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Mouse controls
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      // Smooth camera rotation
      camera.position.x += (targetRotationY * 15 - camera.position.x) * 0.05;
      camera.position.y += (targetRotationX * 10 + 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      // Rotate tank
      if (tankMeshRef.current) {
        tankMeshRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [threeLoaded]);

  // Update oil level visualization
  useEffect(() => {
    if (oilMeshRef.current) {
      const levelPercent = oilLevel / 100;
      const maxHeight = 6;
      const newHeight = maxHeight * levelPercent;
      
      oilMeshRef.current.scale.y = levelPercent;
      oilMeshRef.current.position.y = -3 + (maxHeight - newHeight) / 2;
      
      // Change color based on level
      let color;
      if (oilLevel > 50) {
        color = 0x8B4513; // Brown
      } else if (oilLevel > 20) {
        color = 0xFF8C00; // Orange
      } else {
        color = 0xFF0000; // Red
      }
      
      oilMeshRef.current.material.color.setHex(color);
      
      // Alert states
      setIsLowAlert(oilLevel <= 30 && oilLevel > 10);
      setIsDangerAlert(oilLevel <= 10);
    }
  }, [oilLevel]);

  const refillOil = () => {
    const now = new Date();
    setLastRefill(now);
    setOilLevel(100);
  };

  const getStatusColor = () => {
    if (isDangerAlert) return 'text-red-500';
    if (isLowAlert) return 'text-orange-500';
    return 'text-green-500';
  };

  const getStatusText = () => {
    if (isDangerAlert) return 'CRITICAL - REFILL NOW!';
    if (isLowAlert) return 'LOW - Refill Soon';
    return 'Normal';
  };

  const getNextOilChange = () => {
    const nextChange = new Date(lastRefill);
    nextChange.setDate(nextChange.getDate() + oilChangeInterval);
    return nextChange;
  };

  const getDaysUntilChange = () => {
    const nextChange = getNextOilChange();
    const now = new Date();
    const daysLeft = Math.ceil((nextChange - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  return (
    <div className="w-full h-screen bg-gray-900 relative overflow-hidden">
      {/* Loading indicator */}
      {!threeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="text-white text-xl">Loading 3D Engine...</div>
        </div>
      )}

      {/* 3D Scene */}
      <div ref={mountRef} className="w-full h-full" />
      
      {/* UI Overlay */}
      {showMonitor && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-80 text-white p-6 rounded-lg border border-gray-600 max-w-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-blue-400">🏍️ Oil Monitor</h2>
            <button
              onClick={() => setShowMonitor(false)}
              className="text-gray-400 hover:text-white transition-colors duration-200 text-xl font-bold"
              title="Close Monitor"
            >
              ✕
            </button>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Oil Level:</span>
              <span className={`font-bold ${getStatusColor()}`}>{oilLevel.toFixed(1)}%</span>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  isDangerAlert ? 'bg-red-500' : 
                  isLowAlert ? 'bg-orange-500' : 'bg-green-500'
                }`}
                style={{ width: `${oilLevel}%` }}
              />
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">Status:</span>
              <span className={`font-bold ${getStatusColor()}`}>{getStatusText()}</span>
            </div>
            <div className="text-sm text-gray-400">
              Last Change: {lastRefill.toLocaleDateString()}
            </div>
            <div className="text-sm text-gray-400">
              Days Since: {daysSinceRefill} days
            </div>
            <div className="text-sm text-gray-400">
              Days Until Next: {getDaysUntilChange()} days
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Change Interval:</label>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={oilChangeInterval}
              onChange={(e) => setOilChangeInterval(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-400 mt-1">Every {oilChangeInterval} days</div>
          </div>

          <button
            onClick={refillOil}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            🛢️ Oil Changed
          </button>
        </div>
      )}

      {/* Minimized Monitor Button */}
      {!showMonitor && (
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setShowMonitor(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg"
            title="Open Oil Monitor"
          >
            🏍️
          </button>
        </div>
      )}

      {/* Alert Notifications */}
      {isDangerAlert && (
        <div className="absolute top-4 right-4 bg-red-600 text-white p-4 rounded-lg border-2 border-red-400 animate-pulse">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            <div>
              <div className="font-bold">CRITICAL!</div>
              <div className="text-sm">Change oil NOW!</div>
            </div>
          </div>
        </div>
      )}

      {isLowAlert && !isDangerAlert && (
        <div className="absolute top-4 right-4 bg-orange-600 text-white p-4 rounded-lg border-2 border-orange-400">
          <div className="flex items-center">
            <span className="text-2xl mr-2">⚠️</span>
            <div>
              <div className="font-bold">Low Oil</div>
              <div className="text-sm">Change soon</div>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white p-4 rounded-lg border border-gray-600">
        <div className="text-sm">
          <div className="font-bold mb-2">Controls:</div>
          <div>• Move mouse to rotate camera</div>
          <div>• Oil reduces daily in real-time</div>
          <div>• Alerts at 30% and 10% levels</div>
        </div>
      </div>
    </div>
  );
};

export default BikeOilMonitor;