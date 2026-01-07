'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Import useRouter

import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';

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
  id: string; // Database ID
  name: string; // From currency_code for now
  symbol: string; // From currency_code
  logo: string | null; // From logo_url
}

interface ConvertedCryptoOption extends CryptoDefinition {
  convertedAmount: number;
  exchangeRate: number;
}

// Remove the static cryptoDefinitions array

interface CryptoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number; // Total amount in USD to be converted
  formData: any; // Add formData from checkout form
  cartDetails: any; // Add cart details from cart context
}

export const CryptoSelectionModal: React.FC<CryptoSelectionModalProps> = ({
  isOpen,
  onClose,
  cartTotal,
  formData,
  cartDetails,
}) => {
  const supabase = createClient(); // Initialize Supabase client
  const [searchTerm, setSearchTerm] = useState('');
  const [dbCryptoDefinitions, setDbCryptoDefinitions] = useState<CryptoDefinition[]>([]); // State for fetched definitions
  const [convertedCryptos, setConvertedCryptos] = useState<ConvertedCryptoOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize router

  // New useEffect to fetch crypto definitions from DB
  useEffect(() => {
    if (!isOpen) return;

    const fetchCryptoDefinitions = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from('crypto_payment_settings')
        .select('id, currency_code, logo_url')
        .eq('is_active', true)
        .order('currency_code', { ascending: true });

      if (dbError) {
        console.error('Error fetching crypto definitions from DB:', dbError);
        setError(`Failed to load cryptocurrency options: ${dbError.message}`);
        setIsLoading(false);
        return;
      }

      const definitions = data.map(item => ({
        id: item.id,
        name: item.currency_code, // Use currency_code as name for now
        symbol: item.currency_code,
        logo: item.logo_url,
      }));
      setDbCryptoDefinitions(definitions);
      setIsLoading(false);
    };

    fetchCryptoDefinitions();
  }, [isOpen, supabase]); // Re-fetch when modal opens or supabase client changes

  const fetchConvertedAmounts = useCallback(async () => {
    if (!isOpen || cartTotal <= 0 || dbCryptoDefinitions.length === 0) { // Depend on dbCryptoDefinitions
      setConvertedCryptos([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    const fetchedCryptos: ConvertedCryptoOption[] = [];

    for (const cryptoDef of dbCryptoDefinitions) { // Iterate over fetched definitions
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
      }
    }
    setConvertedCryptos(fetchedCryptos);
    setIsLoading(false);
  }, [isOpen, cartTotal, dbCryptoDefinitions]); // Add dbCryptoDefinitions to dependency array

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
                    {crypto.logo ? (
                      <Image src={crypto.logo} alt={crypto.name} width={24} height={24} />
                    ) : (
                      <div className="w-6 h-6 bg-neutral-200 rounded-full flex items-center justify-center text-xs font-semibold text-neutral-600">
                        {crypto.symbol.substring(0, 1)}
                      </div>
                    )}
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
