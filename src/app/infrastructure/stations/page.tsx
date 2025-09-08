// src/app/infrastructure/stations/page.tsx
import { Metadata } from 'next'
import StationsClient from './StationsClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Stations de recharge électrique - EcoLyon',
  description: 'Trouvez toutes les stations de recharge électrique du Grand Lyon. Localisez les bornes disponibles près de votre position avec l\'app EcoLyon. Rechargez partout !',
  openGraph: {
    title: 'Stations de recharge électrique | EcoLyon',
    description: 'Trouvez toutes les stations de recharge électrique du Grand Lyon. Localisez les bornes disponibles près de votre position avec l\'app EcoLyon. Rechargez partout !',
    images: [
      {
        url: '/logos/borne.png',
        width: 512,
        height: 512,
        alt: 'Stations de recharge électrique à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Stations de recharge électrique | EcoLyon',
    description: 'Trouvez toutes les stations de recharge électrique du Grand Lyon. Localisez les bornes disponibles près de votre position avec l\'app EcoLyon. Rechargez partout !',
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

export default function StationsPage() {
  return (
    <>
      <SchemaHead />
      <StationsClient />
    </>
  )
}