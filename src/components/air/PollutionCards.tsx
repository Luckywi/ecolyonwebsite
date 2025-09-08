// src/components/air/PollutionCards.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface SousIndice {
  polluant_nom: string;
  concentration: number;
  indice: number;
}

interface PollutantData {
  id: string;
  name: string;
  displayName: string;
  unit: string;
  description: string;
  concentration?: number;
  indice?: number;
}

const pollutantsConfig: PollutantData[] = [
  {
    id: 'PM10',
    name: 'PM10',
    displayName: 'PM10',
    unit: 'μg/m³',
    description: "Particules en suspension de diamètre inférieur à 10 μm (microns). Elles incluent les PM2.5 ainsi que des particules plus grosses qui peuvent pénétrer dans les voies respiratoires..."
  },
  {
    id: 'SO2',
    name: 'SO2',
    displayName: 'SO2',
    unit: 'μg/m³',
    description: "Le dioxyde de soufre (SO2) est un gaz incolore à l'odeur piquante et irritante. Il provient principalement de la combustion de combustibles fossiles contenant du soufre..."
  },
  {
    id: 'NO2',
    name: 'NO2',
    displayName: 'NO2',
    unit: 'μg/m³',
    description: "Le dioxyde d'azote (NO2) est un gaz irritant de couleur brun-rouge émis principalement par les véhicules et les installations de combustion. Il fait partie de la famille des oxydes d'azote..."
  },
  {
    id: 'O3',
    name: 'O3',
    displayName: 'O3',
    unit: 'μg/m³',
    description: "L'ozone n'est pas un polluant directement émis dans l'air. Il est formé par réaction chimique entre plusieurs autres polluants venant d'activités humaines : transport automobile, industries et chauffage..."
  },
  {
    id: 'PM2.5',
    name: 'PM2.5',
    displayName: 'PM2.5',
    unit: 'μg/m³',
    description: "Particules fines ou « poussières » de diamètre inférieur à 2,5 μm (microns). Ces particules ultrafines peuvent pénétrer profondément dans les poumons et le système cardiovasculaire..."
  }
];

const getIndicatorColor = (indice: number): string => {
  switch (indice) {
    case 1: return '#50F0E6'; // Très bon - turquoise
    case 2: return '#50CCAA'; // Bon - vert clair
    case 3: return '#F0E641'; // Moyen - jaune
    case 4: return '#FF5050'; // Mauvais - rouge
    case 5: return '#960032'; // Très mauvais - rouge foncé
    case 6: return '#872181'; // Extrêmement mauvais - violet
    default: return '#CCCCCC'; // Gris par défaut
  }
};

const CircularIndicator = ({ 
  indice, 
  pollutantName 
}: { 
  indice: number; 
  pollutantName: string;
}) => {
  const color = getIndicatorColor(indice);
  const numberOfSegments = 6;
  const radius = 40;
  const centerX = 50;
  const centerY = 50;
  const strokeWidth = 8;
  const gapAngle = 0.4; // Espacement entre les segments (en radians)
  const segmentAngle = (2 * Math.PI - numberOfSegments * gapAngle) / numberOfSegments;

  // Fonction pour créer un arc SVG
  const createArcPath = (centerY: number, radius: number, startAngle: number, endAngle: number) => {
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
  
  return (
    <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-3 sm:mb-4">
      <svg className="w-20 h-20 sm:w-24 sm:h-24" viewBox="0 0 100 100">
        {/* Créer 6 arcs formant un cercle */}
        {Array.from({ length: numberOfSegments }, (_, index) => {
          const startAngle = index * (segmentAngle + gapAngle) - Math.PI / 2; // Commencer en haut
          const endAngle = startAngle + segmentAngle;
          const isActive = index < indice;
          const segmentColor = isActive ? color : '#E5E7EB';
          
          const arcPath = createArcPath(centerY, radius, startAngle, endAngle);
          
          return (
            <path
              key={index}
              d={arcPath}
              stroke={segmentColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </svg>
      
      {/* Contenu au centre */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xs font-bold text-gray-800">{pollutantName}</span>
      </div>
    </div>
  );
};

const PollutantCard = ({ 
  pollutant, 
  index 
}: { 
  pollutant: PollutantData; 
  index: number;
}) => {
  const router = useRouter();
  const concentration = pollutant.concentration || 0;
  const indice = pollutant.indice || 1;
  
  const handleLearnMore = () => {
    if (pollutant.id === 'NO2') {
      router.push('/qualite-air/NO2');
    } else if (pollutant.id === 'O3') {
      router.push('/qualite-air/O3');
    } else if (pollutant.id === 'PM10') {
      router.push('/qualite-air/PM10');
    } else if (pollutant.id === 'PM2.5') {
      router.push('/qualite-air/PM2.5');
    } else if (pollutant.id === 'SO2') {
      router.push('/qualite-air/SO2');
    } else {
      console.log(`En savoir plus sur ${pollutant.name}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:/40 transition-all duration-300 flex flex-col"
    >
      {/* Indicateur circulaire */}
      <CircularIndicator
        indice={indice}
        pollutantName={pollutant.displayName}
      />
      
      {/* Concentration actuelle */}
      <div className="text-center mb-3 sm:mb-4">
        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Concentration actuelle</p>
        <p className="text-base sm:text-lg font-bold text-black">
          {concentration} {pollutant.unit}
        </p>
      </div>
      
      {/* Description tronquée */}
      <div className="mb-4 sm:mb-6">
        <p 
          className="text-xs sm:text-sm text-gray-700 leading-relaxed overflow-hidden text-center"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            maxHeight: '4.2rem' // 3 lines × 1.4rem line-height pour mobile
          }}
        >
          {pollutant.description}
        </p>
      </div>
      
      {/* Bouton En savoir plus */}
      <button
        onClick={handleLearnMore}
        className="flex items-center justify-center gap-2 text-black font-bold text-xs sm:text-sm hover:opacity-70 transition-opacity duration-200"
      >
        En savoir plus
        <Image 
          src="/icons/arrowright.svg" 
          alt="Flèche vers la droite - En savoir plus" 
          width={16}
          height={16}
          className="w-3 h-3 sm:w-4 sm:h-4"
          style={{ 
            filter: 'brightness(0) saturate(100%)',
            color: 'black'
          }}
        />
      </button>
    </motion.div>
  );
};

const PollutionCards = () => {
  const [pollutantsData, setPollutantsData] = useState<PollutantData[]>(pollutantsConfig);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPollutionData = async () => {
      try {
        const response = await fetch(
          'https://api.atmo-aura.fr/api/v1/communes/69381/indices/atmo?api_token=0c7d0bee25f494150fa591275260e81f&date_echeance=now'
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const data = await response.json();
        
        if (data.data && data.data[0] && data.data[0].sous_indices) {
          const sousIndices: SousIndice[] = data.data[0].sous_indices;
          
          const updatedPollutants = pollutantsConfig.map(pollutant => {
            const matchingIndice = sousIndices.find(
              indice => indice.polluant_nom === pollutant.id
            );
            
            return {
              ...pollutant,
              concentration: matchingIndice?.concentration || 0,
              indice: matchingIndice?.indice || 1
            };
          });
          
          setPollutantsData(updatedPollutants);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données de pollution:', error);
        setError('Impossible de récupérer les données de pollution');
      } finally {
        setLoading(false);
      }
    };

    fetchPollutionData();
  }, []);

  if (loading) {
    return (
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Loading mobile - 2 cartes par ligne, dernière pleine largeur */}
          <div className="block sm:hidden space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className="backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 animate-pulse"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, index) => (
                <div
                  key={index + 2}
                  className="backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 animate-pulse"
                >
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded mb-1"></div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                </div>
              ))}
            </div>
            <div className="backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-100 animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-3 bg-gray-200 rounded mb-1"></div>
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
            </div>
          </div>
          
          {/* Loading desktop - grille normale */}
          <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100 animate-pulse"
              >
                <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-16 bg-gray-200 rounded mb-6"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-500 text-base sm:text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto">
        {/* Disposition mobile - 2 cartes par ligne, dernière pleine largeur */}
        <div className="block sm:hidden space-y-4">
          {/* Première rangée : 2 cartes */}
          <div className="grid grid-cols-2 gap-4">
            {pollutantsData.slice(0, 2).map((pollutant, index) => (
              <PollutantCard
                key={pollutant.id}
                pollutant={pollutant}
                index={index}
              />
            ))}
          </div>
          
          {/* Deuxième rangée : 2 cartes */}
          <div className="grid grid-cols-2 gap-4">
            {pollutantsData.slice(2, 4).map((pollutant, index) => (
              <PollutantCard
                key={pollutant.id}
                pollutant={pollutant}
                index={index + 2}
              />
            ))}
          </div>
          
          {/* Troisième rangée : 1 carte pleine largeur */}
          <div>
            {pollutantsData.slice(4, 5).map((pollutant, index) => (
              <PollutantCard
                key={pollutant.id}
                pollutant={pollutant}
                index={index + 4}
              />
            ))}
          </div>
        </div>

        {/* Disposition desktop - grille responsive normale (INCHANGÉE) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
          {pollutantsData.map((pollutant, index) => (
            <PollutantCard
              key={pollutant.id}
              pollutant={pollutant}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollutionCards;