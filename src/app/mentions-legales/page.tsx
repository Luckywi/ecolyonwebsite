import { Metadata } from 'next'
import MentionsLegalesClient from './MentionsLegalesClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Mentions Légales - EcoLyon',
  description: 'Mentions légales de l\'application EcoLyon. Informations sur l\'éditeur, l\'hébergement, la propriété intellectuelle et les conditions d\'utilisation.',
  openGraph: {
    title: 'Mentions Légales - EcoLyon',
    description: 'Mentions légales de l\'application EcoLyon. Informations sur l\'éditeur, l\'hébergement, la propriété intellectuelle et les conditions d\'utilisation.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Mentions Légales EcoLyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Mentions Légales - EcoLyon',
    description: 'Mentions légales de l\'application EcoLyon. Informations sur l\'éditeur, l\'hébergement, la propriété intellectuelle et les conditions d\'utilisation.',
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

export default function MentionsLegalesPage() {
  return (
    <>
      <SchemaHead />
      <MentionsLegalesClient />
    </>
  )
}
