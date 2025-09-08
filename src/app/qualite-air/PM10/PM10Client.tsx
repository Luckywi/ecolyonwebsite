"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Types pour les données ATMO
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

export default function PM10Client() {
  const [pollutantData, setPollutantData] = useState<SousIndice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fonction pour obtenir la couleur selon l'indice
  const getQualityColor = (indice: number): string => {
    switch (indice) {
      case 1: return '#50F0E6';
      case 2: return '#50CCAA';
      case 3: return '#F0E641';
      case 4: return '#FF5050';
      case 5: return '#960032';
      case 6: return '#872181';
      default: return '#CCCCCC';
    }
  };

  // Fonction pour obtenir le texte de qualité
  const getQualityText = (indice: number): string => {
    switch (indice) {
      case 1: return 'très bon';
      case 2: return 'bon';
      case 3: return 'moyen';
      case 4: return 'mauvais';
      case 5: return 'très mauvais';
      case 6: return 'extrêmement mauvais';
      default: return 'inconnu';
    }
  };

  // Récupérer les données de l'API
  useEffect(() => {
    const fetchPM10Data = async () => {
      try {
        const response = await fetch(
          'https://api.atmo-aura.fr/api/v1/communes/69381/indices/atmo?api_token=0c7d0bee25f494150fa591275260e81f&date_echeance=now'
        );
        
        if (!response.ok) throw new Error('Erreur API');
        
        const data: AirQualityData = await response.json();
        
        if (data.data?.[0]?.sous_indices) {
          const pm10Data = data.data[0].sous_indices.find(
            indice => indice.polluant_nom === 'PM10'
          );
          
          if (pm10Data) {
            setPollutantData(pm10Data);
          } else {
            throw new Error('Données PM10 non trouvées');
          }
        } else {
          throw new Error('Aucune donnée disponible');
        }
      } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
        setError('Impossible de récupérer les données PM10');
      } finally {
        setLoading(false);
      }
    };

    fetchPM10Data();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-black">Chargement des données PM10...</p>
        </div>
      </div>
    );
  }

  if (error || !pollutantData) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg sm:text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation de retour */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/qualite-air"
            className="inline-flex items-center gap-2 text-black hover:text-ecolyon-green transition-colors group"
          >
            <Image
              src="/icons/arrowright.svg"
              alt="Flèche retour"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 back-link-arrow"
            />
            <span className="font-medium text-sm sm:text-base">Retour à la qualité de l&apos;air</span>
          </Link>
        </motion.div>

        {/* Titre principal */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black leading-tight">
            Aujourd&apos;hui à Lyon le niveau de PM10 est{' '}
            <span 
              className="font-medium"
              style={{ color: getQualityColor(pollutantData.indice) }}
            >
              {getQualityText(pollutantData.indice)}.
            </span>
          </p>
        </motion.div>

        {/* Concentration actuelle */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            
            {/* Section concentration et badge */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <p className="text-2xl sm:text-3xl font-bold text-black mb-2">
                  {pollutantData.concentration.toFixed(1)} µg/m³
                </p>
                <p className="text-gray-600 text-sm sm:text-base">Particules PM10 mesurées</p>
              </div>
              
              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg flex-shrink-0"
                style={{ backgroundColor: getQualityColor(pollutantData.indice) }}
              >
                {pollutantData.indice}
              </div>
            </div>

            {/* Baromètre */}
            <div className="flex gap-1 h-3 sm:h-4 mb-4">
              {[1, 2, 3, 4, 5, 6].map((level) => (
                <motion.div
                  key={level}
                  className="flex-1 rounded-full shadow-sm"
                  style={{
                    backgroundColor: level <= pollutantData.indice 
                      ? getQualityColor(level) 
                      : 'rgba(229, 231, 235, 0.8)'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: level * 0.1 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Qu'est-ce que c'est ? */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
              Qu&apos;est-ce que c&apos;est ?
            </h3>
            <p className="text-black opacity-80 leading-relaxed text-sm sm:text-base">
              Particules en suspension de diamètre inférieur à 10 μm (microns). Elles incluent les PM2.5 ainsi que des particules plus grosses.
            </p>
          </div>
        </motion.div>

        {/* Les pics */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
              Les pics
            </h3>
            <p className="text-black opacity-80 leading-relaxed text-sm sm:text-base">
              Les concentrations élevées de PM10 s&apos;observent principalement en hiver lors d&apos;épisodes de pollution, pendant les périodes anticycloniques ou lors d&apos;événements sahéliens (poussières du Sahara).
            </p>
          </div>
        </motion.div>

        {/* Les effets sur la santé */}
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
              Les effets sur la santé
            </h3>
            <p className="text-black opacity-80 leading-relaxed text-sm sm:text-base">
              Les PM10 se déposent principalement dans les voies respiratoires supérieures (nez, gorge, bronches). Elles peuvent provoquer une irritation et aggraver l&apos;asthme et les troubles respiratoires, particulièrement chez les personnes sensibles.
            </p>
          </div>
        </motion.div>

        {/* Les sources principales */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg sm:text-xl font-semibold text-black mb-3 sm:mb-4">
              Les sources principales
            </h3>
            <div className="text-black opacity-80 leading-relaxed space-y-1 text-sm sm:text-base">
              <p>• Remise en suspension de poussières (circulation, vent)</p>
              <p>• Trafic routier (échappements, freinage, usure des routes)</p>
              <p>• Activités de construction et chantiers</p>
              <p>• Industrie (cimenteries, carrières)</p>
              <p>• Chauffage résidentiel</p>
              <p>• Phénomènes naturels (érosion, pollens, sables sahariens)</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}