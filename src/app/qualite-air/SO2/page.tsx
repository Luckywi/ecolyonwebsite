import { Metadata } from 'next'
import SO2Client from './SO2Client'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Dioxyde de soufre (SO2) à Lyon - Qualité de l\'air',
  description: 'Suivez les niveaux de dioxyde de soufre (SO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
  openGraph: {
    title: 'Dioxyde de soufre (SO2) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de dioxyde de soufre (SO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air Lyon - Dioxyde de soufre (SO2)',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Dioxyde de soufre (SO2) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de dioxyde de soufre (SO2) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
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

export default function SO2Page() {
  return (
    <>
      <SchemaHead />
      <SO2Client />
    </>
  )
}