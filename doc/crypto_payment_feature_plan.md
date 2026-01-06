# Cryptocurrency Payment Feature Plan

## I. Overview
This document outlines the plan for implementing a new cryptocurrency payment feature into the existing e-commerce application. This feature includes:
1.  **Checkout Page Modifications:** Integrating a "Coingate" payment method, replacing other "additional payment methods".
2.  **Cryptocurrency Selection Pop-up:** A modal for users to select their preferred cryptocurrency.
3.  **Cryptocurrency Payment Details Page:** A dedicated page displaying payment instructions (address, barcode, amount, countdown).
4.  **Admin Page:** A secure interface for managing cryptocurrency payment details.
5.  **Backend Integration:** Secure API endpoints for currency conversion, fetching payment details, and handling order confirmation.

## II. Detailed Plan

### 1. Supabase Setup & Database Schema
To ensure security, persistence, and scalability, Supabase will be used as the backend.

*   **Action:** Create a new Supabase project.
*   **Database Tables:**
    *   `crypto_payment_settings`:
        *   `id` (PK, UUID)
        *   `currency_code` (e.g., 'BTC', 'ETH')
        *   `address` (TEXT)
        *   `barcode_url` (TEXT, URL to barcode image or base64 encoded)
        *   `network` (TEXT, e.g., 'ERC-20', 'Bitcoin')
        *   `is_active` (BOOLEAN, default TRUE)
        *   `created_at` (TIMESTAMP)
        *   `updated_at` (TIMESTAMP)
    *   `orders`:
        *   `id` (PK, UUID)
        *   `user_email` (TEXT)
        *   `user_first_name` (TEXT)
        *   `user_last_name` (TEXT)
        *   `delivery_address` (TEXT)
        *   `delivery_city` (TEXT)
        *   `delivery_state` (TEXT)
        *   `delivery_postcode` (TEXT)
        *   `delivery_phone` (TEXT)
        *   `delivery_country` (TEXT)
        *   `cart_details` (JSONB, store cart items)
        *   `original_fiat_amount` (NUMERIC)
        *   `selected_crypto_code` (TEXT)
        *   `converted_crypto_amount` (NUMERIC)
        *   `exchange_rate_at_time_of_payment` (NUMERIC)
        *   `payment_status` (TEXT, e.g., 'pending', 'paid', 'expired', 'confirmed')
        *   `payment_address` (TEXT, copy from settings for historical record)
        *   `payment_barcode_url` (TEXT, copy from settings for historical record)
        *   `payment_network` (TEXT, copy from settings for historical record)
        *   `created_at` (TIMESTAMP)
        *   `updated_at` (TIMESTAMP)
*   **Security:** Configure Row Level Security (RLS) policies on these tables to ensure:
    *   Only authenticated administrators can manage `crypto_payment_settings`.
    *   Only the application's backend can read/write to the `orders` table.

### 2. Backend - Next.js API Routes (Interacting with Supabase)

*   **`/api/crypto/convert` (POST):**
    *   **Purpose:** Securely convert the checkout total into the selected cryptocurrency amount.
    *   **Input:** `cartTotal` (fiat amount), `targetCryptoCode` (e.g., 'BTC').
    *   **Logic:**
        1.  Receive cart total from frontend.
        2.  Call a reliable third-party API (e.g., CoinGecko) to fetch real-time exchange rates for the target cryptocurrency against the base fiat currency (e.g., USD).
        3.  Calculate the equivalent cryptocurrency amount.
        4.  Return the `converted_crypto_amount` and the `exchange_rate`.
    *   **Security:** Server-side conversion prevents client-side manipulation.

*   **`/api/crypto/details` (GET):**
    *   **Purpose:** Fetch the secure payment details (barcode, address) for a specific cryptocurrency.
    *   **Input:** `cryptoCode` (e.g., 'BTC').
    *   **Logic:**
        1.  Query the `crypto_payment_settings` table in Supabase for the specified `cryptoCode`.
        2.  Return `address`, `barcode_url`, and `network`.
    *   **Security:** Requires authentication/authorization; only authorized requests can access this endpoint.

*   **`/api/order/create` (POST):**
    *   **Purpose:** Create a pending order record before the user proceeds to the crypto payment page.
    *   **Input:** `formData` (contact/delivery), `cartDetails`, `originalFiatAmount`, `selectedCryptoCode`, `convertedCryptoAmount`, `exchangeRate`.
    *   **Logic:**
        1.  Validate input.
        2.  Insert a new record into the `orders` table in Supabase with `payment_status: 'pending'`.
        3.  Return the `order_id`.

*   **`/api/order/confirm` (POST):**
    *   **Purpose:** Handle the "We have paid" action, update order status, and send notification.
    *   **Input:** `order_id`.
    *   **Logic:**
        1.  Validate `order_id`.
        2.  Update the `payment_status` of the corresponding order in the `orders` table to 'paid' (or a similar intermediate status).
        3.  Trigger an email notification to the company email address with all relevant order details and user information.
        4.  (Optional but recommended): Implement a webhook or background job to monitor blockchain for actual payment confirmation for the specific `payment_address` associated with the order. This is a complex step for a later iteration if needed for automated confirmation.
    *   **Security:** Requires authentication/authorization.

### 3. Frontend - Checkout Page Modifications (`test-unit/app/checkout/page.tsx`)

*   **Remove unwanted payment methods:** Eliminate "Alipay+CN", "Alipay+HK", and "Opay" sections from the UI.
*   **Integrate "Coingate" section:**
    *   Add a new section for "Additional payment methods".
    *   Utilize a new `PaymentMethod` component (see section 4) for "Coingate".
    *   The "Coingate" section will contain the informational text and the "Pay with Cryptocurrency" button.

### 4. Frontend - `PaymentMethod` Component (`test-unit/components/PaymentMethod.tsx`)

*   **Purpose:** A reusable component to encapsulate collapsible payment method UI.
*   **Features:**
    *   Title and optional logo.
    *   Collapsible content area.
    *   Radio button for selection (managed by the parent component or local state).
    *   Will be used for the "Coingate" section.

### 5. Frontend - Cryptocurrency Selection Pop-up (New Component)

*   **Purpose:** Display a modal for users to select a cryptocurrency.
*   **Trigger:** Activated by clicking the "Pay with Cryptocurrency" button in the "Coingate" section.
*   **Features:**
    *   Display list of supported cryptocurrencies (e.g., USDC, Bitcoin, Litecoin, Ethereum, TRON, Solana, Binance Coin).
    *   For each cryptocurrency, display its logo, code, and the converted amount (fetched from `/api/crypto/convert`).
    *   Search/filter option for currencies.
    *   User selects a currency, which then navigates to the payment details page.

### 6. Frontend - Cryptocurrency Payment Details Page (New Page: `app/payment/crypto/[currency]/page.tsx`)

*   **Purpose:** Display payment instructions after a cryptocurrency is selected.
*   **Route:** Dynamic route based on selected currency (e.g., `/payment/crypto/BTC`).
*   **Features:**
    *   10-minute countdown timer.
    *   Display order amount in selected cryptocurrency.
    *   Display barcode (fetched from `/api/crypto/details`).
    *   Display cryptocurrency address (fetched from `/api/crypto/details`).
    *   Display network (fetched from `/api/crypto/details`).
    *   **Remove:** The "Connect wallet" option will be removed.
    *   "We have paid" button:
        *   On click, send `order_id` to `/api/order/confirm`.
        *   Provide user feedback (e.g., success message, order status page link).

### 7. Admin Page (`app/admin/crypto-settings/page.tsx`)

*   **Purpose:** Secure interface for administrators to manage cryptocurrency payment details.
*   **Authentication:** Implement Supabase authentication to protect this route. Only authorized admins can access.
*   **Features:**
    *   CRUD operations for `crypto_payment_settings` table entries:
        *   Add new cryptocurrency settings (code, address, barcode URL, network).
        *   Edit existing settings.
        *   Deactivate/Delete settings.
    *   Form validation for inputs.
    *   Interface to upload barcode images (if not using direct URLs).

## III. Development Workflow

1.  **Initial UI Setup (Frontend - Checkout Page):**
    *   Create `PaymentMethod.tsx` component.
    *   Modify `app/checkout/page.tsx` to remove old payment methods and integrate the `PaymentMethod` component for Coingate.
2.  **Supabase Integration (Backend & Database):**
    *   Set up Supabase project and define `crypto_payment_settings` and `orders` tables.
    *   Implement RLS.
    *   Develop Next.js API routes (`/api/crypto/convert`, `/api/crypto/details`, `/api/order/create`, `/api/order/confirm`).
3.  **Frontend - Crypto Selection Pop-up:**
    *   Create and integrate the modal component.
    *   Connect it to `/api/crypto/convert`.
4.  **Frontend - Crypto Payment Details Page:**
    *   Create the new page.
    *   Connect it to `/api/crypto/details` and `/api/order/confirm`.
5.  **Admin Page Development:**
    *   Implement admin authentication.
    *   Build the UI for managing crypto settings.
6.  **Refinement & Testing:**
    *   Thorough testing of the entire flow.
    *   Styling and UI/UX adjustments.

## IV. Assumptions & Clarifications

*   **Third-Party Exchange Rate API:** A free or paid API for real-time cryptocurrency exchange rates will be integrated (e.g., CoinGecko API). API keys will be stored securely (e.g., environment variables).
*   **Barcode Storage:** Barcode images will either be hosted externally and their URLs stored in Supabase, or Supabase Storage will be used to host them.
*   **Email Service:** An existing email service (e.g., SendGrid, Nodemailer with SMTP) will be used for sending order confirmation emails. API keys will be stored securely.
*   **Blockchain Monitoring:** Automated monitoring of blockchain transactions for payment confirmation is a complex feature that will *not* be part of the initial scope. Manual confirmation by the admin after user clicks "We have paid" and verification of blockchain transaction will be assumed initially.

This revised plan addresses the security concerns and provides a more robust approach to implementing the cryptocurrency payment feature.