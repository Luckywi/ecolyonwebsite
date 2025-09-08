"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/shadcn/carousel';

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
  const [api, setApi] = useState<CarouselApi>();
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Configuration
  const itemWidth = isMobile ? 280 : 320;

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Écouter les changements du carousel
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentStep(api.selectedScrollSnap());
    };

    onSelect(); // Set initial state
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

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

  // Navigation simplifiée avec boucle manuelle
  const goToNext = useCallback(() => {
    if (!api) return;
    
    const nextIndex = currentStep === steps.length - 1 ? 0 : currentStep + 1;
    api.scrollTo(nextIndex);
    
    // Feedback haptique
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [api, currentStep, steps.length, isMobile]);

  const goToPrev = useCallback(() => {
    if (!api) return;
    
    const prevIndex = currentStep === 0 ? steps.length - 1 : currentStep - 1;
    api.scrollTo(prevIndex);
    
    if (isMobile && 'vibrate' in navigator) {
      navigator.vibrate(10);
    }
  }, [api, currentStep, steps.length, isMobile]);

  const goToStep = useCallback((stepIndex: number) => {
    if (!api || stepIndex === currentStep) return;
    api.scrollTo(stepIndex);
  }, [api, currentStep]);

  // Placeholder optimisé
  const placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjUzMyIgZmlsbD0iI2Y5ZmFmYiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIi8+";

  return (
    <div className="w-full max-w-lg mx-auto select-none">
      <div className="relative flex items-center justify-center">
        
        {/* Navigation desktop - Boutons personnalisés */}
        {!isMobile && (
          <>
            <button
              onClick={goToPrev}
              className="absolute -left-12 p-3 z-10 disabled:opacity-50 transition-opacity"
              style={{ top: 'calc(50% - 100px)' }}
              aria-label="Étape précédente"
            >
              <Image
                src="/icons/arrowright.svg"
                alt="Flèche précédente - Étape précédente"
                width={34}
                height={34}
                className="w-9 h-9 rotate-180"
              />
            </button>

            <button
              onClick={goToNext}
              className="absolute -right-12 p-3 z-10 disabled:opacity-50 transition-opacity"
              style={{ top: 'calc(50% - 100px)' }}
              aria-label="Étape suivante"
            >
              <Image
                src="/icons/arrowright.svg"
                alt="Flèche suivante - Étape suivante"
                width={34}
                height={34}
                className="w-9 h-9"
              />
            </button>
          </>
        )}

        {/* Container carousel */}
        <Carousel 
          setApi={setApi}
          opts={{
            align: "center",
            loop: false, // Désactiver la boucle automatique d'Embla
            duration: 25,
          }}
          className="w-full"
          style={{ maxWidth: `${itemWidth}px` }}
        >
          <CarouselContent className="-ml-0">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              
              return (
                <CarouselItem
                  key={step.id}
                  className="pl-0 flex flex-col items-center text-center"
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
                      priority={Math.abs(index - currentStep) <= 1}
                      placeholder="blur"
                      blurDataURL={placeholder}
                      loading={Math.abs(index - currentStep) <= 1 ? "eager" : "lazy"}
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
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Indicateurs */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        {steps.map((_, index) => (
          <button
            key={index}
            onClick={() => goToStep(index)}
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