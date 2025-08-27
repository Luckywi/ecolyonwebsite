// src/app/poubelles/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface WFSResponse {
  type: string;
  features: Array<{
    type: string;
  }>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned?: number;
}

export default function PoubellePage() {
  const [poubelleCount, setPoubelleCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer le nombre de corbeilles depuis l'API Grand Lyon
  useEffect(() => {
    const fetchPoubelleCount = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(
          'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:gin_nettoiement.gincorbeille&outputFormat=application/json&SRSNAME=EPSG:4171&count=1'
        );
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const data: WFSResponse = await response.json();
        const count = data.totalFeatures || data.numberMatched || data.features?.length || 0;
        
        setPoubelleCount(count);
      } catch (err) {
        console.error('Erreur:', err);
        setError('Impossible de récupérer le nombre de corbeilles');
      } finally {
        setLoading(false);
      }
    };

    fetchPoubelleCount();
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

        {/* Icône poubelle en grand */}
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-32 h-32 relative">
            <Image
              src="/logos/poubelle.png"
              alt="Corbeilles publiques"
              fill
              className="object-contain"
              sizes="128px"
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
              Chargement du nombre de corbeilles...
            </h1>
          ) : error ? (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-red-500">
              {error}
            </h1>
          ) : (
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light text-black">
              Dans la métropole de Lyon il y a{' '}
              <span 
                className="font-medium"
                style={{ color: '#46952C' }}
              >
                {poubelleCount.toLocaleString()}
              </span>
              {' '}corbeilles publiques
            </h1>
          )}
        </motion.div>
        
      </div>
    </div>
  );
}