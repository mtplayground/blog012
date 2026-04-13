import Link from 'next/link';
import type { ReactNode } from 'react';

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-4">
            <p className="text-sm font-semibold text-zinc-900">Admin</p>
            <nav className="flex items-center gap-3 text-sm">
              <Link className="text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline" href="/admin">
                Dashboard
              </Link>
              <Link className="text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline" href="/admin/posts/new">
                New Post
              </Link>
            </nav>
          </div>

          <form action="/api/auth/logout" method="post">
            <button
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
