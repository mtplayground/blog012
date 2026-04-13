import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'blog012',
  description: 'blog012'
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
