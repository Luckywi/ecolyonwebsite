// src/components/layout/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
      {/* Section FAQ */}
<div className="py-8 lg:py-16">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8 max-w-5xl mx-auto">
    {/* FAQ Item 1 */}
    <Link href="compost/composteur-gratuit" className="group">
      <div className="flex items-center justify-between py-4 lg:py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
        <span className="text-sm lg:text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-3 lg:pr-4">
          La métropole de Lyon vous offre un composteur !
        </span>
        <div className="flex-shrink-0">
          <Image
            src="/icons/arrowright.svg"
            alt="Voir plus"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform"
            loading="lazy"
          />
        </div>
      </div>
    </Link>

    {/* FAQ Item 2 */}
    <Link href="/compost" className="group">
      <div className="flex items-center justify-between py-4 lg:py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
        <span className="text-sm lg:text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-3 lg:pr-4">
          Le compost à Lyon comment ça marche ?
        </span>
        <div className="flex-shrink-0">
          <Image
            src="/icons/arrowright.svg"
            alt="Voir plus"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform"
            loading="lazy"
          />
        </div>
      </div>
    </Link>

    {/* FAQ Item 3 */}
    <Link href="/compost" className="group">
      <div className="flex items-center justify-between py-4 lg:py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
        <span className="text-sm lg:text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-3 lg:pr-4">
          Comment obtenir un bio-seau ?
        </span>
        <div className="flex-shrink-0">
          <Image
            src="/icons/arrowright.svg"
            alt="Voir plus"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform"
            loading="lazy"
          />
        </div>
      </div>
    </Link>

    {/* FAQ Item 4 */}
    <Link href="/compost/guide" className="group">
      <div className="flex items-center justify-between py-4 lg:py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
        <span className="text-sm lg:text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-3 lg:pr-4">
          Le guide du compost.
        </span>
        <div className="flex-shrink-0">
          <Image
            src="/icons/arrowright.svg"
            alt="Voir plus"
            width={20}
            height={20}
            className="w-4 h-4 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  </div>
</div>

        {/* Section principale : Informations et App */}
        <div className="py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Partie gauche : Informations et partenaires */}
            <div className="space-y-8 lg:space-y-12">
              {/* Texte principal */}
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 lg:mb-6">
                  Soutiens et sources des données
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-3 lg:mb-4">
                    EcoLyon est un projet soutenu par la Ville de Lyon dans le cadre de la Bourse jeunes Lyon 2030.
                  </p>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-3 lg:mb-4">
                    L&apos;application utilise des données ouvertes disponibles publiquement. Toutes les données relatives aux infrastructures publiques sont fournies grâce aux différentes API publiques du site <span className="font-medium">data.grandlyon.com</span>.
                  </p>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Les données sur la qualité de l&apos;air sont fournies par <span className="font-medium">ATMO Auvergne-Rhône-Alpes</span>, organisme agréé pour la surveillance de la qualité de l&apos;air.
                  </p>
                </div>
              </div>

              {/* Logos partenaires */}
<div>
  <div className="grid grid-cols-3 gap-4 lg:gap-8 justify-items-center lg:justify-items-start">
    <div className="flex items-center justify-center">
      <a 
        href="https://www.lyon.fr/actualite/developpement-durable/lyon-2030-1-jeune-pour-le-climat-dans-ma-structure"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label="Visiter le site Lyon 2030"
      >
        <Image
          src="/icons/lyon2030.svg"
          alt="Lyon 2030"
          width={80}
          height={48}
          className="h-8 lg:h-12 w-auto hover:scale-105 transition-transform"
          loading="lazy"
        />
      </a>
    </div>
    
    <div className="flex items-center justify-center">
      <a 
        href="https://www.atmo-auvergnerhonealpes.fr/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label="Visiter le site ATMO Auvergne-Rhône-Alpes"
      >
        <Image
          src="/icons/atmo.svg"
          alt="ATMO Auvergne-Rhône-Alpes"
          width={96}
          height={48}
          className="h-8 lg:h-12 w-auto hover:scale-105 transition-transform"
          loading="lazy"
        />
      </a>
    </div>
    
    <div className="flex items-center justify-center">
      <a 
        href="https://data.grandlyon.com"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
        aria-label="Visiter le site Data Grand Lyon"
      >
        <Image
          src="/icons/data.svg"
          alt="Data Grand Lyon"
          width={112}
          height={48}
          className="h-8 lg:h-12 w-auto hover:scale-105 transition-transform"
          loading="lazy"
        />
      </a>
    </div>
  </div>
</div>
            </div>

            {/* Partie droite : Application mobile - visible uniquement sur desktop */}
            <div className="hidden lg:flex items-center justify-center gap-4 lg:gap-8">
              <div className="relative">
                {/* iPhone mockup */}
                <div className="relative z-10">
                  <Image
                    src="/icons/mockup.svg"
                    alt="Application EcoLyon sur iPhone"
                    width={140}
                    height={280}
                    className="w-32 lg:w-45 h-auto drop-shadow-2xl"
                    loading="lazy"
                  />
                </div>
                
                {/* Effet de fond décoratif */}
                <div className="absolute -inset-2 lg:-inset-3 bg-gradient-to-r from-ecolyon-green/20 to-blue-500/20 rounded-2xl blur-lg opacity-30 -z-10"></div>
              </div>
              
              {/* Boutons et logo à droite du mockup */}
              <div className="flex flex-col items-center space-y-4 lg:space-y-6">
                {/* Logo EcoLyon */}
                <div className="relative">
                  <Image
                    src="/icons/appicon.svg"
                    alt="Logo EcoLyon"
                    width={64}
                    height={64}
                    className="w-16 lg:w-20 h-16 lg:h-20 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer"
                    loading="lazy"
                  />
                </div>
                
             {/* App Store Button */}
<a 
  href="https://apps.apple.com/fr/app/ecolyon-air-ville/id6747041717"
  target="_blank"
  rel="noopener noreferrer"
  className="group inline-block"
  aria-label="Télécharger EcoLyon Air Ville sur l'App Store"
>
  <Image
    src="/icons/appstore.svg"
    alt="Télécharger sur l'App Store"
    width={128}
    height={38}
    className="h-10 lg:h-14 w-auto group-hover:scale-105 transition-transform"
    loading="lazy"
  />
</a>
              </div>
            </div>
          </div>
        </div>

        {/* Section navigation et réseaux sociaux */}
        <div className="border-t border-gray-200 py-8 lg:py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12">
            
            {/* Navigation principale */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 justify-items-center lg:justify-items-start max-w-2xl mx-auto lg:mx-0 flex-grow">
              {/* Colonne 1 */}
              <div className="space-y-2 lg:space-y-3 text-center lg:text-left">
                <Link href="/qualite-air" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Qualité de l&apos;air
                </Link>
                <Link href="/infrastructure" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Infrastructure
                </Link>
                <Link href="/compost" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Compost
                </Link>
              </div>

            {/* Colonne 2 */}
<div className="space-y-2 lg:space-y-3 text-center lg:text-left">
  <a 
    href="https://www.atmo-auvergnerhonealpes.fr/" 
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors"
  >
    Air ATMO
  </a>
  <a 
    href="https://data.grandlyon.com" 
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors"
  >
    Data Grand Lyon
  </a>
  <a 
    href="https://www.lyon.fr/actualite/developpement-durable/lyon-2030-1-jeune-pour-le-climat-dans-ma-structure" 
    target="_blank"
    rel="noopener noreferrer"
    className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors"
  >
    Lyon 2030
  </a>
</div>
              {/* Colonne 3 */}
              <div className="space-y-2 lg:space-y-3 text-center lg:text-left">
                <Link href="/contact" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Contact
                </Link>
                <Link href="/mentions-legales" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Mentions légales
                </Link>
                <Link href="/confidentialite" className="block text-xs lg:text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Confidentialité
                </Link>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 lg:space-x-4 w-full lg:w-auto">
              <Link href="#" className="group">
                <Image
                  src="/icons/tiktok.svg"
                  alt="TikTok"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </Link>
              
              <Link href="#" className="group">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </Link>
              
              <Link href="#" className="group">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  loading="lazy"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-6 lg:py-8">
          <div className="text-center">
            <p className="text-sm text-gray-500">
              ©2025 EcoLyon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;