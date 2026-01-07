'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Order } from '@/lib/types';

interface OrderDetailsModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Order Details - #{order.id}</DialogTitle>
          <DialogDescription>
            Detailed information about the order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Customer:</p>
            <p className="text-sm col-span-3">{order.user_first_name} {order.user_last_name} ({order.user_email})</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Amount:</p>
            <p className="text-sm col-span-3">${order.original_fiat_amount?.toFixed(2)} ({order.converted_crypto_amount} {order.selected_crypto_code})</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Status:</p>
            <p className="text-sm col-span-3">{order.payment_status}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Date:</p>
            <p className="text-sm col-span-3">{new Date(order.created_at).toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Address:</p>
            <p className="text-sm col-span-3">{order.delivery_address}, {order.delivery_city}, {order.delivery_state}, {order.delivery_postcode}, {order.delivery_country}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Phone:</p>
            <p className="text-sm col-span-3">{order.delivery_phone}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Payment Address:</p>
            <p className="text-sm col-span-3 break-all">{order.payment_address}</p>
          </div>
          {order.payment_barcode_url && (
            <div className="grid grid-cols-4 items-center gap-4">
              <p className="text-sm font-medium col-span-1">QR Code:</p>
              <img src={order.payment_barcode_url} alt="Payment QR Code" className="w-24 h-24 object-contain col-span-3" />
            </div>
          )}
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Network:</p>
            <p className="text-sm col-span-3">{order.payment_network}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-sm font-medium col-span-1">Exchange Rate:</p>
            <p className="text-sm col-span-3">{order.exchange_rate_at_time_of_payment}</p>
          </div>
          {order.cart_details && (
            <div className="grid grid-cols-1 gap-2">
              <p className="text-sm font-medium">Cart Details:</p>
              <ul className="list-disc pl-5 text-sm">
                {order.cart_details.map((item: any, index: number) => (
                  <li key={index}>{item.name} (x{item.quantity}) - ${item.price?.toFixed(2)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
