// test-unit/app/order-confirmation/page.tsx
'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [orderConfirmedData, setOrderConfirmedData] = useState<any>(null); // To store actual order details if fetched

  useEffect(() => {
    if (!orderId) {
      setError('No Order ID found. Invalid confirmation.');
      setLoading(false);
      return;
    }

    // In a real application, you would fetch the full order details using the orderId
    // For now, we'll just simulate success.
    const fetchOrderDetails = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOrderConfirmedData({
        message: `Order ${orderId} has been successfully placed and is awaiting crypto payment confirmation.`,
        // ... more details fetched from backend ...
      });
      setLoading(false);
    };

    fetchOrderDetails();

  }, [orderId]);


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading order confirmation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
        <Link href="/" className="underline">Go to Homepage</Link>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h1>
        <p className="text-neutral-700 mb-6">Your order has been successfully placed and is awaiting cryptocurrency payment confirmation.</p>
        <p className="text-neutral-600 text-sm mb-4">
          **Order ID:** <span className="font-mono font-semibold">{orderId}</span>
        </p>
        {orderConfirmedData && (
          <p className="text-neutral-600 mb-6">{orderConfirmedData.message}</p>
        )}
        <Link href="/" className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-neutral-800 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
