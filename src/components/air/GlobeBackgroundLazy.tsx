// src/components/air/GlobeBackgroundLazy.tsx
import dynamic from 'next/dynamic';

// Placeholder simple pendant le chargement du globe
const GlobeBackgroundLoader = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-10">
      <div className="h-full w-full bg-gradient-radial from-transparent via-gray-100 to-gray-200 animate-pulse" />
    </div>
  );
};

// Lazy load du globe de fond avec cobe
const GlobeBackground = dynamic(() => import('./GlobeBackground'), {
  loading: () => <GlobeBackgroundLoader />,
  ssr: false // Globe nécessite canvas/DOM
});

export default GlobeBackground;