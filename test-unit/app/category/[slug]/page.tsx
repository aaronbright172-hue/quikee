'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import productsData from '@/data/products.json';
import { useParams } from 'next/navigation';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const category = productsData.categories.find((c) => c.slug === slug);
  const products = productsData.products.filter((p) => p.category === category?.id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link href="/" className="text-black hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-neutral-600 hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{category.name}</span>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-neutral-50 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-2">
            {category.name}
          </h1>
          <p className="text-lg text-neutral-600">{category.description}</p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-neutral-600 mb-6">
              No products in this category yet
            </p>
            <Link href="/" className="text-black hover:underline font-medium">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                className="group"
              >
                <div
                  className="relative bg-neutral-100 aspect-square rounded-lg overflow-hidden mb-4"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  </div>

                  {hoveredProduct === product.id && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(
                          {
                            id: product.id,
                            name: product.name,
                            price: product.downPayment || product.price,
                            image: product.image,
                          },
                          1
                        );
                      }}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
                    >
                      <span className="text-white font-semibold">Add to Cart</span>
                    </button>
                  )}
                </div>

                <h3 className="font-semibold text-neutral-900 group-hover:text-black mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-neutral-600 text-sm mb-3">{product.description}</p>
                <p className="font-bold text-lg">
                  {formatPrice(product.downPayment || product.price)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
