"use client";

import { useState, useEffect } from 'react';
import PollutionCards from '@/components/air/PollutionCards';
import AtmoScaleExplanation from '@/components/air/AtmoScaleExplanation';
import IncitySection from '@/components/air/IncitySection';
import GlobeBackground from '@/components/air/GlobeBackgroundLazy';

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

export default function QualiteAirClient() {

  // États pour la qualité d'air
  const [currentQuality, setCurrentQuality] = useState('');
  const [currentColor, setCurrentColor] = useState('#50F0E6');
  const [globalIndex, setGlobalIndex] = useState(0);
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
    } catch (error) {
      console.error('Erreur lors du chargement de la qualité de l\'air:', error);
      setError('Impossible de récupérer les données de qualité de l\'air');
      setLoading(false);
    }
  };

  // Pas d'animation - affichage direct
  const startAnimation = (finalQuality: string, finalColor: string) => {
    setCurrentQuality(finalQuality);
    setCurrentColor(finalColor);
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
    } catch (error) {
      console.error('Erreur lors du chargement du commentaire:', error);
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


  useEffect(() => {
    fetchAirQuality();
    fetchCommentaire();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* Globe en arrière-plan - RESPONSIVE avec lazy loading */}
      <GlobeBackground qualityColor={currentColor} globalIndex={globalIndex} />

      {/* Bannière avec contenu - MARGES AJUSTÉES */}
      <div className="relative z-10 bg-[#F8F7F4] mt-[200px] sm:mt-[250px] lg:mt-[300px]">
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Phrase dynamique de qualité d'air */}
            {error ? (
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light text-red-500 mb-4 sm:mb-6 lg:mb-8 px-2">
                {error}
              </p>
            ) : (
              <p className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-light text-black mb-4 sm:mb-6 lg:mb-8 px-2 leading-relaxed">
                Aujourd&apos;hui à Lyon la qualité de l&apos;air est{' '}
                <span 
                  className="font-medium"
                  style={{ color: currentColor }}
                >
                  {getFriendlyText(currentQuality)}
                </span>
              </p>
            )}

            {/* Commentaire Quotidien */}
            {commentaireLoading ? (
              <div className="mb-4 lg:mb-6">
                <div className="animate-spin rounded-full h-5 sm:h-6 lg:h-8 w-5 sm:w-6 lg:w-8 border-b-2 border-[#46952C] mx-auto mb-2 sm:mb-3 lg:mb-4"></div>
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 px-2">Chargement du commentaire quotidien...</p>
              </div>
            ) : commentaireError ? (
              <div className="mb-4 lg:mb-6">
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 px-2">{commentaireError}</p>
              </div>
            ) : commentaireData ? (
              <div className="mb-4 lg:mb-6">
                <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed mb-2 sm:mb-3 lg:mb-4 max-w-3xl mx-auto px-4">
                  {commentaireData.commentaire}
                </p>
                
                <p className="text-xs lg:text-sm text-gray-500 px-4">
                  Mis à jour le {formatUpdateDate(commentaireData.date_maj)} par{' '}
                  <span className="font-medium">ATMO Auvergne-Rhône-Alpes</span>, organisme agréé pour la surveillance de la qualité de l&apos;air.
                </p>
              </div>
            ) : (
              <div className="mb-4 lg:mb-6">
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 px-2">Aucun commentaire disponible pour aujourd&apos;hui</p>
              </div>
            )}
          </div>
        </section>

        {/* Section des cartes de polluants */}
        <PollutionCards />

        {/* NOUVELLE SECTION : Explication de l'échelle ATMO */}
        <AtmoScaleExplanation />

        <IncitySection />
      </div>
    </div>
  );
}