// src/app/infrastructure/compost/page.tsx
import { Metadata } from 'next'
import CompostClient from './CompostClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Bornes à compost - EcoLyon',
  description: 'Trouvez toutes les bornes à compost collectif du Grand Lyon. Géolocalisez le point de compostage le plus proche avec l\'app EcoLyon. Le compostage, c\'est aussi possible en dehors de chez soi !',
  openGraph: {
    title: 'Bornes à compost | EcoLyon',
    description: 'Trouvez toutes les bornes à compost collectif du Grand Lyon. Géolocalisez le point de compostage le plus proche avec l\'app EcoLyon. Le compostage, c\'est aussi possible en dehors de chez soi !',
    images: [
      {
        url: '/logos/compost.png',
        width: 512,
        height: 512,
        alt: 'Bornes à compost collectif à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Bornes à compost | EcoLyon',
    description: 'Trouvez toutes les bornes à compost collectif du Grand Lyon. Géolocalisez le point de compostage le plus proche avec l\'app EcoLyon. Le compostage, c\'est aussi possible en dehors de chez soi !',
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