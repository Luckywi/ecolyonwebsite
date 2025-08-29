// src/app/qualite-air/NO2/page.tsx
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

export default function NO2DetailPage() {
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
    const fetchNO2Data = async () => {
      try {
        const response = await fetch(
          'https://api.atmo-aura.fr/api/v1/communes/69381/indices/atmo?api_token=0c7d0bee25f494150fa591275260e81f&date_echeance=now'
        );
        
        if (!response.ok) throw new Error('Erreur API');
        
        const data: AirQualityData = await response.json();
        
        if (data.data?.[0]?.sous_indices) {
          const no2Data = data.data[0].sous_indices.find(
            indice => indice.polluant_nom === 'NO2'
          );
          
          if (no2Data) {
            setPollutantData(no2Data);
          } else {
            throw new Error('Données NO2 non trouvées');
          }
        } else {
          throw new Error('Aucune donnée disponible');
        }
      } catch (err) {
        setError('Impossible de récupérer les données NO2');
      } finally {
        setLoading(false);
      }
    };

    fetchNO2Data();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-black">Chargement des données NO2...</p>
        </div>
      </div>
    );
  }

  if (error || !pollutantData) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
    {/* Navigation de retour */}
<motion.div 
  className="mb-8"
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
      alt=""
      width={20}
      height={20}
      className="w-5 h-5 rotate-180 back-link-arrow"
    />
    <span className="font-medium">Retour à la qualité de l&apos;air</span>
  </Link>
</motion.div>
        {/* Titre principal */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black">
            Aujourd&apos;hui à Lyon le niveau de NO2 est{' '}
            <span 
              className="font-medium"
              style={{ color: getQualityColor(pollutantData.indice) }}
            >
              {getQualityText(pollutantData.indice)}.
            </span>
          </p>
        </motion.div>

        {/* Concentration actuelle */}

{/* Titre principal - pas de changement */}

{/* Concentration actuelle + Baromètre fusionnés */}
<motion.div 
  className="mb-12"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.1 }}
>
  <div className="backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
    
    {/* Section concentration et badge */}
    <div className="flex items-center justify-between mb-6">
      <div>
        <p className="text-3xl font-bold text-black mb-2">
          {pollutantData.concentration.toFixed(1)} µg/m³
        </p>
        <p className="text-gray-600">Dioxyde d&apos;azote NO2 mesuré</p>
      </div>
      
      <div 
        className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
        style={{ backgroundColor: getQualityColor(pollutantData.indice) }}
      >
        {pollutantData.indice}
      </div>
    </div>

    {/* Baromètre */}
    <div className="flex gap-1 h-4 mb-4">
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
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className=" backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-black mb-4">
              Qu&apos;est-ce que c&apos;est ?
            </h3>
            <p className="text-black opacity-80 leading-relaxed">
              Le dioxyde d&apos;azote (NO2) est un gaz irritant de couleur brun-rouge émis principalement par les véhicules et les installations de combustion. Il fait partie de la famille des oxydes d&apos;azote (NOx).
            </p>
          </div>
        </motion.div>

        {/* Les pics */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className=" backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-black mb-4">
              Les pics
            </h3>
            <p className="text-black opacity-80 leading-relaxed">
              Les concentrations les plus élevées s&apos;observent pendant les heures de pointe du trafic routier (7h-9h et 17h-19h), particulièrement en hiver quand les conditions de dispersion sont moins favorables.
            </p>
          </div>
        </motion.div>

        {/* Les effets sur la santé */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className=" backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-black mb-4">
              Les effets sur la santé
            </h3>
            <p className="text-black opacity-80 leading-relaxed">
              Le NO2 peut provoquer une hyperréactivité bronchique chez les asthmatiques, une altération de la fonction pulmonaire et un accroissement de la sensibilité aux infections respiratoires, notamment chez les enfants.
            </p>
          </div>
        </motion.div>

        {/* Les sources principales */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className=" backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-black mb-4">
              Les sources principales
            </h3>
            <div className="text-black opacity-80 leading-relaxed space-y-1">
              <p>• Transport routier (70% des émissions urbaines)</p>
              <p>• Véhicules diesel (émissions plus importantes)</p>
              <p>• Installations de combustion (chauffage, industrie)</p>
              <p>• Centrales thermiques</p>
              <p>• Navigation fluviale et maritime</p>
              <p>• Précurseur de l&apos;ozone (réactions photochimiques)</p>
            </div>
          </div>
        </motion.div>

        {/* Source des données - style footer */}
       
      </div>
    </div>
  );
}