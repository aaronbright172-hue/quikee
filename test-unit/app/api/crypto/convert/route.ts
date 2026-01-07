import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { cartTotal, cryptoDefinitions } = await request.json();

    if (typeof cartTotal !== 'number' || cartTotal <= 0) {
      return NextResponse.json({ error: 'Invalid cartTotal' }, { status: 400 });
    }
    if (!Array.isArray(cryptoDefinitions)) {
      return NextResponse.json({ error: 'Invalid cryptoDefinitions: must be an array' }, { status: 400 });
    }

    const mockExchangeRates: { [key: string]: number } = {
      USDC: 1.00,
      USDT: 1.00, // Added USDT
      BTC: 35000.00,
      LTC: 70.00,
      ETH: 2000.00,
      TRX: 0.08,
      SOL: 50.00,
      BNB: 300.00,
    };

    const rates: { [key: string]: { exchangeRate: number; convertedCryptoAmount: number } } = {};

    for (const def of cryptoDefinitions) {
      const symbol = def.symbol;
      const exchangeRate = mockExchangeRates[symbol];
      if (exchangeRate) {
        rates[symbol] = {
          exchangeRate: exchangeRate,
          convertedCryptoAmount: cartTotal / exchangeRate,
        };
      }
    }

    return NextResponse.json({ rates });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
