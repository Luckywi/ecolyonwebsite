// src/components/landing/GlobeAirQuality.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

interface GlobeAirQualityProps {
  qualityColor: string;
  globalIndex: number;
}

const GlobeAirQuality = ({ qualityColor, globalIndex }: GlobeAirQualityProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intersectionObserverRef = useRef<IntersectionObserver | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Coordonnées de Lyon
  const LYON_COORDINATES = {
    lat: 45.7640,
    lng: 4.8357
  };

  // Convertir les coordonnées lat/lng en coordonnées sur la sphère
  const locationToAngles = (lat: number, lng: number) => {
    return [
      Math.PI - ((lng * Math.PI) / 180 - Math.PI / 2),
      (lat * Math.PI) / 180
    ];
  };

  const [lyonPhi, lyonTheta] = locationToAngles(LYON_COORDINATES.lat, LYON_COORDINATES.lng);

  // Observer la visibilité du globe
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    intersectionObserverRef.current = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        if (!entry.isIntersecting) {
          // Pause après 3 secondes hors viewport
          pauseTimeoutRef.current = setTimeout(() => {
            setIsPaused(true);
          }, 3000);
        } else {
          // Reprendre immédiatement quand visible
          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
            pauseTimeoutRef.current = null;
          }
          setIsPaused(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    intersectionObserverRef.current.observe(canvas);

    return () => {
      if (intersectionObserverRef.current) {
        intersectionObserverRef.current.disconnect();
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let phi = 0;
    let width = 0;
    
    const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth);
    window.addEventListener('resize', onResize);
    onResize();

    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: 0,
        theta: 0.3,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 4000, // Optimisé à 4000 pour de meilleures performances
        mapBrightness: 1,
      baseColor: [0.973, 0.969, 0.957],
        markerColor: [1, 1, 1],
        glowColor: [1, 1, 1],
        opacity: 0.1,
        offset: [0, 0],
        markers: [
          {
            location: [LYON_COORDINATES.lat, LYON_COORDINATES.lng],
            size: 0.08 + (globalIndex * 0.02), // Taille dynamique selon l'indice
          }
        ],
        onRender: (state: any) => {
          // Ne pas animer si hors viewport ou en pause
          if (!isVisible || isPaused) {
            return;
          }
          
          // Rotation automatique plus lente pour économiser les ressources
          phi += 0.003; // Réduit de 0.005 à 0.003
          state.phi = phi;
          
          // Mise à jour de la couleur du marqueur en temps réel
          const hexColor = qualityColor || '#50F0E6';
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;
          
          state.markerColor = [r, g, b];
          
          // Faire légèrement briller le marqueur
          state.glowColor = [r * 0.8, g * 0.8, b * 0.8];
        }
      });
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
      window.removeEventListener('resize', onResize);
    };
  }, [qualityColor, globalIndex, lyonPhi, lyonTheta, isVisible, isPaused, LYON_COORDINATES.lat, LYON_COORDINATES.lng]);

  // Fonction pour obtenir le texte de qualité
  const getQualityText = (index: number) => {
    switch (index) {
      case 1: return 'Très bon';
      case 2: return 'Bon';
      case 3: return 'Moyen';
      case 4: return 'Mauvais';
      case 5: return 'Très mauvais';
      case 6: return 'Extrêmement mauvais';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="relative">
      {/* Globe - Container 2x plus petit en mobile */}
      <div className="relative mx-auto aspect-square w-full max-w-[100px] lg:max-w-[400px]">
        <canvas
          ref={canvasRef}
          className="h-full w-full opacity-90"
          style={{
            width: '100%',
            height: '100%',
            cursor: 'grab',
            contain: 'layout style size'
          }}
        />
        
        {/* Overlay avec informations - responsive */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center backdrop-blur-sm rounded-md lg:rounded-xl p-1.5 lg:p-4 shadow-lg border border-gray-200 max-w-[80px] lg:max-w-none">
            <div className="flex items-center justify-center gap-1 lg:gap-3 mb-0.5 lg:mb-2">
              <div 
                className="w-1.5 h-1.5 lg:w-4 lg:h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: qualityColor }}
              />
              <span className="font-semibold text-gray-800 text-[10px] lg:text-base">Lyon</span>
            </div>
            
            <div className="text-[8px] lg:text-sm text-gray-600 leading-tight">
              Qualité d&apos;air : {getQualityText(globalIndex)}
            </div>
            
            <div className="text-[8px] text-gray-500 mt-0.5 lg:mt-1">
              Indice {globalIndex}/6
            </div>
          </div>
        </div>
      </div>

      {/* Légende - responsive */}
      <div className="mt-2 lg:mt-6 text-center">
        <p className="text-[10px] lg:text-sm text-gray-600 mb-1.5 lg:mb-3 px-1">
          Le point sur Lyon reflète la qualité de l&apos;air en temps réel
        </p>
        
        {/* Échelle de couleurs - mobile optimisée */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-2 text-xs">
          <span className="text-gray-500 text-[10px] lg:text-xs">Échelle ATMO :</span>
          <div className="flex gap-0.5 lg:gap-1">
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#50F0E6]" title="Très bon"></div>
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#50CCAA]" title="Bon"></div>
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#F0E641]" title="Moyen"></div>
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#FF5050]" title="Mauvais"></div>
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#960032]" title="Très mauvais"></div>
            <div className="w-1.5 h-1.5 lg:w-3 lg:h-3 rounded-full bg-[#872181]" title="Extrêmement mauvais"></div>
          </div>
          <span className="text-gray-500 text-[10px] lg:text-xs">1→6</span>
        </div>
      </div>
    </div>
  );
};

export default GlobeAirQuality;