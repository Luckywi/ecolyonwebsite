"use client";

import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { renderToString } from "react-dom/server";

interface Icon {
  x: number;
  y: number;
  z: number;
  scale: number;
  opacity: number;
  id: number;
}

interface IconCloudProps {
  icons?: React.ReactNode[];
  images?: string[];
  iconSize?: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function IconCloud({ icons, images, iconSize = 80 }: IconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [iconPositions, setIconPositions] = useState<Icon[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 300, y: 300 });
  const [targetRotation, setTargetRotation] = useState<{
    x: number;
    y: number;
    startX: number;
    startY: number;
    distance: number;
    startTime: number;
    duration: number;
  } | null>(null);
  
  // Refs pour les optimisations
  const rotationRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const iconCanvasesRef = useRef<HTMLCanvasElement[]>([]);
  const imagesLoadedRef = useRef<boolean[]>([]);
  const lastUpdateTimeRef = useRef(0);
  const isLoadingRef = useRef(false);

  // Mémoiser la liste des items
  const items = useMemo(() => icons || images || [], [icons, images]);

  // Générer les positions initiales sur une sphère
  const initialPositions = useMemo(() => {
    const newIcons: Icon[] = [];
    const numIcons = items.length || 20;
    const offset = 2 / numIcons;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numIcons; i++) {
      const y = i * offset - 1 + offset / 2;
      const r = Math.sqrt(1 - y * y);
      const phi = i * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      newIcons.push({
        x: x * 200,
        y: y * 200,
        z: z * 200,
        scale: 1,
        opacity: 1,
        id: i,
      });
    }
    return newIcons;
  }, [items.length]);

  // Initialiser les positions
  useEffect(() => {
    setIconPositions(initialPositions);
  }, [initialPositions]);

  // Créer les canvas pour chaque icône/image
  useEffect(() => {
    if (!items.length || isLoadingRef.current) return;
    
    isLoadingRef.current = true;
    imagesLoadedRef.current = new Array(items.length).fill(false);

    const newIconCanvases = items.map((item, index) => {
      const offscreen = document.createElement("canvas");
      offscreen.width = iconSize;
      offscreen.height = iconSize;
      const offCtx = offscreen.getContext("2d");

      if (offCtx) {
        // Améliorer la qualité de rendu
        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = 'high';
        
        if (images) {
          // Gestion des images
          const img = new Image();
          img.crossOrigin = "anonymous";
          
          img.onload = () => {
            if (!imagesLoadedRef.current[index]) {
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height);

              // Calculer les proportions pour centrer l'image
              const imgAspect = img.width / img.height;
              const canvasAspect = iconSize / iconSize;

              let drawWidth = iconSize;
              let drawHeight = iconSize;
              let offsetX = 0;
              let offsetY = 0;

              if (imgAspect > canvasAspect) {
                drawWidth = iconSize;
                drawHeight = iconSize / imgAspect;
                offsetY = (iconSize - drawHeight) / 2;
              } else {
                drawHeight = iconSize;
                drawWidth = iconSize * imgAspect;
                offsetX = (iconSize - drawWidth) / 2;
              }

              offCtx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
              imagesLoadedRef.current[index] = true;
            }
          };

          img.onerror = () => {
            console.warn(`Failed to load image: ${items[index]}`);
            // Créer une icône de fallback
            offCtx.fillStyle = "#ddd";
            offCtx.fillRect(0, 0, iconSize, iconSize);
            offCtx.fillStyle = "#999";
            offCtx.textAlign = "center";
            offCtx.textBaseline = "middle";
            offCtx.font = "12px Arial";
            offCtx.fillText("?", iconSize / 2, iconSize / 2);
            imagesLoadedRef.current[index] = true;
          };

          img.src = items[index] as string;
        } else {
          // Gestion des icônes SVG
          try {
            offCtx.scale(iconSize / 100, iconSize / 100);
            const svgString = renderToString(item as React.ReactElement);
            const img = new Image();
            img.src = "data:image/svg+xml;base64," + btoa(svgString);
            
            img.onload = () => {
              offCtx.clearRect(0, 0, offscreen.width, offscreen.height);
              offCtx.drawImage(img, 0, 0);
              imagesLoadedRef.current[index] = true;
            };
            
            img.onerror = () => {
              imagesLoadedRef.current[index] = true;
            };
          } catch (error) {
            console.warn("Failed to render SVG icon:", error);
            imagesLoadedRef.current[index] = true;
          }
        }
      }
      return offscreen;
    });

    iconCanvasesRef.current = newIconCanvases;
    isLoadingRef.current = false;

    // Cleanup
    return () => {
      newIconCanvases.forEach(canvas => {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      });
    };
  }, [items, images, iconSize]);

  // Gestionnaire de clic sur une icône
  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Rechercher l'icône cliquée
    for (const icon of iconPositions) {
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const rotatedX = icon.x * cosY - icon.z * sinY;
      const rotatedZ = icon.x * sinY + icon.z * cosY;
      const rotatedY = icon.y * cosX + rotatedZ * sinX;

      const screenX = canvasRef.current.width / 2 + rotatedX;
      const screenY = canvasRef.current.height / 2 + rotatedY;

      const scale = (rotatedZ + 400) / 600;
      const radius = (iconSize / 2) * scale;
      const dx = x - screenX;
      const dy = y - screenY;

      if (dx * dx + dy * dy < radius * radius) {
        // Calculer la rotation cible pour centrer cette icône
        const targetX = -Math.atan2(
          icon.y,
          Math.sqrt(icon.x * icon.x + icon.z * icon.z),
        );
        const targetY = Math.atan2(icon.x, icon.z);

        const currentX = rotationRef.current.x;
        const currentY = rotationRef.current.y;
        const distance = Math.sqrt(
          Math.pow(targetX - currentX, 2) + Math.pow(targetY - currentY, 2),
        );

        const duration = Math.min(2000, Math.max(800, distance * 1000));

        setTargetRotation({
          x: targetX,
          y: targetY,
          startX: currentX,
          startY: currentY,
          distance,
          startTime: performance.now(),
          duration,
        });
        return;
      }
    }

    // Commencer le drag
    setIsDragging(true);
    setLastMousePos({ x: e.clientX, y: e.clientY });
  }, [iconPositions, iconSize]);

  // Gestionnaire de mouvement de souris
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePos({ x, y });
    }

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.x;
      const deltaY = e.clientY - lastMousePos.y;

      rotationRef.current = {
        x: rotationRef.current.x + deltaY * 0.002,
        y: rotationRef.current.y + deltaX * 0.002,
      };

      setLastMousePos({ x: e.clientX, y: e.clientY });
    }
  }, [isDragging, lastMousePos]);

  // Gestionnaire de fin de drag
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Boucle d'animation principale
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !iconPositions.length) return;

    // Améliorer la qualité de rendu du canvas principal
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const animate = (currentTime: number) => {
      // Throttling pour limiter à 60fps
      if (currentTime - lastUpdateTimeRef.current < 16.67) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTimeRef.current = currentTime;

      // Effacer le canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const dx = mousePos.x - centerX;
      const dy = mousePos.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.003 + (distance / maxDistance) * 0.01;

      // Gestion de l'animation vers une cible
      if (targetRotation) {
        const elapsed = currentTime - targetRotation.startTime;
        const progress = Math.min(1, elapsed / targetRotation.duration);
        const easedProgress = easeOutCubic(progress);

        rotationRef.current = {
          x: targetRotation.startX + (targetRotation.x - targetRotation.startX) * easedProgress,
          y: targetRotation.startY + (targetRotation.y - targetRotation.startY) * easedProgress,
        };

        if (progress >= 1) {
          setTargetRotation(null);
        }
      } else if (!isDragging) {
        // Rotation automatique basée sur la position de la souris
        rotationRef.current = {
          x: rotationRef.current.x + (dy / canvas.height) * speed,
          y: rotationRef.current.y + (dx / canvas.width) * speed,
        };
      }

      // Précalculer les valeurs trigonométriques
      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      // Dessiner chaque icône
      iconPositions.forEach((icon, index) => {
        // Calcul de la rotation 3D
        const rotatedX = icon.x * cosY - icon.z * sinY;
        const rotatedZ = icon.x * sinY + icon.z * cosY;
        const rotatedY = icon.y * cosX + rotatedZ * sinX;

        // Calcul de l'échelle et de l'opacité basées sur la profondeur
        const scale = (rotatedZ + 400) / 600;
        const opacity = Math.max(0.2, Math.min(1, (rotatedZ + 300) / 400));

        ctx.save();
        ctx.translate(centerX + rotatedX, centerY + rotatedY);
        ctx.scale(scale, scale);
        ctx.globalAlpha = opacity;

        // Dessiner l'icône ou l'image si elle est chargée
        if (items.length > 0) {
          if (iconCanvasesRef.current[index] && imagesLoadedRef.current[index]) {
            ctx.drawImage(
              iconCanvasesRef.current[index], 
              -(iconSize/2), 
              -(iconSize/2), 
              iconSize, 
              iconSize
            );
          }
        } else {
          // Fallback - cercles numérotés
          ctx.beginPath();
          ctx.arc(0, 0, iconSize/2, 0, Math.PI * 2);
          ctx.fillStyle = "#4444ff";
          ctx.fill();
          ctx.fillStyle = "white";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "16px Arial";
          ctx.fillText(`${icon.id + 1}`, 0, 0);
        }

        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [iconPositions, isDragging, mousePos, targetRotation, iconSize, items]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={600}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="rounded-lg cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Icon Cloud"
      role="img"
    />
  );
}