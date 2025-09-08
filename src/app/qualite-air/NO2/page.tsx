// src/app/qualite-air/NO2/page.tsx
import { Metadata } from 'next'
import NO2Client from './NO2Client'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Dioxyde d\'azote (NO2) à Lyon - Qualité de l\'air',
  description: 'Suivez les niveaux de dioxyde d\'azote (NO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
  openGraph: {
    title: 'Dioxyde d\'azote (NO2) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de dioxyde d\'azote (NO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air Lyon - Dioxyde d\'azote (NO2)',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Dioxyde d\'azote (NO2) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de dioxyde d\'azote (NO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    app: {
      name: 'EcoLyon',
      id: {
        iphone: '6747041717',
        ipad: '6747041717',
      },
      url: {
        iphone: 'https://apps.apple.com/app/id6747041717',
        ipad: 'https://apps.apple.com/app/id6747041717',
      }
    }
  },
}

export default function NO2Page() {
  return (
    <>
      <SchemaHead />
      <NO2Client />
    </>
  )
}