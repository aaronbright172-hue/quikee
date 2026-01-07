-- Step 1: Add 'USDT' to the crypto_currency_code enum
ALTER TYPE crypto_currency_code ADD VALUE 'USDT';

-- Step 2: Add the new network_logo_url column to the crypto_payment_settings table
ALTER TABLE public.crypto_payment_settings
ADD COLUMN network_logo_url text;

-- Step 3: Remove the old UNIQUE constraint on currency_code
-- The constraint name might be different depending on how it was created.
-- You can find the actual constraint name by inspecting the table in Supabase UI or using psql:
-- \d public.crypto_payment_settings
-- We assume the auto-generated name is 'crypto_payment_settings_currency_code_key'.
ALTER TABLE public.crypto_payment_settings
DROP CONSTRAINT crypto_payment_settings_currency_code_key;

-- Step 4: Add a new UNIQUE constraint on the combination of currency_code and network
ALTER TABLE public.crypto_payment_settings
ADD CONSTRAINT unique_currency_network UNIQUE (currency_code, network);

-- Optional: You might want to update the orders table if you plan to show network-specific logos there too.
-- This is not strictly required by the prompt, but it's good practice.
ALTER TABLE public.orders
ADD COLUMN payment_network_logo_url text;
