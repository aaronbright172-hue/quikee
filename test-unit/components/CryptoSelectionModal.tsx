'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Extend the DialogContent to have a fixed height and scrollable body
const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, children, ...props }, ref) => (
  <DialogContent
    ref={ref}
    className="h-[600px] flex flex-col p-0" // Fixed height and flex column for header/body/footer structure
    {...props}
  >
    {children}
  </DialogContent>
));
CustomDialogContent.displayName = 'CustomDialogContent';

interface CryptoDefinition {
  id: string;
  name: string;
  symbol: string;
  logo: string;
}

interface ConvertedCryptoOption extends CryptoDefinition {
  convertedAmount: number;
  exchangeRate: number;
}

// Static definitions of cryptocurrencies, without exchange rates
const cryptoDefinitions: CryptoDefinition[] = [
  { id: 'usdc', name: 'USD Coin', symbol: 'USDC', logo: '/img/usdc.svg' },
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', logo: '/img/btc.svg' },
  { id: 'ltc', name: 'Litecoin', symbol: 'LTC', logo: '/img/ltc.svg' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', logo: '/img/eth.svg' },
  { id: 'trx', name: 'TRON', symbol: 'TRX', logo: '/img/trx.svg' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', logo: '/img/sol.svg' },
  { id: 'bnb', name: 'Binance Coin', symbol: 'BNB', logo: '/img/bnb.svg' },
];

interface CryptoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  // onSelectCrypto: (cryptoCode: string) => void; // No longer needed as a prop
  cartTotal: number; // Total amount in USD to be converted
  formData: any; // Add formData from checkout form
  cartDetails: any; // Add cart details from cart context
}

export const CryptoSelectionModal: React.FC<CryptoSelectionModalProps> = ({
  isOpen,
  onClose,
  // onSelectCrypto, // No longer needed as a prop
  cartTotal,
  formData,
  cartDetails,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [convertedCryptos, setConvertedCryptos] = useState<ConvertedCryptoOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  const fetchConvertedAmounts = useCallback(async () => {
    if (!isOpen || cartTotal <= 0) {
      setConvertedCryptos([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    const fetchedCryptos: ConvertedCryptoOption[] = [];

    for (const cryptoDef of cryptoDefinitions) {
      try {
        const response = await fetch('/api/crypto/convert', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartTotal, targetCryptoCode: cryptoDef.symbol }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Failed to fetch rate for ${cryptoDef.symbol}`);
        }

        fetchedCryptos.push({
          ...cryptoDef,
          convertedAmount: data.convertedCryptoAmount,
          exchangeRate: data.exchangeRate,
        });
      } catch (err) {
        console.error(`Error fetching rate for ${cryptoDef.symbol}:`, err);
        setError(`Failed to load some cryptocurrency rates. Please try again.`);
        // Optionally, push cryptoDef without convertedAmount or mark as error
      }
    }
    setConvertedCryptos(fetchedCryptos);
    setIsLoading(false);
  }, [isOpen, cartTotal]);

  useEffect(() => {
    fetchConvertedAmounts();
  }, [fetchConvertedAmounts]);

  const handleSelectCryptoAndNavigate = async (crypto: ConvertedCryptoOption) => {
    // 1. Fetch payment details (address, barcode, network) for the selected crypto
    try {
      const detailsResponse = await fetch(`/api/crypto/details?cryptoCode=${crypto.symbol}`);
      const paymentDetails = await detailsResponse.json();

      if (!detailsResponse.ok) {
        throw new Error(paymentDetails.error || `Failed to fetch payment details for ${crypto.symbol}`);
      }

      // 2. Create a pending order via API
      const orderCreateResponse = await fetch('/api/order/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cartDetails,
          originalFiatAmount: cartTotal,
          selectedCryptoCode: crypto.symbol,
          convertedCryptoAmount: crypto.convertedAmount,
          exchangeRate: crypto.exchangeRate,
          paymentAddress: paymentDetails.address,
          paymentBarcodeUrl: paymentDetails.barcode_url,
          paymentNetwork: paymentDetails.network,
        }),
      });

      const responseText = await orderCreateResponse.text();
      let orderData;
      try {
        orderData = JSON.parse(responseText);
        // If the server response is a JSON string that itself contains a stringified JSON,
        // we need to parse it again to get the actual object.
        if (typeof orderData === 'string') {
          orderData = JSON.parse(orderData);
        }
      } catch (e) {
        console.error('Failed to parse server response as JSON:', responseText);
        throw new Error('Server returned an invalid response.');
      }

      if (!orderCreateResponse.ok) {
        console.error('Failed to create order:', orderData);
        throw new Error(orderData.error || 'Failed to create order');
      }
      
      const { orderId } = orderData;

      onClose(); // Close the modal
      router.push(
        `/payment/crypto/${crypto.symbol.toLowerCase()}?orderId=${orderId}&cartTotal=${cartTotal}&convertedAmount=${crypto.convertedAmount}&exchangeRate=${crypto.exchangeRate}`
      );
    } catch (err: any) {
      console.error('Error in handleSelectCryptoAndNavigate:', err);
      setError(err.message || 'Failed to process payment selection. Please try again.'); // Set error for modal
      // Optionally, show a toast notification to the user
    }
  };

  const filteredCryptos = convertedCryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatAmount = (amount: number, symbol: string) => {
    return `${amount.toFixed(6)} ${symbol}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="sm:max-w-[425px]">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Select currency</DialogTitle>
          <div className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100">
            <X className="h-4 w-4 text-gray-500 cursor-pointer" onClick={onClose} />
            <span className="sr-only">Close</span>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4 flex-grow overflow-y-auto">
          {/* Current Total Display */}
          <div className="text-center text-2xl font-bold mb-6">
            {cartTotal.toFixed(2)} USD
          </div>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-9 pr-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading && (
            <div className="text-center text-neutral-500">Loading exchange rates...</div>
          )}
          {error && (
            <div className="text-center text-red-500">{error}</div>
          )}

          {/* Cryptocurrency List */}
          {!isLoading && !error && (
            <div className="space-y-3">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-neutral-50 transition-colors"
                  onClick={() => handleSelectCryptoAndNavigate(crypto)}
                >
                  <div className="flex items-center gap-3">
                    <Image src={crypto.logo} alt={crypto.name} width={24} height={24} />
                    <div>
                      <p className="font-medium">{crypto.name}</p>
                      <p className="text-sm text-neutral-500">{crypto.symbol}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-neutral-800">
                    {formatAmount(crypto.convertedAmount, crypto.symbol)}
                  </p>
                </div>
              ))}
              {filteredCryptos.length === 0 && (
                <p className="text-center text-neutral-500">No cryptocurrencies found.</p>
              )}
            </div>
          )}
        </div>
      </CustomDialogContent>
    </Dialog>
  );
};
