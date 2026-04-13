import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Page Not Found</h1>
      <p className="max-w-md text-base text-zinc-600">The page you requested does not exist or may have been moved.</p>
      <div className="mt-2 flex items-center gap-3">
        <Link className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800" href="/">
          Back Home
        </Link>
        <Link className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100" href="/admin">
          Go to Admin
        </Link>
      </div>
    </section>
  );
}
