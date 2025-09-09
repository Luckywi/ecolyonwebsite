// src/components/layout/Header.tsx
'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import BubbleMenu from './BubbleMenuLazy'

const Header = () => {
  const [isMenuOpen] = useState(false)

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

  const items = [
  {
    label: 'QUALITÉ DE L\'AIR',
    href: '/qualite-air',
    ariaLabel: 'QUALITÉ DE L\'AIR',
    rotation: -8,
    hoverStyles: { bgColor: '#46952C', textColor: '#ffffff' }
  },
  {
    label: 'INFRASTRUCTURE',
    href: '/infrastructure',
    ariaLabel: 'INFRASTRUCTURE',
    rotation: 8,
    hoverStyles: { bgColor: '#46952C', textColor: '#ffffff' }
  },
  {
    label: 'COMPOST',
    href: '/compost',
    ariaLabel: 'COMPOST',
    rotation: -8,
    hoverStyles: { bgColor: '#46952C', textColor: '#ffffff' }
  }
];


  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])



return (
    <>
      <header className="w-full bg-[#F8F7F4] py-4 px-4 sm:px-6 lg:px-8 relative z-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo à gauche */}
            <div className="flex-shrink-0 z-50 relative">
              <Link href="/" className="flex items-center">
                <Image
                  src="/icons/ECOLYON.svg"
                  alt="EcoLyon"
                  width={120}
                  height={40}
                  className="h-8 w-auto lg:h-8"
                  priority
                />
              </Link>
            </div>

            {/* Navigation desktop - cachée sur mobile */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
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

      {/* Bubble Menu - visible uniquement sur mobile */}
      <div className="lg:hidden absolute top-0 right-0 w-full">
        <BubbleMenu
          items={items}
          menuAriaLabel="Toggle navigation"
          menuBg="#F8F7F4"
          menuContentColor="black"
          useFixedPosition={false}
          animationEase="back.out(1.5)"
          animationDuration={0.5}
          staggerDelay={0.12}
        />
      </div>
    </>
  )
}

export default Header