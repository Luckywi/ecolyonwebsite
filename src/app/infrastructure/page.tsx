// src/app/infrastructure/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconCloud } from '@/components/infrastructure/IconCloud';
import { getTotalInfrastructureCount } from '@/lib/infrastructure';
import InfrastructureCards from '@/components/infrastructure/InfrastructureCards';

export default function InfrastructurePage() {
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadInfrastructureData = async () => {
      try {
        setIsLoading(true);
        const count = await getTotalInfrastructureCount();
        setTotalCount(count);
      } catch (error) {
        console.error('Erreur lors du chargement des infrastructures:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInfrastructureData();
  }, []);

  return (
   <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden">
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

      {/* Bannière avec contenu */}
      <div className="relative z-10 bg-[#F8F7F4] mt-[370px]">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Phrase dynamique avec le chiffre direct */}
            <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black mb-8">
              L&apos;app EcoLyon géolocalise{' '}
              <span 
                className="font-medium"
                style={{ color: '#46952C' }}
              >
                {isLoading ? '...' : totalCount.toLocaleString()}
              </span>
              {' '}infrastructures publiques dans le Grand Lyon.
            </p>
          </div>
        </section>
         <InfrastructureCards />

        {/* Section des cartes d'infrastructures */}
      </div>
    </div>
  );
}