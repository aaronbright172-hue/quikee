'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface PaymentMethodProps {
  id: string;
  title: string;
  logo?: string; // Path to the logo image
  children: React.ReactNode;
  defaultOpen?: boolean;
  onToggle?: (id: string, isOpen: boolean) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  id,
  title,
  logo,
  children,
  defaultOpen = false,
  onToggle,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggleOpen = () => {
    setIsOpen((prev) => {
      onToggle?.(id, !prev);
      return !prev;
    });
  };

  return (
    <div className="bg-white rounded-lg border border-neutral-200">
      <div
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <div className="flex items-center gap-3">
          <input
            type="radio"
            id={id}
            name="paymentMethod"
            checked={isOpen}
            onChange={toggleOpen}
            className="w-4 h-4 text-black border-neutral-300 focus:ring-black"
          />
          <label htmlFor={id} className="font-medium text-lg">
            {title}
          </label>
        </div>
        <div className="flex items-center gap-2">
          {logo && <Image src={logo} alt={`${title} logo`} width={40} height={24} />}
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-neutral-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-neutral-500" />
          )}
        </div>
      </div>
      {isOpen && <div className="p-4 border-t border-neutral-200">{children}</div>}
    </div>
  );
};
