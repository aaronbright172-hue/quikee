'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { formatPrice } = useCurrency();
  const [paymentMethod, setPaymentMethod] = useState('bitcoin');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
    country: 'United States',
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-neutral-600 mb-8">Add items before checkout</p>
          <Link href="/" className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-neutral-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="flex items-center gap-2 text-black hover:text-neutral-600 w-fit">
            <ChevronLeft className="w-5 h-5" />
            Back to Store
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Contact</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg mb-4 focus:outline-none focus:border-black"
              />
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Email me with news and offers</span>
              </label>
            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Delivery</h2>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg mb-4 focus:outline-none focus:border-black"
              >
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
                <option>Australia</option>
              </select>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg mb-4 focus:outline-none focus:border-black"
              />

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Payment</h2>
              <p className="text-sm text-neutral-600 mb-6">
                All transactions are secure and encrypted.
              </p>

              <div className="space-y-3">
                {/* Bitcoin */}
                <label className="flex items-center p-4 border-2 border-neutral-300 rounded-lg cursor-pointer hover:border-black transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="bitcoin"
                    checked={paymentMethod === 'bitcoin'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 font-medium">Bitcoin</span>
                </label>

                {/* Credit Card - Disabled */}
                <div
                  className="p-4 border-2 border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed opacity-60"
                  title="Coming soon"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      disabled
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Credit Card</span>
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Apple Pay - Disabled */}
                <div
                  className="p-4 border-2 border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed opacity-60"
                  title="Coming soon"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      disabled
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Apple Pay</span>
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>

                {/* Google Pay - Disabled */}
                <div
                  className="p-4 border-2 border-neutral-200 rounded-lg bg-neutral-50 cursor-not-allowed opacity-60"
                  title="Coming soon"
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="payment"
                      value="google"
                      disabled
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium">Google Pay</span>
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'bitcoin' && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Bitcoin Payment</p>
                    <p>You will receive payment instructions on the next page.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-8 border border-neutral-200 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium text-neutral-900">{item.name}</p>
                      {item.variantText && (
                        <p className="text-xs text-neutral-500">{item.variantText}</p>
                      )}
                      <p className="text-neutral-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">Calculated later</span>
                </div>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6 pb-6 border-t border-neutral-200">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>

              {/* Checkout Button */}
              <button className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2">
                <Lock className="w-5 h-5" />
                Complete Purchase
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Secure and encrypted payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
