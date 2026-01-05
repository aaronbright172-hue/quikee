'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    title: 'Premium Tech, Unbeatable Prices',
    subtitle: 'Discover evaluation units from top brands at up to 70% off retail.',
    image: 'https://images.unsplash.com/photo-1601971360277-7b4c8aa60894?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Browse All Products',
    ctaLink: '/category/all',
  },
  {
    title: 'Quality You Can Trust',
    subtitle: 'Every product is fully tested, certified, and guaranteed to perform.',
    image: 'https://images.unsplash.com/photo-1625155648806-a537ac845daf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Learn About Our Process',
    ctaLink: '/about',
  },
  {
    title: 'The Future of E-Bikes is Here',
    subtitle: 'Explore our new collection of high-performance electric bikes.',
    image: 'https://images.unsplash.com/photo-1599355397843-718871791ad3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Shop E-Bikes',
    ctaLink: '/category/e-bikes',
  },
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 7000); // Increased interval for better readability

    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={currentSlide.image}
          alt={currentSlide.title}
          className={`w-full h-full object-cover transition-transform duration-1000 transform scale-105 ${
            currentIndex === 0 ? 'object-position-[50%_30%]' : ''
          } ${
            currentIndex === 1 ? 'object-center' : ''
          }`}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
          {currentSlide.title}
        </h1>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto mb-8">
          {currentSlide.subtitle}
        </p>
        <Link
          href={currentSlide.ctaLink}
          className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-200 transition-colors"
        >
          {currentSlide.ctaText}
        </Link>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? 'w-8 bg-white' : 'w-4 bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
