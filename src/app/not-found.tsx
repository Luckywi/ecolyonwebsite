import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShinyButton } from '@/components/magicui/shiny-button'

export const metadata: Metadata = {
  title: 'Page non trouvée - EcoLyon',
  description: 'La page que vous recherchez n\'existe pas. Retournez à l\'accueil pour découvrir l\'écologie lyonnaise.',
  robots: 'noindex, nofollow'
}

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-200px)] bg-[#F8F7F4] flex items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Image d'illustration */}
        <div className="mb-8">
          <Image
            src="/icons/LYON.png"
            alt="Lyon - Retour à l'accueil EcoLyon"
            width={240}
            height={240}
            className="w-48 h-48 lg:w-60 lg:h-60 mx-auto opacity-50"
            priority
          />
        </div>

        {/* Code d'erreur stylisé */}
        <div className="mb-6">
          <h1 className="text-8xl lg:text-9xl font-light text-ecolyon-green">
            404
          </h1>
        </div>

        {/* Message principal */}
        <div className="mb-8">
          <h2 className="text-3xl lg:text-4xl font-light text-black mb-4">
            Page non trouvée
          </h2>
        </div>

        {/* Actions proposées */}
        <div className="space-y-6 mb-12">
          
          {/* Bouton retour accueil */}
          <div>
            <Link href="/">
              <ShinyButton className="bg-ecolyon-green hover:bg-ecolyon-green-dark text-white px-8 py-3 text-lg">
                Retour à l&apos;accueil
              </ShinyButton>
            </Link>
          </div>

          {/* Navigation rapide */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Link 
              href="/qualite-air" 
              className="px-4 py-2 text-ecolyon-green border border-ecolyon-green rounded-lg hover:bg-ecolyon-green hover:text-white transition-colors duration-200"
            >
              Qualité de l&apos;air
            </Link>
            <Link 
              href="/infrastructure" 
              className="px-4 py-2 text-ecolyon-green border border-ecolyon-green rounded-lg hover:bg-ecolyon-green hover:text-white transition-colors duration-200"
            >
              Infrastructure
            </Link>
            <Link 
              href="/compost" 
              className="px-4 py-2 text-ecolyon-green border border-ecolyon-green rounded-lg hover:bg-ecolyon-green hover:text-white transition-colors duration-200"
            >
              Compost
            </Link>
          </div>
        </div>

        {/* Suggestion d'aide */}
        <div className="text-sm text-gray-500">
          <p>
            Vous pensez qu&apos;il s&apos;agit d&apos;une erreur ? {' '}
            <Link 
              href="/contact" 
              className="text-ecolyon-green hover:underline"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}