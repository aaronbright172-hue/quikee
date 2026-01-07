// test-unit/app/api/crypto/details/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase'; // Import the Supabase client

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cryptoCode = searchParams.get('cryptoCode');

    if (!cryptoCode) {
      return NextResponse.json({ error: 'cryptoCode query parameter is required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('crypto_payment_settings')
      .select('address, barcode_url, network')
      .eq('currency_code', cryptoCode.toUpperCase()) // Store in uppercase for consistency
      .maybeSingle(); // Expecting one or zero results

    if (error) {
      console.error('Supabase error fetching crypto details:', error);
      return NextResponse.json({ error: 'Failed to fetch cryptocurrency details' }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: `Details for ${cryptoCode} not found` }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}