// Composant SchemaHead adaptatif pour EcoLyon
'use client';

import { usePathname } from 'next/navigation';
import { getRouteSchemaData } from '@/lib/schema/mappings';
import { generateSchemaJsonLd } from '@/lib/schema/generators';

interface SchemaHeadProps {
  // Props optionnelles pour override manuel si nécessaire
  customTitle?: string;
  customDescription?: string;
  customFeatureList?: string[];
}

export default function SchemaHead({ 
  customTitle, 
  customDescription, 
  customFeatureList 
}: SchemaHeadProps) {
  const pathname = usePathname();
  
  // Récupération des données de la route courante
  const routeData = getRouteSchemaData(pathname);
  
  if (!routeData) {
    console.warn(`Aucune donnée schema trouvée pour la route: ${pathname}`);
    return null;
  }

  // Override des données si props personnalisées fournies
  const finalRouteData = {
    ...routeData,
    ...(customTitle && { title: customTitle }),
    ...(customDescription && { description: customDescription }),
    ...(customFeatureList && { featureList: customFeatureList })
  };

  // Génération du JSON-LD
  const schemaJsonLd = generateSchemaJsonLd(finalRouteData, pathname);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJsonLd }}
      suppressHydrationWarning={true}
    />
  );
}

// Export d'un hook personnalisé pour accéder aux données de schema
export function useRouteSchema() {
  const pathname = usePathname();
  return getRouteSchemaData(pathname);
}

// Composant dédié pour le développement (affichage debug)
export function SchemaDebugger() {
  const pathname = usePathname();
  const routeData = getRouteSchemaData(pathname);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  if (!routeData) {
    return (
      <div style={{ 
        position: 'fixed', 
        bottom: '10px', 
        right: '10px', 
        background: 'red', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '5px',
        fontSize: '12px',
        zIndex: 9999 
      }}>
        ⚠️ Aucun schema pour: {pathname}
      </div>
    );
  }

  const schemaJsonLd = generateSchemaJsonLd(routeData, pathname);

  return (
    <details style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '10px',
      maxWidth: '300px',
      maxHeight: '200px',
      overflow: 'auto',
      zIndex: 9999 
    }}>
      <summary>🔍 Schema.org Debug</summary>
      <pre style={{ fontSize: '8px', overflow: 'auto' }}>
        {schemaJsonLd}
      </pre>
    </details>
  );
}