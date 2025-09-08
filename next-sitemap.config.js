/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://ecolyon.fr',
  generateRobotsTxt: true, // Génère aussi robots.txt
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/api/*', // Exclure les routes API
    '/server-sitemap-index.xml', // Exclure le sitemap serveur si utilisé
  ],
  additionalPaths: async (config) => {
    const result = []

    // Pages principales avec priorité élevée
    const mainPages = [
      { loc: '/', priority: 1.0, changefreq: 'weekly' },
      { loc: '/qualite-air', priority: 0.9, changefreq: 'daily' },
      { loc: '/infrastructure', priority: 0.9, changefreq: 'weekly' },
      { loc: '/compost', priority: 0.9, changefreq: 'weekly' },
    ]

    // Pages de qualité d'air
    const airQualityPages = [
      '/qualite-air/NO2',
      '/qualite-air/O3', 
      '/qualite-air/PM10',
      '/qualite-air/PM2.5',
      '/qualite-air/SO2'
    ]

    // Pages d'infrastructure
    const infrastructurePages = [
      '/infrastructure/bancs',
      '/infrastructure/compost',
      '/infrastructure/fontaines',
      '/infrastructure/parcs',
      '/infrastructure/poubelles',
      '/infrastructure/randonnees',
      '/infrastructure/silos',
      '/infrastructure/stations',
      '/infrastructure/toilettes'
    ]

    // Pages de compost
    const compostPages = [
      '/compost/composteur-gratuit',
      '/compost/guide'
    ]

    // Pages légales
    const legalPages = [
      { loc: '/mentions-legales', priority: 0.3, changefreq: 'yearly' },
      { loc: '/confidentialite', priority: 0.3, changefreq: 'yearly' },
      { loc: '/contact', priority: 0.5, changefreq: 'monthly' }
    ]

    // Ajouter les pages principales
    mainPages.forEach(page => {
      result.push({
        loc: page.loc,
        priority: page.priority,
        changefreq: page.changefreq,
        lastmod: new Date().toISOString(),
      })
    })

    // Ajouter les pages de qualité d'air
    airQualityPages.forEach(page => {
      result.push({
        loc: page,
        priority: 0.8,
        changefreq: 'daily', // Données mises à jour quotidiennement
        lastmod: new Date().toISOString(),
      })
    })

    // Ajouter les pages d'infrastructure
    infrastructurePages.forEach(page => {
      result.push({
        loc: page,
        priority: 0.7,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      })
    })

    // Ajouter les pages de compost
    compostPages.forEach(page => {
      result.push({
        loc: page,
        priority: 0.8,
        changefreq: 'weekly',
        lastmod: new Date().toISOString(),
      })
    })

    // Ajouter les pages légales
    legalPages.forEach(page => {
      result.push({
        loc: page.loc,
        priority: page.priority,
        changefreq: page.changefreq,
        lastmod: new Date().toISOString(),
      })
    })

    return result
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 1,
      },
    ],
    additionalSitemaps: [
      'https://ecolyon.fr/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Configuration personnalisée pour certaines routes
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
        alternateRefs: [
          {
            href: 'https://ecolyon.fr',
            hreflang: 'fr',
          },
        ],
      }
    }

    // Configuration par défaut
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
      alternateRefs: [
        {
          href: `https://ecolyon.fr${path}`,
          hreflang: 'fr',
        },
      ],
    }
  },
}