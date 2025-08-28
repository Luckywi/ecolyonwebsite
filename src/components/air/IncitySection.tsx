"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ShinyButton } from '@/components/magicui/shiny-button';

const IncitySection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto">
        {/* Section "Le saviez-vous ?" */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Partie gauche - Image de la tour */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <Image
                src='/images/incity.png'
                alt="Tour Incity affichant l'indice de qualité d'air"
                width={280}
                height={700}
                className="object-contain hover:scale-105 transition-transform duration-700"
                style={{ 
                  filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.1))',
                }}
              />
              {/* Effet de fond décoratif cohérent avec la section du bas */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#46952C]/20 to-blue-500/20 rounded-3xl blur-xl opacity-30 -z-10"></div>
            </div>
          </div>

          {/* Partie droite - Texte */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h4 className="text-xl sm:text-2xl font-light text-black mb-6">
              Le saviez-vous ?
            </h4>
            
            <div className="space-y-4 mb-8 text-gray-700 leading-relaxed">
              <p>
                Depuis juin 2024, la tour Incity s&apos;éclaire chaque soir à la couleur de l&apos;indice ATMO de la qualité de l&apos;air du lendemain.
              </p>
              
              <p>
                Issue d&apos;une volonté conjointe de la Caisse d&apos;Epargne Rhône-Alpes, de la Métropole de Lyon, des acteurs de santé et d&apos;Atmo, cette initiative vise à rendre les données scientifiques accessibles et compréhensibles pour tous.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section "Pour aller plus loin..." */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Partie gauche - Détails de l'app */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h4 className="text-xl sm:text-2xl font-light text-black mb-6">
                Vous ne voyez pas la tour Incity ? <br />
                <span className="text-[#46952C] font-medium">Téléchargez l&apos;app EcoLyon !</span>
              </h4>
              
              <div className="space-y-4 mb-8 text-gray-700 leading-relaxed">
                <p>
                  Localisez plus de 30 000 infrastructures publiques et suivez la qualité de l&apos;air en temps réel dans la ville de Lyon.
                </p>
                
                <p>
                  EcoLyon facilite l&apos;usage quotidien des infrastructures publiques, vous informe sur la qualité de l&apos;air et vous accompagne vers une ville plus durable.
                </p>
              </div>

              {/* Bouton de téléchargement */}
              <div className="flex justify-center lg:justify-start">
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
              </div>
            </div>

            {/* Partie droite - Mockup de l'app */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <div className="relative">
                {/* iPhone mockup */}
                <div className="relative z-10">
                  <Image
                    src="/icons/mockupv2.svg"
                    alt="Application EcoLyon - Interface qualité de l'air"
                    width={400}
                    height={800}
                    className="w-84 h-auto drop-shadow-2xl"
                  />
                </div>
                
                {/* Effet de fond décoratif simple */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#46952C]/20 to-blue-500/20 rounded-3xl blur-xl opacity-30 -z-10"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IncitySection;