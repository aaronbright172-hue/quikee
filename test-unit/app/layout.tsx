import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { CartProvider } from '@/contexts/CartContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Header from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import CartSlideIn from '@/components/CartSlideIn';
import Footer from '@/components/Footer'; // Import Footer component
import Script from 'next/script'; // Import the Script component

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quikee - Agent Tech Company',
  description: 'Premium tech products at unbeatable prices. We partner with leading tech companies to bring you test andevaluation units.',
  openGraph: {
    images: [
      {
        url: '/favicon.svg', // Updated to new favicon
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/favicon.svg', // Updated to new favicon
      },
    ],
  },
  icons: {
    icon: '/favicon.svg', // Simpler, single favicon
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
          <Toaster />
          <CartProvider>
            <Header />
            <main>{children}</main>
            <CartSlideIn />
            <Footer /> {/* Render Footer component here */}
          </CartProvider>
        </CurrencyProvider>
        
        {/* Begin of Chaport Live Chat code */}
        <Script
          id="chaport-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,v3){
              w.chaportConfig = {
              appId : '69612e5e8ff7411a53d16ec2',
              };

              if(w.chaport)return;v3=w.chaport={};v3._q=[];v3._l={};v3.q=function(){v3._q.push(arguments)};v3.on=function(e,fn){if(!v3._l[e])v3._l[e]=[];v3._l[e].push(fn)};var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://app.chaport.com/javascripts/insert.js';var ss=d.getElementsByTagName('script')[0];ss.parentNode.insertBefore(s,ss)})(window, document);
            `,
          }}
        />
        {/* End of Chaport Live Chat code */}
      </body>
    </html>
  );
}
