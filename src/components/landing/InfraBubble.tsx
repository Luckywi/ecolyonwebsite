'use client';

import { useState, useEffect, useMemo } from 'react';
import BubbleUI from '@/components/landing/BubbleUI';
import { getTotalInfrastructureCount } from '@/lib/infrastructure';


const InfraBubble = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Configuration des infrastructures avec emojis
  const infrastructures = [
    { id: 'parcs', emoji: '🌳', name: 'Parcs & Jardins', type: 'environment', color: '#22c55e' },
    { id: 'fontaines', emoji: '🚰', name: 'Fontaines', type: 'services', color: '#3b82f6' },
    { id: 'randonnees', emoji: '🥾', name: 'Randonnées', type: 'sport', color: '#f59e0b' },
    { id: 'corbeilles', emoji: '🗑️', name: 'Corbeilles', type: 'urban', color: '#6b7280' },
    { id: 'tri', emoji: '♻️', name: 'Tri Sélectif', type: 'environment', color: '#10b981' },
    { id: 'compost', emoji: '🌱', name: 'Compost', type: 'environment', color: '#84cc16' },
    { id: 'bancs', emoji: '🪑', name: 'Bancs Publics', type: 'urban', color: '#8b5cf6' },
    { id: 'wc', emoji: '🚻', name: 'Toilettes', type: 'services', color: '#ec4899' },
    { id: 'borne', emoji: '⚡', name: 'Bornes Électriques', type: 'transport', color: '#eab308' }
  ];

  // Détection mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Configuration responsive du BubbleUI
  const bubbleOptions = useMemo(() => ({
    size: isMobile ? 80 : 120,
    minSize: isMobile ? 25 : 35,
    gutter: isMobile ? 6 : 10,
    numCols: isMobile ? 3 : 4,
    fringeWidth: isMobile ? 80 : 120,
    yRadius: isMobile ? 60 : 90,
    xRadius: isMobile ? 100 : 150,
    provideProps: true
  }), [isMobile]);

  // Récupération des données
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
      const duration = 2000;
      const increment = totalCount / (duration / 16);
      
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

  // Gestion du clic sur une bulle
  const handleBubbleClick = (infrastructure: typeof infrastructures[0]) => {
    console.log('Infrastructure cliquée:', infrastructure.name);
    // Tu peux ajouter ici la logique de navigation ou modal
  };

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

        {/* BubbleUI avec infrastructures */}
        {!isLoading && (
          <div className="relative h-96 sm:h-[28rem] flex items-center justify-center">
            <div className="bubble-container">
              <BubbleUI 
                options={bubbleOptions}
                className="lyon-bubble-ui"
              >
                {infrastructures.map((infrastructure, index) => (
                  <div
                    key={infrastructure.id}
                    className="bubble-infrastructure group cursor-pointer"
                    onClick={() => handleBubbleClick(infrastructure)}
                    style={{
                      backgroundColor: infrastructure.color,
                      '--hover-color': infrastructure.color + '20'
                    } as React.CSSProperties}
                  >
                    {/* Emoji principal */}
                    <div className="emoji-container">
                      <span className="emoji-main">
                        {infrastructure.emoji}
                      </span>
                    </div>
                    
                    {/* Indicateur de données live (optionnel) */}
                    <div className="live-indicator opacity-80"></div>
                    
                    {/* Tooltip au hover */}
                    <div className="bubble-tooltip">
                      {infrastructure.name}
                    </div>
                  </div>
                ))}
              </BubbleUI>
            </div>
    
          </div>
        )}
      </div>

      <style jsx>{`
        .bubble-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .bubble-infrastructure {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          border: 3px solid rgba(255, 255, 255, 0.8);
        }

        .bubble-infrastructure:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.25);
          background-color: var(--hover-color) !important;
          border-color: rgba(255, 255, 255, 1);
        }

        .emoji-container {
          position: relative;
          z-index: 10;
        }

        .emoji-main {
          font-size: 2rem;
          line-height: 1;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }

        @media (max-width: 768px) {
          .emoji-main {
            font-size: 1.5rem;
          }
        }

        .live-indicator {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: #00ff00;
          border-radius: 50%;
          animation: pulse-live 2s infinite;
          z-index: 11;
        }

        .bubble-tooltip {
          position: absolute;
          bottom: -40px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.8);
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 20;
        }

        .bubble-infrastructure:hover .bubble-tooltip {
          opacity: 1;
        }

        @keyframes pulse-live {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.7;
          }
        }

        .lyon-bubble-ui {
          width: 100% !important;
          height: 100% !important;
        }
      `}</style>
    </section>
  );
};

export default InfraBubble;