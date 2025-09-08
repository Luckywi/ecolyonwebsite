import { Metadata } from 'next'
import ContactClient from './ContactClient'
import SchemaHead from '@/components/schema/SchemaHead'

export const metadata: Metadata = {
  title: 'Contact - EcoLyon',
  description: 'Contactez l\'équipe EcoLyon. Questions, suggestions ou problèmes techniques, nous sommes là pour vous aider.',
  openGraph: {
    title: 'Contact - EcoLyon',
    description: 'Contactez l\'équipe EcoLyon. Questions, suggestions ou problèmes techniques, nous sommes là pour vous aider.',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'Contact EcoLyon',
      }
    ],
  },
  twitter: {
    card: 'app',
    title: 'Contact - EcoLyon',
    description: 'Contactez l\'équipe EcoLyon. Questions, suggestions ou problèmes techniques, nous sommes là pour vous aider.',
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

export default function ContactPage() {
  return (
    <>
      <SchemaHead />
      <ContactClient />
    </>
  )
}