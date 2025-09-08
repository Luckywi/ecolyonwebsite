import { Metadata } from 'next'
import CompostClient from './CompostClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Compostage à Lyon - Guide complet',
  description: 'Tout savoir sur le compostage à Lyon : composteurs gratuits, guide pratique, points de collecte et formations. Réduisez vos déchets alimentaires.',
  openGraph: {
    title: 'Compostage à Lyon - Guide complet | EcoLyon',
    description: 'Tout savoir sur le compostage à Lyon : composteurs gratuits, guide pratique, points de collecte et formations. Réduisez vos déchets alimentaires.',
    images: [
      {
        url: '/logos/compost.png',
        width: 512,
        height: 512,
        alt: 'Compostage à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Compostage à Lyon - Guide complet | EcoLyon',
    description: 'Tout savoir sur le compostage à Lyon : composteurs gratuits, guide pratique, points de collecte et formations. Réduisez vos déchets alimentaires.',
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

export default function CompostPage() {
  return (
    <>
      <SchemaHead />
      <CompostClient />
    </>
  )
}