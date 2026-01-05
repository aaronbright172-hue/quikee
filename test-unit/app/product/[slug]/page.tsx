'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import productsData from '@/data/products.json';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug;
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const product = productsData.products.find((p) => p.slug === slug);
  const category = product ? productsData.categories.find((c) => c.id === product.category) : null;

  if (!product || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-black hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const variantText = product.variants
      ?.map((v) => selectedVariants[v.name] || v.options[0])
      .join(' • ');

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        selectedVariants,
        variantText,
      },
      quantity
    );

    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-neutral-600 hover:text-black">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/category/${category.slug}`} className="text-neutral-600 hover:text-black">
            {category.name}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-neutral-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex flex-col gap-4">
            <div className="relative bg-neutral-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                style={{ objectFit: 'contain' }}
                className="p-4"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, index) => (
                  <div
                    key={index}
                    className="relative bg-neutral-100 rounded-lg aspect-square flex items-center justify-center overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      className="p-2"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <p className="text-neutral-600 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-3xl font-bold text-neutral-900">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-neutral-600 mt-2">
                Shipping calculated at checkout
              </p>
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-8 space-y-6">
                {product.variants.map((variant) => (
                  <div key={variant.name}>
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {variant.name}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {variant.options.map((option) => (
                        <button
                          key={option}
                          onClick={() =>
                            setSelectedVariants((prev) => ({
                              ...prev,
                              [variant.name]: option,
                            }))
                          }
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            selectedVariants[variant.name] === option
                              ? 'bg-black text-white'
                              : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8 flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-neutral-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-neutral-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors mb-6 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>

            {/* Specs */}
            {product.specs && (
              <div className="border-t border-neutral-200 pt-8">
                <h3 className="font-semibold text-lg mb-4">Specifications</h3>
                <div className="space-y-3 text-sm">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-neutral-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="font-medium text-neutral-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
