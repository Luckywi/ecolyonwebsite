// src/app/api/infrastructure/[type]/route.ts
import { NextResponse } from 'next/server';

interface WFSResponse {
  type: string;
  features: Array<{
    type: string;
  }>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned?: number;
}

// Configuration des différents types d'infrastructure
const INFRASTRUCTURE_CONFIG: Record<string, {
  wfsUrl: string;
  typename: string;
  cacheTime: number;
}> = {
  poubelles: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:gdl_collecte.gdlcollectecontenantdechet',
    cacheTime: 7200 // 2 heures
  },
  fontaines: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:adr_voie_lieu.adrfonction_fontaine',
    cacheTime: 86400 // 24 heures
  },
  toilettes: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:adr_voie_lieu.adrfonctiontoilettepublique',
    cacheTime: 86400 // 24 heures
  },
  bancs: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows', 
    typename: 'grandlyon:mob_banc.mobbanc',
    cacheTime: 86400 // 24 heures
  },
  parcs: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:esp_verte.espverteespace_vert',
    cacheTime: 86400 // 24 heures
  },
  compost: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:gdl_collecte.gdlcollectecomposteur_quartier',
    cacheTime: 86400 // 24 heures  
  },
  silos: {
    wfsUrl: 'https://data.grandlyon.com/geoserver/grandlyon/ows',
    typename: 'grandlyon:gdl_collecte.gdlcollectebornetextile',
    cacheTime: 86400 // 24 heures
  }
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  
  // Vérification du type d'infrastructure
  const config = INFRASTRUCTURE_CONFIG[type];
  if (!config) {
    return NextResponse.json({
      success: false,
      error: `Type d'infrastructure non supporté: ${type}`,
      count: 0
    }, { status: 400 });
  }

  try {
    const wfsParams = new URLSearchParams({
      SERVICE: 'WFS',
      VERSION: '2.0.0',
      request: 'GetFeature',
      typename: config.typename,
      SRSNAME: 'EPSG:4171',
      outputFormat: 'application/json',
      resultType: 'hits' // Récupère seulement le nombre, pas les données
    });

    const url = `${config.wfsUrl}?${wfsParams}`;
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'EcoLyon/1.0',
      },
      // Cache selon le type d'infrastructure
      next: { revalidate: config.cacheTime }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: WFSResponse = await response.json();
    
    // Récupération du nombre total
    const count = data.totalFeatures || data.numberMatched || data.features?.length || 0;
    
    return NextResponse.json({
      success: true,
      count,
      type
    }, {
      // Cache côté client
      headers: {
        'Cache-Control': `public, max-age=${config.cacheTime}, s-maxage=${config.cacheTime}`,
      }
    });
    
  } catch (error) {
    console.error(`Erreur lors de la récupération des ${type}:`, error);
    return NextResponse.json({
      success: false,
      error: `Impossible de récupérer le nombre de ${type}`,
      count: 0,
      type
    }, { status: 500 });
  }
}