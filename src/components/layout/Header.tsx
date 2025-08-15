// src/components/layout/Header.tsx
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  const navigationItems = [
    {
      label: 'QUALITÉ DE L\'AIR',
      href: '/qualite-air',
    },
    {
      label: 'INFRASTRUCTURE',
      href: '/infrastructure',
    },
    {
      label: 'COMPOST',
      href: '/compost',
    },
  ]

  return (
    <header className="w-full bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/ECOLYON.svg"
                alt="EcoLyon"
                width={120}
                height={40}
                className="h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation à droite */}
          <nav className="flex space-x-4">
            {navigationItems.map((item, index) => (
              <>
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-6 py-3 text-black font-semibold text-base tracking-wide hover:bg-gray-100 rounded-lg transition-all duration-200"
                  style={{ color: 'black', textDecoration: 'none' }}
                >
                  {item.label}
                </Link>
                {index < navigationItems.length - 1 && (
                  <div className="w-0.5 h-8 bg-gray-400"></div>
                )}
              </>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header