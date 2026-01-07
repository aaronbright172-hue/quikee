// test-unit/app/api/order/confirm/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Import the Supabase client

export async function POST(request: Request) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    // Update the order status in Supabase
    const { data, error } = await supabase
      .from('orders')
      .update({ payment_status: 'paid' }) // Set status to 'paid' or 'confirmed'
      .eq('id', orderId)
      .select('user_email, user_first_name, cart_details, original_fiat_amount, selected_crypto_code, converted_crypto_amount') // Select relevant data for email
      .single();

    if (error) {
      console.error('Supabase error confirming order:', error);
      return NextResponse.json({ error: 'Failed to confirm order' }, { status: 500 });
    }

    if (!data) {
        return NextResponse.json({ error: 'Order not found or already confirmed' }, { status: 404 });
    }

    // TODO: Implement email sending logic here
    // Example: sendOrderConfirmationEmail(data);
    console.log('Order confirmed successfully:', data);
    console.log('Email to be sent to:', data.user_email);
    console.log('Order details for email:', {
        customer: `${data.user_first_name}`,
        cart: data.cart_details,
        amount: `${data.original_fiat_amount} USD`,
        cryptoPaid: `${data.converted_crypto_amount} ${data.selected_crypto_code}`
    });


    return NextResponse.json({ message: 'Order confirmed successfully' });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
