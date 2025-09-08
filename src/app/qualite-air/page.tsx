import { Metadata } from 'next'
import QualiteAirClient from './QualiteAirClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Qualité de l\'air à Lyon en temps réel',
  description: 'Consultez la qualité de l\'air à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes avec indice ATMO, polluants NO2, O3, PM2.5, PM10, SO2.',
  openGraph: {
    title: 'Qualité de l\'air à Lyon en temps réel | EcoLyon',
    description: 'Consultez la qualité de l\'air à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes avec indice ATMO, polluants NO2, O3, PM2.5, PM10, SO2.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Qualité de l\'air à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Qualité de l\'air à Lyon en temps réel | EcoLyon',
    description: 'Consultez la qualité de l\'air à Lyon en temps réel. Données ATMO Auvergne-Rhône-Alpes avec indice ATMO, polluants NO2, O3, PM2.5, PM10, SO2.',
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

export default function QualiteAirPage() {
  return (
    <>
      <SchemaHead />
      <QualiteAirClient />
    </>
  )
}