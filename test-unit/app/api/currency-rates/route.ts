import { NextResponse } from 'next/server';
import fallbackRates from '../../../data/fallback-rates.json';

export async function GET() {
  try {
    const response = await fetch('https://api.frankfurter.app/latest?from=USD', { next: { revalidate: 3600 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch from Frankfurter API with status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch from Frankfurter API, using fallback data:', error);
    return NextResponse.json(fallbackRates);
  }
}
