import Link from 'next/link';
import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || 'http://localhost:8080';
const siteName = 'blog012';
const defaultDescription = 'A minimal blog built with Next.js, Prisma, and markdown content.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`
  },
  description: defaultDescription,
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: '/',
    siteName,
    title: siteName,
    description: defaultDescription
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: defaultDescription
  },
  robots: {
    index: true,
    follow: true
  }
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-zinc-900 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6">
          <header className="border-b border-zinc-200 py-6">
            <Link className="inline-block text-2xl font-semibold tracking-tight text-zinc-900" href="/">
              blog012
            </Link>
            <p className="mt-1 text-sm text-zinc-600">Notes on building software, one post at a time.</p>
          </header>

          <main className="flex-1 py-10">{children}</main>

          <footer className="border-t border-zinc-200 py-6 text-sm text-zinc-600">
            <p>© {new Date().getFullYear()} blog012</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
