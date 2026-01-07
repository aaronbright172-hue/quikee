-- Create a new ENUM type for cryptocurrency codes
CREATE TYPE crypto_currency_code AS ENUM ('BTC', 'USDC', 'ETH', 'SOL', 'LTC', 'TRX', 'BNB');

-- Alter the crypto_payment_settings table to use the new ENUM type for currency_code
-- IMPORTANT: Ensure all existing 'currency_code' values in crypto_payment_settings
-- are one of 'BTC', 'USDC', 'ETH', 'SOL', 'LTC', 'TRX', 'BNB' before running this.
-- If not, you will need to update them to conforming values or handle them appropriately
-- (e.g., set to NULL temporarily if the column allows NULL, then update).
ALTER TABLE public.crypto_payment_settings
ALTER COLUMN currency_code TYPE crypto_currency_code
USING currency_code::crypto_currency_code;

-- Alter the orders table to use the new ENUM type for selected_crypto_code
-- IMPORTANT: Similar to above, ensure all existing 'selected_crypto_code' values in orders
-- conform to the new ENUM type before running this.
ALTER TABLE public.orders
ALTER COLUMN selected_crypto_code TYPE crypto_currency_code
USING selected_crypto_code::crypto_currency_code;
