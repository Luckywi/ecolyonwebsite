import { Metadata } from 'next'
import ConfidentialiteClient from './ConfidentialiteClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - EcoLyon',
  description: 'Politique de confidentialité de l\'application EcoLyon. Découvrez notre engagement envers votre vie privée : aucune collecte de données personnelles.',
  openGraph: {
    title: 'Politique de Confidentialité - EcoLyon',
    description: 'Politique de confidentialité de l\'application EcoLyon. Découvrez notre engagement envers votre vie privée : aucune collecte de données personnelles.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Politique de Confidentialité EcoLyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Politique de Confidentialité - EcoLyon',
    description: 'Politique de confidentialité de l\'application EcoLyon. Découvrez notre engagement envers votre vie privée : aucune collecte de données personnelles.',
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

export default function ConfidentialitePage() {
  return (
    <>
      <SchemaHead />
      <ConfidentialiteClient />
    </>
  )
}
