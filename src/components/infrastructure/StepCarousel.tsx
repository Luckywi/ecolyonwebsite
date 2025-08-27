"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

export interface Step {
  id: number;
  title: string;
  image: string;
  description: string;
}

interface StepCarouselProps {
  steps: Step[];
}

const StepCarousel = ({ steps }: StepCarouselProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  // Configuration
  const itemWidth = isMobile ? 280 : 320;
  const DRAG_THRESHOLD = 50;
  const VELOCITY_THRESHOLD = 300;

  // Triple buffer pour boucle infinie parfaite
  const extendedSteps = useMemo(() => [
    steps[steps.length - 1], // Buffer début
    ...steps,
    steps[0], // Buffer fin
  ], [steps]);

  // Index réel dans le buffer (commence à 1)
  const bufferIndex = currentStep + 1;

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images intelligemment
  useEffect(() => {
    const preloadImages = () => {
      const indices = [
        currentStep,
        (currentStep + 1) % steps.length,
        (currentStep - 1 + steps.length) % steps.length,
      ];

      indices.forEach((index) => {
        if (steps[index]?.image) {
          const img = new window.Image();
          img.src = steps[index].image;
        }
      });
    };

    preloadImages();
  }, [currentStep, steps]);

  // Navigation
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const nextStep = (currentStep + 1) % steps.length;
    setCurrentStep(nextStep);
    
    // Feedback haptique
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [currentStep, steps.length, isTransitioning, isMobile]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const prevStep = (currentStep - 1 + steps.length) % steps.length;
    setCurrentStep(prevStep);
    
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [currentStep, steps.length, isTransitioning, isMobile]);

  const goToStep = useCallback((stepIndex: number) => {
    if (isTransitioning || stepIndex === currentStep) return;
    
    setIsTransitioning(true);
    setCurrentStep(stepIndex);
  }, [currentStep, isTransitioning]);

  // Gestion des transitions avec reset invisible
  const handleAnimationComplete = useCallback(() => {
    // Reset instantané aux extrémités pour boucle infinie
    if (bufferIndex === 0) {
      // Sauté au dernier vrai élément
      x.set(-(steps.length * itemWidth));
      setCurrentStep(steps.length - 1);
    } else if (bufferIndex === extendedSteps.length - 1) {
      // Sauté au premier vrai élément
      x.set(-itemWidth);
      setCurrentStep(0);
    }
    
    setIsTransitioning(false);
  }, [bufferIndex, extendedSteps.length, steps.length, itemWidth, x]);

  // Gestion du drag
  const handleDrag = useCallback((_: any, info: PanInfo) => {
    // Restriction du drag pendant les transitions
    if (isTransitioning) return;
  }, [isTransitioning]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    if (isTransitioning) return;

    const { offset, velocity } = info;
    const threshold = isMobile ? DRAG_THRESHOLD * 0.7 : DRAG_THRESHOLD;
    const velocityThreshold = isMobile ? VELOCITY_THRESHOLD * 0.8 : VELOCITY_THRESHOLD;

    if (offset.x < -threshold || velocity.x < -velocityThreshold) {
      goToNext();
    } else if (offset.x > threshold || velocity.x > velocityThreshold) {
      goToPrev();
    }
  }, [goToNext, goToPrev, isTransitioning, isMobile]);

  // Position du track
  const trackX = -bufferIndex * itemWidth;

  // Placeholder optimisé
  const placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjUzMyIgZmlsbD0iI2Y5ZmFmYiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+";

  return (
    <div className="w-full max-w-lg mx-auto select-none" ref={containerRef}>
      <div className="relative flex items-center justify-center">
        
        {/* Navigation desktop */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              disabled={isTransitioning}
              className="absolute -left-12 p-3 z-10 disabled:opacity-50 transition-opacity"
              style={{ top: 'calc(50% - 100px)' }}
              aria-label="Étape précédente"
            >
              <Image
                src="/icons/arrowright.svg"
                alt=""
                width={34}
                height={34}
                className="w-9 h-9 rotate-180"
              />
            </button>

            <button
              onClick={goToNext}
              disabled={isTransitioning}
              className="absolute -right-12 p-3 z-10 disabled:opacity-50 transition-opacity"
              style={{ top: 'calc(50% - 100px)' }}
              aria-label="Étape suivante"
            >
              <Image
                src="/icons/arrowright.svg"
                alt=""
                width={34}
                height={34}
                className="w-9 h-9"
              />
            </button>
          </>
        )}

        {/* Container carousel */}
        <div 
          className="overflow-hidden"
          style={{ width: `${itemWidth}px` }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            dragMomentum={false}
            style={{
              display: 'flex',
              width: `${itemWidth * extendedSteps.length}px`,
              x,
            }}
            animate={{
              x: trackX,
            }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              duration: 0.5,
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onAnimationComplete={handleAnimationComplete}
            className="cursor-grab active:cursor-grabbing"
          >
            {extendedSteps.map((step, index) => {
              const isActive = index === bufferIndex;
              
              return (
                <div
                  key={`${step.id}-${index}`}
                  className="flex-shrink-0 flex flex-col items-center text-center"
                  style={{ 
                    width: itemWidth,
                    transform: `scale(${isActive ? 1 : 0.95})`,
                    transition: 'transform 0.3s ease-out',
                  }}
                >
                  {/* Container image */}
                  <div 
                    className="relative mx-auto mb-8"
                    style={{ 
                      width: isMobile ? '280px' : '300px', 
                      height: isMobile ? '497px' : '533px',
                    }}
                  >
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                      sizes={isMobile ? "280px" : "300px"}
                      quality={95}
                      priority={Math.abs(index - bufferIndex) <= 1}
                      placeholder="blur"
                      blurDataURL={placeholder}
                      loading={Math.abs(index - bufferIndex) <= 1 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* Contenu */}
                  <div className="space-y-4 px-4 max-w-sm">
                    <h3 className={`font-semibold text-gray-900 leading-tight ${
                      isMobile ? 'text-lg' : 'text-xl'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-gray-600 leading-relaxed ${
                      isMobile ? 'text-sm' : 'text-base'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
            disabled={isTransitioning}
            className={`transition-all duration-300 ${
              currentStep === index
                ? 'w-8 h-2 bg-ecolyon-green rounded-full' 
                : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
            }`}
            aria-label={`Aller à l'étape ${index + 1}`}
          />
        ))}
      </div>

      {/* Compteur */}
      <div className="text-center mt-4">
        <span className={`font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full ${
          isMobile ? 'text-xs' : 'text-sm'
        }`}>
          {currentStep + 1} / {steps.length}
        </span>
      </div>

      {/* Indicateur swipe mobile */}
      {isMobile && (
        <div className="flex justify-center mt-4">
          <div className="flex items-center space-x-2 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            <span>Glissez pour naviguer</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepCarousel;