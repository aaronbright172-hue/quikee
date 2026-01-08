// test-unit/app/api/crypto/details/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server'; // Import the server-side Supabase client

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cryptoCode = searchParams.get('cryptoCode');

    if (!cryptoCode) {
      return NextResponse.json({ error: 'cryptoCode query parameter is required' }, { status: 400 });
    }

    const supabase = await createClient(); // Initialize the server-side Supabase client

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .select('address, barcode_url, network')
      .eq('currency_code', cryptoCode.toUpperCase()); // Removed .maybeSingle()

    if (error) {
      console.error('Supabase error fetching crypto details:', error);
      return NextResponse.json({ error: 'Failed to fetch cryptocurrency details' }, { status: 500 });
    }

    if (!data || data.length === 0) { // Check for empty array
      return NextResponse.json({ error: `Details for ${cryptoCode} not found` }, { status: 404 });
    }

    // If multiple entries exist, use the first one
    return NextResponse.json(data[0]);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}