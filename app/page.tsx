import PostCard from '@/components/post-card';
import prisma from '@/lib/prisma';

function createExcerpt(markdown: string, maxLength = 180): string {
  const plainText = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/[>#*_~\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (plainText.length <= maxLength) {
    return plainText;
  }

  return `${plainText.slice(0, maxLength).trimEnd()}...`;
}

export default async function HomePage() {
  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">Latest Posts</h1>
        <p className="max-w-2xl text-base text-zinc-600">Published writing on building software, systems, and products.</p>
      </header>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-zinc-600">
          No published posts yet.
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              createdAt={post.createdAt}
              excerpt={createExcerpt(post.content)}
              slug={post.slug}
              title={post.title}
            />
          ))}
        </div>
      )}
    </section>
  );
}
