// src/components/infrastructure/InfrastructurePageTemplate.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';
import StepCarousel, { Step } from '@/components/infrastructure/StepCarousel';
import Dock from '@/components/infrastructure/Dock';
import { useInfrastructure } from '@/hooks/useInfrastructure';

interface InfrastructureData {
  success: boolean;
  count: number;
  error?: string | null;
}

interface InfrastructureConfig {
  type: string;
  title: string;
  description: string;
  icon: string;
  iconAlt: string;
  steps: Step[];
}

interface InfrastructurePageTemplateProps {
  config: InfrastructureConfig;
  initialData: InfrastructureData;
}

export default function InfrastructurePageTemplate({ 
  config, 
  initialData 
}: InfrastructurePageTemplateProps) {
  const { count, loading, error } = useInfrastructure(config.type, initialData);

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <motion.div 
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/infrastructure"
            className="inline-flex items-center gap-2 text-black hover:text-ecolyon-green transition-colors group"
          >
            <Image
              src="/icons/arrowright.svg"
              alt="Flèche retour"
              width={20}
              height={20}
              className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 back-link-arrow"
            />
            <span className="text-sm sm:text-base font-medium">Retour aux infrastructures</span>
          </Link>
        </motion.div>

        {/* Compteur */}
        <motion.div 
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <Image
              src={config.icon}
              alt={config.iconAlt}
              width={80}
              height={80}
              sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
              className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
              loading="lazy"
            />
          </div>

          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#46952C]"></div>
              <p className="text-lg text-gray-600">Chargement...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-lg text-red-500 mb-4">{error}</p>
              <p className="text-gray-600">Veuillez réessayer plus tard.</p>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-black mb-4 sm:mb-6">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#46952C]">
                  {count.toLocaleString()}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6 sm:mb-8">
                {config.description}
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <a 
              href="https://apps.apple.com/fr/app/ecolyon-air-ville/id6747041717"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
              aria-label="Télécharger EcoLyon Air Ville sur l'App Store"
            >
              <ShinyButton 
                className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl border-ecolyon-green"
                style={{ 
                  '--primary': '#46952C',
                  backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
                } as React.CSSProperties}
              >
                Télécharger l&apos;app
              </ShinyButton>
            </a>
          </div>
        </motion.div>

        {/* Guide d'utilisation */}
        <motion.div 
          className="mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black text-center mb-8 sm:mb-12">
            {config.title}
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <StepCarousel steps={config.steps} />
          </div>
        </motion.div>

        {/* Dock mobile */}
        <div className="lg:hidden mt-12">
          <Dock />
        </div>
      </div>
    </div>
  );
}