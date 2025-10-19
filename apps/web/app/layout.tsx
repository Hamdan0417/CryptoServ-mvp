import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Crypto Serv',
  description: 'Unified crypto services ecosystem'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-secondary text-secondary-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
