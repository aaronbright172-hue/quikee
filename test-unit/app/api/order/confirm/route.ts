// test-unit/app/api/order/confirm/route.ts
import { NextResponse } from 'next/server';
import { NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    // Update the order status in Supabase using the service role client
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
      .update({ payment_status: 'paid' }) // Set status to 'paid'
      .eq('id', orderId)
      .select('user_email, user_first_name, cart_details, original_fiat_amount, selected_crypto_code, converted_crypto_amount') // Select data for email
      .single();

    if (error) {
      console.error('Supabase error confirming order:', error);
      // Provide a more specific error message for easier debugging
      return NextResponse.json(
        { error: `Supabase error: ${error.message}` },
        { status: 500 }
      );
    }

    if (!data) {
        return NextResponse.json({ error: 'Order not found or an update was not required' }, { status: 404 });
    }

    // TODO: Implement email sending logic here
    console.log('Order confirmed successfully for:', data.user_email);

    return NextResponse.json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('API Error:', error);
    // Handle potential JSON parsing errors or other unexpected issues
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
