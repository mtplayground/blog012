import Link from 'next/link';

import prisma from '@/lib/prisma';

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  }).format(date);
}

export default async function AdminDashboardPage() {
  const posts = await prisma.post.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Posts</h1>
          <p className="mt-1 text-sm text-zinc-600">All draft and published posts.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">Title</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">Updated</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {posts.length === 0 ? (
                <tr>
                  <td className="px-4 py-10 text-center text-sm text-zinc-500" colSpan={4}>
                    No posts yet.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-zinc-900">{post.title}</div>
                      <div className="text-xs text-zinc-500">/{post.slug}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          post.published ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-zinc-700">{formatDate(post.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-sm">
                        <Link className="text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline" href={`/admin/posts/${post.id}/edit`}>
                          Edit
                        </Link>
                        <Link className="text-red-600 underline-offset-4 hover:text-red-700 hover:underline" href={`/admin/posts/${post.id}/delete`}>
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
