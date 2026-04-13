import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import MarkdownRenderer from '@/components/markdown-renderer';
import prisma from '@/lib/prisma';
import { createExcerpt, formatPostDate } from '@/lib/markdown';

type PostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: {
      slug,
      published: true
    }
  });
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post not found',
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const description = createExcerpt(post.content, 160);
  const canonicalPath = `/post/${post.slug}`;

  return {
    title: post.title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      url: canonicalPath,
      publishedTime: post.createdAt.toISOString(),
      modifiedTime: post.updatedAt.toISOString()
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto w-full max-w-3xl space-y-6">
      <header className="space-y-2">
        <p className="text-sm text-zinc-500">{formatPostDate(post.createdAt)}</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">{post.title}</h1>
      </header>

      <MarkdownRenderer content={post.content} />
    </article>
  );
}
