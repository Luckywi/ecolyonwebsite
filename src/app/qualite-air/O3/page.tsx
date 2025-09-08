import { Metadata } from 'next'
import O3Client from './O3Client'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Ozone (O3) à Lyon - Qualité de l\'air',
  description: 'Suivez les niveaux d\'ozone (O3) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
  openGraph: {
    title: 'Ozone (O3) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux d\'ozone (O3) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air Lyon - Ozone (O3)',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Ozone (O3) à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux d\'ozone (O3) à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
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

export default function O3Page() {
  return (
    <>
      <SchemaHead />
      <O3Client />
    </>
  )
}