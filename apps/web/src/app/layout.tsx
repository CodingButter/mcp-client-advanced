import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import { Providers } from './providers';

import '@mcp/ui/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Advanced MCP Client Dashboard',
  description: 'Revolutionary Model Context Protocol Client with Intelligent Orchestration',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
