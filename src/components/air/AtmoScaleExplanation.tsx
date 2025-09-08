import React, { useState } from 'react';
import { motion } from 'framer-motion';

const AtmoScaleExplanation = () => {
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Données de l'échelle ATMO complète (1-6)
  const atmoScale = [
    {
      indice: 1,
      qualificatif: 'bonne',
      couleur: '#50F0E6',
      description: 'Aucun risque pour la santé',
      conseil: 'Profitez de vos activités d\'extérieur habituelles.',
      seuils: {
        'PM2.5': '0 - 10',
        'PM10': '0 - 20',
        'NO2': '0 - 40',
        'O3': '0 - 50',
        'SO2': '0 - 100'
      }
    },
    {
      indice: 2,
      qualificatif: 'moyenne',
      couleur: '#50CCAA',
      description: 'Risque limité pour les personnes sensibles',
      conseil: 'Les personnes sensibles peuvent maintenir leurs activités.',
      seuils: {
        'PM2.5': '11 - 20',
        'PM10': '21 - 40',
        'NO2': '41 - 90',
        'O3': '51 - 100',
        'SO2': '101 - 200'
      }
    },
    {
      indice: 3,
      qualificatif: 'dégradée',
      couleur: '#F0E641',
      description: 'Risque pour les personnes sensibles',
      conseil: 'Les personnes sensibles doivent limiter les activités physiques intenses.',
      seuils: {
        'PM2.5': '21 - 25',
        'PM10': '41 - 50',
        'NO2': '91 - 120',
        'O3': '101 - 130',
        'SO2': '201 - 350'
      }
    },
    {
      indice: 4,
      qualificatif: 'mauvaise',
      couleur: '#FF5050',
      description: 'Risque pour la population générale',
      conseil: 'Limitez les activités physiques intenses en extérieur.',
      seuils: {
        'PM2.5': '26 - 50',
        'PM10': '51 - 100',
        'NO2': '121 - 230',
        'O3': '131 - 240',
        'SO2': '351 - 500'
      }
    },
    {
      indice: 5,
      qualificatif: 'très mauvaise',
      couleur: '#960032',
      description: 'Risque élevé pour tous',
      conseil: 'Évitez les activités physiques intenses. Restez à l\'intérieur si possible.',
      seuils: {
        'PM2.5': '51 - 75',
        'PM10': '101 - 150',
        'NO2': '231 - 340',
        'O3': '241 - 380',
        'SO2': '501 - 750'
      }
    },
    {
      indice: 6,
      qualificatif: 'extrêmement mauvaise',
      couleur: '#872181',
      description: 'Risque très élevé pour tous',
      conseil: 'Évitez toute activité physique en extérieur. Restez à l\'intérieur et fermez les fenêtres.',
      seuils: {
        'PM2.5': '76+',
        'PM10': '151+',
        'NO2': '341+',
        'O3': '381+',
        'SO2': '751+'
      }
    }
  ];

  const currentLevel = atmoScale.find(level => level.indice === selectedLevel);

  return (
    <section className="py-8 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-5xl mx-auto">
        {/* Titre */}
        <h2 className="text-2xl md:text-3xl font-light text-black text-center mb-8 md:mb-12">
          Comprendre l&apos;indice ATMO
        </h2>

        {/* Barre de couleurs interactive */}
        <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 mb-8 md:mb-12 px-2">
          {atmoScale.map((niveau) => (
            <button
              key={niveau.indice}
              onClick={() => setSelectedLevel(niveau.indice)}
              className={`h-8 sm:h-10 md:h-12 rounded-full transition-all duration-300 ${
                selectedLevel === niveau.indice 
                  ? 'w-16 sm:w-24 md:w-32 shadow-lg transform scale-105' 
                  : 'w-12 sm:w-20 md:w-24 hover:w-14 sm:hover:w-24 md:hover:w-28'
              }`}
              style={{ backgroundColor: niveau.couleur }}
            />
          ))}
        </div>

        {/* Contenu dynamique */}
        {currentLevel && (
          <motion.div
            key={selectedLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            {/* Phrase principale */}
            <h3 className="text-xl sm:text-xl md:text-2xl font-light text-black mb-3 md:mb-4 px-2">
              La qualité de l&apos;air est{' '}
              <span style={{ color: currentLevel.couleur }} className="font-medium">
                {currentLevel.qualificatif}
              </span>
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg mb-4 md:mb-6 px-2">{currentLevel.description}</p>

            {/* Recommandation */}
            <p className="text-gray-700 text-sm mb-10 md:mb-16 max-w-2xl mx-auto px-2">
              <strong>Recommandation :</strong> {currentLevel.conseil}
            </p>

            {/* Section avec tableau - Layout responsive */}
            <div className="flex flex-col md:flex-row md:items-center max-w-4xl mx-auto">
              {/* Texte explicatif */}
              <div className="w-full md:w-1/2 md:pr-8 flex items-center justify-center mb-6 md:mb-0">
                <p className="text-sm text-gray-700 leading-relaxed text-center px-2">
                  L&apos;indice d&apos;un polluant est considéré comme{' '}
                  <span className="font-medium">
                    {currentLevel.indice === 1 ? 'bon' : 
                     currentLevel.indice === 2 ? 'moyen' :
                     currentLevel.indice === 3 ? 'dégradé' :
                     currentLevel.indice === 4 ? 'mauvais' :
                     currentLevel.indice === 5 ? 'très mauvais' :
                     'extrêmement mauvais'}
                  </span>
                  {' '}si la moyenne journalière en μg/m³ est maintenue entre ces valeurs.
                </p>
              </div>

              {/* Tableau des seuils */}
              <div className="w-full md:w-1/2">
                <div className="border-l border-gray-300 pl-6">
                  {Object.entries(currentLevel.seuils).map(([polluant, seuil]) => (
                    <div key={polluant} className="flex justify-between items-center py-1 border-b border-gray-200 last:border-b-0">
                      <span className="text-xs font-medium text-gray-900">{seuil}</span>
                      <span className="text-xs text-gray-700">{polluant}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Explication du calcul global */}
        <div className="mt-12 md:mt-16 text-center">
          <div className="rounded-xl p-4 md:p-6 max-w-3xl mx-auto">
              <h4 className="text-lg sm:text-xl lg:text-2xl font-light text-black mb-4 sm:mb-6">
              Comment est calculé l&apos;indice global ?
            </h4>
            <p className="space-y-4 mb-6 md:mb-8 text-gray-700 leading-relaxed text-sm md:text-base px-2">
              <br/>
              L&apos;indice ATMO global correspond toujours au polluant le plus dégradé : si 4 polluants sont bons mais que l&apos;ozone est mauvais, l&apos;indice sera mauvais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AtmoScaleExplanation;