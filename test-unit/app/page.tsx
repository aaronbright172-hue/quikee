'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, DollarSign, Shield, ArrowRight } from 'lucide-react';
import CategoryCarousel from '@/components/CategoryCarousel';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroCarousel />

      {/* What We Do Section */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              How We Offer Such Low Prices
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We're an agent company, not a traditional retailer. Here's what makes us different.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {/* What We Don't Do */}
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">What We Don't Do</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-0.5 bg-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Manufacture products</p>
                    <p className="text-sm text-neutral-600">We don't make anything ourselves</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-0.5 bg-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Buy products traditionally</p>
                    <p className="text-sm text-neutral-600">No retail markup costs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-3 h-0.5 bg-neutral-600" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">Charge retail prices</p>
                    <p className="text-sm text-neutral-600">Our model enables dramatic savings</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* What We Do */}
            <div className="bg-black rounded-2xl p-8 text-white">
              <h3 className="text-xl font-bold mb-6">What We Do</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Partner with tech companies</p>
                    <p className="text-sm text-white/70">Apple, Samsung, and more</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Receive test/evaluation units</p>
                    <p className="text-sm text-white/70">Real, working products</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Pass savings to you</p>
                    <p className="text-sm text-white/70">Up to 70% off retail prices</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Product Quality Section */}
      <section className="py-20 sm:py-32 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-4">
              About Our Products
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Test and evaluation units that meet the highest standards
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">100% Authentic</h3>
              <p className="text-sm text-neutral-600">
                Real products from original manufacturers
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Fully Functional</h3>
              <p className="text-sm text-neutral-600">
                Tested and verified working condition
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Quality Assured</h3>
              <p className="text-sm text-neutral-600">
                Nothing wrong, just test units
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-neutral-200 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Huge Savings</h3>
              <p className="text-sm text-neutral-600">
                Up to 70% below retail prices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Category Carousel */}
      <div id="categories">
        <CategoryCarousel />
      </div>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Browse our collection of premium tech products at prices you won't believe
          </p>
          <Link
            href="/category/kits"
            className="inline-flex items-center px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
          >
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
