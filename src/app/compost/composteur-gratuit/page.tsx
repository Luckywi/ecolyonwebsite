import { Metadata } from 'next'
import ComposteurGratuitClient from './ComposteurGratuitClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Composteur gratuit - Métropole de Lyon',
  description: 'Obtenez gratuitement un composteur de la Métropole de Lyon. Plus de 24 000 composteurs distribués pour réduire vos déchets alimentaires.',
  openGraph: {
    title: 'Composteur gratuit - Métropole de Lyon | EcoLyon',
    description: 'Obtenez gratuitement un composteur de la Métropole de Lyon. Plus de 24 000 composteurs distribués pour réduire vos déchets alimentaires.',
    images: [
      {
        url: '/logos/compostGratuit.png',
        width: 512,
        height: 512,
        alt: 'Composteur gratuit Métropole de Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Composteur gratuit - Métropole de Lyon | EcoLyon',
    description: 'Obtenez gratuitement un composteur de la Métropole de Lyon. Plus de 24 000 composteurs distribués pour réduire vos déchets alimentaires.',
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

export default function ComposteurGratuitPage() {
  return (
    <>
      <SchemaHead />
      <ComposteurGratuitClient />
    </>
  )
}