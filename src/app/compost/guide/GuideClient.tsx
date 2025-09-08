"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

// Composant Stepper interactif amélioré
interface CustomStepperProps {
  steps: { title: string; description: string }[];
}

const CustomStepper = ({ steps }: CustomStepperProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const totalSteps = steps.length;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber: number) => {
    setDirection(stepNumber > currentStep ? 1 : -1);
    setCurrentStep(stepNumber);
  };

  // Gestion du swipe mobile améliorée
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(0); // Reset touchEnd
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 30; // Réduit de 50 à 30 pour plus de sensibilité
    const isRightSwipe = distance < -30;

    if (isLeftSwipe && currentStep < totalSteps) {
      handleNext();
    }
    if (isRightSwipe && currentStep > 1) {
      handleBack();
    }
    
    // Reset pour éviter les conflits
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Indicateurs d'étapes - cachés sur mobile */}
      <div className="hidden sm:flex items-center justify-center mb-8 px-4">
        {steps.map((_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={stepNumber} className={`flex items-center ${!isLast ? 'flex-1 max-w-[120px]' : ''}`}>
              {/* Cercle d'étape */}
              <motion.div
                onClick={() => handleStepClick(stepNumber)}
                className="cursor-pointer relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg shadow-lg"
                  animate={{
                    backgroundColor: isActive || isCompleted ? '#46952C' : '#F8F7F4',
                    color: isActive || isCompleted ? '#F8F7F4' : '#6B7280',
                    borderColor: isActive ? '#46952C' : isCompleted ? '#46952C' : '#E5E7EB',
                    scale: isActive ? 1.1 : 1
                  }}
                  transition={{ 
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.2 
                  }}
                >
                  {isCompleted ? (
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  ) : (
                    stepNumber
                  )}
                </motion.div>
              </motion.div>
              
              {/* Connecteur */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-4 bg-gray-200 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-ecolyon-green"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: isCompleted ? '100%' : '0%' 
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                      duration: 0.3 
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contenu des étapes avec navigation intégrée */}
      <motion.div 
        className="min-h-[200px] sm:min-h-[280px] rounded-xl sm:rounded-2xl p-4 sm:p-6 select-none"
        key={currentStep}
        initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          duration: 0.2 
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-start gap-4">
          {/* Bouton Précédent à gauche - caché sur mobile */}
          <div className="hidden sm:flex justify-start pt-12">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`rounded-lg p-3 font-medium transition-colors ${
                currentStep === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
            >
              <Image
                src="/icons/arrowright.svg"
                alt="Flèche précédent"
                width={20}
                height={20}
                className="w-5 h-5 rotate-180 green-link-arrow"
              />
            </button>
          </div>
          
          {/* Contenu central */}
          <div className="text-center sm:px-4">
            <div className="sm:hidden mb-3">
              <span className="text-xs text-gray-500 font-medium">
                Étape {currentStep} sur {totalSteps}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-medium text-black mb-3 sm:mb-4">
              {steps[currentStep - 1].title}
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm px-2 sm:px-0">
              {steps[currentStep - 1].description}
            </p>
            <div className="sm:hidden mt-4 text-xs text-gray-400 italic flex items-center justify-center gap-2">
              <motion.span
                animate={{ x: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ←
              </motion.span>
              Glissez pour naviguer
              <motion.span
                animate={{ x: [2, -2, 2] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </div>
          </div>
          
          {/* Bouton Suivant à droite - caché sur mobile */}
          <div className="hidden sm:flex justify-end pt-12">
            <button
              onClick={handleNext}
              disabled={currentStep === totalSteps}
              className={`rounded-lg p-3 font-medium transition-colors ${
                currentStep === totalSteps ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'
              }`}
            >
              <Image
                src="/icons/arrowright.svg"
                alt="Flèche suivant"
                width={20}
                height={20}
                className="w-5 h-5 green-link-arrow"
              />
            </button>
          </div>
        </div>

        {/* Indicateur de progression en bas */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index + 1 === currentStep 
                  ? 'w-8 bg-ecolyon-green' 
                  : index + 1 < currentStep 
                    ? 'w-4 bg-ecolyon-green' 
                    : 'w-4 bg-gray-300'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default function GuideClient() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation de retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-8"
        >
          <Link
            href="/compost"
            className="inline-flex items-center gap-2 text-black hover:text-ecolyon-green transition-colors group"
          >
            <Image
              src="/icons/arrowright.svg"
              alt="Flèche retour"
              width={20}
              height={20}
              className="w-5 h-5 rotate-180 back-link-arrow"
            />
            <span className="font-medium">Retour au compost</span>
          </Link>
        </motion.div>

        {/* Image du panier en grand */}
        <motion.div 
          className="flex justify-center mb-4 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
            <Image
              src="/logos/pannier.png"
              alt="Guide des bornes à compost Lyon"
              fill
              className="object-contain"
              sizes="190px"
            />
          </div>
        </motion.div>

        {/* Titre principal centré */}
        <motion.div 
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-black mb-4 sm:mb-8">
            Le guide du compost Lyonnais
          </h1>

          {/* Description */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Du tri à la valorisation, découvrez le parcours complet de vos déchets alimentaires dans les plus de 2 700 bornes à compost de la Métropole de Lyon.
          </motion.p>

          {/* Statistiques en une phrase */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl font-light text-black leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Entre 2021 et 2024, les bornes à compost ont permis de collecter <span className="font-bold text-ecolyon-green">12 500</span> tonnes de déchets alimentaires, dont environ <span className="font-bold text-ecolyon-green">9 000</span> tonnes ont été transformées en compost naturel, valorisé localement.
          </motion.p>
        </motion.div>

        {/* Section que composter */}
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="px-4">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black text-center mb-6 sm:mb-8">
              Que peut-on composter ?
            </h2>
            
            <div className="max-w-5xl mx-auto">
              {/* Version desktop - grid horizontal */}
              <div className="hidden md:flex justify-center gap-3 px-4">
                {[
                  { emoji: "👨‍🍳", title: "Préparations", desc: "Épluchures, coquilles d'œufs, trognons de fruits", width: "w-[220px]" },
                  { emoji: "🍖", title: "Restes de repas", desc: "Restes cuits, arêtes, os, épluchures", width: "w-[200px]" },
                  { emoji: "🧀", title: "Produits périmés", desc: "Aliments moisis ou expirés sans emballage", width: "w-[230px]" },
                  { emoji: "☕", title: "Thé & café", desc: "Marc de café, filtres, sachets de thé", width: "w-[190px]" }
                ].map((item, index) => (
                  <div key={index} className={`shadow-md rounded-xl p-4 text-center flex-shrink-0 h-48 flex flex-col justify-between ${item.width} bg-transparent`}>
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-lg font-medium text-black mb-2 whitespace-nowrap overflow-hidden text-ellipsis">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-5 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', height: '2.5rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Version mobile - grid 2x2 */}
              <div className="md:hidden grid grid-cols-2 gap-3 px-2">
                {[
                  { emoji: "👨‍🍳", title: "Préparations", desc: "Épluchures, coquilles d'œufs, trognons" },
                  { emoji: "🍖", title: "Restes repas", desc: "Restes cuits, arêtes, os" },
                  { emoji: "🧀", title: "Produits périmés", desc: "Aliments expirés sans emballage" },
                  { emoji: "☕", title: "Thé & café", desc: "Marc de café, filtres, sachets" }
                ].map((item, index) => (
                  <div key={index} className="shadow-md rounded-xl p-4 text-center h-36 flex flex-col justify-between bg-transparent">
                    <div className="text-3xl mb-2">{item.emoji}</div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="text-sm font-medium text-black mb-1 leading-tight">{item.title}</h3>
                      <p className="text-gray-600 text-xs leading-4">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Règles importantes */}
            <div className="mt-6 sm:mt-8 max-w-2xl mx-auto">
              <div className="rounded-xl p-4 sm:p-6">
                <h3 className="font-medium text-black mb-3 sm:mb-4 text-center">Règles importantes</h3>
                {/* Version mobile - 2 colonnes puis centré */}
                <div className="sm:hidden">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">×</span>
                      </div>
                      <span className="text-sm text-red-600">Pas de plastique</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">×</span>
                      </div>
                      <span className="text-sm text-red-600">Pas d&apos;emballage</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 bg-ecolyon-green rounded-full flex items-center justify-center flex-shrink-0">
                      <motion.svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>
                    <span className="text-sm text-ecolyon-green">En vrac uniquement</span>
                  </div>
                </div>
                {/* Version desktop - inchangée */}
                <div className="hidden sm:grid sm:grid-cols-3 sm:gap-4">
                  <div className="flex items-center justify-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">×</span>
                    </div>
                    <span className="text-sm text-red-600">Pas de plastique</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">×</span>
                    </div>
                    <span className="text-sm text-red-600">Pas d&apos;emballage</span>
                  </div>
                  <div className="flex items-center justify-start space-x-3">
                    <div className="w-6 h-6 bg-ecolyon-green rounded-full flex items-center justify-center flex-shrink-0">
                      <motion.svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </div>
                    <span className="text-sm text-ecolyon-green">En vrac uniquement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section processus avec stepper */}
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black text-center mb-6 sm:mb-12">
            Le parcours de vos déchets alimentaires
          </h2>
          
         <div className="p-2 sm:p-6">
  <CustomStepper 
    steps={[
      {
        title: "Collecte dans les bornes de quartier",
        description: "Vous déposez vos biodéchets dans l'une des 2 579 bornes à compost publiques installées dans la métropole. Elles sont collectées 2 à 4 fois par semaine selon un planning optimisé pour limiter les odeurs et les débordements."
      },
      {
        title: "Transport vers les plateformes de traitement",
        description: "Les camions de collecte acheminent vos déchets vers trois plateformes partenaires : Les Alchimistes à Vénissieux, OuiCompost dans le 7ᵉ arrondissement et Racine à Ternay."
      },
      {
        title: "Tri automatique et préparation",
        description: "Les biodéchets sont d'abord triés (manuellement puis mécaniquement) pour retirer les indésirables, puis broyés et mélangés à des déchets verts (labour, broyat…) dans des proportions idéales pour un compostage efficace."
      },
      {
        title: "Compostage industriel contrôlé",
        description: "La matière est placée en andains ou en cellules de compostage industrialisées, où elle est retournée régulièrement et maintenue à une température de 60 à 70 °C pendant plusieurs semaines pour garantir une stérilisation complète et une dégradation rapide."
      },
      {
        title: "Maturation et affinage du compost",
        description: "Après la phase chaude, le compost mûrit plusieurs semaines en silos ou en andains, avant d'être tamisé pour obtenir différentes granulométries : fine pour le maraîchage, moyenne pour les jardins."
      },
      {
        title: "Distribution et utilisation locale",
        description: "Le compost final est certifié, puis distribué principalement aux agriculteurs (≈ 54 %), aux entreprises du paysage (≈ 38 %) et, en moindre proportion, à des collectivités, des particuliers ou des entreprises de travaux publics (≈ 8 %), dans un rayon proche de la métropole."
      }
    ]}
  />
</div>

        </motion.div>

        {/* Section plus d'informations */}
        <motion.div 
          className="mb-8 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          <div className="text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black mb-3 sm:mb-4">
              Envie d&apos;en savoir plus ?
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
              La Métropole de Lyon met à disposition de nombreuses ressources pour vous accompagner dans le compostage.
            </p>
            
            <a
              href="https://www.grandlyon.com/mes-services-au-quotidien/gerer-ses-dechets/utiliser-une-borne-a-compost/vos-questions-sur-les-bornes-a-compost/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-ecolyon-green text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-ecolyon-green-dark transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              Consultez la FAQ officielle
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}