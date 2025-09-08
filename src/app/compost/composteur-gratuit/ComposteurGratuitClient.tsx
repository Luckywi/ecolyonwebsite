"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';

// Composant Stepper interactif
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
    const isLeftSwipe = distance > 30; // Plus sensible
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
                alt="Flèche précédente - Étape précédente"
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
            <p className="text-gray-600 leading-relaxed text-sm px-2 sm:px-0 mb-4 sm:mb-6">
              {steps[currentStep - 1].description}
            </p>

            {/* Bouton étape 3 */}
            {currentStep === 3 && (
              <div className="max-w-xs mx-auto">
                <a
                  href="https://demarches.toodego.com/gestion-des-dechets/demander-la-distribution-d-un-composteur-individuel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 justify-center w-full bg-ecolyon-green text-white px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-ecolyon-green-dark transition-colors font-medium text-xs sm:text-sm shadow"
                >
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  <span>Demander mon composteur</span>
                </a>
              </div>
            )}
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
                alt="Flèche suivante - Étape suivante"
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

export default function ComposteurGratuitClient() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
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
              alt="Flèche de retour - Retour au compost"
              width={20}
              height={20}
              className="w-5 h-5 rotate-180 back-link-arrow"
            />
            <span className="font-medium">Retour au compost</span>
          </Link>
        </motion.div>

        {/* Icône composteur en grand */}
        <motion.div 
          className="flex justify-center mb-4 sm:mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-24 h-24 sm:w-32 sm:h-32 relative">
            <Image
              src="/logos/compostGratuit.png"
              alt="Composteur gratuit Métropole de Lyon"
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
            La Métropole de Lyon vous offre un composteur !
          </h1>

          {/* Description */}
          <motion.p 
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Pour aider les habitants à transformer en compost leurs déchets alimentaires, la Métropole de Lyon fournit gratuitement des composteurs individuels aux foyers avec jardin.
          </motion.p>

          {/* Bouton CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-6 sm:mb-8"
          >
            <a
              href="https://demarches.toodego.com/gestion-des-dechets/demander-la-distribution-d-un-composteur-individuel/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <ShinyButton 
                className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-4 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl border-ecolyon-green"
                style={{ 
                  '--primary': '#46952C',
                  backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                  </svg>
                  Demander mon composteur gratuit
                </div>
              </ShinyButton>
            </a>
          </motion.div>

          {/* Statistiques en une phrase */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl font-light text-black leading-relaxed mb-8 sm:mb-12 max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Déjà plus de <span className="font-bold text-ecolyon-green">24 000</span> composteurs distribués gratuitement, avec un objectif de <span className="font-bold text-ecolyon-green">60 000</span> composteurs d&apos;ici 2030.
          </motion.p>
        </motion.div>

        {/* Section éligibilité */}
        <motion.div 
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <div className="p-4 sm:p-8">
            <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black text-center mb-6 sm:mb-8">
              Qui peut en bénéficier ?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              {/* Particuliers */}
              <div className="shadow-md rounded-xl p-4 sm:p-6 text-center">
                <div className="flex flex-col items-center mb-3 sm:mb-4">
                  <span className="text-4xl sm:text-6xl mb-2">🏠</span>
                  <h3 className="text-lg sm:text-xl font-medium text-black">Particuliers</h3>
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-gray-700">Maison individuelle avec jardin</p>
                  <p className="text-sm sm:text-base text-gray-700">Accès direct à la pleine terre</p>
                  <p className="text-sm sm:text-base text-gray-700">Résidence principale uniquement</p>
                </div>
              </div>
              
              {/* Établissements */}
              <div className="shadow-md rounded-xl p-4 sm:p-6 text-center">
                <div className="flex flex-col items-center mb-3 sm:mb-4">
                  <span className="text-4xl sm:text-6xl mb-2">🏢</span>
                  <h3 className="text-lg sm:text-xl font-medium text-black">Établissements</h3>
                </div>
                
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-sm sm:text-base text-gray-700">Écoles, entreprises, commerces</p>
                  <p className="text-sm sm:text-base text-gray-700">Projet pédagogique en place</p>
                  <p className="text-sm sm:text-base text-gray-700">Accès à la pleine terre</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section processus de demande avec stepper */}
        <motion.div 
          className="mb-12 sm:mb-16 pb-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black text-center mb-6 sm:mb-12">
            Comment obtenir votre composteur ?
          </h2>
          
          <div className="rounded-xl sm:rounded-2xl p-2 sm:p-8">
            <CustomStepper 
              steps={[
                {
                  title: "Vérifiez votre éligibilité",
                  description: "Assurez-vous d'habiter la Métropole de Lyon et de disposer d'un jardin avec accès à la pleine terre."
                },
                {
                  title: "Préparez vos documents",
                  description: "Munissez-vous de votre pièce d'identité, d'un justificatif de domicile récent et d'une photo de votre jardin."
                },
                {
                  title: "Faites votre demande en ligne",
                  description: "Remplissez le formulaire sur Toodego. Votre demande sera enregistrée sur liste d'attente."
                },
                {
                  title: "Attendez votre tour !",
                  description: "Les composteurs sont fabriqués selon les commandes. Vous serez contacté pour la distribution."
                }
              ]}
            />
          </div>
        </motion.div>
          {/* Section formation */}
        <section className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4] pt-0">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-lg sm:text-xl md:text-2xl font-light text-black mb-3 sm:mb-4">
                  Débutant ? La Métropole vous forme !
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                  Ateliers gratuits et ouverts à tous pour apprendre les bons gestes du compostage.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
                <motion.div 
                  className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🎓</div>
                  <h4 className="font-medium text-black mb-1 sm:mb-2 text-sm sm:text-base">Ateliers pratiques</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Sessions de 2h pour apprendre les bons gestes</p>
                </motion.div>
                
                <motion.div 
                  className="backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📧</div>
                  <h4 className="font-medium text-black mb-1 sm:mb-2 text-sm sm:text-base">Suivi personnalisé</h4>
                  <p className="text-xs sm:text-sm text-gray-600">Conseils saisonniers par email après formation</p>
                </motion.div>
              </div>

              <div className="text-center">
                <a
                  href="https://www.grandlyon.com/mes-services-au-quotidien/gerer-ses-dechets/sinscrire-a-un-atelier-ou-une-formation-sur-le-compostage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-ecolyon-green text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-ecolyon-green-dark transition-colors font-medium text-sm sm:text-base shadow-lg hover:shadow-xl"
                >
                  S&apos;inscrire à une formation gratuite
                </a>
              </div>
            </motion.div>
          </div>
        </section>

       

      </div>
    </div>
  );
}