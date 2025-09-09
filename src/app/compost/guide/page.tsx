import { Metadata } from 'next'
import GuideClient from './GuideClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Guide du compost Lyonnais - EcoLyon',
  description: 'Découvrez le parcours complet de vos déchets alimentaires dans les bornes à compost de la Métropole de Lyon. Du tri à la valorisation locale.',
  openGraph: {
    title: 'Guide du compost Lyonnais | EcoLyon',
    description: 'Découvrez le parcours complet de vos déchets alimentaires dans les bornes à compost de la Métropole de Lyon. Du tri à la valorisation locale.',
    images: [
      {
        url: '/logos/pannier.png',
        width: 512,
        height: 512,
        alt: 'Guide du compost Lyonnais',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Guide du compost Lyonnais | EcoLyon',
    description: 'Découvrez le parcours complet de vos déchets alimentaires dans les bornes à compost de la Métropole de Lyon. Du tri à la valorisation locale.',
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

export default function GuidePage() {
  return (
    <>
      <SchemaHead />
      <GuideClient />
    </>
  )
}