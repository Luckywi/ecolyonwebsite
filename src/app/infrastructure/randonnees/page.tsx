// src/app/infrastructure/randonnees/page.tsx
import { Metadata } from 'next'
import RandonneesClient from './RandonneesClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Sentiers de randonnée - EcoLyon',
  description: 'Découvrez toutes les boucles de randonnée du Grand Lyon. Explorez les sentiers avec difficulté, distance et dénivelé. Naviguez vers le point de départ avec l\'app EcoLyon.',
  openGraph: {
    title: 'Sentiers de randonnée | EcoLyon',
    description: 'Découvrez toutes les boucles de randonnée du Grand Lyon. Explorez les sentiers avec difficulté, distance et dénivelé. Naviguez vers le point de départ avec l\'app EcoLyon.',
    images: [
      {
        url: '/logos/Rando.png',
        width: 512,
        height: 512,
        alt: 'Randonnées et sentiers à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Sentiers de randonnée | EcoLyon',
    description: 'Découvrez toutes les boucles de randonnée du Grand Lyon. Explorez les sentiers avec difficulté, distance et dénivelé. Naviguez vers le point de départ avec l\'app EcoLyon.',
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

export default function RandonneesPage() {
  return (
    <>
      <SchemaHead />
      <RandonneesClient />
    </>
  )
}