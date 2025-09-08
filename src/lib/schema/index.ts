// Export centralisé pour le système Schema.org EcoLyon

// Types
export type {
  RouteSchemaData,
  SchemaConfig,
  MobileApplicationSchema,
  WebPageSchema,
  ServiceSchema,
  BreadcrumbListSchema,
  OrganizationSchema,
  CombinedSchema
} from './types';

// Mappings
export {
  ROUTE_SCHEMA_MAPPINGS,
  getRouteSchemaData,
  generateKeywords
} from './mappings';

// Générateurs
export {
  generateMobileApplicationSchema,
  generateOrganizationSchema,
  generateServiceSchema,
  generateWebPageSchema,
  generateBreadcrumbSchema,
  generateCombinedSchema,
  generateSchemaJsonLd,
  validateSchema,
  APP_CONSTANTS
} from './generators';

// Composants
export { default as SchemaHead, useRouteSchema, SchemaDebugger } from '@/components/schema/SchemaHead';

// Import pour utilisation dans SchemaUtils
import { getRouteSchemaData, ROUTE_SCHEMA_MAPPINGS } from './mappings';

// Utilitaires pour tests et validation
export const SchemaUtils = {
  // Vérifier si une route a un mapping
  hasRouteMapping: (pathname: string): boolean => {
    return getRouteSchemaData(pathname) !== null;
  },
  
  // Obtenir toutes les routes mappées
  getAllMappedRoutes: (): string[] => {
    return Object.keys(ROUTE_SCHEMA_MAPPINGS);
  },
  
  // Obtenir les statistiques des mappings
  getMappingStats: () => {
    const routes = Object.keys(ROUTE_SCHEMA_MAPPINGS);
    const categories = Object.values(ROUTE_SCHEMA_MAPPINGS).reduce((acc, data) => {
      acc[data.category] = (acc[data.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return {
      totalRoutes: routes.length,
      categories,
      routes
    };
  }
};

// Export des constantes utiles
export const SCHEMA_CONSTANTS = {
  CONTEXT: "https://schema.org",
  APP_NAME: "EcoLyon",
  BASE_URL: "https://ecolyon.fr",
  APP_STORE_URL: "https://apps.apple.com/fr/app/ecolyon/id6747041717",
  SUPPORTED_ROUTES: Object.keys(ROUTE_SCHEMA_MAPPINGS)
} as const;