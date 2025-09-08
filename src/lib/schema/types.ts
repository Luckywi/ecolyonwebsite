// Types pour le système de Schema.org adaptatif

export interface RouteSchemaData {
  title: string;
  description: string;
  featureList: string[];
  serviceType: string;
  category: 'infrastructure' | 'air-quality' | 'compost' | 'general';
  keywords?: string[];
}

export interface SchemaConfig {
  route: string;
  data: RouteSchemaData;
}

export interface MobileApplicationSchema {
  "@context": string;
  "@type": string[];
  name: string;
  alternateName?: string;
  description: string;
  applicationCategory: string;
  operatingSystem: string;
  url: string;
  downloadUrl: string;
  author: {
    "@type": string;
    name: string;
  };
  offers: {
    "@type": string;
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    "@type": string;
    ratingValue: string;
    ratingCount: string;
  };
  featureList: string[];
}

export interface WebPageSchema {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  mainEntity: ServiceSchema;
  isPartOf: {
    "@type": string;
    name: string;
    url: string;
  };
  breadcrumb?: BreadcrumbListSchema;
}

export interface ServiceSchema {
  "@type": string;
  name: string;
  description: string;
  provider: {
    "@type": string;
    name: string;
  };
  serviceType: string;
  areaServed: {
    "@type": string;
    name: string;
  };
  availableChannel?: {
    "@type": string;
    serviceUrl: string;
  };
}

export interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

export interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  alternateName?: string;
  url: string;
  sameAs: string[];
  description: string;
  foundingDate?: string;
  contactPoint?: {
    "@type": string;
    contactType: string;
    availableLanguage: string;
  };
}

export interface CombinedSchema {
  "@context": string;
  "@graph": Array<MobileApplicationSchema | WebPageSchema | OrganizationSchema | ServiceSchema>;
}