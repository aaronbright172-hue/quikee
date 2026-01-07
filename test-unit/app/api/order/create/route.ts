// test-unit/app/api/order/create/route.ts
import { NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
    const {
      formData,
      cartDetails,
      originalFiatAmount,
      selectedCryptoCode,
      convertedCryptoAmount,
      exchangeRate,
      paymentAddress,
      paymentBarcodeUrl,
      paymentNetwork,
    } = body;

    // Enhanced validation
    const requiredOrderFields = [
      'cartDetails', 'originalFiatAmount', 'selectedCryptoCode', 
      'convertedCryptoAmount', 'exchangeRate', 'paymentAddress', 
      'paymentBarcodeUrl', 'paymentNetwork', 'formData'
    ];
    for (const field of requiredOrderFields) {
      if (body[field] === undefined || body[field] === null) {
        const error = `Missing required field: ${field}`;
        console.error(error, { body });
        return NextResponse.json({ error }, { status: 400 });
      }
    }

    const requiredFormDataFields = [
      'email', 'firstName', 'lastName', 'address', 'city', 'state', 'postcode', 'phone', 'country'
    ];
    for (const field of requiredFormDataFields) {
      if (!formData[field]) {
        const error = `Missing required field in formData: ${field}`;
        console.error(error, { body });
        return NextResponse.json({ error }, { status: 400 });
      }
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.set({ name, value: '', ...options })
          },
        },
      }
    );
    const { data, error } = await supabase
      .from('orders')
      .insert({
        user_email: formData.email,
        user_first_name: formData.firstName,
        user_last_name: formData.lastName,
        delivery_address: formData.address,
        delivery_city: formData.city,
        delivery_state: formData.state,
        delivery_postcode: formData.postcode,
        delivery_phone: formData.phone,
        delivery_country: formData.country,
        cart_details: cartDetails, // Store cart items as JSONB
        original_fiat_amount: originalFiatAmount,
        selected_crypto_code: selectedCryptoCode,
        converted_crypto_amount: convertedCryptoAmount,
        exchange_rate_at_time_of_payment: exchangeRate,
        payment_status: 'pending', // Initial status
        payment_address: paymentAddress,
        payment_barcode_url: paymentBarcodeUrl,
        payment_network: paymentNetwork,
      })
      .select('id') // Select the ID of the newly created row
      .single(); // Expecting a single row returned

    if (error) {
      console.error('Supabase error creating order:', error);
      console.error('Failing order body:', body);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: 'Failed to retrieve order ID after creation' }, { status: 500 });
    }

    return NextResponse.json({ orderId: data.id });
  } catch (error) {
    console.error('API Error:', error);
    console.error('Request body that caused error:', body);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
