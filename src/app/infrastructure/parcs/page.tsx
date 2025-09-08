// src/app/infrastructure/parcs/page.tsx
import { Metadata } from 'next'
import ParcsClient from './ParcsClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Parcs et jardins - EcoLyon',
  description: 'Découvrez tous les parcs et jardins publics du Grand Lyon. Explorez de nouveaux espaces verts près de votre position avec l\'app EcoLyon. C\'est toujours mieux dans la nature !',
  openGraph: {
    title: 'Parcs et jardins | EcoLyon',
    description: 'Découvrez tous les parcs et jardins publics du Grand Lyon. Explorez de nouveaux espaces verts près de votre position avec l\'app EcoLyon. C\'est toujours mieux dans la nature !',
    images: [
      {
        url: '/logos/PetJ.png',
        width: 512,
        height: 512,
        alt: 'Parcs et jardins publics à Lyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Parcs et jardins | EcoLyon',
    description: 'Découvrez tous les parcs et jardins publics du Grand Lyon. Explorez de nouveaux espaces verts près de votre position avec l\'app EcoLyon. C\'est toujours mieux dans la nature !',
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

export default function ParcsPage() {
  return (
    <>
      <SchemaHead />
      <ParcsClient />
    </>
  )
}