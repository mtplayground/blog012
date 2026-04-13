'use client';

import { useEffect } from 'react';

type AdminErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function AdminErrorPage({ error, reset }: AdminErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[40vh] w-full max-w-2xl flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">Admin Error</p>
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Unable to Load Admin Section</h1>
      <p className="max-w-md text-base text-zinc-600">An unexpected problem occurred while loading admin data.</p>
      <button
        className="mt-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800"
        onClick={reset}
        type="button"
      >
        Retry
      </button>
    </section>
  );
}
