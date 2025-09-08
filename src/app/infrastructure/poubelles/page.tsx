// src/app/infrastructure/poubelles/page.tsx
import { Metadata } from 'next'
import PoubellsClient from './PoubellsClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Poubelles publiques - EcoLyon',
  description: 'Localisez toutes les poubelles publiques du Grand Lyon. Trouvez la poubelle la plus proche de votre position grâce à l\'app EcoLyon. Plus d\'excuse pour les déchets abandonnés !',
  openGraph: {
    title: 'Poubelles publiques | EcoLyon',
    description: 'Localisez toutes les poubelles publiques du Grand Lyon. Trouvez la poubelle la plus proche de votre position grâce à l\'app EcoLyon. Plus d\'excuse pour les déchets abandonnés !',
    images: [
      {
        url: '/logos/poubelle.png',
        width: 512,
        height: 512,
        alt: 'Poubelles publiques à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Poubelles publiques | EcoLyon',
    description: 'Localisez toutes les poubelles publiques du Grand Lyon. Trouvez la poubelle la plus proche de votre position grâce à l\'app EcoLyon. Plus d\'excuse pour les déchets abandonnés !',
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

export default function PoubellsPage() {
  return (
    <>
      <SchemaHead />
      <PoubellsClient />
    </>
  )
}