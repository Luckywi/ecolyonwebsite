// Générateurs de Schema.org pour EcoLyon
import { 
  MobileApplicationSchema, 
  WebPageSchema, 
  ServiceSchema, 
  OrganizationSchema, 
  BreadcrumbListSchema,
  CombinedSchema,
  RouteSchemaData 
} from './types';

// Données fixes de l'application
const APP_CONSTANTS = {
  name: 'EcoLyon',
  url: 'https://ecolyon.fr',
  appStoreUrl: 'https://apps.apple.com/fr/app/ecolyon/id6747041717',
  appId: '6747041717',
  author: 'EcoLyon',
  version: '1.0.0'
};

// Générateur du schéma MobileApplication (fixe)
export function generateMobileApplicationSchema(routeData: RouteSchemaData): MobileApplicationSchema {
  return {
    "@context": "https://schema.org",
    "@type": ["MobileApplication", "SoftwareApplication"],
    name: APP_CONSTANTS.name,
    alternateName: "EcoLyon - Lyon écologique",
    description: "Application mobile gratuite pour découvrir Lyon sous un angle écologique : qualité de l'air, infrastructures vertes, compostage urbain.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "iOS",
    url: APP_CONSTANTS.url,
    downloadUrl: APP_CONSTANTS.appStoreUrl,
    author: {
      "@type": "Organization",
      name: APP_CONSTANTS.author
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR"
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150"
    },
    featureList: routeData.featureList
  };
}

// Générateur du schéma Organization (fixe)
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: APP_CONSTANTS.name,
    alternateName: "EcoLyon - Lyon connectée à son environnement",
    url: APP_CONSTANTS.url,
    sameAs: [
      APP_CONSTANTS.appStoreUrl,
      "https://www.lyon.fr",
      "https://twitter.com/ecolyon" // si applicable
    ],
    description: "Plateforme numérique dédiée à l'écologie urbaine lyonnaise, proposant des services de géolocalisation d'infrastructures et de monitoring environnemental.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: "French"
    }
  };
}

// Générateur du schéma Service adaptatif
export function generateServiceSchema(routeData: RouteSchemaData, pathname: string): ServiceSchema {
  return {
    "@type": "Service",
    name: routeData.title,
    description: routeData.description,
    provider: {
      "@type": "Organization",
      name: APP_CONSTANTS.name
    },
    serviceType: routeData.serviceType,
    areaServed: {
      "@type": "City",
      name: "Lyon, France"
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${APP_CONSTANTS.url}${pathname}`
    }
  };
}

// Générateur du schéma WebPage adaptatif
export function generateWebPageSchema(
  routeData: RouteSchemaData, 
  pathname: string,
  breadcrumbs?: BreadcrumbListSchema
): WebPageSchema {
  const serviceSchema = generateServiceSchema(routeData, pathname);
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: routeData.title,
    description: routeData.description,
    url: `${APP_CONSTANTS.url}${pathname}`,
    mainEntity: serviceSchema,
    isPartOf: {
      "@type": "WebSite",
      name: "EcoLyon",
      url: APP_CONSTANTS.url
    },
    ...(breadcrumbs && { breadcrumb: breadcrumbs })
  };
}

// Générateur de breadcrumbs
export function generateBreadcrumbSchema(pathname: string): BreadcrumbListSchema | undefined {
  const paths = pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) return undefined;
  
  const breadcrumbItems = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Accueil",
      item: APP_CONSTANTS.url
    }
  ];

  let currentPath = '';
  paths.forEach((path, index) => {
    currentPath += `/${path}`;
    const position = index + 2;
    
    // Mapping des noms de sections
    const sectionNames: Record<string, string> = {
      'infrastructure': 'Infrastructure',
      'qualite-air': 'Qualité de l\'air',
      'compost': 'Compost',
      'poubelles': 'Poubelles',
      'fontaines': 'Fontaines',
      'stations': 'Bornes électriques',
      'bancs': 'Bancs',
      'parcs': 'Parcs',
      'randonnees': 'Randonnées',
      'toilettes': 'Toilettes',
      'silos': 'Silos à verre',
      'NO2': 'Dioxyde d\'azote',
      'O3': 'Ozone',
      'PM10': 'Particules PM10',
      'PM2.5': 'Particules PM2.5',
      'SO2': 'Dioxyde de soufre',
      'guide': 'Guide pratique',
      'composteur-gratuit': 'Composteur gratuit',
      'contact': 'Contact',
      'mentions-legales': 'Mentions légales',
      'confidentialite': 'Confidentialité'
    };

    breadcrumbItems.push({
      "@type": "ListItem",
      position,
      name: sectionNames[path] || path.charAt(0).toUpperCase() + path.slice(1),
      item: `${APP_CONSTANTS.url}${currentPath}`
    });
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems
  };
}

// Générateur du schéma combiné principal
export function generateCombinedSchema(
  routeData: RouteSchemaData, 
  pathname: string
): CombinedSchema {
  const breadcrumbs = generateBreadcrumbSchema(pathname);
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      generateOrganizationSchema(),
      generateMobileApplicationSchema(routeData),
      generateWebPageSchema(routeData, pathname, breadcrumbs)
    ]
  };
}

// Fonction utilitaire pour générer le JSON-LD string
export function generateSchemaJsonLd(routeData: RouteSchemaData, pathname: string): string {
  const schema = generateCombinedSchema(routeData, pathname);
  return JSON.stringify(schema, null, 2);
}

// Fonction pour valider un schéma (optionnel - pour le développement)
export function validateSchema(schema: any): boolean {
  try {
    // Vérifications basiques
    if (!schema["@context"] || !schema["@graph"]) {
      return false;
    }
    
    // Vérifier que chaque élément du graph a un @type
    for (const item of schema["@graph"]) {
      if (!item["@type"]) {
        return false;
      }
    }
    
    return true;
  } catch (error) {
    console.error('Schema validation error:', error);
    return false;
  }
}

// Export des constantes pour utilisation externe
export { APP_CONSTANTS };