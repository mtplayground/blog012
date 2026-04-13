import { notFound } from 'next/navigation';

import { updatePostAction } from '@/app/admin/posts/actions';
import PostForm from '@/components/admin/post-form';
import prisma from '@/lib/prisma';

type EditPostPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const postId = Number.parseInt(id, 10);

  if (!Number.isInteger(postId) || postId <= 0) {
    notFound();
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  if (!post) {
    notFound();
  }

  const boundUpdateAction = updatePostAction.bind(null, post.id);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Edit Post</h1>
        <p className="mt-1 text-sm text-zinc-600">Update content, slug, and publish status.</p>
      </div>

      <PostForm
        action={boundUpdateAction}
        initialValues={{
          title: post.title,
          slug: post.slug,
          content: post.content,
          published: post.published
        }}
        submitLabel="Update Post"
      />
    </section>
  );
}
