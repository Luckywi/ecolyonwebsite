// src/app/compost/guide/page.tsx
"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface FoodWasteCategory {
  id: string;
  title: string;
  emoji: string;
  description: string;
}

interface AccordionStepProps {
  step: string;
  title: string;
  description: string;
}

const AccordionStep = ({ step, title, description }: AccordionStepProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-gray-100 rounded-xl mb-3 overflow-hidden bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-[#46952C] text-white rounded-full flex items-center justify-center font-semibold text-sm">
              {step}
            </div>
            <h3 className="font-medium text-black">{title}</h3>
          </div>
          <svg
            className={`w-5 h-5 text-[#46952C] transition-transform ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="px-6 pb-6"
        >
          <p className="text-gray-600 leading-relaxed pl-12">{description}</p>
        </motion.div>
      )}
    </div>
  );
};

const FoodWasteCard = ({ category }: { category: FoodWasteCategory }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center min-w-[200px]">
    <div className="text-4xl mb-4">{category.emoji}</div>
    <h4 className="font-medium text-black mb-2">{category.title}</h4>
    <p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
  </div>
);

const ImportantRule = ({ 
  icon, 
  text, 
  isPositive = false 
}: { 
  icon: string; 
  text: string; 
  isPositive?: boolean;
}) => (
  <div className="flex items-center space-x-3">
    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
      isPositive ? 'bg-[#46952C]' : 'bg-red-500'
    }`}>
      <span className="text-white text-xs">
        {isPositive ? '✓' : '×'}
      </span>
    </div>
    <span className={`text-sm font-medium ${
      isPositive ? 'text-[#46952C]' : 'text-red-600'
    }`}>
      {text}
    </span>
  </div>
);

export default function CompostGuidePage() {
  const foodWasteCategories: FoodWasteCategory[] = [
    {
      id: '1',
      title: 'Préparations de repas',
      emoji: '👨‍🍳',
      description: 'Épluchures, coquilles d\'œufs, trognons de fruits…'
    },
    {
      id: '2',
      title: 'Restes de repas',
      emoji: '🍖',
      description: 'Restes cuits, arêtes, os, épluchures…'
    },
    {
      id: '3',
      title: 'Produits alimentaires périmés',
      emoji: '🧀',
      description: 'Aliments moisis ou expirés sans emballage'
    },
    {
      id: '4',
      title: 'Thé & café',
      emoji: '☕',
      description: 'Marc de café, filtres, sachets de thé…'
    }
  ];

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
            Guide des Bornes à Compost
          </h1>
          
          <div className="inline-flex items-center bg-[#46952C] text-white px-4 py-2 rounded-full text-sm font-medium mb-8">
            <span className="font-bold">+ 2 700</span>
            <span className="ml-1">bornes à compost à Lyon</span>
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
              alt="Compost"
              width={100}
              height={100}
              className="w-20 h-20 object-contain"
            />
          </div>
        </motion.div>

        {/* Section Avant/Aujourd'hui */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8 text-center">
              Une révolution pour vos déchets
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Aujourd'hui */}
              <div className="bg-[#46952C]/5 border border-[#46952C]/20 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-[#46952C] rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🌱</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Aujourd'hui</h3>
                    <p className="text-[#46952C] text-sm font-medium">Valorisation et compost</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Moins d'odeurs, moins de nuisibles, moins de poubelles à sortir... 
                  Trier ses déchets alimentaires, c'est plus propre et plus simple au quotidien.
                </p>
              </div>

              {/* Avant */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">🗑</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Avant</h3>
                    <p className="text-gray-600 text-sm font-medium">Gaspillage et incinération</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  24% des poubelles grises sont des déchets alimentaires qui finissent incinérés, 
                  polluant l'environnement inutilement.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Que composter */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8 text-center">
              Tous les déchets alimentaires sont acceptés !
            </h2>
            
            {/* Grille des catégories */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {foodWasteCategories.map((category) => (
                <FoodWasteCard key={category.id} category={category} />
              ))}
            </div>

            {/* Règles importantes */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-medium text-black mb-4">Règles importantes</h3>
              <div className="space-y-3">
                <ImportantRule
                  icon="×"
                  text="Pas de sac plastique (même compostable)"
                />
                <ImportantRule
                  icon="×"
                  text="Pas d'emballage"
                />
                <ImportantRule
                  icon="✓"
                  text="Uniquement les déchets alimentaires en vrac"
                  isPositive={true}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Processus étape par étape */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-8 text-center">
              Du dépôt à la valorisation
            </h2>
            
            <div className="space-y-2">
              <AccordionStep
                step="1"
                title="Préparez votre geste éco-citoyen"
                description="À la maison, jetez tous vos déchets alimentaires dans un contenant dédié (bio-seau ou récipient réutilisé). Épluchures, restes de repas, produits périmés non emballés… tout peut y aller. Un petit geste simple, mais essentiel pour démarrer la boucle du compostage !"
              />
              
              <AccordionStep
                step="2"
                title="Déposez-les près de chez vous"
                description="Rendez-vous à la borne à compost la plus proche de chez vous. Déposez vos déchets alimentaires en vrac ou dans un sac en papier. Attention : pas de plastique, même biodégradable ! Ces bornes sont accessibles 24h/24, pour un tri facile au quotidien."
              />
              
              <AccordionStep
                step="3"
                title="Collecte et transformation"
                description="Les déchets sont collectés régulièrement et transportés vers des plateformes de compostage locales comme Les Alchimistes à Vénissieux, OuiCompost à Lyon ou Racine à Ternay. Là, ils sont soigneusement mélangés à des déchets verts, puis compostés pendant plusieurs semaines dans des conditions contrôlées."
              />
              
              <AccordionStep
                step="4"
                title="Retour à la terre"
                description="Après maturation, un compost 100 % naturel est obtenu. Il est utilisé par des agriculteurs locaux et des jardiniers pour nourrir les sols et faire pousser de nouvelles cultures. Grâce à votre tri, les déchets redeviennent une ressource précieuse pour la planète."
              />
            </div>
          </div>
        </motion.div>

        {/* Section remerciements */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-xl font-medium text-black mb-4">
              Merci ! 🎉
            </h2>
            
            <p className="text-gray-600 leading-relaxed mb-6 max-w-2xl mx-auto">
              En 2024, grâce à votre mobilisation, la Métropole de Lyon a récupéré 12 500 tonnes 
              de déchets alimentaires et les a transformées en 9 000 tonnes de compost naturel.
            </p>
            
            <a
              href="https://www.grandlyon.com/mes-services-au-quotidien/gerer-ses-dechets/utiliser-une-borne-a-compost/vos-questions-sur-les-bornes-a-compost/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#46952C] hover:underline font-medium"
            >
              Plus d'informations sur les bornes à compost
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}