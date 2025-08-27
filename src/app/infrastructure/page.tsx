// src/app/infrastructure/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { IconCloud } from '@/components/infrastructure/IconCloud';
import { getTotalInfrastructureCount, getInfrastructureBreakdown } from '@/lib/infrastructure';
import InfrastructureCards from '@/components/infrastructure/InfrastructureCards';
import { ShinyButton } from '@/components/magicui/shiny-button';

interface InfrastructureItem {
  name: string;
  count: number;
  description?: string;
}

export default function InfrastructurePage() {
  const [totalCount, setTotalCount] = useState(0);
  const [infrastructureData, setInfrastructureData] = useState<InfrastructureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        // Chargement parallèle des deux APIs
        const [count, breakdown] = await Promise.all([
          getTotalInfrastructureCount(),
          getInfrastructureBreakdown()
        ]);
        
        setTotalCount(count);
        setInfrastructureData(breakdown);
      } catch (error) {
        console.error('Erreur lors du chargement des infrastructures:', error);
        setError('Erreur lors du chargement des données');
      } finally {
        setIsLoading(false);
      }
    };

    loadAllData();
  }, []);

  return (
   <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden">
      {/* Globe d'icônes en arrière-plan */}
      <div className="absolute top-3 inset-x-0 z-0 mx-auto">
        <div className="w-[600px] h-[600px] mx-auto flex items-center justify-center">
          <IconCloud 
            images={[
              "/logos/banc.png",
              "/logos/borne.png", 
              "/logos/compost.png",
              "/logos/Fontaine.png",
              "/logos/PetJ.png",
              "/logos/poubelle.png",
              "/logos/Rando.png",
              "/logos/SIlos.png",
              "/logos/wc.png",
              "/icons/LYON.png",
              "/logos/banc.png",
              "/logos/borne.png", 
              "/logos/compost.png",
              "/logos/Fontaine.png",
              "/logos/PetJ.png",
              "/logos/poubelle.png",
              "/logos/Rando.png",
              "/logos/SIlos.png",
              "/logos/wc.png",
              "/icons/LYON.png"
            ]}
            iconSize={95}
          />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 bg-[#F8F7F4] mt-[370px]">
        {/* Bannière avec le nombre d'infrastructures */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {error ? (
              <p className="text-xl text-red-500">
                {error}
              </p>
            ) : (
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black">
                L&apos;app EcoLyon géolocalise{' '}
                <span 
                  className="font-medium"
                  style={{ color: '#46952C' }}
                >
                  {isLoading ? '...' : totalCount.toLocaleString()}
                </span>
                {' '}infrastructures publiques dans le Grand Lyon.
              </p>
            )}
          </div>
        </section>

        {/* Section bouton CTA centré */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Bouton de téléchargement centré */}
              <ShinyButton 
                className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-8 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl border-ecolyon-green"
                style={{ 
                  '--primary': '#46952C',
                  backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  {/* Icône Apple */}
                  <svg 
                    className="w-5 h-5" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Télécharger l&apos;app EcoLyon
                </div>
              </ShinyButton>
            </motion.div>
          </div>
        </section>

        {/* Section des cartes d'infrastructures */}
        <InfrastructureCards 
          data={infrastructureData}
          loading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
}