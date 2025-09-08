// src/app/infrastructure/page.tsx
import { Metadata } from 'next'
import InfrastructureClient from './InfrastructureClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Infrastructures publiques du Grand Lyon',
  description: 'Découvrez les infrastructures publiques du Grand Lyon : bancs, fontaines, composteurs, toilettes, stations vélo, poubelles et plus encore.',
  openGraph: {
    title: 'Infrastructures publiques du Grand Lyon | EcoLyon',
    description: 'Découvrez les infrastructures publiques du Grand Lyon : bancs, fontaines, composteurs, toilettes, stations vélo, poubelles et plus encore.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Infrastructures publiques Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Infrastructures publiques du Grand Lyon | EcoLyon',
    description: 'Découvrez les infrastructures publiques du Grand Lyon : bancs, fontaines, composteurs, toilettes, stations vélo, poubelles et plus encore.',
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

export default function InfrastructurePage() {
  return (
    <>
      <SchemaHead />
      <InfrastructureClient />
    </>
  )
}