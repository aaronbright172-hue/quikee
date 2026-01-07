-- Enable the UUID-OSSP extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to update the `updated_at` column automatically
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Enum for cryptocurrency codes
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'crypto_currency_code') THEN
        CREATE TYPE crypto_currency_code AS ENUM ('BTC', 'USDC', 'ETH', 'SOL', 'LTC', 'TRX', 'BNB');
    END IF;
END$$;

-- Table: crypto_payment_settings
CREATE TABLE IF NOT EXISTS public.crypto_payment_settings (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    currency_code crypto_currency_code NOT NULL UNIQUE,
    address text NOT NULL,
    barcode_url text, -- Made nullable to accommodate file uploads
    logo_url text,    -- Added for cryptocurrency logo URL
    network text NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Trigger for `crypto_payment_settings` to update `updated_at`
CREATE TRIGGER set_updated_at_crypto_payment_settings
BEFORE UPDATE ON public.crypto_payment_settings
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Row Level Security for `crypto_payment_settings`
ALTER TABLE public.crypto_payment_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access (for frontend display)
CREATE POLICY "Allow public read access" ON public.crypto_payment_settings
FOR SELECT USING (TRUE);

-- Policy: Allow authenticated admin to INSERT, UPDATE, DELETE
-- IMPORTANT: This policy assumes `auth.uid()` corresponds to an admin user
-- or that your backend API authenticates and operates with appropriate privileges.
-- For a robust admin system, consider custom claims or a separate 'admin_users' table.
CREATE POLICY "Allow admin access for crypto settings" ON public.crypto_payment_settings
FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');


-- Table: orders
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_email text NOT NULL,
    user_first_name text,
    user_last_name text,
    delivery_address text,
    delivery_city text,
    delivery_state text,
    delivery_postcode text,
    delivery_phone text,
    delivery_country text,
    cart_details jsonb NOT NULL, -- Store cart items as JSON
    original_fiat_amount numeric NOT NULL,
    selected_crypto_code crypto_currency_code NOT NULL,
    converted_crypto_amount numeric NOT NULL,
    exchange_rate_at_time_of_payment numeric NOT NULL,
    payment_status text NOT NULL DEFAULT 'pending', -- e.g., 'pending', 'paid', 'expired', 'confirmed'
    payment_address text, -- Copy from settings for historical record
    payment_barcode_url text, -- Copy from settings for historical record
    payment_network text, -- Copy from settings for historical record
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Trigger for `orders` to update `updated_at`
CREATE TRIGGER set_updated_at_orders
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Row Level Security for `orders`
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Allow backend/service to insert orders (e.g., via authenticated API endpoint)
CREATE POLICY "Allow backend to insert orders" ON public.orders
FOR INSERT WITH CHECK (auth.role() = 'authenticated'); -- Or true if using service_role key directly

-- Policy: Allow backend/service to update order status (e.g., after payment confirmation)
CREATE POLICY "Allow backend to update orders" ON public.orders
FOR UPDATE USING (TRUE) WITH CHECK (auth.role() = 'authenticated'); -- Or true if using service_role key directly

-- Policy: Allow authenticated users to view their own orders
-- This policy assumes an `user_id` column would be added to 'orders'
-- and linked to `auth.uid()`. For now, it's illustrative.
-- For a simple backend API-only access, a policy with USING (TRUE)
-- for the service_role key might be preferred.
CREATE POLICY "Allow authenticated user to read own orders" ON public.orders
FOR SELECT USING (auth.role() = 'authenticated');
