'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { createClient } from '@/lib/supabase/client';
import { Badge } from '@/components/ui/badge';

const CustomDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContent>,
  React.ComponentPropsWithoutRef<typeof DialogContent>
>(({ className, ...props }, ref) => (
  <DialogContent
    ref={ref}
    className="h-[600px] flex flex-col p-0"
    {...props}
  />
));
CustomDialogContent.displayName = 'CustomDialogContent';

interface CryptoDefinition {
  id: string;
  name: string;
  symbol: string;
  logo: string | null;
  network: string;
  network_logo_url: string | null;
  address: string;
  barcode_url: string | null;
}

interface ConvertedCryptoOption extends CryptoDefinition {
  convertedAmount: number;
  exchangeRate: number;
}

interface CryptoSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartTotal: number;
  formData: any;
  cartDetails: any;
}

const truncateAddress = (address: string, startLength = 6, endLength = 6) => {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.substring(0, startLength)}...${address.substring(address.length - endLength)}`;
};

export const CryptoSelectionModal: React.FC<CryptoSelectionModalProps> = ({
  isOpen,
  onClose,
  cartTotal,
  formData,
  cartDetails,
}) => {
  const supabase = createClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [dbCryptoDefinitions, setDbCryptoDefinitions] = useState<CryptoDefinition[]>([]);
  const [convertedCryptos, setConvertedCryptos] = useState<ConvertedCryptoOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;

    const fetchCryptoDefinitions = async () => {
      setIsLoading(true);
      setError(null);
      const { data, error: dbError } = await supabase
        .from('crypto_payment_settings')
        .select('id, currency_code, logo_url, network, network_logo_url, address, barcode_url')
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
        name: item.currency_code,
        symbol: item.currency_code,
        logo: item.logo_url,
        network: item.network,
        network_logo_url: item.network_logo_url,
        address: item.address,
        barcode_url: item.barcode_url,
      }));
      setDbCryptoDefinitions(definitions);
    };

    fetchCryptoDefinitions();
  }, [isOpen, supabase]);

  const fetchConvertedAmounts = useCallback(async () => {
    if (!isOpen || cartTotal <= 0 || dbCryptoDefinitions.length === 0) {
      setConvertedCryptos([]);
      setIsLoading(false);
      return;
    }

    const fetchedCryptos: ConvertedCryptoOption[] = [];
    try {
        const response = await fetch('/api/crypto/convert', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartTotal, cryptoDefinitions: dbCryptoDefinitions }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch exchange rates.');
        }

        const rates = data.rates; // Expecting a map of symbol -> { rate, amount }

        for (const cryptoDef of dbCryptoDefinitions) {
            const rateInfo = rates[cryptoDef.symbol];
            if (rateInfo) {
                fetchedCryptos.push({
                    ...cryptoDef,
                    convertedAmount: rateInfo.convertedCryptoAmount,
                    exchangeRate: rateInfo.exchangeRate,
                });
            }
        }
    } catch (err) {
        console.error('Error fetching converted amounts:', err);
        setError('Failed to load cryptocurrency rates. Please try again.');
    }
    
    setConvertedCryptos(fetchedCryptos);
    setIsLoading(false);
  }, [isOpen, cartTotal, dbCryptoDefinitions]);

  useEffect(() => {
    if (dbCryptoDefinitions.length > 0) {
      fetchConvertedAmounts();
    }
  }, [dbCryptoDefinitions, fetchConvertedAmounts]);

  const handleSelectCryptoAndNavigate = async (crypto: ConvertedCryptoOption) => {
    try {
      const orderCreateResponse = await fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formData,
          cartDetails,
          originalFiatAmount: cartTotal,
          selectedCryptoCode: crypto.symbol,
          convertedCryptoAmount: crypto.convertedAmount,
          exchangeRate: crypto.exchangeRate,
          paymentAddress: crypto.address,
          paymentBarcodeUrl: crypto.barcode_url,
          paymentNetwork: crypto.network,
        }),
      });

      const orderData = await orderCreateResponse.json();

      if (!orderCreateResponse.ok) {
        throw new Error(orderData.error || 'Failed to create order');
      }
      
      const { orderId } = orderData;

      onClose();
      router.push(
        `/payment/crypto/${crypto.symbol.toLowerCase()}?orderId=${orderId}`
      );
    } catch (err: any) {
      console.error('Error in handleSelectCryptoAndNavigate:', err);
      setError(err.message || 'Failed to process payment selection. Please try again.');
    }
  };

  const filteredCryptos = convertedCryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.network.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <CustomDialogContent className="sm:max-w-[425px]">
        <DialogHeader className="p-6 pb-4 border-b">
          <DialogTitle className="text-xl font-semibold">Pay with Cryptocurrency</DialogTitle>
          <div className="absolute right-4 top-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100">
            <X className="h-4 w-4 text-gray-500 cursor-pointer" onClick={onClose} />
            <span className="sr-only">Close</span>
          </div>
        </DialogHeader>

        <div className="p-6 pt-4 flex-grow overflow-y-auto">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search currency or network"
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {isLoading && (
            <div className="text-center text-neutral-500 pt-8">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500 pt-8">{error}</div>
          )}

          {!isLoading && !error && (
            <div className="space-y-2">
              {filteredCryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => handleSelectCryptoAndNavigate(crypto)}
                >
                  <div className="relative mr-4">
                    {crypto.logo ? (
                      <Image src={crypto.logo} alt={crypto.name} width={40} height={40} className="rounded-full" />
                    ) : (
                      <div className="w-10 h-10 bg-neutral-200 rounded-full" />
                    )}
                    {crypto.network_logo_url && (
                      <Image
                        src={crypto.network_logo_url}
                        alt={`${crypto.network} logo`}
                        width={20}
                        height={20}
                        className="absolute -bottom-1 -right-1 bg-white dark:bg-neutral-900 p-0.5 rounded-full border border-neutral-200 dark:border-neutral-700"
                      />
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-base">{crypto.symbol}</p>
                      <Badge variant="outline" className="text-xs">{crypto.network}</Badge>
                    </div>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
                      {truncateAddress(crypto.address)}
                    </p>
                  </div>
                </div>
              ))}
              {filteredCryptos.length === 0 && (
                <p className="text-center text-neutral-500 pt-8">No cryptocurrencies found.</p>
              )}
            </div>
          )}
        </div>
      </CustomDialogContent>
    </Dialog>
  );
};
