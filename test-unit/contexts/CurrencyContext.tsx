'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import currenciesData from '@/data/currencies.json';

import { toast } from 'sonner';

interface Currency {
  code: string;
  symbol: string;
  name: string;
  flag: string;
}

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currenciesData.currencies[0]);
  const [rates, setRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('/api/currency-rates');
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error(`Error fetching exchange rates. Status: ${response.status}`, {
            statusText: response.statusText,
            response: errorData,
          });
          throw new Error(`Failed to fetch rates with status: ${response.status}`);
        }
        const data = await response.json();
        setRates(data.rates);
      } catch (error) {
        console.error('Could not fetch exchange rates:', error);
        toast.error('Failed to load currency rates. Prices are in USD.');
      }
    };

    fetchRates();
  }, []);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      const parsed = JSON.parse(savedCurrency);
      setCurrencyState(parsed);
    } else {
      detectUserCurrency();
    }
  }, []);

  const detectUserCurrency = async () => {
    try {
      const response = await fetch('/api/ip-currency');
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error(`Error fetching user currency. Status: ${response.status}`, {
          statusText: response.statusText,
          response: errorData,
        });
        throw new Error(`Failed to fetch user currency with status: ${response.status}`);
      }
      const data = await response.json();
      const userCurrencyCode = data.currency;

      // Define the allowed currency codes
      const allowedCurrencyCodes = ['USD', 'AUD', 'EUR', 'GBP', 'CAD', 'JPY', 'NZD', 'SGD'];

      let targetCurrency: Currency | undefined;

      // Check if the detected user currency is in our allowed list
      if (allowedCurrencyCodes.includes(userCurrencyCode)) {
        targetCurrency = currenciesData.currencies.find(
          (c) => c.code === userCurrencyCode
        );
      }

      // If no target currency was found (either not in allowed list or not found in currenciesData),
      // default to Singapore Dollar (SGD)
      if (!targetCurrency) {
        targetCurrency = currenciesData.currencies.find(
          (c) => c.code === 'SGD'
        );
        // Fallback to USD if SGD is somehow not found (shouldn't happen with updated currencies.json)
        if (!targetCurrency) {
          targetCurrency = currenciesData.currencies.find((c) => c.code === 'USD');
        }
        console.log(`Detected currency (${userCurrencyCode}) not allowed or not found. Defaulting to SGD.`);
      }

      if (targetCurrency) {
        setCurrencyState(targetCurrency);
        localStorage.setItem('currency', JSON.stringify(targetCurrency));
      } else {
        // Fallback if even SGD/USD couldn't be set (should ideally not be reached)
        console.error('Could not set any default currency. This should not happen.');
        toast.error('Could not set a default currency. Defaulting to application base currency.');
      }

    } catch (error) {
      console.error('Could not detect user currency, or an error occurred. Defaulting to SGD.', error);
      toast.error('Could not detect your currency. Defaulting to SGD.');
      // Ensure a default is set even if IP detection fails entirely
      const sgdCurrency = currenciesData.currencies.find((c) => c.code === 'SGD');
      if (sgdCurrency) {
        setCurrencyState(sgdCurrency);
        localStorage.setItem('currency', JSON.stringify(sgdCurrency));
      } else {
        const usdCurrency = currenciesData.currencies.find((c) => c.code === 'USD');
        if (usdCurrency) {
          setCurrencyState(usdCurrency);
          localStorage.setItem('currency', JSON.stringify(usdCurrency));
        }
      }
    }
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem('currency', JSON.stringify(newCurrency));
  };

  const convertPrice = (price: number): number => {
    const rate = rates[currency.code] || 1;
    return price * rate;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    return `${currency.symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        currencies: currenciesData.currencies,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}
