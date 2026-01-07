export interface Order {
  id: string;
  user_email: string;
  user_first_name: string;
  user_last_name: string;
  original_fiat_amount: number;
  converted_crypto_amount: number;
  selected_crypto_code: string;
  payment_status: 'pending' | 'paid' | 'cancelled';
  created_at: string;
  cart_details: any; // Consider creating a more specific type for cart_details if its structure is known
  delivery_address: string;
  delivery_city: string;
  delivery_state: string;
  delivery_postcode: string;
  delivery_phone: string;
  delivery_country: string;
  exchange_rate_at_time_of_payment: number;
  payment_address: string;
  payment_barcode_url: string;
  payment_network: string;
  coingate_order_id: string | null;
  user_id: string | null;
  updated_at: string;
}
