import PostForm from '@/components/admin/post-form';

import { createPostAction } from '@/app/admin/posts/actions';

export default function NewPostPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Create Post</h1>
        <p className="mt-1 text-sm text-zinc-600">Write your post in markdown, preview it live, and choose whether to publish.</p>
      </div>

      <PostForm action={createPostAction} />
    </section>
  );
}
