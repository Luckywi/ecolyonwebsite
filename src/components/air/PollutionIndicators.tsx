"use client";

import { useState, useEffect } from 'react';

interface SousIndice {
  polluant_nom: string;
  concentration: number;
  indice: number;
}

interface PollutionIndicatorsProps {
  globalIndex: number;
  sousIndices: SousIndice[];
}

const PollutionIndicators = ({ globalIndex, sousIndices }: PollutionIndicatorsProps) => {
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});
  const [isAnimating, setIsAnimating] = useState(false);

  // Couleurs selon l'indice (1-6)
  const getColor = (index: number) => {
    switch (index) {
      case 1: return '#50F0E6'; // Bon - turquoise
      case 2: return '#50CCAA'; // Moyen - vert clair
      case 3: return '#F0E641'; // Dégradé - jaune
      case 4: return '#FF5050'; // Mauvais - rouge
      case 5: return '#960032'; // Très mauvais - rouge foncé
      case 6: return '#872181'; // Extrêmement mauvais - violet
      default: return '#CCCCCC';
    }
  };

  useEffect(() => {
    if (globalIndex && sousIndices.length > 0) {
      // Réinitialiser les valeurs
      setAnimatedValues({});
      setIsAnimating(true);
      
      // Créer un objet avec toutes les valeurs cibles
      const targetValues = {
        'global': globalIndex,
        ...sousIndices.reduce((acc, sousIndice) => ({
          ...acc,
          [sousIndice.polluant_nom]: sousIndice.indice
        }), {})
      };

      // Trouver la valeur maximale pour déterminer la durée d'animation
      const maxValue = Math.max(globalIndex, ...sousIndices.map(si => si.indice));
      
      let currentStep = 1;
      
      const animationInterval = setInterval(() => {
        setAnimatedValues(prev => {
          const newValues: { [key: string]: number } = {};
          
          // Pour chaque indicateur, calculer sa valeur actuelle
          Object.entries(targetValues).forEach(([key, targetValue]) => {
            newValues[key] = Math.min(currentStep, targetValue);
          });
          
          return newValues;
        });
        
        if (currentStep >= maxValue) {
          clearInterval(animationInterval);
          setIsAnimating(false);
        } else {
          currentStep++;
        }
      }, 200); // Change toutes les 200ms

      // Nettoyer l'intervalle si le composant est démonté
      return () => clearInterval(animationInterval);
    }
  }, [globalIndex, sousIndices]);

  // Fonction pour créer un arc SVG
  const createArcPath = (centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) => {
    const start = {
      x: centerX + radius * Math.cos(startAngle),
      y: centerY + radius * Math.sin(startAngle)
    };
    const end = {
      x: centerX + radius * Math.cos(endAngle),
      y: centerY + radius * Math.sin(endAngle)
    };
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
  };

  const CircularIndicator = ({ 
    label, 
    value, 
    targetValue 
  }: { 
    label: string; 
    value: number; 
    targetValue: number;
  }) => {
    const color = getColor(value);
    const numberOfSegments = 6;
    const radius = 56;
    const centerX = 80;
    const centerY = 80;
    const strokeWidth = 12;
    const gapAngle = 0.5; // Espacement entre les segments (en radians)
    const segmentAngle = (2 * Math.PI - numberOfSegments * gapAngle) / numberOfSegments;
    
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40">
          <svg className="w-40 h-40" viewBox="0 0 160 160">
            {/* Créer 6 arcs formant un cercle */}
            {Array.from({ length: numberOfSegments }, (_, index) => {
              const startAngle = index * (segmentAngle + gapAngle) - Math.PI / 2; // Commencer en haut
              const endAngle = startAngle + segmentAngle;
              const isActive = index < value;
              const segmentColor = isActive ? color : '#E5E7EB';
              
              const arcPath = createArcPath(centerX, centerY, radius, startAngle, endAngle);
              
              return (
                <path
                  key={index}
                  d={arcPath}
                  stroke={segmentColor}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  fill="none"
                  className={`transition-colors duration-300 ${isAnimating && isActive ? 'opacity-80' : ''}`}
                />
              );
            })}
          </svg>
          
          {/* Texte au centre */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className={`text-lg font-bold ${isAnimating && value < targetValue ? 'scale-110' : ''} transition-transform duration-300`}
              style={{ color: value > 0 ? color : '#9CA3AF' }}
            >
              {label === 'GLOBAL' ? value || '-' : label}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap justify-center gap-8 mb-8">
      {/* Indice global */}
      <CircularIndicator
        label="GLOBAL"
        value={animatedValues['global'] || 0}
        targetValue={globalIndex}
      />
      
      {/* Sous-indices */}
      {sousIndices.map((sousIndice) => (
        <CircularIndicator
          key={sousIndice.polluant_nom}
          label={sousIndice.polluant_nom}
          value={animatedValues[sousIndice.polluant_nom] || 0}
          targetValue={sousIndice.indice}
        />
      ))}
    </div>
  );
};

export default PollutionIndicators;