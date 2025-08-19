// lib/infrastructure-stats.ts

import { useState, useEffect } from 'react';

interface WFSResponse {
  type: string;
  features: Array<{
    type: string;
  }>;
  totalFeatures?: number;
  numberMatched?: number;
  numberReturned?: number;
}

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

interface InfrastructureEndpoint {
  name: string;
  typename: string;
  description?: string;
}

// Configuration des 9 endpoints d'infrastructures publiques de Lyon
const INFRASTRUCTURE_ENDPOINTS: InfrastructureEndpoint[] = [
  {
    name: 'Parcs et Jardins',
    typename: 'metropole-de-lyon:com_donnees_communales.comparcjardin_1_0_0',
    description: 'Espaces verts et jardins publics'
  },
  {
    name: 'Fontaines',
    typename: 'metropole-de-lyon:adr_voie_lieu.adrbornefontaine_latest',
    description: 'Bornes fontaines et points d\'eau publics'
  },
  {
    name: 'Randonnées',
    typename: 'metropole-de-lyon:boucle-de-randonnee',
    description: 'Boucles de randonnée et sentiers'
  },
  {
    name: 'Corbeilles',
    typename: 'metropole-de-lyon:gin_nettoiement.gincorbeille',
    description: 'Corbeilles de propreté urbaine'
  },
  {
    name: 'Tri Sélectif',
    typename: 'metropole-de-lyon:gic_collecte.siloverre',
    description: 'Silos à verre et tri sélectif'
  },
  {
    name: 'Compost',
    typename: 'metropole-de-lyon:gic_collecte.bornecompost',
    description: 'Bornes de compostage collectif'
  },
  {
    name: 'Bancs Publics',
    typename: 'metropole-de-lyon:adr_voie_lieu.adrbanc_latest',
    description: 'Mobilier urbain - bancs publics'
  },
  {
    name: 'Toilettes Publiques',
    typename: 'metropole-de-lyon:adr_voie_lieu.adrtoilettepublique_latest',
    description: 'Sanitaires publics'
  }
];

// Codes INSEE des 9 arrondissements de Lyon (comme dans ton app)
const LYON_DISTRICT_CODES = [
  '69381', '69382', '69383', '69384', '69385',
  '69386', '69387', '69388', '69389'
];

const BASE_WFS_URL = 'https://data.grandlyon.com/geoserver/metropole-de-lyon/ows';

// Construction de l'URL WFS
function buildWFSUrl(typename: string, countOnly: boolean = false): string {
  const params = new URLSearchParams({
    'SERVICE': 'WFS',
    'VERSION': '2.0.0',
    'request': countOnly ? 'GetFeature' : 'GetFeature',
    'typename': typename,
    'outputFormat': 'application/json',
    'SRSNAME': 'EPSG:4171'
  });

  // Pour compter uniquement, on peut limiter à 1 résultat et utiliser totalFeatures
  if (countOnly) {
    params.set('count', '1');
  }

  return `${BASE_WFS_URL}?${params.toString()}`;
}

// Récupérer le nombre de stations de recharge électrique
async function getChargingStationsCount(): Promise<number> {
  try {
    console.log('⚡ Récupération des stations de recharge électrique...');
    
    // Récupérer les bornes pour tous les arrondissements
    const stationPromises = LYON_DISTRICT_CODES.map(async (districtCode) => {
      try {
        const url = `${BASE_WFS_URL}?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=metropole-de-lyon:nrj_energie.irve&SRSNAME=EPSG:4171&outputFormat=application/json&CQL_FILTER=code_insee_commune=${districtCode}&startIndex=0&sortby=gid`;
        
        const response = await fetch(url);
        if (!response.ok) return [];
        
        const data: IRVEResponse = await response.json();
        return data.features || [];
      } catch (error) {
        console.warn(`Erreur pour l'arrondissement ${districtCode}:`, error);
        return [];
      }
    });
    
    const allDistrictStations = await Promise.all(stationPromises);
    const allStations = allDistrictStations.flat();
    
    // Regrouper les bornes par station (même logique que ton code Swift)
    const groupedStations = groupStationsByLocation(allStations);
    
    console.log(`⚡ ${groupedStations.length} stations de recharge trouvées`);
    return groupedStations.length;
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération des stations de recharge:', error);
    return 0;
  }
}

// Regrouper les bornes par emplacement pour compter les stations
function groupStationsByLocation(stations: IRVEFeature[]): IRVEFeature[] {
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
}
async function getInfrastructureCount(endpoint: InfrastructureEndpoint): Promise<number> {
  try {
    const url = buildWFSUrl(endpoint.typename, true);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.warn(`Erreur API pour ${endpoint.name}:`, response.status);
      return 0;
    }

    const data: WFSResponse = await response.json();
    
    // Les APIs WFS peuvent retourner le nombre total de différentes façons
    return data.totalFeatures || 
           data.numberMatched || 
           data.features?.length || 
           0;
           
  } catch (error) {
    console.error(`Erreur lors de la récupération des données pour ${endpoint.name}:`, error);
    return 0;
  }
}

// Fonction principale : récupérer le total de toutes les infrastructures
export async function getTotalInfrastructureCount(): Promise<number> {
  try {
    console.log('🏛️ Récupération du nombre total d\'infrastructures publiques Lyon...');
    
    // Récupérer les comptes pour les infrastructures classiques
    const standardCountPromises = INFRASTRUCTURE_ENDPOINTS.map(endpoint => 
      getInfrastructureCount(endpoint)
    );
    
    // Récupérer le nombre de stations de recharge électrique
    const chargingStationsPromise = getChargingStationsCount();
    
    // Attendre tous les résultats
    const [standardCounts, chargingStationsCount] = await Promise.all([
      Promise.all(standardCountPromises),
      chargingStationsPromise
    ]);
    
    const standardTotal = standardCounts.reduce((sum, count) => sum + count, 0);
    const total = standardTotal + chargingStationsCount;
    
    console.log(`📊 Total infrastructures: ${standardTotal} + ${chargingStationsCount} stations = ${total}`);
    return total;
    
  } catch (error) {
    console.error('❌ Erreur lors du calcul du total des infrastructures:', error);
    return 0;
  }
}

// Fonction pour obtenir le détail par type d'infrastructure
export async function getInfrastructureBreakdown(): Promise<Array<{
  name: string;
  count: number;
  description?: string;
}>> {
  try {
    console.log('📋 Récupération du détail des infrastructures...');
    
    // Récupérer les comptes pour les infrastructures classiques
    const standardCountPromises = INFRASTRUCTURE_ENDPOINTS.map(async (endpoint) => {
      const count = await getInfrastructureCount(endpoint);
      return {
        name: endpoint.name,
        count,
        description: endpoint.description
      };
    });
    
    // Récupérer le nombre de stations de recharge
    const chargingStationsCount = await getChargingStationsCount();
    const chargingStationsItem = {
      name: 'Stations de Recharge',
      count: chargingStationsCount,
      description: 'Stations de recharge électrique publiques'
    };
    
    const standardBreakdown = await Promise.all(standardCountPromises);
    const fullBreakdown = [...standardBreakdown, chargingStationsItem];
    
    // Trier par nombre décroissant
    return fullBreakdown.sort((a, b) => b.count - a.count);
    
  } catch (error) {
    console.error('❌ Erreur lors de la récupération du détail:', error);
    return [];
  }
}

// Hook React pour utiliser facilement dans tes composants
export function useInfrastructureStats() {
  const [totalCount, setTotalCount] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<Array<{name: string; count: number; description?: string}>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        
        const [total, detail] = await Promise.all([
          getTotalInfrastructureCount(),
          getInfrastructureBreakdown()
        ]);
        
        setTotalCount(total);
        setBreakdown(detail);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erreur inconnue');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return { totalCount, breakdown, loading, error };
}