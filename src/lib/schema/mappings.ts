// Mappings intelligents route → données Schema.org
import { RouteSchemaData } from './types';

export const ROUTE_SCHEMA_MAPPINGS: Record<string, RouteSchemaData> = {
  // Page d'accueil
  '/': {
    title: 'EcoLyon - Lyon connectée à son environnement',
    description: 'Découvrez Lyon sous un angle écologique avec EcoLyon : qualité de l\'air en temps réel, infrastructures vertes, compostage urbain. L\'application gratuite pour une métropole plus durable.',
    featureList: [
      'Qualité de l\'air temps réel',
      'Géolocalisation des infrastructures',
      'Guide compostage urbain',
      'Navigation GPS intégrée',
      'Données officielles ATMO'
    ],
    serviceType: 'Plateforme environnementale urbaine',
    category: 'general',
    keywords: ['lyon', 'écologie', 'environnement', 'qualité air', 'infrastructure verte']
  },

  // === INFRASTRUCTURE ===
  '/infrastructure': {
    title: 'Infrastructures écologiques Lyon - EcoLyon',
    description: 'Explorez les infrastructures écologiques de Lyon avec EcoLyon. Géolocalisez poubelles, fontaines, bornes électriques, composteurs et bien plus dans le Grand Lyon.',
    featureList: [
      'Géolocalisation GPS précise',
      '50 000+ points d\'infrastructure',
      'Navigation temps réel',
      'Filtres par catégorie',
      'Mise à jour quotidienne'
    ],
    serviceType: 'Service de géolocalisation d\'infrastructures urbaines',
    category: 'infrastructure'
  },

  '/infrastructure/poubelles': {
    title: 'Poubelles publiques Lyon - EcoLyon',
    description: 'Géolocalisez instantanément les poubelles publiques les plus proches avec EcoLyon. Plus de 15 000 points de collecte dans le Grand Lyon avec navigation GPS intégrée.',
    featureList: [
      'Géolocalisation GPS',
      'Navigation temps réel',
      '15 000+ poubelles publiques',
      'Filtres par type de déchet',
      'Calcul d\'itinéraire optimisé'
    ],
    serviceType: 'Localisation de poubelles publiques',
    category: 'infrastructure'
  },

  '/infrastructure/fontaines': {
    title: 'Fontaines d\'eau potable Lyon - EcoLyon',
    description: 'Découvrez les fontaines d\'eau potable de Lyon avec EcoLyon. Hydratez-vous gratuitement en localisant les points d\'eau les plus proches avec navigation GPS.',
    featureList: [
      'Géolocalisation fontaines',
      'Navigation GPS',
      'Qualité de l\'eau certifiée',
      'Accessibilité PMR indiquée',
      'Mise à jour temps réel'
    ],
    serviceType: 'Localisation de fontaines d\'eau potable',
    category: 'infrastructure'
  },

  '/infrastructure/stations': {
    title: 'Bornes de recharge électrique Lyon - EcoLyon',
    description: 'Localisez les bornes de recharge électrique à Lyon avec EcoLyon. Trouvez les stations de charge les plus proches pour véhicules électriques avec disponibilité temps réel.',
    featureList: [
      'Bornes de recharge électrique',
      'Disponibilité temps réel',
      'Types de connecteurs',
      'Tarification détaillée',
      'Navigation optimisée'
    ],
    serviceType: 'Localisation de bornes de recharge électrique',
    category: 'infrastructure'
  },

  '/infrastructure/bancs': {
    title: 'Bancs publics Lyon - EcoLyon',
    description: 'Trouvez les bancs publics à Lyon avec EcoLyon. Localisez les espaces de repos dans la ville pour vos pauses urbaines avec géolocalisation précise.',
    featureList: [
      'Géolocalisation bancs publics',
      'Espaces de repos urbains',
      'Accessibilité PMR',
      'Environnement paisible',
      'Navigation GPS'
    ],
    serviceType: 'Localisation de bancs publics',
    category: 'infrastructure'
  },

  '/infrastructure/parcs': {
    title: 'Parcs et jardins Lyon - EcoLyon',
    description: 'Explorez les parcs et jardins de Lyon avec EcoLyon. Découvrez les espaces verts de la métropole avec informations détaillées et navigation GPS.',
    featureList: [
      'Parcs et jardins publics',
      'Espaces verts protégés',
      'Aires de jeux enfants',
      'Parcours sportifs',
      'Horaires d\'ouverture'
    ],
    serviceType: 'Guide des parcs et jardins',
    category: 'infrastructure'
  },

  '/infrastructure/randonnees': {
    title: 'Sentiers de randonnée Lyon - EcoLyon',
    description: 'Découvrez les sentiers de randonnée autour de Lyon avec EcoLyon. Explorez les chemins de balade et parcours nature avec navigation GPS intégrée.',
    featureList: [
      'Sentiers de randonnée',
      'Parcours nature urbains',
      'Niveaux de difficulté',
      'Points d\'intérêt',
      'Navigation GPS'
    ],
    serviceType: 'Guide des sentiers de randonnée',
    category: 'infrastructure'
  },

  '/infrastructure/toilettes': {
    title: 'Toilettes publiques Lyon - EcoLyon',
    description: 'Localisez les toilettes publiques à Lyon avec EcoLyon. Trouvez rapidement les sanitaires publics les plus proches avec accessibilité et horaires.',
    featureList: [
      'Toilettes publiques',
      'Accessibilité PMR',
      'Horaires d\'ouverture',
      'Gratuité/payant',
      'Navigation GPS'
    ],
    serviceType: 'Localisation de toilettes publiques',
    category: 'infrastructure'
  },

  '/infrastructure/silos': {
    title: 'Silos à verre Lyon - EcoLyon',
    description: 'Trouvez les silos à verre à Lyon avec EcoLyon. Recyclez facilement en localisant les points de collecte du verre avec navigation optimisée.',
    featureList: [
      'Silos à verre',
      'Recyclage du verre',
      'Points de collecte',
      'Navigation optimisée',
      'Tri sélectif'
    ],
    serviceType: 'Localisation de silos à verre',
    category: 'infrastructure'
  },

  '/infrastructure/compost': {
    title: 'Composteurs collectifs Lyon - EcoLyon',
    description: 'Découvrez les composteurs collectifs de Lyon avec EcoLyon. Participez au compostage urbain en trouvant les points de compost partagés près de chez vous.',
    featureList: [
      'Composteurs collectifs',
      'Compostage urbain',
      'Gestion des déchets verts',
      'Participation citoyenne',
      'Navigation GPS'
    ],
    serviceType: 'Localisation de composteurs collectifs',
    category: 'infrastructure'
  },

  // === QUALITÉ DE L'AIR ===
  '/qualite-air': {
    title: 'Qualité de l\'air Lyon temps réel - EcoLyon',
    description: 'Consultez la qualité de l\'air à Lyon en temps réel avec EcoLyon. Données officielles ATMO, indices de pollution et recommandations de santé publique.',
    featureList: [
      'Qualité air temps réel',
      'Données officielles ATMO',
      'Indices de pollution',
      'Recommandations santé',
      'Prévisions 24h'
    ],
    serviceType: 'Monitoring qualité de l\'air',
    category: 'air-quality'
  },

  '/qualite-air/NO2': {
    title: 'Dioxyde d\'azote Lyon - Pollution NO2 - EcoLyon',
    description: 'Surveillez le taux de dioxyde d\'azote (NO2) à Lyon avec EcoLyon. Données temps réel de pollution automobile et recommandations de protection.',
    featureList: [
      'Taux NO2 temps réel',
      'Pollution automobile',
      'Seuils d\'alerte',
      'Impact sur la santé',
      'Données ATMO officielles'
    ],
    serviceType: 'Monitoring dioxyde d\'azote NO2',
    category: 'air-quality'
  },

  '/qualite-air/O3': {
    title: 'Ozone Lyon - Pollution O3 - EcoLyon',
    description: 'Suivez les niveaux d\'ozone (O3) à Lyon avec EcoLyon. Données temps réel de pollution photochimique et conseils de précaution.',
    featureList: [
      'Niveaux O3 temps réel',
      'Pollution photochimique',
      'Pics d\'ozone été',
      'Alertes sanitaires',
      'Mesures officielles ATMO'
    ],
    serviceType: 'Monitoring ozone O3',
    category: 'air-quality'
  },

  '/qualite-air/PM10': {
    title: 'Particules PM10 Lyon - Pollution - EcoLyon',
    description: 'Contrôlez les particules fines PM10 à Lyon avec EcoLyon. Surveillance temps réel de la pollution particulaire et impact sur la santé respiratoire.',
    featureList: [
      'Particules PM10 temps réel',
      'Pollution particulaire',
      'Impact santé respiratoire',
      'Sources de pollution',
      'Données ATMO certifiées'
    ],
    serviceType: 'Monitoring particules PM10',
    category: 'air-quality'
  },

  '/qualite-air/PM2.5': {
    title: 'Particules PM2.5 Lyon - Pollution fine - EcoLyon',
    description: 'Mesurez les particules ultra-fines PM2.5 à Lyon avec EcoLyon. Monitoring temps réel de la pollution fine et recommandations de protection.',
    featureList: [
      'Particules PM2.5 temps réel',
      'Pollution ultra-fine',
      'Pénétration pulmonaire',
      'Risques cardiovasculaires',
      'Surveillance ATMO'
    ],
    serviceType: 'Monitoring particules PM2.5',
    category: 'air-quality'
  },

  '/qualite-air/SO2': {
    title: 'Dioxyde de soufre Lyon - Pollution SO2 - EcoLyon',
    description: 'Surveillez le dioxyde de soufre (SO2) à Lyon avec EcoLyon. Mesures temps réel de pollution industrielle et impact environnemental.',
    featureList: [
      'Taux SO2 temps réel',
      'Pollution industrielle',
      'Impact environnemental',
      'Pluies acides',
      'Données ATMO officielles'
    ],
    serviceType: 'Monitoring dioxyde de soufre SO2',
    category: 'air-quality'
  },

  // === COMPOST ===
  '/compost': {
    title: 'Compostage urbain Lyon - Guide EcoLyon',
    description: 'Maîtrisez le compostage urbain à Lyon avec EcoLyon. Guide complet, conseils pratiques et localisation des composteurs collectifs.',
    featureList: [
      'Guide compostage complet',
      'Conseils pratiques',
      'Composteurs collectifs',
      'Gestion déchets verts',
      'Jardinage urbain'
    ],
    serviceType: 'Guide compostage urbain',
    category: 'compost'
  },

  '/compost/guide': {
    title: 'Guide compostage - Conseils pratiques - EcoLyon',
    description: 'Apprenez le compostage avec le guide pratique EcoLyon. Techniques, conseils, erreurs à éviter pour un compost réussi en milieu urbain.',
    featureList: [
      'Techniques de compostage',
      'Conseils d\'experts',
      'Erreurs à éviter',
      'Compost urbain',
      'Guides pas à pas'
    ],
    serviceType: 'Guide pratique de compostage',
    category: 'compost'
  },

  '/compost/composteur-gratuit': {
    title: 'Composteur gratuit Lyon - Demande - EcoLyon',
    description: 'Obtenez un composteur gratuit à Lyon avec EcoLyon. Démarches simplifiées, éligibilité et guide d\'installation pour débuter le compostage.',
    featureList: [
      'Composteur gratuit',
      'Démarches simplifiées',
      'Éligibilité Lyon',
      'Guide d\'installation',
      'Accompagnement personnalisé'
    ],
    serviceType: 'Service composteur gratuit',
    category: 'compost'
  },

  // === PAGES LÉGALES ===
  '/contact': {
    title: 'Contact EcoLyon - Support application',
    description: 'Contactez l\'équipe EcoLyon pour vos questions, suggestions d\'amélioration ou support technique de l\'application mobile.',
    featureList: [
      'Support utilisateur',
      'Suggestions d\'amélioration',
      'Support technique',
      'Feedback application',
      'Contact développeurs'
    ],
    serviceType: 'Support et contact utilisateur',
    category: 'general'
  },

  '/mentions-legales': {
    title: 'Mentions légales - EcoLyon',
    description: 'Mentions légales de l\'application EcoLyon et du site web. Informations légales, éditeur et conditions d\'utilisation.',
    featureList: [
      'Informations légales',
      'Éditeur application',
      'Conditions d\'utilisation',
      'Propriété intellectuelle',
      'Responsabilités'
    ],
    serviceType: 'Informations légales',
    category: 'general'
  },

  '/confidentialite': {
    title: 'Politique de confidentialité - EcoLyon',
    description: 'Politique de confidentialité EcoLyon. Protection des données personnelles, cookies et respect de votre vie privée.',
    featureList: [
      'Protection données personnelles',
      'Gestion cookies',
      'Respect vie privée',
      'RGPD conforme',
      'Transparence totale'
    ],
    serviceType: 'Politique de confidentialité',
    category: 'general'
  }
};

// Fonction utilitaire pour obtenir les données d'une route
export function getRouteSchemaData(pathname: string): RouteSchemaData | null {
  // Correspondance exacte d'abord
  if (ROUTE_SCHEMA_MAPPINGS[pathname]) {
    return ROUTE_SCHEMA_MAPPINGS[pathname];
  }

  // Fallback pour les routes non mappées
  return ROUTE_SCHEMA_MAPPINGS['/'];
}

// Fonction pour générer les mots-clés automatiquement
export function generateKeywords(data: RouteSchemaData): string[] {
  const baseKeywords = ['lyon', 'ecolyon', 'app mobile', 'écologie urbaine'];
  
  switch (data.category) {
    case 'infrastructure':
      return [...baseKeywords, 'infrastructure lyon', 'géolocalisation', 'navigation gps', 'services urbains'];
    case 'air-quality':
      return [...baseKeywords, 'qualité air lyon', 'pollution', 'atmo', 'santé publique'];
    case 'compost':
      return [...baseKeywords, 'compostage lyon', 'déchets verts', 'jardinage urbain', 'écologie'];
    default:
      return baseKeywords;
  }
}