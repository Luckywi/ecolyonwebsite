// src/components/ui/SkeletonLoader.tsx
"use client";

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'rectangle' | 'circle' | 'globe';
}

export default function SkeletonLoader({ 
  className = '', 
  variant = 'rectangle' 
}: SkeletonLoaderProps) {
  const baseClasses = 'bg-gray-200 animate-pulse';
  
  const variantClasses = {
    text: 'h-4 rounded',
    rectangle: 'rounded-lg',
    circle: 'rounded-full',
    globe: 'aspect-square rounded-full'
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      role="status"
      aria-label="Chargement du contenu"
    />
  );
}

// Composant spécialisé pour le globe
export function GlobeSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative mx-auto aspect-square w-full max-w-[100px] lg:max-w-[400px]">
        <SkeletonLoader variant="globe" className="w-full h-full" />
        
        {/* Overlay avec squelette d'informations */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="backdrop-blur-sm rounded-md lg:rounded-xl p-1.5 lg:p-4 border border-gray-200 max-w-[80px] lg:max-w-none">
            <div className="flex items-center justify-center gap-1 lg:gap-3 mb-0.5 lg:mb-2">
              <SkeletonLoader variant="circle" className="w-1.5 h-1.5 lg:w-4 lg:h-4" />
              <SkeletonLoader variant="text" className="w-8 lg:w-16" />
            </div>
            <SkeletonLoader variant="text" className="w-12 lg:w-24 mb-0.5 lg:mb-1" />
            <SkeletonLoader variant="text" className="w-8 lg:w-16" />
          </div>
        </div>
      </div>

      {/* Légende skeleton */}
      <div className="mt-2 lg:mt-6 text-center">
        <SkeletonLoader variant="text" className="w-32 lg:w-64 mx-auto mb-1.5 lg:mb-3" />
        
        <div className="flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-2">
          <SkeletonLoader variant="text" className="w-16 lg:w-20" />
          <div className="flex gap-0.5 lg:gap-1">
            {[...Array(6)].map((_, i) => (
              <SkeletonLoader 
                key={i} 
                variant="circle" 
                className="w-1.5 h-1.5 lg:w-3 lg:h-3" 
              />
            ))}
          </div>
          <SkeletonLoader variant="text" className="w-8 lg:w-12" />
        </div>
      </div>
    </div>
  );
}

// Composant spécialisé pour IconCloud
export function IconCloudSkeleton({ 
  canvasSize = 600, 
  className = '' 
}: { 
  canvasSize?: number; 
  className?: string; 
}) {
  return (
    <div 
      className={`rounded-lg bg-gray-100 animate-pulse ${className}`}
      style={{ width: canvasSize, height: canvasSize }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="text-gray-400 text-center">
          <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2 animate-pulse" />
          <div className="w-24 h-3 bg-gray-300 rounded mx-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}