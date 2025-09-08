'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, MotionValue } from 'framer-motion';

interface BubbleData {
  id: number;
  logoPath: string;
  alt: string;
  gridX: number;
  gridY: number;
}

interface BubbleUIOptions {
  size: number;
  minSize: number;
  gutter: number;
  centerRadius: number;
  fringeWidth: number;
}

const options: BubbleUIOptions = {
  size: 75,
  minSize: 20,
  gutter: 14,
  centerRadius: 120,
  fringeWidth: 160,
};

const mobileOptions: BubbleUIOptions = {
  size: 55,
  minSize: 15,
  gutter: 10,
  centerRadius: 90,
  fringeWidth: 120,
};

 const baseIcons: Omit<BubbleData, 'gridX' | 'gridY' | 'id'>[] = [
    { logoPath: '/logos/banc.png', alt: 'Bancs publics' },
    { logoPath: '/logos/borne.png', alt: 'Bornes électriques' },
    { logoPath: '/logos/compost.png', alt: 'Compost' },
    { logoPath: '/logos/Fontaine.png', alt: 'Fontaines' },
    { logoPath: '/logos/PetJ.png', alt: 'Parcs et jardins' },
    { logoPath: '/logos/poubelle.png', alt: 'Corbeilles' },
    { logoPath: '/logos/Rando.png', alt: 'Randonnées' },
    { logoPath: '/logos/SIlos.png', alt: 'Tri sélectif' },
    { logoPath: '/logos/wc.png', alt: 'Toilettes publiques' },
  ];

const GalaxyBubble = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Pan values for infinite scroll
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  
  // Determine if we're on mobile - using a simple approach
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
  const currentOptions = isMobile ? mobileOptions : options;

  // Base 9 icons that will repeat infinitely

  // Generate infinite hexagonal grid with repeating icons
  const generateInfiniteHexGrid = useCallback((radius: number = 12): BubbleData[] => {
    const bubbles: BubbleData[] = [];
    let id = 0;
    
    for (let q = -radius; q <= radius; q++) {
      const r1 = Math.max(-radius, -q - radius);
      const r2 = Math.min(radius, -q + radius);
      
      for (let r = r1; r <= r2; r++) {
        const iconIndex = Math.abs(id) % baseIcons.length;
        const baseIcon = baseIcons[iconIndex];
        
        bubbles.push({
          id,
          logoPath: baseIcon.logoPath,
          alt: baseIcon.alt,
          gridX: q,
          gridY: r,
        });
        
        id++;
      }
    }
    
    return bubbles;
  }, []);

  const bubbleData = generateInfiniteHexGrid(12);

  // Infinite loop effect - reset position when reaching boundaries
  const handleDrag = useCallback(() => {
    const spacing = currentOptions.size + currentOptions.gutter;
    const maxDistance = spacing * 8; // Distance before reset
    
    const currentX = panX.get();
    const currentY = panY.get();
    
    // Reset position if we get too far from center
    if (Math.abs(currentX) > maxDistance || Math.abs(currentY) > maxDistance) {
      // Smooth transition back to a nearby equivalent position
      const resetX = currentX % (spacing * 3);
      const resetY = currentY % (spacing * 3);
      
      panX.set(resetX);
      panY.set(resetY);
    }
  }, [panX, panY, currentOptions]);

  // Convert hex grid coordinates to pixel coordinates
  const hexToPixel = useCallback((gridX: number, gridY: number) => {
    const spacing = currentOptions.size + currentOptions.gutter;
    const x = spacing * (gridX * 0.75);
    const y = spacing * (gridY + (gridX % 2) * 0.5) * (Math.sqrt(3) / 2);
    return { x, y };
  }, [currentOptions]);

  // Calculate distance from center and determine bubble scale
  const getBubbleScale = useCallback((bubbleX: number, bubbleY: number, panXVal: number, panYVal: number) => {
    const centerX = bubbleX + panXVal;
    const centerY = bubbleY + panYVal;
    const distance = Math.sqrt(centerX * centerX + centerY * centerY);
    
    if (distance <= currentOptions.centerRadius) {
      return 1;
    } else if (distance <= currentOptions.centerRadius + currentOptions.fringeWidth) {
      const progress = (distance - currentOptions.centerRadius) / currentOptions.fringeWidth;
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      return 1 - easedProgress * (1 - currentOptions.minSize / currentOptions.size);
    } else {
      return currentOptions.minSize / currentOptions.size;
    }
  }, [currentOptions]);

  // Initialize position
  useEffect(() => {
    panX.set(0);
    panY.set(0);
  }, [panX, panY]);

  return (
    <section className="hidden lg:flex items-center justify-center py-6 lg:py-8 bg-[#F8F7F4]">
      <motion.div
        ref={containerRef}
        className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[320px] lg:w-[550px] lg:h-[350px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Infinite scrollable container */}
        <motion.div
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
          drag
          dragConstraints={{
            left: -5000,
            right: 5000,
            top: -5000,
            bottom: 5000
          }}
          dragElastic={0.02}
          dragTransition={{ 
            bounceStiffness: 150, 
            bounceDamping: 50,
            power: 0.2,
            timeConstant: 200
          }}
          style={{ x: panX, y: panY }}
          whileDrag={{ cursor: 'grabbing' }}
          onDrag={handleDrag}
        >
          {/* Container for all bubbles */}
          <div className="absolute left-1/2 top-1/2">
            {bubbleData.map((bubble) => {
              const { x, y } = hexToPixel(bubble.gridX, bubble.gridY);
              
              return (
                <BubbleItem
                  key={bubble.id}
                  bubble={bubble}
                  x={x}
                  y={y}
                  panX={panX}
                  panY={panY}
                  getBubbleScale={getBubbleScale}
                  options={currentOptions}
                />
              );
            })}
          </div>
        </motion.div>

        {/* Radial fade mask overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(248, 247, 244, 0) 0%,
                rgba(248, 247, 244, 0) 30%,
                rgba(248, 247, 244, 0.3) 50%,
                rgba(248, 247, 244, 0.7) 70%,
                rgba(248, 247, 244, 0.9) 85%,
                rgba(248, 247, 244, 1) 100%
              )
            `
          }}
        />

        {/* Subtle glow effect in center */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.2) 0%,
                rgba(255, 255, 255, 0.1) 25%,
                rgba(255, 255, 255, 0) 50%
              )
            `
          }}
        />
      </motion.div>
    </section>
  );
};

interface BubbleItemProps {
  bubble: BubbleData;
  x: number;
  y: number;
  panX: MotionValue<number>;
  panY: MotionValue<number>;
  getBubbleScale: (x: number, y: number, panX: number, panY: number) => number;
  options: BubbleUIOptions;
}

const BubbleItem = ({ bubble, x, y, panX, panY, getBubbleScale, options }: BubbleItemProps) => {
  // Real-time scale calculation
  const scale = useTransform(
    [panX, panY],
    ([px, py]) => getBubbleScale(x, y, px as number, py as number)
  );

  // Enhanced opacity with smoother falloff
  const opacity = useTransform(
    scale,
    [options.minSize / options.size * 0.3, options.minSize / options.size, 0.5, 1],
    [0, 0.2, 0.8, 1]
  );

  // Distance from center for additional effects
  const distanceFromCenter = useTransform(
    [panX, panY],
    ([px, py]) => {
      const centerX = x + (px as number);
      const centerY = y + (py as number);
      return Math.sqrt(centerX * centerX + centerY * centerY);
    }
  );

  // Blur effect for distant bubbles
  const blur = useTransform(
    distanceFromCenter,
    [0, options.centerRadius, options.centerRadius + options.fringeWidth],
    [0, 0, 3]
  );

  return (
    <motion.div
      className="absolute select-none pointer-events-none"
      style={{
        left: x,
        top: y,
        width: options.size,
        height: options.size,
        scale,
        opacity,
        filter: `blur(${blur}px)`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <motion.div 
        className="w-full h-full rounded-full flex items-center justify-center overflow-hidden pointer-events-auto cursor-pointer"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
        }}
        whileHover={{ 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
        whileTap={{ 
          scale: 0.9,
          transition: { duration: 0.1 }
        }}
        onClick={(e) => {
          e.stopPropagation();
          console.log(`Clicked on ${bubble.alt}`);
        }}
      >
        <motion.div
          className="relative w-3/4 h-3/4 pointer-events-none"
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.2 }
          }}
        >
          <Image
            src={bubble.logoPath}
            alt={bubble.alt}
            fill
            className="object-contain select-none pointer-events-none"
            sizes="(max-width: 640px) 60px, (max-width: 1024px) 70px, 80px"
            draggable={false}
            style={{
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default GalaxyBubble;