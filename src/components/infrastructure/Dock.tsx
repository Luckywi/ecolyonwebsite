// components/ui/Dock.tsx
"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

export interface DockItem {
  id: string;
  icon: string;
  label: string;
  href: string;
}

interface DockProps {
  items?: DockItem[];
  excludeId?: string; // ID de l'infrastructure à exclure (page courante)
  className?: string;
  isHomePage?: boolean; // Nouveau prop pour identifier la page d'accueil
}

interface DockItemProps {
  item: DockItem;
  mouseX: number;
  index: number;
}

const DockItem = ({ item, mouseX }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const distance = useRef(0);
  const widthSync = useRef(60);
  const heightSync = useRef(60);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== 'undefined' && window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const itemCenterX = rect.left + rect.width / 2;
    const distanceFromMouse = Math.abs(mouseX - itemCenterX);
    
    distance.current = distanceFromMouse;

    if (isMobile) {
      // Mobile: taille fixe, pas d'interaction souris
      widthSync.current = 50;
      heightSync.current = 50;
    } else {
      // Desktop: original mouse interaction
      const maxDistance = 150;
      const maxScale = 80;
      const minScale = 60;
      
      if (distanceFromMouse < maxDistance) {
        const scale = maxScale - (distanceFromMouse / maxDistance) * (maxScale - minScale);
        widthSync.current = scale;
        heightSync.current = scale;
      } else {
        widthSync.current = minScale;
        heightSync.current = minScale;
      }
    }
  }, [mouseX, isMobile]);

  // Version mobile : div simple sans animations
  if (isMobile) {
    return (
      <Link href={item.href}>
        <div 
          className="flex flex-col items-center justify-end cursor-pointer"
          style={{ width: 50, height: 50 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={item.icon}
              alt={item.label}
              fill
              className="object-contain"
              sizes="50px"
            />
          </div>
        </div>
      </Link>
    );
  }

  // Version desktop : avec toutes les animations
  return (
    <Link href={item.href}>
      <motion.div
        ref={ref}
        className="flex flex-col items-center justify-end cursor-pointer relative group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          width: widthSync.current,
          height: widthSync.current,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Tooltip */}
        <motion.div
          className="absolute -top-12 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            y: hovered ? 0 : 10 
          }}
          transition={{ duration: 0.2 }}
        >
          {item.label}
        </motion.div>

        {/* Icône */}
        <motion.div
          className="relative w-full h-full"
          whileHover={{ 
            scale: 1.05
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25 
          }}
        >
          <Image
            src={item.icon}
            alt={item.label}
            fill
            className="object-contain"
            sizes="80px"
          />
        </motion.div>

        {/* Indicateur de selection (point en dessous) */}
        <motion.div
          className="absolute -bottom-2 w-1 h-1 rounded-full"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: hovered ? 1 : 0, 
            scale: hovered ? 1 : 0 
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Link>
  );
};

export default function Dock({ items, excludeId, className = "", isHomePage = false }: DockProps) {
  const [mouseX, setMouseX] = useState(0);
  const dockRef = useRef<HTMLDivElement>(null);

  // Configuration complète des infrastructures
  const allInfrastructureItems: DockItem[] = [
    {
      id: 'poubelles',
      icon: '/logos/poubelle.png',
      label: 'Poubelles publiques',
      href: '/infrastructure/poubelles'
    },
    {
      id: 'toilettes',
      icon: '/logos/wc.png',
      label: 'Toilettes publiques',
      href: '/infrastructure/toilettes'
    },
    {
      id: 'fontaines',
      icon: '/logos/Fontaine.png',
      label: 'Fontaines',
      href: '/infrastructure/fontaines'
    },
    {
      id: 'parcs',
      icon: '/logos/PetJ.png',
      label: 'Parcs et jardins',
      href: '/infrastructure/parcs'
    },
    {
      id: 'stations',
      icon: '/logos/borne.png',
      label: 'Stations de recharges',
      href: '/infrastructure/stations'
    },
    {
      id: 'compost',
      icon: '/logos/compost.png',
      label: 'Bornes à compost',
      href: '/infrastructure/compost'
    },
    {
      id: 'bancs',
      icon: '/logos/banc.png',
      label: 'Bancs publics',
      href: '/infrastructure/bancs'
    },
    {
      id: 'silos',
      icon: '/logos/SIlos.png',
      label: 'Silos à verre',
      href: '/infrastructure/silos'
    },
    {
      id: 'randonnee',
      icon: '/logos/Rando.png',
      label: 'Randonnées',
      href: '/infrastructure/randonnees'
    }
  ];

  // Filtrer les items selon excludeId et limiter selon le contexte
  const maxItems = isHomePage ? 8 : 8; // 8 pour la page d'accueil, 8 pour les autres
  const displayItems = items || allInfrastructureItems
    .filter(item => item.id !== excludeId)
    .slice(0, maxItems);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dockRef.current) {
      setMouseX(e.clientX);
    }
  };

  const handleMouseLeave = () => {
    setMouseX(0);
  };

  return (
    <motion.div
      ref={dockRef}
      className={`flex items-end justify-center gap-2 lg:gap-4 p-3 lg:p-4 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Version mobile - grille adaptative */}
      <div className={`lg:hidden grid gap-3 justify-items-center mx-auto ${
        isHomePage 
          ? 'grid-cols-4 max-w-sm' // Page d'accueil: 4 colonnes (2x4)
          : 'grid-cols-3 max-w-xs'  // Autres pages: 3 colonnes
      }`}>
        {displayItems.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={0} // Pas d'interaction souris sur mobile
            index={index}
          />
        ))}
      </div>

      {/* Version desktop - dock horizontal */}
      <div className="hidden lg:flex items-end justify-center gap-4">
        {displayItems.map((item, index) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={mouseX}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
}