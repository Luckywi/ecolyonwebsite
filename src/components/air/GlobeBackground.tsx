// src/components/air/GlobeBackground.tsx
"use client";

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

// Type pour le globe Cobe
interface CobeGlobe {
  destroy: () => void;
}

// Type pour l'état du rendu du globe
type GlobeRenderState = Record<string, any> & {
  phi: number;
  markerColor: [number, number, number];
  glowColor: [number, number, number];
}

interface GlobeBackgroundProps {
  qualityColor: string;
  globalIndex: number;
}

const GlobeBackground = ({ qualityColor, globalIndex }: GlobeBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<CobeGlobe | null>(null);

  // Coordonnées de Lyon
  const LYON_COORDINATES = { lat: 45.7640, lng: 4.8357 };

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => {
      if (canvasRef.current) {
        const container = canvasRef.current.parentElement;
        if (container) {
          width = container.offsetWidth;
        }
      }
    };
    
    window.addEventListener('resize', onResize);
    onResize();
    
    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.2,
        dark: 0.1,
        diffuse: 0.8,
        mapSamples: 12000, // Réduit de 16000 à 12000 pour de meilleures performances
        mapBrightness: 4,
        baseColor: [0.973, 0.969, 0.957], // #F8F7F4
        markerColor: [1, 1, 1],
        glowColor: [0.973, 0.969, 0.957],
        opacity: 1,
        offset: [0, 0],
        markers: [{
          location: [LYON_COORDINATES.lat, LYON_COORDINATES.lng],
          size: 0.08 + (globalIndex * 0.02),
        }],
        onRender: (state: GlobeRenderState) => {
          phi += 0.003; // Réduit de 0.005 à 0.003 pour économiser les performances
          state.phi = phi;
          
          const hexColor = qualityColor || '#50F0E6';
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;
          
          state.markerColor = [r, g, b];
          state.glowColor = [r, g, b];
        }
      });
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qualityColor, globalIndex]);

  return (
    <div className="absolute top-8 sm:top-15 left-1/2 transform -translate-x-1/2">
      <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full opacity-90"
          style={{
            cursor: 'grab',
            contain: 'layout style size'
          }}
        />
      </div>
    </div>
  );
};

export default GlobeBackground;