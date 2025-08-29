// src/app/compost/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';
import { CompostAnimatedBeam } from '@/components/compost/AnimatedBeamDemo';

interface WFSResponse {
  type: string;
  features: Array<{
    type: string;
  }>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned?: number;
}

export default function CompostPage() {
  const [compostCount, setCompostCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer le nombre de bornes de compost depuis l'API Grand Lyon
  useEffect(() => {
    const fetchCompostCount = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:gic_collecte.bornecompost&outputFormat=application/json&SRSNAME=EPSG:4171&count=1'
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const data: WFSResponse = await response.json();
        const count = data.totalFeatures || data.numberMatched || data.features?.length || 0;
        
        setCompostCount(count);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de récupérer le nombre de bornes à compost');
      } finally {
        setLoading(false);
      }
    };

    fetchCompostCount();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <CompostAnimatedBeam />

        {/* Titre principal */}
        <motion.div 
          className="text-center mb-12 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black">
             30% de votre poubelle grise pourrait être compostée au lieu d&apos;être incinérée.
          </h1>
          
          <motion.p 
            className="text-base sm:text-lg text-gray-700 leading-relaxed mt-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
           La métropole de Lyon, c&apos;est <span className="font-medium text-ecolyon-green">{compostCount}</span> bornes à compost réparties sur tout le territoire et 12 500 tonnes de déchets alimentaires collectées en 2024. 
           Composter ses déchets, c&apos;est réduire la taille de ses poubelles, produire un engrais naturel et réduire la pollution atmosphérique. 
            <br/><br/><span className="font-medium text-ecolyon-green">La Métropole de Lyon vous accompagne dans cette démarche !</span>
          </motion.p>
        </motion.div>

        {/* Section avantages */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div>
             <h2 className="text-xl sm:text-2xl font-light text-black mb-12 text-center">
                    Pourquoi composter ?
                  </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-6xl mb-3">🌱</div>
                <h4 className="font-medium text-black mb-2">Engrais naturel</h4>
                <p className="text-gray-600 text-sm">Fertilisant gratuit sans produits chimiques</p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-3">🗑</div>
                <h4 className="font-medium text-black mb-2">Moins de déchets</h4>
                <p className="text-gray-600 text-sm">Réduction du volume de votre poubelle</p>
              </div>
              
              <div className="text-center">
                <div className="text-6xl mb-3">🌍</div>
                <h4 className="font-medium text-black mb-2">Planète préservée</h4>
                <p className="text-gray-600 text-sm">Amélioration de la qualité des sols</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Ressources et guides */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="space-y-4 max-w-3xl mx-auto">
            
            {/* Guide du compost */}
            <Link 
              href="/compost/guide"
              className="backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h3 className="text-xl font-medium text-black mb-2">Guide du compost</h3>
                  <p className="text-gray-600">
                    Du tri à la valorisation : tout comprendre en 4 étapes
                  </p>
                </div>
                
                <div className="flex-shrink-0 ml-6">
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
            </Link>

            {/* Composteur gratuit */}
            <Link 
              href="/compost/composteur-gratuit"
              className="backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group block"
            >
              <div className="flex items-center justify-between">
                <div className="flex-grow">
                  <h3 className="text-xl font-medium text-black mb-2">Composteur individuel</h3>
                  <p className="text-gray-600">
                    La Métropole de Lyon vous offre un composteur pour votre jardin
                  </p>
                </div>
                
                <div className="flex-shrink-0 ml-6">
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
            </Link>
          </div>
        </motion.div>

        {/* Section App avec largeur étendue */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center">
                
                {/* Partie gauche - Contenu textuel (60%) */}
                <div className="order-2 lg:order-1 text-center lg:text-left lg:col-span-3">
                  <h3 className="text-xl sm:text-2xl font-light text-black mb-6">
                    Une borne à compost est toujours à deux pas !
                  </h3>
                  
                  <div className="space-y-4 mb-8 text-gray-700 leading-relaxed">
                    <p>
                      Trognon de pomme après le déjeuner, épluchures de mandarine au parc ? 
                      Vous connaissez sûrement le composteur de votre quartier, mais que faire quand vous êtes ailleurs dans la métropole ?
                    </p>
                    
                    <p>
                      EcoLyon géolocalise instantanément la borne à compost la plus proche de votre position. 
                      Plus d&apos;excuse pour jeter vos biodéchets dans la poubelle grise !
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

                {/* Partie droite - Mockup de l'app (40%) */}
                <div className="order-1 lg:order-2 flex items-center justify-center lg:col-span-2">
                  <div className="relative">
                    {/* iPhone mockup */}
                    <div className="relative z-10">
                      <Image
                        src="/images/Compost/Compost.png"
                        alt="Application EcoLyon - Localisation des bornes à compost"
                        width={450}
                        height={900}
                        className="w-48 h-auto drop-shadow-2xl"
                      />
                    </div>
                    
                    {/* Effet de fond décoratif */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#46952C]/20 to-green-500/20 rounded-3xl blur-xl opacity-30 -z-10"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}