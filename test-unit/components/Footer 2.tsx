'use client';

import React from 'react';
import Link from 'next/link';
import { useCurrency } from '@/contexts/CurrencyContext';
// No longer need to import currencies from json directly here as it's available from context
// import { currencies } from '@/data/currencies.json';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'; // Assuming these are shadcn-ui components

const Footer: React.FC = () => {
  const { currency: currentCurrency, setCurrency, currencies: allCurrencies } = useCurrency();

  const handleCurrencyChange = (code: string) => {
    const selectedCurrency = allCurrencies.find(c => c.code === code);
    if (selectedCurrency) {
      setCurrency(selectedCurrency);
    }
  };

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="mb-8 md:mb-0">
          <h3 className="text-lg font-semibold mb-4">SUPPORT</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="text-sm text-gray-600 hover:text-gray-900">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="text-sm text-gray-600 hover:text-gray-900">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-and-conditions" className="text-sm text-gray-600 hover:text-gray-900">
                Terms & Conditions
              </Link>
            </li>
          </ul>
          <div className="mt-4">
            <Select onValueChange={handleCurrencyChange} value={currentCurrency.code}>
              <SelectTrigger className="w-[100px]">
                <SelectValue>
                  {currentCurrency.flag}{' '}
                  {currentCurrency.code}{' '}
                  {currentCurrency.symbol}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {allCurrencies.map((curr) => (
                  <SelectItem key={curr.code} value={curr.code}>
                    <div className="flex items-center gap-2">
                      <span>{curr.flag}</span>
                      <span>{curr.code} {curr.symbol}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col md:items-end">
          <p className="text-sm text-gray-500 mt-4">&copy; 2Fast Ebikes {new Date().getFullYear()} Powered by Gemini</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
