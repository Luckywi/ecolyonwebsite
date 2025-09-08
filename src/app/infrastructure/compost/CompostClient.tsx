// src/app/infrastructure/compost/CompostClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';
import StepCarousel, { Step } from '@/components/infrastructure/StepCarousel';
import Dock from '@/components/infrastructure/Dock';

interface WFSResponse {
 type: string;
 features: Array<{
   type: string;
 }>;
 totalFeatures?: number;
 numberMatched?: number;
 numberReturned?: number;
}

export default function CompostClient() {
 const [compostCount, setCompostCount] = useState(0);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 const compostSteps: Step[] = [
   {
     id: 1,
     title: "Ouvrez l'app EcoLyon",
     image: "/images/Home.PNG",
     description: "Lancez l'application EcoLyon sur votre téléphone"
   },
   {
     id: 2,
     title: "Accédez au menu",
     image: "/images/Menu.PNG",
     description: "Appuyez sur le menu pour voir toutes les fonctionnalités"
   },
   {
     id: 3,
     title: "Trouvez la borne à compost la plus proche",
     image: "/images/Compost/Compost.png",
     description: "Localisez toutes les bornes à compost collectif autour de vous"
   },
   {
     id: 4,
     title: "Lancez la navigation",
     image: "/images/Compost/StartNav.png",
     description: "Cliquez sur la borne choisie pour lancer la navigation"
   },
   {
     id: 5,
     title: "Démarrez la navigation",
     image: "/images/Compost/Nav.png",
     description: "Lancez le GPS pour vous rendre à la borne à compost sélectionnée"
   }
 ];

 useEffect(() => {
   const fetchCompostCount = async () => {
     try {
       setLoading(true);
       
       const response = await fetch(
         'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:gic_collecte.bornecompost&outputFormat=application/json&SRSNAME=EPSG:4171&count=1'
       );
       
       if (!response.ok) {
         throw new Error('Erreur lors de la récupération des données');
       }
       
       const data: WFSResponse = await response.json();
       const count = data.totalFeatures || data.numberMatched || data.features?.length || 0;
       
       setCompostCount(count);
     } catch (err) {
       console.error('Erreur:', err);
       setError('Impossible de récupérer le nombre de bornes à compost');
     } finally {
       setLoading(false);
     }
   };

   fetchCompostCount();
 }, []);

 return (
   <div className="min-h-screen bg-[#F8F7F4] py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8">
     <div className="max-w-4xl mx-auto">
       
       <motion.div 
         className="mb-6 sm:mb-8"
         initial={{ opacity: 0, x: -20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ duration: 0.5 }}
       >
         <Link
           href="/infrastructure"
           className="inline-flex items-center gap-2 text-black hover:text-ecolyon-green transition-colors group"
         >
           <Image
             src="/icons/arrowright.svg"
             alt="Flèche retour"
             width={20}
             height={20}
             className="w-4 h-4 sm:w-5 sm:h-5 rotate-180 back-link-arrow"
           />
           <span className="font-medium text-sm sm:text-base">Retour aux infrastructures</span>
         </Link>
       </motion.div>

       <motion.div 
         className="flex justify-center mb-6 sm:mb-8"
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6 }}
       >
         <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 relative">
           <Image
             src="/logos/compost.png"
             alt="Bornes à compost collectif"
             fill
             className="object-contain"
             sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 128px"
           />
         </div>
       </motion.div>

       <motion.div 
         className="text-center mb-8 sm:mb-10 md:mb-12"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2 }}
       >
         {loading ? (
           <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-black px-2">
             Chargement du nombre de bornes à compost...
           </h1>
         ) : error ? (
           <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-red-500 px-2">
             {error}
           </h1>
         ) : (
           <>
             <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-black px-2">
               Bornes à compost :{' '}
               <span 
                 className="font-medium"
                 style={{ color: '#46952C' }}
               >
                 {compostCount.toLocaleString()}
               </span>
               {' '}dans le Grand Lyon
             </h1>
             
             <motion.p 
               className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mt-6 sm:mt-8 max-w-3xl mx-auto px-2"
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
               Trognon de pomme après le déjeuner, épluchures de mandarine au parc ? 
               Vous connaissez sûrement le composteur de votre quartier, mais que faire quand vous êtes ailleurs dans la métropole ? 
               Ces déchets organiques méritent mieux que la première poubelle grise ! Ouvrez l&apos;app EcoLyon et géolocalisez 
               la borne à compost la plus proche pour donner une seconde vie à vos biodéchets.
               <span className="font-medium text-ecolyon-green block mt-2 sm:inline sm:mt-0 sm:ml-1">
                 <span className="hidden sm:inline"><br /></span>
                 Le compostage, c&apos;est aussi possible en dehors de chez soi !
               </span>
             </motion.p>
           </>
         )}
       </motion.div>

       {!loading && !error && (
         <motion.div 
           className="mb-12 sm:mb-14 md:mb-16"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
         >
           <StepCarousel steps={compostSteps} />
           
           <div className="flex justify-center mt-8 sm:mt-10 md:mt-12 mb-10 sm:mb-12 md:mb-16">
            <a 
  href="https://apps.apple.com/fr/app/ecolyon-air-ville/id6747041717"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block"
  aria-label="Télécharger EcoLyon Air Ville sur l'App Store"
>
             <ShinyButton 
               className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-medium text-sm sm:text-base shadow-lg hover:shadow-xl border-ecolyon-green w-full max-w-xs sm:w-auto"
               style={{ 
                 '--primary': '#46952C',
                 backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
               } as React.CSSProperties}
             >
               <div className="flex items-center justify-center gap-2 sm:gap-3">
                 <svg 
                   className="w-4 h-4 sm:w-5 sm:h-5" 
                   viewBox="0 0 24 24" 
                   fill="currentColor"
                 >
                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                 </svg>
                 <span className="whitespace-nowrap">Télécharger l&apos;app EcoLyon</span>
               </div>
             </ShinyButton>
             </a>
           </div>
           
           <div className="text-center mt-4 sm:mt-6 mb-4 sm:mb-6">
             <p className="text-gray-600 text-sm sm:text-base px-4">
               Découvrez les autres fonctionnalités d&apos;EcoLyon
             </p>
           </div>

           <div className="flex justify-center px-2 sm:px-0">
             <Dock 
               excludeId="compost"
               className="max-w-3xl w-full"
             />
           </div>
         </motion.div>
       )}
     </div>
   </div>
 );
}