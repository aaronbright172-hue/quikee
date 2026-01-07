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

      const foundCurrency = currenciesData.currencies.find(
        (c) => c.code === userCurrencyCode
      );

            if (foundCurrency) {
              setCurrencyState(foundCurrency);
              localStorage.setItem('currency', JSON.stringify(foundCurrency));
            } else {
              // If the detected currency is not in our predefined list,
              // create a new Currency object for it and use it.
              const customCurrency: Currency = {
                code: userCurrencyCode,
                symbol: data.currency_symbol || userCurrencyCode, // Use symbol from API, or code if not available
                name: data.currency_name || userCurrencyCode, // Use name from API, or code if not available
                flag: '', // No flag available for unsupported currencies
              };
              setCurrencyState(customCurrency);
              localStorage.setItem('currency', JSON.stringify(customCurrency));
              console.log(`Detected unsupported currency (${userCurrencyCode}), using it for display.`);
            }    } catch (error) {
      console.log('Could not detect currency, using default');
      toast.error('Could not detect your currency. Defaulting to USD.');
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
