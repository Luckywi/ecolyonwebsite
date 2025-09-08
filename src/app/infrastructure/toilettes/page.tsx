// src/app/infrastructure/toilettes/page.tsx
import { Metadata } from 'next'
import ToilettesClient from './ToilettesClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Toilettes publiques - EcoLyon',
  description: 'Localisez toutes les toilettes publiques du Grand Lyon. Trouvez instantanément les WC gratuits et accessibles près de vous avec l\'app EcoLyon. Des toilettes partout à Lyon !',
  openGraph: {
    title: 'Toilettes publiques | EcoLyon',
    description: 'Localisez toutes les toilettes publiques du Grand Lyon. Trouvez instantanément les WC gratuits et accessibles près de vous avec l\'app EcoLyon. Des toilettes partout à Lyon !',
    images: [
      {
        url: '/logos/wc.png',
        width: 512,
        height: 512,
        alt: 'Toilettes publiques à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Toilettes publiques | EcoLyon',
    description: 'Localisez toutes les toilettes publiques du Grand Lyon. Trouvez instantanément les WC gratuits et accessibles près de vous avec l\'app EcoLyon. Des toilettes partout à Lyon !',
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

export default function ToilettesPage() {
  return (
    <>
      <SchemaHead />
      <ToilettesClient />
    </>
  )
}