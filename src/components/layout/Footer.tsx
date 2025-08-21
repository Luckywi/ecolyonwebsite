// src/components/layout/Footer.tsx
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section FAQ */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* FAQ Item 1 */}
            <div className="group cursor-pointer">
              <div className="flex items-center justify-between py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
                <span className="text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-4">
                  La métropole de Lyon vous offre un composteur !
                </span>
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/arrowright.svg"
                    alt="Voir plus"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className="group cursor-pointer">
              <div className="flex items-center justify-between py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
                <span className="text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-4">
                  Le compost à Lyon comment ça marche ?
                </span>
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/arrowright.svg"
                    alt="Voir plus"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className="group cursor-pointer">
              <div className="flex items-center justify-between py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
                <span className="text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-4">
                  Comment obtenir un bio-seau ?
                </span>
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/arrowright.svg"
                    alt="Voir plus"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className="group cursor-pointer">
              <div className="flex items-center justify-between py-6 border-b border-gray-200 group-hover:border-ecolyon-green transition-colors">
                <span className="text-lg font-light text-gray-900 group-hover:text-ecolyon-green transition-colors pr-4">
                  Le guide du compost.
                </span>
                <div className="flex-shrink-0">
                  <Image
                    src="/icons/arrowright.svg"
                    alt="Voir plus"
                    width={24}
                    height={24}
                    className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section principale : Informations et App */}
        <div className="py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Partie gauche : Informations et partenaires */}
            <div className="space-y-12">
              {/* Texte principal */}
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">
                  Soutiens et sources des données
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    EcoLyon est un projet soutenu par la Ville de Lyon dans le cadre de la Bourse jeunes Lyon 2030.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed mb-4">
                    L&apos;application utilise des données ouvertes disponibles publiquement. Toutes les données relatives aux infrastructures publiques sont fournies grâce aux différentes API publiques du site <span className="font-medium">data.grandlyon.com</span>.
                  </p>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Les données sur la qualité de l&apos;air sont fournies par <span className="font-medium">ATMO Auvergne-Rhône-Alpes</span>, organisme agréé pour la surveillance de la qualité de l&apos;air.
                  </p>
                </div>
              </div>

              {/* Logos partenaires */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-items-start">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/icons/lyon2030.svg"
                      alt="Lyon 2030"
                      width={100}
                      height={60}
                      className="h-12 w-auto hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Image
                      src="/icons/atmo.svg"
                      alt="ATMO Auvergne-Rhône-Alpes"
                      width={120}
                      height={60}
                      className="h-12 w-auto hover:scale-105 transition-transform"
                    />
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Image
                      src="/icons/data.svg"
                      alt="Data Grand Lyon"
                      width={140}
                      height={60}
                      className="h-12 w-auto hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Partie droite : Application mobile */}
            <div className="flex items-center justify-center gap-8">
              <div className="relative">
                {/* iPhone mockup */}
                <div className="relative z-10">
                  <Image
                    src="/icons/mockup.svg"
                    alt="Application EcoLyon sur iPhone"
                    width={180}
                    height={360}
                    className="w-45 h-auto drop-shadow-2xl"
                  />
                </div>
                
                {/* Effet de fond décoratif */}
                <div className="absolute -inset-3 bg-gradient-to-r from-ecolyon-green/20 to-blue-500/20 rounded-2xl blur-lg opacity-30 -z-10"></div>
              </div>
              
              {/* Boutons et logo à droite du mockup */}
              <div className="flex flex-col items-center space-y-6">
                {/* Logo EcoLyon */}
                <div className="relative">
                  <Image
                    src="/icons/appicon.svg"
                    alt="Logo EcoLyon"
                    width={80}
                    height={80}
                    className="w-20 h-20 drop-shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  />
                </div>
                
                {/* App Store Button */}
                <Link href="#" className="group">
                  <Image
                    src="/icons/appstore.svg"
                    alt="Télécharger sur l'App Store"
                    width={160}
                    height={48}
                    className="h-14 w-auto group-hover:scale-105 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Section navigation et réseaux sociaux */}
        <div className="border-t border-gray-200 py-12">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
            
            {/* Navigation principale */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-grow max-w-2xl">
              {/* Colonne 1 */}
              <div className="space-y-3">
                <Link href="/qualite-air" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Qualité de l&apos;air
                </Link>
                <Link href="/infrastructure" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Infrastructure
                </Link>
                <Link href="/compost" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Compost
                </Link>
              </div>

              {/* Colonne 2 */}
              <div className="space-y-3">
                <Link href="/air-atmo" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Air ATMO
                </Link>
                <Link href="/data-grandlyon" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Data Grand Lyon
                </Link>
                <Link href="/lyon2030" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Lyon 2030
                </Link>
              </div>

              {/* Colonne 3 */}
              <div className="space-y-3">
                <Link href="/contact" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Contact
                </Link>
                <Link href="/mentions-legales" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Mentions légales
                </Link>
                <Link href="/politique-confidentialite" className="block text-sm text-gray-600 hover:text-ecolyon-green transition-colors">
                  Confidentialité
                </Link>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="flex items-center space-x-4">
              <Link href="#" className="group">
                <Image
                  src="/icons/tiktok.svg"
                  alt="TikTok"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </Link>
              
              <Link href="#" className="group">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </Link>
              
              <Link href="#" className="group">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={20}
                  height={20}
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-8">
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