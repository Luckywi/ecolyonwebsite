// src/app/compost/composteur-gratuit/page.tsx
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';

interface AvantageProps {
  emoji: string;
  title: string;
  subtitle: string;
}

const AvantageRow = ({ emoji, title, subtitle }: AvantageProps) => (
  <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
    <div className="text-2xl flex-shrink-0">{emoji}</div>
    <div>
      <h4 className="font-medium text-black mb-1">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{subtitle}</p>
    </div>
  </div>
);

interface EligibilityCardProps {
  icon: string;
  title: string;
  conditions: string[];
}

const EligibilityCard = ({ icon, title, conditions }: EligibilityCardProps) => (
  <div className="bg-[#46952C]/5 border border-[#46952C]/20 rounded-xl p-6">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 bg-[#46952C] rounded-full flex items-center justify-center mr-3">
        <span className="text-white text-sm">{icon}</span>
      </div>
      <h3 className="font-semibold text-black">{title}</h3>
    </div>
    
    <div className="space-y-2">
      {conditions.map((condition, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="w-2 h-2 bg-[#46952C] rounded-full mt-2 flex-shrink-0"></div>
          <p className="text-gray-600 text-sm">{condition}</p>
        </div>
      ))}
    </div>
  </div>
);

export default function ComposteurGratuitPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link
            href="/compost"
            className="inline-flex items-center space-x-2 text-[#46952C] hover:underline font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour au compost</span>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl lg:text-4xl font-light text-black mb-6">
            La Métropole de Lyon vous offre un composteur !
          </h1>
          
          <div className="inline-flex items-center bg-[#46952C] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="font-light">#objectif</span>
            <span className="font-light">Zéro</span>
            <span className="font-bold">Déchet</span>
          </div>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <Image
              src="/logos/metropole.png"
              alt="Métropole de Lyon"
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
            <Image
              src="/logos/compostGratuit.png"
              alt="Composteur gratuit"
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
          </div>
        </motion.div>

        {/* Section Pourquoi */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8">Pourquoi ?</h2>
            
            <div className="space-y-6">
              {/* Objectif 50% */}
              <div className="flex items-start space-x-4">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-[#46952C]">50%</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    La Métropole de Lyon à pour objectif de réduire de{' '}
                    <span className="font-semibold text-[#46952C]">50% les déchets incinérés</span>{' '}
                    d'ici 2026.
                  </p>
                </div>
              </div>
              
              <div className="border-t border-[#46952C]/20"></div>
              
              {/* Impact 30% */}
              <div className="flex items-start space-x-4">
                <div className="w-16 text-center">
                  <span className="text-2xl font-bold text-[#46952C]">30%</span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    En compostant, vous pouvez déjà réduire de{' '}
                    <span className="font-semibold text-[#46952C]">30% le contenu</span>{' '}
                    de votre bac gris.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Avantages du compostage */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8">
              Avantages du compostage
            </h2>
            
            <div className="space-y-4">
              <AvantageRow
                emoji="🌱"
                title="Engrais naturel"
                subtitle="Transformez vos déchets en fertilisant gratuit et sans produits chimiques"
              />
              
              <AvantageRow
                emoji="🗑"
                title="Moins de déchets"
                subtitle="Réduisez jusqu'à 1/3 le volume de votre poubelle"
              />
              
              <AvantageRow
                emoji="🌍"
                title="Sols et planète préservés"
                subtitle="Améliore la qualité des sols et réduit l'impact environnemental"
              />
            </div>
          </div>
        </motion.div>

        {/* Formation */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium text-black">
                Débutant ? On vous forme !
              </h2>
              <div className="text-3xl">🎓</div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Ateliers de sensibilisation au compostage et au jardinage avec vos résidus végétaux.
            </p>
            
            <a
              href="https://www.grandlyon.com/mes-services-au-quotidien/gerer-ses-dechets/sinscrire-a-un-atelier-ou-une-formation-sur-le-compostage"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full bg-[#46952C] text-white px-6 py-4 rounded-xl hover:bg-[#46952C]/90 transition-colors"
            >
              <span className="font-medium">En savoir plus sur les formations</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Éligibilité */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8">
              Qui peut en bénéficier ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EligibilityCard
                icon="🏠"
                title="Particuliers"
                conditions={[
                  "Maison individuelle",
                  "Appartement avec rez-de-jardin",
                  "Accès à un jardin ou à la terre"
                ]}
              />
              
              <EligibilityCard
                icon="🏢"
                title="Établissements"
                conditions={[
                  "Structures publiques ou privées",
                  "Projet pédagogique en place",
                  "Pas encore bénéficiaire du dispositif"
                ]}
              />
            </div>
          </div>
        </motion.div>

        {/* Bouton d'action principal */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a
            href="https://demarches.toodego.com/gestion-des-dechets/demander-la-distribution-d-un-composteur-individuel/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <ShinyButton 
              className="w-full bg-[#46952C] hover:bg-[#46952C]/90 text-white px-8 py-6 rounded-xl font-medium text-lg shadow-lg hover:shadow-xl border-[#46952C]"
              style={{ 
                '--primary': '#46952C',
                backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
              } as React.CSSProperties}
            >
              <div className="flex items-center justify-center space-x-3">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0 9c-5 0-9-4-9-9s4-9 9-9m0 0v9" />
                </svg>
                <span>Faire ma demande en ligne</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </ShinyButton>
          </a>
        </motion.div>

        {/* Informations complémentaires */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-black mb-4">
              En attendant votre composteur ⏳
            </h3>
            
            <p className="text-gray-600 leading-relaxed mb-6">
              Préparez-vous grâce à toutes les informations disponibles sur grandlyon.com/compostage
            </p>
            
            <a
              href="https://grandlyon.com/compostage"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#46952C] hover:underline font-medium"
            >
              Consulter le guide complet
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}