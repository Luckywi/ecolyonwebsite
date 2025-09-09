// src/components/air/GlobeAirQualityLazy.tsx
import dynamic from 'next/dynamic';

interface GlobeAirQualityProps {
  qualityColor: string;
  globalIndex: number;
}

// Placeholder pendant le chargement
const GlobeLoader = ({ qualityColor, globalIndex }: GlobeAirQualityProps) => {
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
      {/* Placeholder globe - Container 2x plus petit en mobile */}
      <div className="relative mx-auto aspect-square w-full max-w-[100px] lg:max-w-[400px]">
        <div
          className="h-full w-full opacity-90 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse border border-gray-300"
          style={{
            width: '100%',
            height: '100%',
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

// Lazy load du composant globe avec la librairie cobe
const GlobeAirQuality = dynamic(() => import('./GlobeAirQuality'), {
  loading: () => <GlobeLoader qualityColor="#50F0E6" globalIndex={1} />,
  ssr: false // Désactive le SSR car cobe utilise canvas et nécessite le DOM
});

export default GlobeAirQuality;