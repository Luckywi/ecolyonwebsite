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
    <header className="w-full bg-[#F8F7F4] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo à gauche */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/icons/ECOLYON.svg"
                alt="EcoLyon"
                width={140}
                height={50}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation à droite */}
          <nav className="flex items-center">
            {navigationItems.map((item, index) => (
              <React.Fragment key={item.href}>
                <Link
                  href={item.href}
                  className="px-6 py-2 text-black font-medium text-sm tracking-wide hover:text-green-600 transition-colors duration-200"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  {item.label}
                </Link>
                {index < navigationItems.length - 1 && (
                  <div className="w-px h-5 bg-gray-400 mx-4"></div>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header