import { Metadata } from 'next'
import PM25Client from './PM25Client'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Particules ultrafines PM2.5 à Lyon - Qualité de l\'air',
  description: 'Suivez les niveaux de particules ultrafines PM2.5 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
  openGraph: {
    title: 'Particules ultrafines PM2.5 à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de particules ultrafines PM2.5 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air Lyon - Particules ultrafines PM2.5',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Particules ultrafines PM2.5 à Lyon - Qualité de l\'air | EcoLyon',
    description: 'Suivez les niveaux de particules ultrafines PM2.5 à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes pour surveiller la qualité de l\'air.',
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

export default function PM25Page() {
  return (
    <>
      <SchemaHead />
      <PM25Client />
    </>
  )
}