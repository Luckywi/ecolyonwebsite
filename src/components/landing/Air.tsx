"use client";

import { useState, useEffect } from 'react';
import PollutionIndicators from './PollutionIndicators';

interface SousIndice {
  polluant_nom: string;
  concentration: number;
  indice: number;
}

interface AirQualityData {
  data: {
    qualificatif: string;
    couleur_html: string;
    indice: number;
    sous_indices: SousIndice[];
  }[];
}

  const qualityOptions = [
    { name: 'Bon', color: '#50F0E6' },
    { name: 'Moyen', color: '#50CCAA' },
    { name: 'Dégradé', color: '#F0E641' },
    { name: 'Mauvais', color: '#FF5050' },
    { name: 'Très mauvais', color: '#960032' },
    { name: 'Extrêmement mauvais', color: '#872181' }
  ];

const Air = () => {
  const [currentQuality, setCurrentQuality] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [globalIndex, setGlobalIndex] = useState(0);
  const [sousIndices, setSousIndices] = useState<SousIndice[]>([]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // Plus besoin de state isMobile - détection directe

  // Fonction pour adapter le texte côté frontend
  const getFriendlyText = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'bon':
        return 'bonne.';
      case 'moyen':
        return 'moyenne.';
      case 'dégradé':
        return 'dégradée.';
      case 'mauvais':
        return 'mauvaise !';
      case 'très mauvais':
        return 'très mauvaise !';
      case 'extrêmement mauvais':
        return 'extrêmement mauvaise !';
      default:
        return quality + '.';
    }
  };

  // Toutes les qualités possibles avec leurs couleurs officielle

  // Fonction pour récupérer les données de l'API
  useEffect(() => {

  const fetchAirQuality = async () => {
    try {
      const response = await fetch(
        'https://api.atmo-aura.fr/api/v1/communes/69381/indices/atmo?api_token=0c7d0bee25f494150fa591275260e81f&date_echeance=now'
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }
      
      const data: AirQualityData = await response.json();
      
      if (data.data && data.data.length > 0) {
        const realQualityValue = data.data[0].qualificatif;
        const realColorValue = data.data[0].couleur_html;
        const globalIndexValue = data.data[0].indice;
        const sousIndicesValue = data.data[0].sous_indices || [];
        
       
        setGlobalIndex(globalIndexValue);
        setSousIndices(sousIndicesValue);
        setLoading(false);
        
        // Décision mobile vs desktop
        const currentIsMobile = window.innerWidth < 768;
        if (currentIsMobile) {
          console.log('📱 Mode mobile - affichage direct');
          // Mobile : affichage direct
          setCurrentQuality(realQualityValue);
          setCurrentColor(realColorValue);
          setIsAnimating(false);
        } else {
          console.log('🖥️ Mode desktop - démarrage animation');
          // Desktop : animation
          startAnimation(realQualityValue, realColorValue);
        }
      } else {
        throw new Error('Aucune donnée disponible');
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la qualité de l\'air:', error);
      setError('Impossible de récupérer les données de qualité de l\'air');
      setLoading(false);
    }
  };


  // Animation de compteur
  const startAnimation = (finalQuality: string, finalColor: string) => {
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      const quality = qualityOptions[currentIndex];
      setCurrentQuality(quality.name);
      setCurrentColor(quality.color);
      
      currentIndex = (currentIndex + 1) % qualityOptions.length;
    }, 150); // Change toutes les 150ms

    // Arrêter l'animation après 3 secondes et afficher la vraie valeur
    setTimeout(() => {
      clearInterval(animationInterval);
      setCurrentQuality(finalQuality);
      setCurrentColor(finalColor);
      setIsAnimating(false);
    }, 3000);
  };
    fetchAirQuality();
  }, []); // Une seule fois au montage

  // Pas besoin d'effet séparé - tout est géré dans fetchAirQuality

  if (loading) {
    return (
      <section className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-black">
            Chargement des données de qualité de l&apos;air...
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light text-red-500">
            {error}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Phrase de qualité de l'air */}
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black mb-8 lg:mb-12 leading-relaxed px-2">
          Aujourd&apos;hui à Lyon la qualité de l&apos;air est{' '}
          <span 
            className={`font-medium transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
            style={{ color: currentColor }}
          >
            {getFriendlyText(currentQuality)}
          </span>
        </p>

        {/* Indicateurs de pollution APRÈS la phrase */}
        {!loading && !error && globalIndex > 0 && (
          <PollutionIndicators 
            globalIndex={globalIndex} 
            sousIndices={sousIndices} 
          />
        )}
      </div>
    </section>
  );
};


export default Air;