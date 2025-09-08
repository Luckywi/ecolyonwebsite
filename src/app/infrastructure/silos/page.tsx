// src/app/infrastructure/silos/page.tsx
import { Metadata } from 'next'
import SilosClient from './SilosClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Silos à verre - EcoLyon',
  description: 'Géolocalisez tous les silos à verre et points de tri sélectif du Grand Lyon. Trouvez le silo le plus proche avec l\'app EcoLyon. Le tri, ce n\'est pas qu\'à la maison !',
  openGraph: {
    title: 'Silos à verre | EcoLyon',
    description: 'Géolocalisez tous les silos à verre et points de tri sélectif du Grand Lyon. Trouvez le silo le plus proche avec l\'app EcoLyon. Le tri, ce n\'est pas qu\'à la maison !',
    images: [
      {
        url: '/logos/SIlos.png',
        width: 512,
        height: 512,
        alt: 'Silos à verre et tri sélectif à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Silos à verre | EcoLyon',
    description: 'Géolocalisez tous les silos à verre et points de tri sélectif du Grand Lyon. Trouvez le silo le plus proche avec l\'app EcoLyon. Le tri, ce n\'est pas qu\'à la maison !',
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

export default function SilosPage() {
  return (
    <>
      <SchemaHead />
      <SilosClient />
    </>
  )
}