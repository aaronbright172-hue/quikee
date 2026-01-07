// test-unit/app/api/crypto/convert/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { cartTotal, targetCryptoCode } = await request.json();

    if (typeof cartTotal !== 'number' || cartTotal <= 0) {
      return NextResponse.json({ error: 'Invalid cartTotal' }, { status: 400 });
    }
    if (typeof targetCryptoCode !== 'string' || targetCryptoCode.length === 0) {
      return NextResponse.json({ error: 'Invalid targetCryptoCode' }, { status: 400 });
    }

    // --- Mock CoinGecko API Call ---
    // In a real application, you would fetch real-time data.
    // For demonstration, we'll use hardcoded mock rates.
    const mockExchangeRates: { [key: string]: number } = {
      USDC: 1.00, // 1 USDC = 1 USD
      BTC: 35000.00, // 1 BTC = 35000 USD (example)
      LTC: 70.00,    // 1 LTC = 70 USD (example)
      ETH: 2000.00,  // 1 ETH = 2000 USD (example)
      TRX: 0.08,     // 1 TRX = 0.08 USD (example)
      SOL: 50.00,    // 1 SOL = 50 USD (example)
      BNB: 300.00,   // 1 BNB = 300 USD (example)
    };

    const exchangeRate = mockExchangeRates[targetCryptoCode];

    if (!exchangeRate) {
      return NextResponse.json({ error: `Exchange rate for ${targetCryptoCode} not found` }, { status: 404 });
    }

    const convertedCryptoAmount = cartTotal / exchangeRate;

    return NextResponse.json({
      originalFiatAmount: cartTotal,
      selectedCryptoCode: targetCryptoCode,
      convertedCryptoAmount: convertedCryptoAmount,
      exchangeRate: exchangeRate,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
