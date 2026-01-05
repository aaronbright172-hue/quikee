'use client';

import React from 'react';
import Link from 'next/link';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Image from 'next/image';

export default function CartSlideIn() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { formatPrice, convertPrice } = useCurrency();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-in Panel */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] lg:w-[480px] bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Cart ({cart.length})
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">Your cart is empty</h3>
              <p className="text-neutral-500 mb-6">Add some products to get started</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.variantText}-${index}`} className="flex gap-4 pb-4 border-b border-neutral-100">
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-200">
                        <ShoppingBag className="w-8 h-8 text-neutral-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm text-neutral-900 mb-1 truncate">
                      {item.name}
                    </h3>
                    {item.variantText && (
                      <p className="text-xs text-neutral-500 mb-2">{item.variantText}</p>
                    )}
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(item.price)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-neutral-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1, item.variantText)
                          }
                          className="p-1.5 hover:bg-neutral-100 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1, item.variantText)
                          }
                          className="p-1.5 hover:bg-neutral-100 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id, item.variantText)}
                        className="text-xs text-red-600 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-neutral-200 px-6 py-4 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="font-medium">Subtotal</span>
              <span className="font-bold">{formatPrice(cartTotal)}</span>
            </div>

            <p className="text-xs text-neutral-500">
              Shipping, taxes, and discount codes are calculated at checkout
            </p>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 bg-black text-white text-center font-medium rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Checkout
            </Link>

            <button
              onClick={() => setIsCartOpen(false)}
              className="block w-full py-3 border border-neutral-300 text-center font-medium rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
