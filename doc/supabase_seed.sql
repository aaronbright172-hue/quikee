-- Seed data for the crypto_payment_settings table

-- Clear existing data to prevent duplicates on re-seeding
DELETE FROM public.crypto_payment_settings;

INSERT INTO public.crypto_payment_settings (currency_code, address, barcode_url, network, is_active) VALUES
('USDC', '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 'https://example.com/usdc_barcode.png', 'Ethereum (ERC-20)', TRUE),
('BTC', 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq', 'https://example.com/btc_barcode.png', 'Bitcoin', TRUE),
('LTC', 'ltc1qg0e9j4jzv3q0q9z0y9x8y9x8y9x8y9x8y9x8y9', 'https://example.com/ltc_barcode.png', 'Litecoin', TRUE),
('ETH', '0x1234567890123456789012345678901234567890', 'https://example.com/eth_barcode.png', 'Ethereum', TRUE),
('TRX', 'TX1234567890123456789012345678901234', 'https://example.com/trx_barcode.png', 'TRON', TRUE),
('SOL', 'SoL1234567890123456789012345678901234567890', 'https://example.com/sol_barcode.png', 'Solana', TRUE),
('BNB', 'bnb123456789012345678901234567890123456789', 'https://example.com/bnb_barcode.png', 'Binance Smart Chain', TRUE);
