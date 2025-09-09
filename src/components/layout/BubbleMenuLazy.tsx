// src/components/layout/BubbleMenuLazy.tsx
import dynamic from 'next/dynamic';

// Placeholder simple pendant le chargement du menu bubble avec GSAP
const BubbleMenuLoader = () => {
  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Bouton menu simple pendant le chargement */}
      <button
        className="relative w-12 h-12 rounded-full shadow-lg border-2 transition-colors duration-200 bg-[#46952C] border-[#46952C] text-white"
        disabled
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin opacity-50" />
        </div>
      </button>
    </div>
  );
};

// Lazy load du menu bubble avec GSAP
const BubbleMenu = dynamic(() => import('./BubbleMenu'), {
  loading: () => <BubbleMenuLoader />,
  ssr: false // GSAP nécessite le DOM pour les animations
});

export default BubbleMenu;