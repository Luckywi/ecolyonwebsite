// page.tsx
import Hero from '@/components/landing/Hero';
import Infra from '@/components/landing/Infra';
import Bubble from '@/components/landing/Bubble';

export default function Home() {
  return (
    <main>
      <Hero />
      <Infra /> 
      <Bubble />

      {/* Autres sections */}
    </main>
  );
}