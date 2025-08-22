// src/app/qualite-air/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import PollutionCards from '@/components/air/PollutionCards';

// Types pour les données de commentaire ATMO
interface CommentaireData {
  commentaire: string;
  date_maj: string;
}

interface CommentaireResponse {
  data: CommentaireData[];
}

// Types pour les données de qualité d'air
interface AirQualityData {
  data: {
    qualificatif: string;
    couleur_html: string;
    indice: number;
  }[];
}

// Type pour le globe Cobe
interface CobeGlobe {
  destroy: () => void;
}

// Type pour l'état du rendu du globe (utilise Record<string, any> comme attendu par cobe)
type GlobeRenderState = Record<string, any> & {
  phi: number;
  markerColor: [number, number, number];
  glowColor: [number, number, number];
}

export default function QualiteAirPage() {
  // Refs pour le globe
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<CobeGlobe | null>(null);

  // Coordonnées de Lyon
  const LYON_COORDINATES = { lat: 45.7640, lng: 4.8357 };

  // États pour la qualité d'air
  const [currentQuality, setCurrentQuality] = useState('');
  const [currentColor, setCurrentColor] = useState('#50F0E6');
  const [globalIndex, setGlobalIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // États pour le commentaire quotidien
  const [commentaireData, setCommentaireData] = useState<CommentaireData | null>(null);
  const [commentaireLoading, setCommentaireLoading] = useState(true);
  const [commentaireError, setCommentaireError] = useState('');

  // Fonction pour adapter le texte côté frontend
  const getFriendlyText = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'bon': return 'bonne.';
      case 'moyen': return 'moyenne.';
      case 'dégradé': return 'dégradée.';
      case 'mauvais': return 'mauvaise !';
      case 'très mauvais': return 'très mauvaise !';
      case 'extrêmement mauvais': return 'extrêmement mauvaise !';
      default: return quality + '.';
    }
  };

  // Qualités possibles avec couleurs
  const qualityOptions = [
    { name: 'Bon', color: '#50F0E6' },
    { name: 'Moyen', color: '#50CCAA' },
    { name: 'Dégradé', color: '#F0E641' },
    { name: 'Mauvais', color: '#FF5050' },
    { name: 'Très mauvais', color: '#960032' },
    { name: 'Extrêmement mauvais', color: '#872181' }
  ];

  // Fonction pour récupérer les données de qualité d'air
  const fetchAirQuality = async () => {
    try {
      const response = await fetch(
        'https://api.atmo-aura.fr/api/v1/communes/69381/indices/atmo?api_token=0c7d0bee25f494150fa591275260e81f&date_echeance=now'
      );
      
      if (!response.ok) throw new Error('Erreur API');
      
      const data: AirQualityData = await response.json();
      
      if (data.data?.[0]) {
        const { qualificatif, couleur_html, indice } = data.data[0];
        setGlobalIndex(indice);
        setLoading(false);
        startAnimation(qualificatif, couleur_html);
      } else {
        throw new Error('Aucune donnée disponible');
      }
    } catch (err) {
      setError('Impossible de récupérer les données de qualité de l\'air');
      setLoading(false);
    }
  };

  // Animation de compteur
  const startAnimation = (finalQuality: string, finalColor: string) => {
    let currentIndex = 0;
    const animationInterval = setInterval(() => {
      const quality = qualityOptions[currentIndex];
      setCurrentQuality(quality.name);
      setCurrentColor(quality.color);
      currentIndex = (currentIndex + 1) % qualityOptions.length;
    }, 150);

    setTimeout(() => {
      clearInterval(animationInterval);
      setCurrentQuality(finalQuality);
      setCurrentColor(finalColor);
      setIsAnimating(false);
    }, 3000);
  };

  // Fonction pour récupérer le commentaire quotidien
  const fetchCommentaire = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await fetch(
        `https://api.atmo-aura.fr/api/v1/commentaires?date_echeance=${today}&api_token=0c7d0bee25f494150fa591275260e81f`
      );
      
      if (!response.ok) throw new Error('Erreur API commentaire');
      
      const data: CommentaireResponse = await response.json();
      if (data.data?.[0]) {
        setCommentaireData(data.data[0]);
      } else {
        throw new Error('Aucun commentaire disponible');
      }
    } catch (err) {
      setCommentaireError('Commentaire indisponible pour le moment');
    } finally {
      setCommentaireLoading(false);
    }
  };

  // Fonction pour formater la date de mise à jour
  const formatUpdateDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  // Créer le globe
  useEffect(() => {
    let phi = 0;
    
    if (canvasRef.current) {
      globeRef.current = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: 600 * 2,
        height: 600 * 2,
        phi: 0,
        theta: 0.2,
        dark: 0.1,
        diffuse: 0.8,
        mapSamples: 16000,
        mapBrightness: 4,
        baseColor: [0.973, 0.969, 0.957], // #F8F7F4
        markerColor: [1, 1, 1],
        glowColor: [0.973, 0.969, 0.957],
        opacity: 0,
        offset: [0, 0],
        markers: [{
          location: [LYON_COORDINATES.lat, LYON_COORDINATES.lng],
          size: 0.08 + (globalIndex * 0.02),
        }],
        onRender: (state: GlobeRenderState) => {
          phi += 0.005;
          state.phi = phi;
          
          const hexColor = currentColor || '#50F0E6';
          const r = parseInt(hexColor.slice(1, 3), 16) / 255;
          const g = parseInt(hexColor.slice(3, 5), 16) / 255;
          const b = parseInt(hexColor.slice(5, 7), 16) / 255;
          
          state.markerColor = [r, g, b];
          state.glowColor = [r, g, b];
        }
      });
    }

    return () => {
      if (globeRef.current) {
        globeRef.current.destroy();
      }
    };
  }, [currentColor, globalIndex]);

  useEffect(() => {
    fetchAirQuality();
    fetchCommentaire();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F7F4] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black">
            Chargement des données de qualité de l&apos;air...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F7F4] relative overflow-hidden">
      {/* Globe en arrière-plan */}
      <div className="absolute top-15 left-1/2 transform -translate-x-1/2">
        <div className="w-[600px] h-[600px]">
          <canvas
            ref={canvasRef}
            className="w-full h-full opacity-90"
            style={{
              cursor: 'grab',
              contain: 'layout style size'
            }}
          />
        </div>
      </div>

      {/* Bannière avec contenu */}
      <div className="relative z-10 bg-[#F8F7F4] mt-[300px]">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Phrase dynamique de qualité d'air */}
            {error ? (
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-red-500 mb-8">
                {error}
              </p>
            ) : (
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-black mb-8">
                Aujourd&apos;hui à Lyon la qualité de l&apos;air est{' '}
                <span 
                  className={`font-medium transition-all duration-300 ${isAnimating ? 'animate-pulse' : ''}`}
                  style={{ color: currentColor }}
                >
                  {getFriendlyText(currentQuality)}
                </span>
              </p>
            )}

            {/* Commentaire Quotidien */}
            {commentaireLoading ? (
              <div className="mb-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#46952C] mx-auto mb-4"></div>
                <p className="text-gray-600">Chargement du commentaire quotidien...</p>
              </div>
            ) : commentaireError ? (
              <div className="mb-6">
                <p className="text-gray-600">{commentaireError}</p>
              </div>
            ) : commentaireData ? (
              <div className="mb-6">
                <p className="text-lg text-gray-800 leading-relaxed mb-4 max-w-3xl mx-auto">
                  {commentaireData.commentaire}
                </p>
                
                <p className="text-sm text-gray-500">
                  Mis à jour le {formatUpdateDate(commentaireData.date_maj)} par{' '}
                  <span className="font-medium">ATMO Auvergne-Rhône-Alpes</span>, organisme agréé pour la surveillance de la qualité de l&apos;air.
                </p>
              </div>
            ) : (
              <div className="mb-6">
                <p className="text-gray-600">Aucun commentaire disponible pour aujourd&apos;hui</p>
              </div>
            )}
          </div>
        </section>

        {/* Section des cartes de polluants */}
        <PollutionCards />
      </div>
    </div>
  );
}