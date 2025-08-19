// src/components/layout/Header.tsx
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    <header className="w-full bg-[#F8F7F4] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
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
          <nav className="flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="relative px-4 py-2 text-black font-normal text-sm tracking-wide uppercase transition-all duration-300 ease-in-out hover:text-ecolyon-green group"
              >
                <span className="relative z-10">
                  {item.label}
                </span>
                {/* Effet de soulignement au hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-ecolyon-green transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header