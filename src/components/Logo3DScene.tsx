import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Logo3DSceneProps {
  className?: string;
  height?: number | string;
  children?: React.ReactNode;
}

export default function Logo3DScene({ 
  className = '', 
  height = '460px',
  children
}: Logo3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    
    const width = container.clientWidth || 900;
    const heightPx = container.clientHeight || 460;
    
    const camera = new THREE.PerspectiveCamera(32, width / heightPx, 0.1, 100);

    const updateCameraAndSize = (newWidth: number, newHeight: number) => {
      const aspect = newWidth / newHeight;
      camera.aspect = aspect;

      // Base desktop parameters:
      // Object outer radius including bevel and tilt safety margin is ~3.2 units.
      const objectRadius = 3.2;
      const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360); // tan(16°) ≈ 0.2867

      let targetZ = 11.4;

      // On portrait/mobile screens (<768px), increase the 3D token size by ~24px
      const isMobile = newWidth < 768;
      const fitRatio = isMobile ? 0.93 : 0.86;
      const minRequiredHalfWidth = objectRadius / fitRatio;
      const zForWidth = minRequiredHalfWidth / (tanHalfFov * aspect);

      if (zForWidth > targetZ) {
        targetZ = zForWidth;
      } else if (isMobile) {
        targetZ = targetZ * (0.86 / fitRatio);
      }

      camera.position.set(0, 0, targetZ);
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.28;
    
    updateCameraAndSize(width, heightPx);
    container.appendChild(renderer.domElement);

    // 2. High-End Procedural HDRI Studio Lighting (Deep Abyssal Midnight Sapphire Reflections)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    
    const envCanvas = document.createElement('canvas');
    envCanvas.width = 2048;
    envCanvas.height = 1024;
    const ctx = envCanvas.getContext('2d');

    if (ctx) {
      // Deep neutral dark studio space
      ctx.fillStyle = '#020408';
      ctx.fillRect(0, 0, 2048, 1024);

      // Primary Slanted Light Beam: Deeper Midnight Sapphire & Abyssal Navy
      ctx.save();
      ctx.translate(950, 420);
      ctx.rotate(-Math.PI / 4.0);
      
      const blueBeam = ctx.createLinearGradient(-400, 0, 400, 0);
      blueBeam.addColorStop(0, 'rgba(0, 0, 0, 0)');
      blueBeam.addColorStop(0.20, 'rgba(6, 14, 40, 0.25)');
      blueBeam.addColorStop(0.38, '#0f172a'); // Deepest midnight slate-navy
      blueBeam.addColorStop(0.48, '#172554'); // Dark abyssal navy
      blueBeam.addColorStop(0.51, '#3b82f6'); // Rich deep blue specular core
      blueBeam.addColorStop(0.53, '#94a3b8'); // Soft slate specular crest
      blueBeam.addColorStop(0.56, '#1d4ed8'); // Deep royal sapphire
      blueBeam.addColorStop(0.68, '#1e3a8a'); // Midnight navy blue
      blueBeam.addColorStop(0.85, 'rgba(8, 18, 50, 0.25)');
      blueBeam.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = blueBeam;
      ctx.fillRect(-400, -700, 800, 1400);
      ctx.restore();

      // Secondary Slanted Light Streak: Abyssal Indigo / Deep Midnight
      ctx.save();
      ctx.translate(1500, 260);
      ctx.rotate(-Math.PI / 3.4);
      const deepStreak = ctx.createLinearGradient(-240, 0, 240, 0);
      deepStreak.addColorStop(0, 'rgba(0, 0, 0, 0)');
      deepStreak.addColorStop(0.3, 'rgba(6, 14, 45, 0.25)');
      deepStreak.addColorStop(0.46, '#090d16');
      deepStreak.addColorStop(0.53, '#172554');
      deepStreak.addColorStop(0.56, '#64748b');
      deepStreak.addColorStop(0.63, '#0f172a');
      deepStreak.addColorStop(0.8, 'rgba(8, 20, 55, 0.2)');
      deepStreak.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = deepStreak;
      ctx.fillRect(-240, -450, 480, 900);
      ctx.restore();

      // Soft ambient deep navy-sapphire spot on left
      const blueSpot = ctx.createRadialGradient(380, 320, 10, 380, 320, 360);
      blueSpot.addColorStop(0, 'rgba(147, 197, 253, 0.42)');
      blueSpot.addColorStop(0.28, 'rgba(30, 58, 138, 0.28)');
      blueSpot.addColorStop(0.65, 'rgba(15, 23, 42, 0.12)');
      blueSpot.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = blueSpot;
      ctx.beginPath();
      ctx.arc(380, 320, 360, 0, Math.PI * 2);
      ctx.fill();

      // Dark sapphire bottom-right rim reflection
      const blueRim = ctx.createRadialGradient(1650, 780, 10, 1650, 780, 440);
      blueRim.addColorStop(0, 'rgba(37, 99, 235, 0.32)');
      blueRim.addColorStop(0.4, 'rgba(15, 23, 42, 0.24)');
      blueRim.addColorStop(0.8, 'rgba(2, 6, 23, 0.08)');
      blueRim.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = blueRim;
      ctx.beginPath();
      ctx.arc(1650, 780, 440, 0, Math.PI * 2);
      ctx.fill();
    }

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;

    // 3. Lighting Setup (Softened & deeper tones)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3.5, 5, 6);
    scene.add(keyLight);

    // Deep midnight sapphire rim light behind
    const rimSapphire = new THREE.PointLight(0x172554, 7.1, 22);
    rimSapphire.position.set(-3.5, 3, -3.5);
    scene.add(rimSapphire);

    // Deep royal navy fill light
    const rimRoyal = new THREE.PointLight(0x1e3a8a, 4.3, 20);
    rimRoyal.position.set(3.5, -2, -3);
    scene.add(rimRoyal);

    // Soft Tracking Specular Light
    const cursorSpecularLight = new THREE.PointLight(0xffffff, 3.8, 12);
    cursorSpecularLight.position.set(0, 0, 5);
    scene.add(cursorSpecularLight);

    // 4. Exact Planar Ratio & Ultra-Smooth Cutout Geometry matching 2D Logo (Scaled up by 8px)
    const circleRadius = 3.00;
    const totalDiameter = circleRadius * 2;
    const plusArmTotalLength = (9.75 / 16) * totalDiameter;
    const plusArmWidth = (1.5 / 16) * totalDiameter;
    const thickness = 0.402;
    const bevelSize = 0.070;

    const shape = new THREE.Shape();
    // Outer Circle (Counter-Clockwise)
    shape.absarc(0, 0, circleRadius, 0, Math.PI * 2, false);

    // Cutout Plus Hole
    const hole = new THREE.Path();
    const L = plusArmTotalLength / 2; // 1.35
    const W = plusArmWidth / 2; // 0.225
    const rCap = 0.075; // Smooth fillet at the 4 arm tips
    const rInner = 0.035; // Subtle inner corner fillet

    // Draw the 12-vertex rounded cross path
    // 1. Top Arm
    hole.moveTo(-W + rCap, L);
    hole.lineTo(W - rCap, L);
    hole.quadraticCurveTo(W, L, W, L - rCap);
    hole.lineTo(W, W + rInner);
    hole.quadraticCurveTo(W, W, W + rInner, W);

    // 2. Right Arm
    hole.lineTo(L - rCap, W);
    hole.quadraticCurveTo(L, W, L, W - rCap);
    hole.lineTo(L, -W + rCap);
    hole.quadraticCurveTo(L, -W, L - rCap, -W);
    hole.lineTo(W + rInner, -W);
    hole.quadraticCurveTo(W, -W, W, -W - rInner);

    // 3. Bottom Arm
    hole.lineTo(W, -L + rCap);
    hole.quadraticCurveTo(W, -L, W - rCap, -L);
    hole.lineTo(-W + rCap, -L);
    hole.quadraticCurveTo(-W, -L, -W, -L + rCap);
    hole.lineTo(-W, -W - rInner);
    hole.quadraticCurveTo(-W, -W, -W - rInner, -W);

    // 4. Left Arm
    hole.lineTo(-L + rCap, -W);
    hole.quadraticCurveTo(-L, -W, -L, -W + rCap);
    hole.lineTo(-L, W - rCap);
    hole.quadraticCurveTo(-L, W, -L + rCap, W);
    hole.lineTo(-W - rInner, W);
    hole.quadraticCurveTo(-W, W, -W, W + rInner);
    hole.lineTo(-W, L - rCap);
    hole.quadraticCurveTo(-W, L, -W + rCap, L);

    shape.holes.push(hole);

    // High segment resolution (curveSegments: 256, bevelSegments: 16) for perfectly smooth circular rim
    const tokenGeometry = new THREE.ExtrudeGeometry(shape, {
      depth: thickness,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 1,
      bevelSize: bevelSize,
      bevelThickness: bevelSize,
      curveSegments: 256,
    });
    tokenGeometry.center();
    tokenGeometry.computeVertexNormals();

    // 5. Smoked Glass Material with High Transparency (Abyssal Midnight Sapphire Crystal)
    const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020610, // Deep abyssal midnight sapphire glass tone
      transparent: true,
      opacity: 0.49, // Transparent: background grid and midnight sapphire glow bleed through
      roughness: 0.05,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.98,
      envMapIntensity: 2.0,
      depthWrite: false,
    });

    // 6. Master Single Token Mesh
    const tokenMesh = new THREE.Mesh(tokenGeometry, smokedGlassMaterial);
    scene.add(tokenMesh);

    // 7. Cursor / Mouse Space Tracking across the screen (No drag, purely responsive tilt)
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth || 1920;
      const windowHeight = window.innerHeight || 1080;
      const normX = (e.clientX / windowWidth - 0.5) * 2;
      const normY = (e.clientY / windowHeight - 0.5) * 2;

      // Smooth responsive 3D tilt tracking cursor across the entire viewport
      targetRotationY = normX * 0.58; // ~33 deg max tilt
      targetRotationX = -normY * 0.44; // ~25 deg max tilt

      // Shift specular light to trace specular glints across glossy cutouts
      cursorSpecularLight.position.x = normX * 4.5;
      cursorSpecularLight.position.y = -normY * 3.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const windowWidth = window.innerWidth || 1920;
      const windowHeight = window.innerHeight || 1080;
      const normX = (e.touches[0].clientX / windowWidth - 0.5) * 2;
      const normY = (e.touches[0].clientY / windowHeight - 0.5) * 2;

      targetRotationY = normX * 0.58;
      targetRotationX = -normY * 0.44;

      cursorSpecularLight.position.x = normX * 4.5;
      cursorSpecularLight.position.y = -normY * 3.5;
    };

    const handleMouseLeaveWindow = () => {
      // Gently return to flat resting state
      targetRotationX = 0;
      targetRotationY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // 8. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 460;
      updateCameraAndSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 9. Intersection Observer
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // 10. Smooth Render Loop (STRICTLY No Auto-Spin!)
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Pause 3D rendering if container is off-screen or if any modal is currently open
      if (!isVisible || (typeof document !== 'undefined' && document.body.style.overflow === 'hidden')) return;

      // Smooth lerp dampening
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      tokenMesh.rotation.x = currentRotationX;
      tokenMesh.rotation.y = currentRotationY;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(reqId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      tokenGeometry.dispose();
      smokedGlassMaterial.dispose();
      envTexture.dispose();
      pmremGenerator.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className={`relative w-full flex flex-col items-center justify-center select-none ${className}`}
      style={{ height }}
    >
      {/* Seamless Smooth Background Ambient Glows (Abyssal Midnight Sapphire & Deep Ocean Glow) */}
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[344px] sm:w-[600px] md:w-[900px] h-[324px] sm:h-[380px] md:h-[460px] pointer-events-none z-0 opacity-60"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(15, 23, 42, 0.22) 0%, rgba(23, 37, 84, 0.09) 35%, rgba(10, 15, 30, 0.02) 60%, transparent 75%)',
        }}
      />
      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[244px] sm:w-[350px] md:w-[500px] h-[224px] sm:h-[250px] md:h-[320px] pointer-events-none z-0 opacity-45"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 58, 138, 0.10) 0%, rgba(15, 23, 42, 0.03) 45%, transparent 70%)',
        }}
      />
      
      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="w-full h-full relative z-10 pointer-events-none"
      />

      {/* Foreground Content Overlay Container */}
      {children && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
          <div className="pointer-events-auto w-full flex flex-col items-center justify-center">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
