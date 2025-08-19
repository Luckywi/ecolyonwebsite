// page.tsx
import Hero from '@/components/landing/Hero';
import Infra from '@/components/landing/Infra';
import InfraBubble from '@/components/landing/InfraBubble';

export default function Home() {
  return (
    <main>
      <Hero />
      <Infra />
       <InfraBubble />
      {/* Autres sections */}
    </main>
  );
}