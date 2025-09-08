'use client';

import { useState, useEffect } from 'react';
import { getTotalInfrastructureCount } from '@/lib/infrastructure';

const Infra = () => {
  const [totalCount, setTotalCount] = useState(0);
  const [animatedCount, setAnimatedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

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
    <section className="py-6 lg:py-8 px-4 sm:px-6 lg:px-8 bg-[#F8F7F4]">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-black leading-relaxed px-2">
          EcoLyon géolocalise{' '}
          <span 
            className={`font-medium transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
            style={{ color: '#46952C' }}
          >
            {isLoading ? '...' : animatedCount.toLocaleString()}
          </span>
          {' '}infrastructures publiques dans le Grand Lyon.
        </p>
      </div>
    </section>
  );
};

export default Infra;