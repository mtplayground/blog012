import Link from 'next/link';

type PostCardProps = {
  title: string;
  slug: string;
  excerpt: string;
  createdAt: Date;
};

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  }).format(date);
}

export default function PostCard({ title, slug, excerpt, createdAt }: PostCardProps) {
  return (
    <article className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition hover:border-zinc-300">
      <p className="text-sm text-zinc-500">{formatDate(createdAt)}</p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">
        <Link className="underline-offset-4 hover:underline" href={`/post/${slug}`}>
          {title}
        </Link>
      </h2>
      <p className="mt-3 text-base text-zinc-700">{excerpt}</p>
      <Link className="mt-4 inline-block text-sm font-medium text-zinc-900 underline-offset-4 hover:underline" href={`/post/${slug}`}>
        Read post
      </Link>
    </article>
  );
}
