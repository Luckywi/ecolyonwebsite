// src/components/infrastructure/InfrastructureCards.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { getInfrastructureBreakdown } from '@/lib/infrastructure';

interface InfrastructureItem {
  name: string;
  count: number;
  description?: string;
  icon: string;
  title: string;
  subtitle: string;
}

const InfrastructureCards = () => {
  const [infrastructures, setInfrastructures] = useState<InfrastructureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Configuration des infrastructures avec leurs icônes et textes
  const infrastructureConfig: Record<string, { icon: string; title: string; subtitle: string }> = {
    'Bancs Publics': {
      icon: '/logos/banc.png',
      title: 'Où se reposer à Lyon ? Localisez les bancs les plus proches',
      subtitle: 'bancs publics disponibles dans le Grand Lyon'
    },
    'Tri Sélectif': {
      icon: '/logos/SIlos.png',
      title: 'Du verre à jeter ? Un silo est toujours à deux pas',
      subtitle: 'silos à verre disponibles dans le Grand Lyon'
    },
    'Fontaines': {
      icon: '/logos/Fontaine.png',
      title: 'Fontaines d\'eau potable à Lyon : carte des points d\'accès gratuits',
      subtitle: 'fontaines publiques disponibles dans le Grand Lyon'
    },
    'Stations de Recharge': {
      icon: '/logos/borne.png',
      title: 'Bornes de recharge à Lyon : localisez une station en un clic',
      subtitle: 'stations de recharge électrique dans les 9 arrondissements de Lyon et consultez les spécifications de chacune'
    },
    'Toilettes Publiques': {
      icon: '/logos/wc.png',
      title: 'Toilettes publiques à Lyon : trouvez les plus proches',
      subtitle: 'toilettes publiques disponibles dans le Grand Lyon'
    },
    'Parcs et Jardins': {
      icon: '/logos/PetJ.png',
      title: 'Où se promener à Lyon ? Tous les parcs et jardins géolocalisés',
      subtitle: 'parcs et jardins, leurs superficies et leurs équipements'
    },
    'Compost': {
      icon: '/logos/compost.png',
      title: 'Bornes à compost à Lyon : trouvez la plus proche',
      subtitle: 'bornes à compost disponibles dans le Grand Lyon'
    },
    'Randonnées': {
      icon: '/logos/Rando.png',
      title: 'Randonnées autour de Lyon : trouvez votre boucle idéale',
      subtitle: 'boucles de randonnées de la métropole avec leurs difficultés, temps de parcours et dénivelés'
    },
    'Corbeilles': {
      icon: '/logos/poubelle.png',
      title: 'Déchets à la main ? Trouvez rapidement une poubelle à Lyon',
      subtitle: 'corbeilles publiques disponibles dans le Grand Lyon'
    }
  };

  useEffect(() => {
    const fetchInfrastructureData = async () => {
      try {
        setLoading(true);
        const breakdown = await getInfrastructureBreakdown();
        
        // Mapper les données avec la configuration
        const mappedData = breakdown
          .filter(item => infrastructureConfig[item.name])
          .map(item => ({
            ...item,
            ...infrastructureConfig[item.name]
          }))
          .sort((a, b) => b.count - a.count); // Trier par nombre décroissant
        
        setInfrastructures(mappedData);
      } catch (err) {
        console.error('Erreur lors de la récupération des infrastructures:', err);
        setError('Impossible de charger les données des infrastructures');
      } finally {
        setLoading(false);
      }
    };

    fetchInfrastructureData();
  }, []);

  const InfrastructureCard = ({ 
    infrastructure, 
    index 
  }: { 
    infrastructure: InfrastructureItem; 
    index: number;
  }) => {
    const handleCardClick = () => {
      console.log(`Navigation vers ${infrastructure.name}`);
      // Ici vous pouvez ajouter la navigation
      // router.push(`/infrastructure/${infrastructure.name.toLowerCase()}`);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        onClick={handleCardClick}
        className="group cursor-pointer"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
          <div className="flex items-center gap-6">
            {/* Icône */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 relative">
                <Image
                  src={infrastructure.icon}
                  alt={infrastructure.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                  sizes="80px"
                />
              </div>
            </div>
            
            {/* Contenu */}
            <div className="flex-grow min-w-0">
              <h3 className="text-xl font-normal text-black mb-3 transition-colors duration-300">
                {infrastructure.title}
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                {infrastructure.name === 'Randonnées' || infrastructure.name === 'Parcs et Jardins' ? (
                  <>
                    Consultez les{' '}
                    <span className="font-medium text-ecolyon-green">
                      {infrastructure.count.toLocaleString()}
                    </span>
                    {' '}{infrastructure.subtitle}
                  </>
                ) : (
                  <>
                    Géolocalisez les{' '}
                    <span className="font-medium text-ecolyon-green">
                      {infrastructure.count.toLocaleString()}
                    </span>
                    {' '}{infrastructure.subtitle}
                  </>
                )}
              </p>
            </div>
            
            {/* Flèche */}
            <div className="flex-shrink-0">
              <Image
                src="/icons/arrowright.svg"
                alt="Voir plus"
                width={28}
                height={28}
                className="w-7 h-7 group-hover:translate-x-1 transition-transform duration-300"
                style={{ filter: 'brightness(0) saturate(100%)' }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-2xl p-6 shadow-lg animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-grow space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {infrastructures.map((infrastructure, index) => (
            <InfrastructureCard
              key={infrastructure.name}
              infrastructure={infrastructure}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfrastructureCards;