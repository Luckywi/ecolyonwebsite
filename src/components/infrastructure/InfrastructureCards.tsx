// src/components/infrastructure/InfrastructureCards.tsx
"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface InfrastructureItem {
  name: string;
  count: number;
  description?: string;
}

interface InfrastructureItemWithConfig extends InfrastructureItem {
  icon: string;
  title: string;
  subtitle: string;
  link: string;
}

interface InfrastructureCardsProps {
  data: InfrastructureItem[];
  loading: boolean;
  error: string;
}

const infrastructureConfig: Record<string, { icon: string; title: string; subtitle: string; link: string }> = {
    'Bancs Publics': {
      icon: '/logos/banc.png',
      title: 'Où se reposer à Lyon ? Localisez les bancs les plus proches',
      subtitle: 'bancs publics disponibles dans le Grand Lyon',
      link: '/infrastructure/bancs'
    },
    'Tri Sélectif': {
      icon: '/logos/SIlos.png',
      title: 'Du verre à jeter ? Un silo est toujours à deux pas',
      subtitle: 'silos à verre disponibles dans le Grand Lyon',
      link: '/infrastructure/silos'
    },
    'Fontaines': {
      icon: '/logos/Fontaine.png',
      title: 'Fontaines d\'eau potable à Lyon : carte des points d\'accès gratuits',
      subtitle: 'fontaines publiques disponibles dans le Grand Lyon',
      link: '/infrastructure/fontaines'
    },
    'Stations de Recharge': {
      icon: '/logos/borne.png',
      title: 'Bornes de recharge à Lyon : localisez une station en un clic',
      subtitle: 'stations de recharge électrique dans les 9 arrondissements de Lyon et consultez les spécifications de chacune',
      link: '/infrastructure/stations'
    },
    'Toilettes Publiques': {
      icon: '/logos/wc.png',
      title: 'Toilettes publiques à Lyon : trouvez les plus proches',
      subtitle: 'toilettes publiques disponibles dans le Grand Lyon',
      link: '/infrastructure/toilettes'
    },
    'Parcs et Jardins': {
      icon: '/logos/PetJ.png',
      title: 'Où se promener à Lyon ? Tous les parcs et jardins géolocalisés',
      subtitle: 'parcs et jardins du Grand Lyon, leurs superficies et leurs équipements',
      link: '/infrastructure/parcs'
    },
    'Compost': {
      icon: '/logos/compost.png',
      title: 'Bornes à compost à Lyon : trouvez la plus proche',
      subtitle: 'bornes à compost disponibles dans le Grand Lyon',
      link: '/infrastructure/compost'
    },
    'Randonnées': {
      icon: '/logos/Rando.png',
      title: 'Randonnées autour de Lyon : trouvez votre boucle idéale',
      subtitle: 'boucles de randonnées de la métropole avec leurs difficultés, temps de parcours et dénivelés',
      link: '/infrastructure/randonnees'
    },
    'Corbeilles': {
      icon: '/logos/poubelle.png',
      title: 'Déchets à la main ? Trouvez rapidement une poubelle à Lyon',
      subtitle: 'corbeilles publiques disponibles dans le Grand Lyon',
      link: '/infrastructure/poubelles'
    }
  };


const InfrastructureCards = ({ data, loading, error }: InfrastructureCardsProps) => {
  // Configuration des infrastructures avec leurs icônes, textes et liens
  // Mémoriser les données traitées pour éviter les recalculs
  const processedInfrastructures = useMemo(() => {
    return data
      .filter(item => infrastructureConfig[item.name])
      .map(item => ({
        ...item,
        ...infrastructureConfig[item.name]
      }))
      .sort((a, b) => b.count - a.count);
  }, [data]);

  const InfrastructureCard = ({ 
    infrastructure, 
    index 
  }: { 
    infrastructure: InfrastructureItemWithConfig; 
    index: number;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <Link href={infrastructure.link} className="block cursor-pointer">
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
            {/* Layout responsive : vertical sur mobile, horizontal sur desktop */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Icône - Taille responsive */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative">
                  <Image
                    src={infrastructure.icon}
                    alt={infrastructure.name}
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 80px"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Contenu - Centré sur mobile */}
              <div className="flex-grow min-w-0 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-normal text-black mb-2 sm:mb-3 transition-colors duration-300 leading-tight">
                  {infrastructure.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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
              
              {/* Flèche - Centrée sur mobile */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <Image
                  src="/icons/arrowright.svg"
                  alt="Voir plus"
                  width={28}
                  height={28}
                  className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // Carte spéciale pour les recommandations
  const FeedbackCard = ({ index }: { index: number }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group"
      >
        <Link href="/contact" className="block cursor-pointer">
          <div className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
            {/* Layout responsive : vertical sur mobile, horizontal sur desktop */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              {/* Icône Lyon - Taille responsive */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 relative">
                  <Image
                    src="/icons/LYON.png"
                    alt="Lyon - Recommandations"
                    fill
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 72px, 80px"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Contenu - Centré sur mobile */}
              <div className="flex-grow min-w-0 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-normal text-black mb-2 sm:mb-3 transition-colors duration-300 leading-tight">
                  Des recommandations pour améliorer EcoLyon ?
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  Partagez vos idées pour rendre Lyon encore plus connectée à son environnement et améliorer l&apos;application EcoLyon
                </p>
              </div>
              
              {/* Flèche - Centrée sur mobile */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <Image
                  src="/icons/arrowright.svg"
                  alt="Partager vos idées"
                  width={28}
                  height={28}
                  className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-1 transition-transform duration-300"
                  style={{ filter: 'brightness(0) saturate(100%)' }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // Skeleton de chargement optimisé et responsive
  const SkeletonCard = ({}: { index: number }) => (
    <div className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg animate-pulse">
      {/* Layout skeleton responsive */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        {/* Skeleton icône */}
        <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-300 rounded-2xl animate-pulse mx-auto sm:mx-0 flex-shrink-0"></div>
        
        {/* Skeleton contenu */}
        <div className="flex-grow space-y-2 sm:space-y-3 w-full text-center sm:text-left">
          <div className="h-5 sm:h-6 bg-gray-300 rounded animate-pulse w-4/5 mx-auto sm:mx-0"></div>
          <div className="h-4 bg-gray-300 rounded animate-pulse w-5/6 mx-auto sm:mx-0"></div>
        </div>
        
        {/* Skeleton flèche */}
        <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gray-300 rounded animate-pulse mx-auto sm:mx-0 flex-shrink-0"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {[...Array(6)].map((_, index) => (
            <SkeletonCard key={index} index={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-500 text-base sm:text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-3 sm:space-y-4">
          {processedInfrastructures.map((infrastructure, index) => (
            <InfrastructureCard
              key={infrastructure.name}
              infrastructure={infrastructure}
              index={index}
            />
          ))}
          
          {/* Carte spéciale de feedback à la fin */}
          {processedInfrastructures.length > 0 && (
            <FeedbackCard index={processedInfrastructures.length} />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfrastructureCards;