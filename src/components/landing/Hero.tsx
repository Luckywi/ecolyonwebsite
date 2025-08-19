import Image from 'next/image';
import { ShinyButton } from '@/components/magicui/shiny-button';
import Air from '@/components/landing/Air';

export default function Hero() {
  return (
    <>
      <section className="min-h-[calc(75vh-34px)] bg-[#F8F7F4] flex items-center px-4 sm:px-6 lg:px-8 py-8">
        {/* Container principal */}
        <div className="max-w-7xl mx-auto flex items-center w-full gap-8 lg:gap-16">
          
          {/* Image du lion - Côté GAUCHE - 40% */}
          <div className="w-[40%] flex justify-start items-center">
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <Image
                src="/icons/LYON.png"
                alt="Lyon - Le lion vert symbole de la ville connectée"
                width={480}
                height={480}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Contenu textuel - Côté DROIT - 60% */}
          <div className="w-[60%] max-w-none text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-[2.5] mb-8 lg:mb-12">
              Lyon connectée à son<br />
              environnement !
            </h1>
            
            {/* Bouton de téléchargement avec ShinyButton */}
            <div className="mt-8 lg:mt-12 flex justify-center">
              <ShinyButton 
                className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl border-ecolyon-green"
                style={{ 
                  '--primary': '#46952C',
                  backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
                } as React.CSSProperties}
              >
                <div className="flex items-center gap-3">
                  {/* Icône Apple */}
                  <svg 
                    className="w-4 h-4 sm:w-5 sm:h-5" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Télécharger sur l&apos;App Store
                </div>
              </ShinyButton>
            </div>
          </div>
        </div>
      </section>

      {/* Section Qualité de l'Air */}
      <Air />
    </>
  );
}