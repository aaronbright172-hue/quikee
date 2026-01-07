'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, Lock, AlertCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import Image from 'next/image';
import { PaymentMethod } from '@/components/PaymentMethod';
import { CryptoSelectionModal } from '@/components/CryptoSelectionModal';

export default function CheckoutPage() {
  const { cart, cartTotal } = useCart();
  const { formatPrice } = useCurrency();
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

  const [showCryptoSelectionModal, setShowCryptoSelectionModal] = useState(false);
  const [formInteracted, setFormInteracted] = useState(false);
  const contactFormRef = useRef<HTMLDivElement>(null);

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

  const isFormValid = Object.values(formData).every(value => value.trim() !== '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
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
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-3 space-y-8">
            {/* Contact */}
            <div ref={contactFormRef} className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Contact</h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-black ${formInteracted && !formData.email ? 'border-red-500' : 'border-neutral-300'}`}
              />

            </div>

            {/* Delivery */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Delivery</h2>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-black ${formInteracted && !formData.country ? 'border-red-500' : 'border-neutral-300'}`}
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
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-black ${formInteracted && !formData.firstName ? 'border-red-500' : 'border-neutral-300'}`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-black ${formInteracted && !formData.lastName ? 'border-red-500' : 'border-neutral-300'}`}
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-black ${formInteracted && !formData.address ? 'border-red-500' : 'border-neutral-300'}`}
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:border-black ${formInteracted && !formData.phone ? 'border-red-500' : 'border-neutral-300'}`}
              />

              <div className="grid sm:grid-cols-3 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-black ${formInteracted && !formData.city ? 'border-red-500' : 'border-neutral-300'}`}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-black ${formInteracted && !formData.state ? 'border-red-500' : 'border-neutral-300'}`}
                />
                <input
                  type="text"
                  name="postcode"
                  placeholder="Postcode"
                  value={formData.postcode}
                  onChange={handleInputChange}
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:border-black ${formInteracted && !formData.postcode ? 'border-red-500' : 'border-neutral-300'}`}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200">
              <h2 className="text-2xl font-bold mb-6">Payment</h2>
              <p className="text-sm text-neutral-600 mb-6">
                All transactions are secure and encrypted.
              </p>

              {/* Credit Card Details - Always Visible */}
              <div className="p-4 border-2 border-neutral-300 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Credit Card</span>
                    <div className="flex items-center gap-2">
                        {/* American Express */}
                        <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 38 24" width="38" height="24" aria-labelledby="pi-american_express" className="h-5"><title id="pi-american_express">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07"/><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 37,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1"/><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z"/></g></svg>
                        {/* Mastercard */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" width="38" height="24" aria-labelledby="pi-master" className="h-5"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><circle fill="#EB001B" cx="15" cy="12" r="7"/><circle fill="#F79E1B" cx="23" cy="12" r="7"/><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"/></svg>
                        {/* Visa */}
                        <svg viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" width="38" height="24" aria-labelledby="pi-visa" className="h-5"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"/><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"/><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"/></svg>
                    </div>
                  </div>
                  <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        title="This is a placeholder for demonstration purposes. No real card numbers can be entered."
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Expiration date (MM / YY)"
                          className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                          title="This is a placeholder for demonstration purposes. No real expiration dates can be entered."
                        />
                        <input
                          type="text"
                          placeholder="Security code"
                          className="px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                          title="This is a placeholder for demonstration purposes. No real CVCs can be entered."
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Name on card"
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:border-black"
                        title="This is a placeholder for demonstration purposes."
                      />
                      <label className="flex items-center gap-2 mt-4">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">Use shipping address as billing address</span>
                      </label>
                  </div>
              </div>
            </div>

            {/* Additional payment methods */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200 mt-8"> {/* Added mt-8 for spacing */}
              <h2 className="text-2xl font-bold mb-6">Additional payment methods</h2>
              <PaymentMethod
                id="crypto-payment"
                title="Crypto Payment"
                defaultOpen={true}
              >
                <div className="space-y-4 text-sm text-neutral-600">
                  <p>
                    You are about to pay using cryptocurrency. Due to its nature cryptocurrencies, tokens, and digital assets are irreversible, and their exchange rates are highly volatile and transitory. We can not be responsible for any risk including but not limited to exchange rate risk and market risk.
                    <span className="font-semibold text-red-600"> Products purchased using cryptocurrencies, tokens or digital assets are not refundable.</span>
                  </p>
                  <p>
                    Please note that crypto payments are not received instantly as they require multiple confirmations on the blockchain. Payment confirmation can take up to few hours but usually happens within 20 min.
                  </p>
                  <button
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      setFormInteracted(true);
                      if (isFormValid) {
                        setShowCryptoSelectionModal(true);
                      } else {
                        contactFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                  >
                    Pay with Cryptocurrency
                  </button>
                  <div className="flex items-center gap-2 text-neutral-500">
                    <Lock className="w-4 h-4" />
                    <span>Encrypted and secure payments</span>
                  </div>
                  <p className="text-xs">
                    By checking out you agree with our <Link href="/terms-conditions" className="underline">Terms of Service</Link> and confirm that you have read our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. You can cancel recurring payments at any time.
                  </p>
                </div>
              </PaymentMethod>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-8 border border-neutral-200 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-neutral-200">
                {cart.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <p className="font-medium text-neutral-900">{item.name}</p>
                        {item.variantText && (
                          <p className="text-xs text-neutral-500">{item.variantText}</p>
                        )}
                        <p className="text-neutral-600">Qty: {item.quantity}</p>
                      </div>
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



              <p className="text-xs text-neutral-500 text-center mt-4">
                Secure and encrypted payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CryptoSelectionModal
      isOpen={showCryptoSelectionModal}
      onClose={() => setShowCryptoSelectionModal(false)}
      // onSelectCrypto prop is no longer used for direct navigation
      cartTotal={cartTotal}
      formData={formData} // Pass formData
      cartDetails={cart} // Pass cart as cartDetails
    />
    </>
  );
}
