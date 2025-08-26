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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={roboto.variable}>
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