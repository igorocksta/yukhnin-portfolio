import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NotFound3DSceneProps {
  className?: string;
  height?: number | string;
  children?: React.ReactNode;
}

interface GlyphCommand {
  type: string;
  x: number;
  y: number;
  x1?: number;
  y1?: number;
}

// Exact vector glyph contour commands for '4' and '0' in DM Sans Bold (font-weight: 700)
const GLYPH_4_COMMANDS: GlyphCommand[] = [
  { type: 'M', x: 52.4, y: 0 },
  { type: 'L', x: 38.9, y: 0 },
  { type: 'L', x: 38.9, y: -12.7 },
  { type: 'L', x: 4.5, y: -12.7 },
  { type: 'L', x: 4.5, y: -23.4 },
  { type: 'L', x: 37.1, y: -70.0 },
  { type: 'L', x: 52.4, y: -70.0 },
  { type: 'L', x: 52.4, y: -24.4 },
  { type: 'L', x: 61.5, y: -24.4 },
  { type: 'L', x: 61.5, y: -12.7 },
  { type: 'L', x: 52.4, y: -12.7 },
  { type: 'L', x: 52.4, y: 0 },
  { type: 'M', x: 39.8, y: -55.1 },
  { type: 'L', x: 18.9, y: -24.4 },
  { type: 'L', x: 39.8, y: -24.4 },
  { type: 'L', x: 39.8, y: -55.1 }
];

const GLYPH_0_COMMANDS: GlyphCommand[] = [
  { type: 'M', x: 35.2, y: 1.2 },
  { type: 'Q', x1: 25.7, y1: 1.2, x: 18.8, y: -3.4 },
  { type: 'Q', x1: 11.9, y1: -8.0, x: 8.25, y: -16.15 },
  { type: 'Q', x1: 4.6, y1: -24.3, x: 4.6, y: -35.0 },
  { type: 'Q', x1: 4.6, y1: -45.7, x: 8.25, y: -53.85 },
  { type: 'Q', x1: 11.9, y1: -62.0, x: 18.75, y: -66.6 },
  { type: 'Q', x1: 25.6, y1: -71.2, x: 35.2, y: -71.2 },
  { type: 'Q', x1: 44.8, y1: -71.2, x: 51.65, y: -66.6 },
  { type: 'Q', x1: 58.5, y1: -62.0, x: 62.15, y: -53.85 },
  { type: 'Q', x1: 65.8, y1: -45.7, x: 65.8, y: -35.0 },
  { type: 'Q', x1: 65.8, y1: -24.3, x: 62.15, y: -16.15 },
  { type: 'Q', x1: 58.5, y1: -8.0, x: 51.65, y: -3.4 },
  { type: 'Q', x1: 44.8, y1: 1.2, x: 35.2, y: 1.2 },
  { type: 'M', x: 35.2, y: -10.9 },
  { type: 'Q', x1: 40.2, y1: -10.9, x: 44.0, y: -13.85 },
  { type: 'Q', x1: 47.8, y1: -16.8, x: 49.95, y: -22.2 },
  { type: 'Q', x1: 52.1, y1: -27.6, x: 52.1, y: -35.0 },
  { type: 'Q', x1: 52.1, y1: -42.5, x: 49.95, y: -47.85 },
  { type: 'Q', x1: 47.8, y1: -53.2, x: 44.0, y: -56.1 },
  { type: 'Q', x1: 40.2, y1: -59.0, x: 35.2, y: -59.0 },
  { type: 'Q', x1: 30.2, y1: -59.0, x: 26.4, y: -56.1 },
  { type: 'Q', x1: 22.6, y1: -53.2, x: 20.45, y: -47.85 },
  { type: 'Q', x1: 18.3, y1: -42.5, x: 18.3, y: -35.0 },
  { type: 'Q', x1: 18.3, y1: -27.6, x: 20.45, y: -22.2 },
  { type: 'Q', x1: 22.6, y1: -16.8, x: 26.4, y: -13.85 },
  { type: 'Q', x1: 30.2, y1: -10.9, x: 35.2, y: -10.9 }
];

export default function NotFound3DScene({
  className = '',
  height = '460px',
  children
}: NotFound3DSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 900;
    const heightPx = container.clientHeight || 460;

    const camera = new THREE.PerspectiveCamera(32, width / heightPx, 0.1, 100);

    // Object bounding radius for responsive fitting (reduced by 10%)
    const objectHalfWidth = 4.69;
    const objectHalfHeight = 1.75;

    const updateCameraAndSize = (newWidth: number, newHeight: number) => {
      const aspect = newWidth / newHeight;
      camera.aspect = aspect;

      const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360);
      const isMobile = newWidth < 768;
      const fitRatio = isMobile ? 0.95 : 0.96;

      const zForWidth = (objectHalfWidth / fitRatio) / (tanHalfFov * aspect);
      const zForHeight = (objectHalfHeight / fitRatio) / tanHalfFov;

      let targetZ = Math.max(zForWidth, zForHeight, 10.4);
      if (isMobile) {
        targetZ = Math.max(targetZ, 11.2);
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
      blueBeam.addColorStop(0.38, '#0f172a');
      blueBeam.addColorStop(0.48, '#172554');
      blueBeam.addColorStop(0.51, '#3b82f6');
      blueBeam.addColorStop(0.53, '#94a3b8');
      blueBeam.addColorStop(0.56, '#1d4ed8');
      blueBeam.addColorStop(0.68, '#1e3a8a');
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

    // 3. Lighting Setup (Identical to 3D Token)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.52);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(3.5, 5, 6);
    scene.add(keyLight);

    const rimSapphire = new THREE.PointLight(0x172554, 7.1, 22);
    rimSapphire.position.set(-3.5, 3, -3.5);
    scene.add(rimSapphire);

    const rimRoyal = new THREE.PointLight(0x1e3a8a, 4.3, 20);
    rimRoyal.position.set(3.5, -2, -3);
    scene.add(rimRoyal);

    const cursorSpecularLight = new THREE.PointLight(0xffffff, 3.8, 12);
    cursorSpecularLight.position.set(0, 0, 5);
    scene.add(cursorSpecularLight);

    // 4. Construct 3D Geometry for "404" using DM Sans Bold Glyphs (Reduced by 10%)
    const shapePath = new THREE.ShapePath();
    const scale = 0.0468;
    const advances = [65.0, 70.4, 65.0];
    const glyphs = [GLYPH_4_COMMANDS, GLYPH_0_COMMANDS, GLYPH_4_COMMANDS];

    let offsetX = 0;
    for (let i = 0; i < 3; i++) {
      const glyph = glyphs[i];
      for (const cmd of glyph) {
        if (cmd.type === 'M') {
          shapePath.moveTo((cmd.x + offsetX) * scale, -cmd.y * scale);
        } else if (cmd.type === 'L') {
          shapePath.lineTo((cmd.x + offsetX) * scale, -cmd.y * scale);
        } else if (cmd.type === 'Q') {
          shapePath.quadraticCurveTo(
            (cmd.x1! + offsetX) * scale,
            -cmd.y1! * scale,
            (cmd.x + offsetX) * scale,
            -cmd.y * scale
          );
        }
      }
      offsetX += advances[i];
    }

    const shapes = shapePath.toShapes();

    const textGeometry = new THREE.ExtrudeGeometry(shapes, {
      depth: 0.46,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.071,
      bevelThickness: 0.071,
      curveSegments: 28
    });
    textGeometry.center();
    textGeometry.computeVertexNormals();

    // 5. Smoked Glass Material with High Transparency (Abyssal Midnight Sapphire Crystal)
    const smokedGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x020610,
      transparent: true,
      opacity: 0.52,
      roughness: 0.05,
      metalness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.98,
      envMapIntensity: 2.0,
      depthWrite: false
    });

    // 6. Master 404 Mesh
    const textMesh = new THREE.Mesh(textGeometry, smokedGlassMaterial);
    scene.add(textMesh);

    // 7. Cursor / Touch Tracking with Responsive Tilt
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth || 1920;
      const windowHeight = window.innerHeight || 1080;
      const normX = (e.clientX / windowWidth - 0.5) * 2;
      const normY = (e.clientY / windowHeight - 0.5) * 2;

      targetRotationY = normX * 0.54;
      targetRotationX = -normY * 0.40;

      cursorSpecularLight.position.x = normX * 4.5;
      cursorSpecularLight.position.y = -normY * 3.5;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return;
      const windowWidth = window.innerWidth || 1920;
      const windowHeight = window.innerHeight || 1080;
      const normX = (e.touches[0].clientX / windowWidth - 0.5) * 2;
      const normY = (e.touches[0].clientY / windowHeight - 0.5) * 2;

      targetRotationY = normX * 0.54;
      targetRotationX = -normY * 0.40;

      cursorSpecularLight.position.x = normX * 4.5;
      cursorSpecularLight.position.y = -normY * 3.5;
    };

    const handleMouseLeaveWindow = () => {
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

    // 10. Smooth Render Loop
    let reqId: number;

    const animate = () => {
      reqId = requestAnimationFrame(animate);

      if (!isVisible) return;

      currentRotationX += (targetRotationX - currentRotationX) * 0.08;
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;

      textMesh.rotation.x = currentRotationX;
      textMesh.rotation.y = currentRotationY;

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

      textGeometry.dispose();
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
      {/* Background Ambient Glows */}
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

      {/* Foreground Content Overlay */}
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
