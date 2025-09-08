import { Metadata } from 'next'
import PM10Client from './PM10Client'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Particules fines PM10 à Lyon - Qualité de l\'air',
  description: 'Suivez les niveaux de particules fines PM10 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
  openGraph: {
    title: 'Particules fines PM10 à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de particules fines PM10 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air Lyon - Particules fines PM10',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Particules fines PM10 à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de particules fines PM10 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
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

export default function PM10Page() {
  return (
    <>
      <SchemaHead />
      <PM10Client />
    </>
  )
}