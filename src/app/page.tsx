import { Metadata } from 'next'
import Hero from '@/components/landing/Hero';
import Infra from '@/components/landing/Infra';
import Bubble from '@/components/landing/Bubble';
import Dock from '@/components/infrastructure/Dock';
import SchemaHead from '@/components/schema/SchemaHead';

export const metadata: Metadata = {
  title: 'EcoLyon - Lyon connectée à son environnement',
  description: 'Découvrez Lyon sous un angle écologique : qualité de l\'air en temps réel, infrastructures vertes, compostage urbain. L\'application gratuite pour une métropole plus durable.',
  keywords: ['Lyon', 'écologie', 'qualité air', 'ATMO', 'compost', 'infrastructure verte', 'environnement urbain', 'développement durable', 'métropole', 'pollution'],
  openGraph: {
    title: 'EcoLyon - Lyon connectée à son environnement',
    description: 'Découvrez Lyon sous un angle écologique : qualité de l\'air en temps réel, infrastructures vertes, compostage urbain. L\'application gratuite pour une métropole plus durable.',
    url: 'https://ecolyon.fr',
    siteName: 'EcoLyon',
    images: [
      {
        url: '/icons/LYON.png',
        width: 480,
        height: 480,
        alt: 'EcoLyon - Lyon écologique et connectée',
      }
    ],
    type: 'website',
  },
  twitter: {
    card: 'app',
    title: 'EcoLyon - Lyon connectée à son environnement',
    description: 'Découvrez Lyon sous un angle écologique : qualité de l\'air en temps réel, infrastructures vertes, compostage urbain. L\'application gratuite pour une métropole plus durable.',
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

export default function Home() {
  return (
    <>
      <SchemaHead />
      <main>
        <Hero />
        <Infra /> 
        <Bubble />
        
        {/* Dock visible uniquement sur mobile pour remplacer Bubble */}
        <section className="lg:hidden py-6 bg-[#F8F7F4]">
          <Dock isHomePage={true} />
        </section>

        {/* Autres sections */}
      </main>
    </>
  );
}