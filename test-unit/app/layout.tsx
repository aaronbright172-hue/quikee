import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Header from '@/components/Header';
import CartSlideIn from '@/components/CartSlideIn';
import Footer from '@/components/Footer'; // Import Footer component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '2Fast Tech - Agent Tech Company',
  description: 'Premium tech products at unbeatable prices. We partner with leading tech companies to bring you test and evaluation units.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <main>{children}</main>
            <CartSlideIn />
            <Footer /> {/* Render Footer component here */}
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
