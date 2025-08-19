'use client';

import { useState, useEffect } from 'react';
import { getTotalInfrastructureCount } from '@/lib/infrastructure';
import Image from 'next/image';

const Infra = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Configuration des icônes d'infrastructures
  const infrastructureIcons = [
    { src: '/logos/banc.png', alt: 'Bancs publics', name: 'banc' },
    { src: '/logos/borne.png', alt: 'Bornes électriques', name: 'borne' },
    { src: '/logos/compost.png', alt: 'Compost', name: 'compost' },
    { src: '/logos/Fontaine.png', alt: 'Fontaines', name: 'fontaine' },
    { src: '/logos/PetJ.png', alt: 'Parcs et jardins', name: 'parc' },
    { src: '/logos/poubelle.png', alt: 'Corbeilles', name: 'poubelle' },
    { src: '/logos/Rando.png', alt: 'Randonnées', name: 'rando' },
    { src: '/logos/Silos.png', alt: 'Tri sélectif', name: 'silos' },
    { src: '/logos/wc.png', alt: 'Toilettes publiques', name: 'wc' }
  ];

  // Générer des positions en cercle pour former une boule
  const [iconPositions, setIconPositions] = useState<Array<{
    icon: typeof infrastructureIcons[0];
    x: number;
    y: number;
    rotation: number;
    scale: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    // Créer une disposition en boule organique comme sur l'image
    const positions = infrastructureIcons.map((icon, index) => {
      // Positions prédéfinies pour former une boule naturelle
      const bubblePositions = [
        { x: 0, y: -100 },      // Haut centre
        { x: 70, y: -70 },      // Haut droite
        { x: 100, y: 0 },       // Droite centre
        { x: 70, y: 70 },       // Bas droite
        { x: 0, y: 100 },       // Bas centre
        { x: -70, y: 70 },      // Bas gauche
        { x: -100, y: 0 },      // Gauche centre
        { x: -70, y: -70 },     // Haut gauche
        { x: 0, y: -40 }        // Haut centre proche
      ];
      
      const basePos = bubblePositions[index] || { x: 0, y: 0 };
      
      // Ajouter une variation aléatoire pour un effet plus naturel
      const randomOffset = 20;
      const x = basePos.x + (Math.random() - 0.5) * randomOffset;
      const y = basePos.y + (Math.random() - 0.5) * randomOffset;
      
      return {
        icon,
        x,
        y,
        rotation: Math.random() * 30 - 15,
        scale: 0.9 + Math.random() * 0.2, // Entre 0.9 et 1.1
        delay: index * 100 + Math.random() * 200
      };
    });
    setIconPositions(positions);
  }, []);

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

  // Animation du compteur
  useEffect(() => {
    if (totalCount > 0 && !isLoading) {
      setIsAnimating(true);
      let start = 0;
      const duration = 2000; // 2 secondes
      const increment = totalCount / (duration / 16); // 60fps
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= totalCount) {
          setAnimatedCount(totalCount);
          setIsAnimating(false);
          clearInterval(timer);
        } else {
          setAnimatedCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [totalCount, isLoading]);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto text-center">
        {/* Phrase d'infrastructures */}
        <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black mb-16">
          EcoLyon géolocalise{' '}
          <span 
            className={`font-medium transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
            style={{ color: '#46952C' }}
          >
            {isLoading ? '...' : animatedCount.toLocaleString()}
          </span>
          {' '}infrastructures publiques dans le Grand Lyon.
        </p>

        {/* Composition en boule organique avec logo central */}
        {!isLoading && iconPositions.length > 0 && (
          <div className="relative flex justify-center items-center h-96 sm:h-[28rem]">
            {/* Container de la boule */}
            <div className="relative w-96 h-96 sm:w-[28rem] sm:h-[28rem]">
              
              {/* Logo EcoLyon au centre */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#46952C] rounded-full flex items-center justify-center shadow-xl border-4 border-white">
                  <span className="text-white font-bold text-xs sm:text-sm">ECO</span>
                </div>
              </div>

              {/* Icônes disposées en boule organique */}
              {iconPositions.map((item, index) => (
                <div
                  key={`${item.icon.name}-${index}`}
                  className="absolute top-1/2 left-1/2 opacity-0 animate-float-in"
                  style={{
                    transform: `translate(-50%, -50%) translate(${item.x}px, ${item.y}px) rotate(${item.rotation}deg) scale(${item.scale})`,
                    animationDelay: `${item.delay}ms`,
                    animationFillMode: 'forwards',
                    animationDuration: '1s'
                  }}
                >
                  <div className="group cursor-pointer relative">
                    {/* Ombre légère derrière chaque icône */}
                    <div className="absolute inset-0 bg-black opacity-10 rounded-full blur-sm transform translate-y-1"></div>
                    <Image
                      src={item.icon.src}
                      alt={item.icon.alt}
                      width={56}
                      height={56}
                      className="w-12 h-12 sm:w-14 sm:h-14 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1 relative z-10"
                      title={item.icon.alt}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translate(0px, 0px) rotate(0deg) scale(0.5);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) translate(var(--target-x), var(--target-y)) rotate(var(--rotation)) scale(1.1);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, -50%) translate(var(--target-x), var(--target-y)) rotate(var(--rotation)) scale(var(--scale));
          }
        }
        
        .animate-float-in {
          animation: float-in 1s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Infra;

