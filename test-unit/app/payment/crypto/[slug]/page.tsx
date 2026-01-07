'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link'; // For any potential links in the future or for Terms/Privacy
import { Clock, Copy, Check } from 'lucide-react'; // Import Check icon for copy success
import { Button } from '@/components/ui/button'; // Assuming a Button component exists

export default function CryptoPaymentPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const cryptoCode = params.slug as string;
  const orderId = searchParams.get('orderId'); // Get orderId from search params
  const cartTotal = parseFloat(searchParams.get('cartTotal') || '0');
  const convertedAmount = parseFloat(searchParams.get('convertedAmount') || '0');
  const exchangeRate = parseFloat(searchParams.get('exchangeRate') || '0');
  const [address, setAddress] = useState<string | null>(null);
  const [barcodeUrl, setBarcodeUrl] = useState<string | null>(null);
  const [network, setNetwork] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(60 * 10); // 10 minutes in seconds
  const [copied, setCopied] = useState<string | null>(null); // State to show which item was copied

  useEffect(() => {
    if (!cryptoCode || !orderId || isNaN(cartTotal) || cartTotal <= 0 || isNaN(convertedAmount) || convertedAmount <= 0) {
      setError('Missing payment information or order ID. Please return to checkout.');
      setLoading(false);
      return;
    }

    const fetchPaymentDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/crypto/details?cryptoCode=${cryptoCode}`);
        if (!response.ok) {
          throw new Error('Failed to fetch crypto payment details.');
        }
        const data = await response.json();
        setAddress(data.address);
        setBarcodeUrl(data.barcode_url);
        setNetwork(data.network);
      } catch (err: any) {
        setError(err.message || 'Error fetching payment details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [cryptoCode, cartTotal, convertedAmount]);

  useEffect(() => {
    // Start countdown timer
    if (loading || error) return; // Don't start timer if still loading or errored

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Handle payment expiration (e.g., redirect or show message)
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer
  }, [loading, error]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000); // Reset copied state after 2 seconds
  };

  const handlePaymentPaid = async () => {
    if (!orderId) {
      setError('Cannot confirm payment: Missing Order ID.');
      return;
    }

    try {
      setLoading(true); // Indicate that payment confirmation is in progress
      const response = await fetch('/api/order/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        const errData = await response.json();
        let errorMessage = 'Failed to confirm payment.'; // Default fallback

        if (errData && typeof errData === 'object') {
            if (errData.message) {
                errorMessage = errData.message;
            } else if (errData.error) {
                errorMessage = errData.error;
            } else {
                // If no specific message or error field, try to stringify the whole object
                try {
                    errorMessage = JSON.stringify(errData, null, 2); // Pretty print for better readability
                } catch (e) {
                    errorMessage = 'Failed to confirm payment: Could not parse error details.';
                }
            }
        } else if (errData) { // If errData exists but is not an object (e.g., a string)
            errorMessage = String(errData);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log('Payment confirmation successful:', result.message);
      router.push(`/order-confirmation?orderId=${orderId}`); // Redirect to a confirmation page
    } catch (err: any) {
      console.error('Error confirming payment:', err);
      setError(err.message || 'Error confirming payment. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen text-red-600">
        <p>{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Pay for your order</h1>
          <div className="flex items-center gap-2 text-neutral-600">
            <Clock className="w-5 h-5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Order Info */}
        <div className="mb-6">
          <p className="text-neutral-500 mb-2">Total amount in USD: ${cartTotal.toFixed(2)}</p>
          <div className="flex items-center justify-center gap-2 text-3xl font-bold">
            <span>{convertedAmount.toFixed(6)} {cryptoCode.toUpperCase()}</span>
          </div>
          <p className="text-sm text-neutral-600">Exchange Rate: 1 {cryptoCode.toUpperCase()} = {exchangeRate.toFixed(2)} USD</p>
        </div>

        {/* Barcode */}
        {barcodeUrl && (
          <div className="mb-6">
            <Image src={barcodeUrl} alt="Payment Barcode" width={200} height={200} className="mx-auto" />
          </div>
        )}

        {/* Address */}
        {address && (
          <div className="mb-6 text-left">
            <p className="text-sm text-neutral-500">Address</p>
            <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-lg">
              <span className="text-sm break-all font-mono">{address}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(address, 'address')}
                className="ml-2 w-8 h-8 flex-shrink-0"
              >
                {copied === 'address' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy address</span>
              </Button>
            </div>
          </div>
        )}

        {/* Network */}
        {network && (
          <div className="mb-6 text-left">
            <p className="text-sm text-neutral-500">Network</p>
            <div className="flex items-center justify-between bg-neutral-100 p-3 rounded-lg">
              <span className="text-sm font-mono">{network}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy(network, 'network')}
                className="ml-2 w-8 h-8 flex-shrink-0"
              >
                {copied === 'network' ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy network</span>
              </Button>
            </div>
          </div>
        )}

        {/* Pay with button (We have paid) */}
        <Button
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
          onClick={handlePaymentPaid}
        >
          We have paid
        </Button>
      </div>
    </div>
  );
}
