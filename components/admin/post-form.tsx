'use client';

import { useActionState, useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

type PostFormState = {
  message: string | null;
  fieldErrors: {
    title?: string;
    slug?: string;
    content?: string;
  };
};

type PostFormValues = {
  title: string;
  slug: string;
  content: string;
  published: boolean;
};

type PostFormProps = {
  action: (state: PostFormState, formData: FormData) => Promise<PostFormState>;
  initialValues?: Partial<PostFormValues>;
  submitLabel?: string;
};

const initialPostFormState: PostFormState = {
  message: null,
  fieldErrors: {}
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export default function PostForm({ action, initialValues, submitLabel = 'Create Post' }: PostFormProps) {
  const [formState, formAction, isPending] = useActionState(action, initialPostFormState);
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [slug, setSlug] = useState(initialValues?.slug ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [published, setPublished] = useState(initialValues?.published ?? false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(Boolean(initialValues?.slug));

  const previewContent = useMemo(() => content.trim(), [content]);

  return (
    <form action={formAction} className="space-y-6">
      {formState.message ? (
        <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{formState.message}</div>
      ) : null}

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-800" htmlFor="title">
          Title
        </label>
        <input
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          id="title"
          name="title"
          onChange={(event) => {
            const nextTitle = event.target.value;
            setTitle(nextTitle);

            if (!slugManuallyEdited) {
              setSlug(slugify(nextTitle));
            }
          }}
          required
          type="text"
          value={title}
        />
        {formState.fieldErrors.title ? <p className="text-sm text-red-600">{formState.fieldErrors.title}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-zinc-800" htmlFor="slug">
          Slug
        </label>
        <input
          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
          id="slug"
          name="slug"
          onChange={(event) => {
            setSlugManuallyEdited(true);
            setSlug(slugify(event.target.value));
          }}
          required
          type="text"
          value={slug}
        />
        {formState.fieldErrors.slug ? <p className="text-sm text-red-600">{formState.fieldErrors.slug}</p> : null}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-800" htmlFor="content">
            Markdown Content
          </label>
          <textarea
            className="min-h-[320px] w-full rounded-md border border-zinc-300 px-3 py-2 font-mono text-sm outline-none transition focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200"
            id="content"
            name="content"
            onChange={(event) => setContent(event.target.value)}
            required
            value={content}
          />
          {formState.fieldErrors.content ? <p className="text-sm text-red-600">{formState.fieldErrors.content}</p> : null}
        </div>

        <div className="space-y-2">
          <p className="block text-sm font-medium text-zinc-800">Live Preview</p>
          <div className="min-h-[320px] rounded-md border border-zinc-200 bg-white p-4">
            {previewContent ? (
              <article className="space-y-3 text-sm text-zinc-800">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewContent}</ReactMarkdown>
              </article>
            ) : (
              <p className="text-sm text-zinc-500">Preview appears as you type markdown content.</p>
            )}
          </div>
        </div>
      </div>

      <label className="inline-flex items-center gap-2 text-sm text-zinc-700" htmlFor="published">
        <input
          checked={published}
          className="h-4 w-4 rounded border-zinc-300"
          id="published"
          name="published"
          onChange={(event) => setPublished(event.target.checked)}
          type="checkbox"
        />
        Publish immediately
      </label>

      <div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          type="submit"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}
