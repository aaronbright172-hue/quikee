'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import productsData from '@/data/products.json';

const categoryImages = [
  'https://images.unsplash.com/photo-1624243519828-52a0f2c88af3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // E-Bikes
  'https://images.unsplash.com/photo-1623593476267-c7e98d1fb572?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',  // Phones & Tablets
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Laptops
  'https://images.unsplash.com/photo-1763041821558-13fb6264be3f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZSUyMGJpa2UlMjBhY2Nlc3Nvcmllc3xlbnwwfHwwfHx8MA%3D%3D' // Accessories
];

export default function CategoryCarousel() {
  const categories = productsData.categories;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % categories.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const currentCategory = categories[currentIndex];
  const currentImage = categoryImages[currentIndex];

  return (
    <section className="relative w-full h-screen bg-neutral-900 overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src={currentImage}
          alt={currentCategory.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 via-neutral-800/50 to-black/50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          {/* Category Name */}
          <div className="mb-8 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/80 text-sm font-medium mb-6">
              Category {currentIndex + 1} of {categories.length}
            </span>
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
              {currentCategory.name}
            </h2>
            <p className="text-xl sm:text-2xl text-white/70 max-w-2xl mx-auto mb-12">
              {currentCategory.description}
            </p>
          </div>

          {/* CTA Button */}
          <Link
            href={`/category/${currentCategory.slug}`}
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-all transform hover:scale-105"
          >
            Explore {currentCategory.name}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-colors group"
        aria-label="Previous category"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 rounded-full transition-colors group"
        aria-label="Next category"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {categories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setIsAutoPlaying(false);
            }}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex
                ? 'w-12 bg-white'
                : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to category ${index + 1}`}
          />
        ))}
      </div>

      {/* ESC hint */}
      <div className="absolute top-8 right-8 z-20 hidden sm:block">
        <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white/60 text-sm">
          Scroll to continue
        </div>
      </div>
    </section>
  );
}