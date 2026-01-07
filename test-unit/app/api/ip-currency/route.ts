import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Error fetching from ipapi.co. Status: ${response.status}`, {
        statusText: response.statusText,
        response: errorData,
      });
      return NextResponse.json({ error: `Failed to fetch from ipapi.co with status: ${response.status}` }, { status: response.status });
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Internal error fetching from ipapi.co:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
