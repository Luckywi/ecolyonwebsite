// src/app/infrastructure/fontaines/page.tsx
import { Metadata } from 'next'
import FontainesClient from './FontainesClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Fontaines d\'eau potable - EcoLyon',
  description: 'Trouvez toutes les fontaines d\'eau potable du Grand Lyon. Géolocalisez la fontaine la plus proche et naviguez vers elle grâce à l\'app EcoLyon. De l\'eau potable gratuite partout !',
  openGraph: {
    title: 'Fontaines d\'eau potable | EcoLyon',
    description: 'Trouvez toutes les fontaines d\'eau potable du Grand Lyon. Géolocalisez la fontaine la plus proche et naviguez vers elle grâce à l\'app EcoLyon. De l\'eau potable gratuite partout !',
    images: [
      {
        url: '/logos/Fontaine.png',
        width: 512,
        height: 512,
        alt: 'Fontaines d\'eau potable à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Fontaines d\'eau potable | EcoLyon',
    description: 'Trouvez toutes les fontaines d\'eau potable du Grand Lyon. Géolocalisez la fontaine la plus proche et naviguez vers elle grâce à l\'app EcoLyon. De l\'eau potable gratuite partout !',
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

export default function FontainesPage() {
  return (
    <>
      <SchemaHead />
      <FontainesClient />
    </>
  )
}