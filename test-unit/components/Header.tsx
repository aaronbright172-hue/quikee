'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ShoppingCart, Menu, X } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import productsData from '@/data/products.json';

export default function Header() {
  const { currency, currencies, setCurrency } = useCurrency();
  const { cartCount, setIsCartOpen } = useCart();
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isShopPinned, setIsShopPinned] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();
  const isHomePage = pathname === '/';

  const categories = productsData.categories;

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight * 0.25; // 25% of viewport height
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    // Set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShopClick = () => {
    setIsShopPinned(!isShopPinned);
    setIsShopOpen(true);
  };

  const handleShopMenuClose = () => {
    setIsShopOpen(false);
    setIsShopPinned(false);
  };

  const isAtTopAndHomePage = isHomePage && !isScrolled;

  const headerClasses = `-translate-y-px sticky top-0 z-50 w-full border-b transition-all duration-300 ${
    isAtTopAndHomePage
      ? 'border-transparent bg-transparent text-white'
      : 'border-neutral-200 bg-white/90 backdrop-blur-sm text-black'
  }`;

  const linkClasses = `transition-colors ${
    isAtTopAndHomePage ? 'hover:text-white/80' : 'hover:text-black'
  }`;

  const iconButtonClasses = `relative p-2 rounded-lg transition-colors ${
    isAtTopAndHomePage ? 'hover:bg-white/10' : 'hover:bg-neutral-100'
  }`;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold tracking-tight">
              <span className={isAtTopAndHomePage ? 'text-white' : 'text-black'}>2FAST</span>
              <span className={isAtTopAndHomePage ? 'text-white/80' : 'text-neutral-600'}> TECH</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Shop Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsShopOpen(true)}
              onMouseLeave={() => !isShopPinned && setIsShopOpen(false)}
            >
              <button
                onClick={handleShopClick}
                className={`flex items-center space-x-1 font-medium ${linkClasses}`}
              >
                <span>Shop</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isShopOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={handleShopMenuClose}
                  />
                  <div className="absolute text-black top-full left-0 mt-2 w-64 bg-white border border-neutral-200 rounded-lg shadow-xl py-2 z-20">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        onClick={handleShopMenuClose}
                        className="block px-4 py-3 hover:bg-neutral-50 transition-colors"
                      >
                        <div className="font-medium text-black">{category.name}</div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Link href="/about" className={`font-medium ${linkClasses}`}>
              About
            </Link>

            <Link href="/faq" className={`font-medium ${linkClasses}`}>
              FAQ
            </Link>

            <Link href="/contact" className={`font-medium ${linkClasses}`}>
              Contact
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isAtTopAndHomePage ? 'hover:bg-white/10' : 'hover:bg-neutral-100'
                }`}
              >
                <span className="font-medium text-sm">
                  {currency.flag} {currency.code}
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {isCurrencyOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsCurrencyOpen(false)}
                  />
                  <div className="absolute text-black top-full right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-lg shadow-xl py-2 max-h-96 overflow-y-auto z-20">
                    {currencies.map((curr) => (
                      <button
                        key={curr.code}
                        onClick={() => {
                          setCurrency(curr);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors ${
                          curr.code === currency.code ? 'bg-neutral-100' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{curr.flag} {curr.code}</span>
                          <span className="text-sm text-neutral-500">{curr.symbol}</span>
                        </div>
                        <div className="text-sm text-neutral-500">{curr.name}</div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={iconButtonClasses}
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden ${iconButtonClasses}`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white text-black border-t border-neutral-200 py-4 space-y-2">
            <div className="space-y-1">
              <div className="px-4 py-2 font-medium text-neutral-900">Shop</div>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="block px-6 py-2 text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <Link
              href="/about"
              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>

            <Link
              href="/faq"
              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </Link>

            <Link
              href="/contact"
              className="block px-4 py-2 text-neutral-700 hover:bg-neutral-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
