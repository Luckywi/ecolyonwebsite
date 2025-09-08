// src/app/layout.tsx
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

// Configuration de la police Roboto
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: {
    default: 'EcoLyon - Lyon connectée à son environnement',
    template: '%s | EcoLyon'
  },
  description: 'Découvrez la qualité de l\'air, les infrastructures écologiques et le compostage à Lyon. Application mobile pour une ville plus verte.',
  keywords: ['Lyon', 'écologie', 'qualité air', 'compost', 'infrastructure', 'environnement'],
  authors: [{ name: 'EcoLyon' }],
  creator: 'EcoLyon',
  publisher: 'EcoLyon',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ecolyon.fr'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'EcoLyon - Lyon connectée à son environnement',
    description: 'Découvrez la qualité de l\'air, les infrastructures écologiques et le compostage à Lyon. Application mobile pour une ville plus verte.',
    url: 'https://ecolyon.fr',
    siteName: 'EcoLyon',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'EcoLyon - Lyon connectée à son environnement',
      }
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'app',
    title: 'EcoLyon - Lyon connectée à son environnement',
    description: 'Découvrez la qualité de l\'air, les infrastructures écologiques et le compostage à Lyon. Application mobile pour une ville plus verte.',
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={roboto.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#F8F7F4" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-itunes-app" content="app-id=6747041717" />
      </head>
      <body className={`${roboto.className} bg-[#F8F7F4] antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}