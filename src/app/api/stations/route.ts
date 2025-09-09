// src/app/api/stations/route.ts
import { NextResponse } from 'next/server';

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

const LYON_DISTRICT_CODES = [
  '69381', '69382', '69383', '69384', '69385',
  '69386', '69387', '69388', '69389'
];

// Fonction pour regrouper les stations par emplacement
const groupStationsByLocation = (stations: IRVEFeature[]): IRVEFeature[] => {
  const grouped = stations.reduce((acc, station) => {
    if (!station.geometry?.coordinates) return acc;
    
    const lat = Math.round(station.geometry.coordinates[1] * 1000000) / 1000000;
    const lon = Math.round(station.geometry.coordinates[0] * 1000000) / 1000000;
    const locationKey = `${lat}_${lon}`;
    
    if (!acc[locationKey]) {
      acc[locationKey] = [];
    }
    acc[locationKey].push(station);
    
    return acc;
  }, {} as Record<string, IRVEFeature[]>);
  
  return Object.values(grouped).map(stationsGroup => stationsGroup[0]);
};

export async function GET() {
  try {
    const stationPromises = LYON_DISTRICT_CODES.map(async (districtCode) => {
      try {
        const response = await fetch(
          `https://data.grandlyon.com/geoserver/metropole-de-lyon/ows?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:nrj_energie.irve&SRSNAME=EPSG:4171&outputFormat=application/json&CQL_FILTER=code_insee_commune=${districtCode}&startIndex=0&sortby=gid`,
          {
            headers: {
              'User-Agent': 'EcoLyon/1.0',
            },
            // Cache pendant 1 heure
            next: { revalidate: 3600 }
          }
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
    
    const groupedStations = groupStationsByLocation(allBornes);
    
    return NextResponse.json({
      success: true,
      count: groupedStations.length,
      stations: groupedStations
    }, {
      // Cache côté client pendant 1 heure
      headers: {
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des stations:', error);
    return NextResponse.json({
      success: false,
      error: 'Impossible de récupérer le nombre de stations de recharge',
      count: 0
    }, { status: 500 });
  }
}