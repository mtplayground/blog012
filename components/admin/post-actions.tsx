'use client';

import Link from 'next/link';
import { FormEvent } from 'react';

import { deletePostAction, togglePostPublishedAction } from '@/app/admin/posts/actions';

type PostActionsProps = {
  postId: number;
  published: boolean;
};

function confirmDelete(event: FormEvent<HTMLFormElement>) {
  const shouldDelete = window.confirm('Delete this post? This action cannot be undone.');

  if (!shouldDelete) {
    event.preventDefault();
  }
}

export default function PostActions({ postId, published }: PostActionsProps) {
  const toggleAction = togglePostPublishedAction.bind(null, postId);
  const deleteAction = deletePostAction.bind(null, postId);

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link className="text-zinc-700 underline-offset-4 hover:text-zinc-900 hover:underline" href={`/admin/posts/${postId}/edit`}>
        Edit
      </Link>

      <form action={toggleAction}>
        <button className="text-indigo-700 underline-offset-4 hover:text-indigo-800 hover:underline" type="submit">
          {published ? 'Unpublish' : 'Publish'}
        </button>
      </form>

      <form action={deleteAction} onSubmit={confirmDelete}>
        <button className="text-red-600 underline-offset-4 hover:text-red-700 hover:underline" type="submit">
          Delete
        </button>
      </form>
    </div>
  );
}
