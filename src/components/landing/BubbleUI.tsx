'use client';

import { useState, useLayoutEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import React from 'react';

interface BubbleUIOptions {
  size?: number;
  minSize?: number;
  gutter?: number;
  numCols?: number;
  fringeWidth?: number;
  yRadius?: number;
  xRadius?: number;
  cornerRadius?: number;
  showGuides?: boolean;
  compact?: boolean;
  gravitation?: number;
  provideProps?: boolean;
}

interface BubbleUIProps {
  options?: BubbleUIOptions;
  className?: string;
  children: ReactNode[];
}

const defaultOptions: BubbleUIOptions = {
  size: 200,
  minSize: 20,
  gutter: 16,
  provideProps: false,
  numCols: 6,
  fringeWidth: 100,
  yRadius: 200,
  xRadius: 200,
  cornerRadius: 100,
  showGuides: false,
  compact: false,
  gravitation: 0,
};

const BubbleUI: React.FC<BubbleUIProps> = ({
  options: propOptions = {},
  className = '',
  children
}) => {
  const options = { ...defaultOptions, ...propOptions };
  const scrollableRef = useRef<HTMLDivElement>(null);
  
  // Motion values pour des animations fluides
  const scrollY = useMotionValue(0);
  const scrollX = useMotionValue(0);
  
  // Springs pour des animations naturelles
  const springScrollY = useSpring(scrollY, { stiffness: 300, damping: 30 });
  const springScrollX = useSpring(scrollX, { stiffness: 300, damping: 30 });
  
  const [scrollTop, setScrollTop] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Early return après les hooks
  if (!children || children.length === 0) {
    return null;
  }

  options.numCols = Math.min(options.numCols!, children.length);
  const minProportion = options.minSize! / options.size!;

  // Organiser les enfants en grille hexagonale
  const rows: ReactNode[][] = [];
  let colsRemaining = 0;
  let evenRow = true;

  for (let i = 0; i < children.length; i++) {
    if (colsRemaining === 0) {
      colsRemaining = evenRow ? options.numCols! - 1 : options.numCols!;
      evenRow = !evenRow;
      rows.push([]);
    }
    rows[rows.length - 1].push(children[i]);
    colsRemaining--;
  }

  // Ajouter une bulle vide pour l'alignement si nécessaire
  if (rows.length > 1) {
    if (rows[rows.length - 1].length % 2 === rows[rows.length - 2].length % 2) {
      rows[rows.length - 1].push(<div key="dummy"></div>);
    }
  }

  // Gérer le scroll avec motion values
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newScrollTop = target.scrollTop;
    const newScrollLeft = target.scrollLeft;
    
    setScrollTop(newScrollTop);
    setScrollLeft(newScrollLeft);
    scrollY.set(newScrollTop);
    scrollX.set(newScrollLeft);
  };

  // Centrer le scroll au démarrage
  useLayoutEffect(() => {
    if (scrollableRef.current) {
      const scrollable = scrollableRef.current;
      const centerY = (scrollable.scrollHeight - scrollable.clientHeight) / 2;
      const centerX = (scrollable.scrollWidth - scrollable.clientWidth) / 2;
      
      scrollable.scrollTo(centerX, centerY);
      setScrollTop(centerY);
      setScrollLeft(centerX);
      scrollY.set(centerY);
      scrollX.set(centerX);
    }
  }, [scrollY, scrollX]);

  // Fonction d'interpolation
  const interpolate = (
    actualMin: number,
    actualMax: number,
    val: number,
    targetMin: number,
    targetMax: number
  ) => {
    return ((val - actualMin) / (actualMax - actualMin)) * (targetMax - targetMin) + targetMin;
  };

  // Calculer la taille et position de chaque bulle
  const getBubbleProperties = (row: number, col: number) => {
    const yOffset =
      (options.size! + options.gutter!) * 0.866 * row -
      options.size! +
      (options.cornerRadius! * (1.414 - 1)) / 1.414 -
      (options.yRadius! - options.size!);

    const xOffset =
      (options.size! + options.gutter!) * col +
      ((options.numCols! - rows[row].length) * (options.size! + options.gutter!)) / 2 -
      options.size! +
      (options.cornerRadius! * (1.414 - 1)) / 1.414 -
      (options.xRadius! - options.size!);

    const dy = yOffset - scrollTop;
    const dx = xOffset - scrollLeft;
    const distance = Math.sqrt(dx * dx + dy * dy);

    let bubbleSize = 1;
    let translateX = 0;
    let translateY = 0;
    let distanceFromEdge = 0;
    let isInCornerRegion = false;

    // Déterminer la région de la bulle
    if (Math.abs(dx) <= options.xRadius! && Math.abs(dy) <= options.yRadius!) {
      // Région carrée intérieure
      if (
        Math.abs(dy) > options.yRadius! - options.cornerRadius! &&
        Math.abs(dx) > options.xRadius! - options.cornerRadius!
      ) {
        // Région de coin
        const distToInnerCorner = Math.sqrt(
          Math.pow(Math.abs(dy) - options.yRadius! + options.cornerRadius!, 2) +
          Math.pow(Math.abs(dx) - options.xRadius! + options.cornerRadius!, 2)
        );
        if (distToInnerCorner > options.cornerRadius!) {
          distanceFromEdge = distToInnerCorner - options.cornerRadius!;
          isInCornerRegion = true;
        }
      }
    } else if (
      Math.abs(dx) <= options.xRadius! + options.fringeWidth! &&
      Math.abs(dy) <= options.yRadius! + options.fringeWidth!
    ) {
      // Région fringe
      if (
        Math.abs(dy) > options.yRadius! - options.cornerRadius! &&
        Math.abs(dx) > options.xRadius! - options.cornerRadius!
      ) {
        isInCornerRegion = true;
        const distToInnerCorner = Math.sqrt(
          Math.pow(Math.abs(dy) - options.yRadius! + options.cornerRadius!, 2) +
          Math.pow(Math.abs(dx) - options.xRadius! + options.cornerRadius!, 2)
        );
        distanceFromEdge = distToInnerCorner - options.cornerRadius!;
      } else {
        distanceFromEdge = Math.max(
          Math.abs(dx) - options.xRadius!,
          Math.abs(dy) - options.yRadius!
        );
      }
    } else {
      // Extérieur
      isInCornerRegion =
        Math.abs(dy) > options.yRadius! - options.cornerRadius! &&
        Math.abs(dx) > options.xRadius! - options.cornerRadius!;
      if (isInCornerRegion) {
        const distToInnerCorner = Math.sqrt(
          Math.pow(Math.abs(dy) - options.yRadius! + options.cornerRadius!, 2) +
          Math.pow(Math.abs(dx) - options.xRadius! + options.cornerRadius!, 2)
        );
        distanceFromEdge = distToInnerCorner - options.cornerRadius!;
      } else {
        distanceFromEdge = Math.max(
          Math.abs(dx) - options.xRadius!,
          Math.abs(dy) - options.yRadius!
        );
      }
    }

    // Calculer la taille
    bubbleSize = interpolate(
      0,
      options.fringeWidth!,
      Math.min(distanceFromEdge, options.fringeWidth!),
      1,
      minProportion
    );

    // Calculer les translations
    const translationMag = options.compact ? (options.size! - options.minSize!) / 2 : 0;
    const interpolatedTranslationMag = interpolate(0, options.fringeWidth!, distanceFromEdge, 0, translationMag);

    if (distanceFromEdge > 0 && distanceFromEdge <= options.fringeWidth!) {
      translateX = interpolatedTranslationMag;
      translateY = interpolatedTranslationMag;
    } else if (distanceFromEdge - options.fringeWidth! > 0) {
      const extra = (Math.max(0, distanceFromEdge - options.fringeWidth! - options.size! / 2) * options.gravitation!) / 10;
      translateX = translationMag + extra;
      translateY = translationMag + extra;
    }

    // Ajuster selon la région
    if (isInCornerRegion) {
      const cornerDx = Math.abs(dx) - options.xRadius! + options.cornerRadius!;
      const cornerDy = Math.abs(dy) - options.yRadius! + options.cornerRadius!;
      let theta = Math.atan(-cornerDy / cornerDx);
      if (dx > 0) {
        if (dy > 0) theta *= -1;
      } else {
        if (dy > 0) {
          theta += Math.PI;
        } else {
          theta += Math.PI - 2 * theta;
        }
      }
      translateX *= -Math.cos(theta);
      translateY *= -Math.sin(theta);
    } else if (Math.abs(dx) > options.xRadius! || Math.abs(dy) > options.yRadius!) {
      if (Math.abs(dx) > options.xRadius!) {
        translateX *= -Math.sign(dx);
        translateY = 0;
      } else {
        translateY *= -Math.sign(dy);
        translateX = 0;
      }
    }

    return { bubbleSize, translateX, translateY, distance };
  };

  const verticalPadding = `calc(50% - ${
    options.yRadius! + options.size! / 2 - (options.cornerRadius! * (1.414 - 1)) / 1.414
  }px)`;

  const horizontalPadding = `calc(50% - ${
    options.xRadius! + options.size! / 2 - (options.cornerRadius! * (1.414 - 1)) / 1.414
  }px)`;

  // Composant Bubble avec Framer Motion
  const MotionBubble = ({ 
    children, 
    bubbleSize, 
    translateX, 
    translateY, 
    distance, 
    index 
  }: {
    children: ReactNode;
    bubbleSize: number;
    translateX: number;
    translateY: number;
    distance: number;
    index: number;
  }) => {
    // Cloner l'élément enfant avec les props si provideProps est activé
    let childElement = children;
    
    if (options.provideProps && React.isValidElement(children)) {
      childElement = React.cloneElement(children, {
        bubbleSize: bubbleSize * options.size!,
        distanceToCenter: distance,
        maxSize: options.size,
        minSize: options.minSize,
      });
    }

    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: bubbleSize,
          x: translateX,
          y: translateY,
          opacity: bubbleSize > 0.2 ? 1 : bubbleSize / 0.2
        }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: index * 0.02
        }}
        whileHover={{ 
          scale: Math.min(bubbleSize * 1.1, 1.2),
          transition: { duration: 0.2 }
        }}
        style={{
          width: options.size,
          height: options.size,
          marginRight: options.gutter! / 2,
          marginLeft: options.gutter! / 2,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {childElement}
      </motion.div>
    );
  };

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <motion.div
          ref={scrollableRef}
          onScroll={handleScroll}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            overflow: 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
          className="scrollable-hide-scrollbar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div style={{ height: verticalPadding }} />
          
          <motion.div
            style={{
              width: options.size! * options.numCols! + options.gutter! * (options.numCols! - 1),
              paddingLeft: horizontalPadding,
              paddingRight: horizontalPadding,
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AnimatePresence>
              {rows.map((row, i) => (
                <motion.div
                  key={i}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: i > 0 ? options.size! * -0.134 + options.gutter! * 0.866 : 0,
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.6,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                >
                  {row.map((comp, j) => {
                    const { bubbleSize, translateX, translateY, distance } = getBubbleProperties(i, j);
                    const bubbleIndex = i * options.numCols! + j;
                    
                    return (
                      <MotionBubble
                        key={`${i}-${j}`}
                        bubbleSize={bubbleSize}
                        translateX={translateX}
                        translateY={translateY}
                        distance={distance}
                        index={bubbleIndex}
                      >
                        {comp}
                      </MotionBubble>
                    );
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          <div style={{ height: verticalPadding }} />
        </motion.div>

        {/* Guides visuels avec animations */}
        <AnimatePresence>
          {options.showGuides && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  height: options.yRadius! * 2,
                  width: options.xRadius! * 2,
                  borderRadius: options.cornerRadius,
                  border: '2px solid rgba(70, 149, 44, 0.3)',
                  backgroundColor: 'rgba(70, 149, 44, 0.1)',
                }}
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  height: (options.yRadius! + options.fringeWidth!) * 2,
                  width: (options.xRadius! + options.fringeWidth!) * 2,
                  borderRadius: options.cornerRadius! + options.fringeWidth!,
                  border: '2px solid rgba(70, 149, 44, 0.2)',
                  backgroundColor: 'rgba(70, 149, 44, 0.05)',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .scrollable-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default BubbleUI;