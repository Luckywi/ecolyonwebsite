// src/app/infrastructure/stations/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ShinyButton } from '@/components/magicui/shiny-button';
import StepCarousel, { Step } from '@/components/infrastructure/StepCarousel';
import Dock from '@/components/infrastructure/Dock';

interface IRVEFeature {
  type: string;
  properties: {
    nom_station?: string;
    adresse_station?: string;
    nom_operateur?: string;
    puissance_nominale?: number;
    code_insee_commune?: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface IRVEResponse {
  type: string;
  features: IRVEFeature[];
}

export default function StationsPage() {
 const [stationsCount, setStationsCount] = useState(0);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState('');

 // Configuration des étapes pour les stations de recharge
 const stationsSteps: Step[] = [
   {
     id: 1,
     title: "Ouvrez l'app EcoLyon",
     image: "/images/Home.png",
     description: "Lancez l'application EcoLyon sur votre téléphone"
   },
   {
     id: 2,
     title: "Accédez au menu",
     image: "/images/Menu.png",
     description: "Appuyez sur le menu pour voir toutes les fonctionnalités"
   },
   {
     id: 3,
     title: "Trouvez une station de recharge",
     image: "/images/Stations/Stations.png",
     description: "Localisez toutes les bornes de recharge électrique autour de vous"
   },
   {
     id: 4,
     title: "Lancez la navigation",
     image: "/images/Stations/StartNav.png",
     description: "Cliquez sur la station choisie pour lancer la navigation"
   },
   {
     id: 5,
     title: "Démarrez la navigation",
     image: "/images/Stations/Nav.png",
     description: "Lancez le GPS pour vous rendre à la station de recharge sélectionnée"
   }
 ];

 // Codes INSEE des 9 arrondissements de Lyon
 const LYON_DISTRICT_CODES = [
   '69381', '69382', '69383', '69384', '69385',
   '69386', '69387', '69388', '69389'
 ];

 // Regrouper les bornes par emplacement pour compter les stations
 const groupStationsByLocation = (stations: IRVEFeature[]): IRVEFeature[] => {
   const grouped = stations.reduce((acc, station) => {
     if (!station.geometry?.coordinates || station.geometry.coordinates.length < 2) {
       return acc;
     }
     
     const lat = Math.round(station.geometry.coordinates[1] * 1000000) / 1000000;
     const lon = Math.round(station.geometry.coordinates[0] * 1000000) / 1000000;
     const locationKey = `${lat}_${lon}`;
     
     if (!acc[locationKey]) {
       acc[locationKey] = [];
     }
     acc[locationKey].push(station);
     
     return acc;
   }, {} as Record<string, IRVEFeature[]>);
   
   // Retourner une station représentative par emplacement
   return Object.values(grouped).map(stationsGroup => stationsGroup[0]);
 };

 // Récupérer le nombre de stations de recharge depuis l'API Grand Lyon
 useEffect(() => {
   const fetchStationsCount = async () => {
     try {
       setLoading(true);
       
       // Récupérer toutes les bornes pour tous les arrondissements
       const stationPromises = LYON_DISTRICT_CODES.map(async (districtCode) => {
         try {
           const response = await fetch(
             `https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:nrj_energie.irve&SRSNAME=EPSG:4171&outputFormat=application/json&CQL_FILTER=code_insee_commune=${districtCode}&startIndex=0&sortby=gid`
           );
           
           if (!response.ok) return [];
           
           const data: IRVEResponse = await response.json();
           return data.features || [];
         } catch (error) {
           console.warn(`Erreur pour l'arrondissement ${districtCode}:`, error);
           return [];
         }
       });
       
       const allDistrictStations = await Promise.all(stationPromises);
       const allBornes = allDistrictStations.flat();
       
       // Regrouper les bornes par station (même emplacement)
       const groupedStations = groupStationsByLocation(allBornes);
       
       setStationsCount(groupedStations.length);
     } catch (err) {
       console.error('Erreur:', err);
       setError('Impossible de récupérer le nombre de stations de recharge');
     } finally {
       setLoading(false);
     }
   };

   fetchStationsCount();
 }, []);

 return (
   <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
     <div className="max-w-4xl mx-auto">
       
       {/* Navigation de retour */}
       <motion.div 
         className="mb-8"
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
             alt=""
             width={20}
             height={20}
             className="w-5 h-5 rotate-180 back-link-arrow"
           />
           <span className="font-medium">Retour aux infrastructures</span>
         </Link>
       </motion.div>

       {/* Icône station de recharge en grand */}
       <motion.div 
         className="flex justify-center mb-8"
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.6 }}
       >
         <div className="w-32 h-32 relative">
           <Image
             src="/logos/borne.png"
             alt="Stations de recharge électrique Lyon"
             fill
             className="object-contain"
             sizes="190px"
           />
         </div>
       </motion.div>

       {/* Titre avec compteur */}
       <motion.div 
         className="text-center mb-12"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2 }}
       >
         {loading ? (
           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black">
             Chargement du nombre de stations de recharge...
           </h1>
         ) : error ? (
           <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-red-500">
             {error}
           </h1>
         ) : (
           <>
             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black">
               Stations de recharge :{' '}
               <span 
                 className="font-medium"
                 style={{ color: '#46952C' }}
               >
                 {stationsCount.toLocaleString()}
               </span>
               {' '}dans le Grand Lyon
             </h1>
             
             {/* Description */}
             <motion.p 
               className="text-base sm:text-lg text-gray-700 leading-relaxed mt-8 max-w-3xl mx-auto"
               initial={{ opacity: 0, y: 15 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.4 }}
             >
               Vous cherchez une station de recharge pour votre voiture électrique ? L&apos;app EcoLyon localise 
               les bornes disponibles dans toute la métropole. Plus besoin de tourner en rond pour trouver 
               une place libre quand vous n&apos;êtes pas dans votre quartier.
               <span className="font-medium text-ecolyon-green"> <br></br>Rechargez partout dans le Grand Lyon !</span>
             </motion.p>
           </>
         )}
       </motion.div>

       {/* Carrousel des étapes */}
       {!loading && !error && (
         <motion.div 
           className="mb-16"
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
         >
           <StepCarousel steps={stationsSteps} />
           
           {/* Bouton CTA */}
           <div className="flex justify-center mt-12 mb-16">
             <ShinyButton 
               className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-8 py-4 rounded-xl font-medium text-base shadow-lg hover:shadow-xl border-ecolyon-green"
               style={{ 
                 '--primary': '#46952C',
                 backgroundImage: 'linear-gradient(135deg, #46952C 0%, #3a7a23 100%)'
               } as React.CSSProperties}
             >
               <div className="flex items-center gap-3">
                 <svg 
                   className="w-5 h-5" 
                   viewBox="0 0 24 24" 
                   fill="currentColor"
                 >
                   <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                 </svg>
                 Télécharger l&apos;app EcoLyon
               </div>
             </ShinyButton>
           </div>
           
           {/* Texte explicatif du dock */}
           <div className="text-center mt-6">
             <p className="text-gray-600 text-text-base">
               Découvrez les autres fonctionnalités d&apos;EcoLyon
             </p>
             <br></br>
           </div>

             <div className="flex justify-center">
             <Dock 
               excludeId="stations"
               className="max-w-3xl"
             />
           </div>
           
         </motion.div>
         
         
       )}
     </div>
   </div>
 );
}