// src/app/infrastructure/bancs/page.tsx
import { Metadata } from 'next'
import BancsClient from './BancsClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Bancs publics à Lyon',
  description: 'Trouvez les bancs publics dans le Grand Lyon. Localisez facilement les espaces de repos dans votre quartier avec EcoLyon.',
  openGraph: {
    title: 'Bancs publics à Lyon | EcoLyon',
    description: 'Trouvez les bancs publics dans le Grand Lyon. Localisez facilement les espaces de repos dans votre quartier avec EcoLyon.',
    images: [
      {
        url: '/logos/banc.png',
        width: 512,
        height: 512,
        alt: 'Bancs publics Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Bancs publics à Lyon | EcoLyon',
    description: 'Trouvez les bancs publics dans le Grand Lyon. Localisez facilement les espaces de repos dans votre quartier avec EcoLyon.',
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

export default function BancsPage() {
  return (
    <>
      <SchemaHead />
      <BancsClient />
    </>
  )
}