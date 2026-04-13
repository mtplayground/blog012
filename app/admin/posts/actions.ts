'use server';

import { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import prisma from '@/lib/prisma';

const createPostSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title is too long'),
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .max(200, 'Slug is too long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  content: z.string().trim().min(1, 'Content is required')
});

type CreatePostFormState = {
  message: string | null;
  fieldErrors: {
    title?: string;
    slug?: string;
    content?: string;
  };
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function createPostAction(
  _previousState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const title = String(formData.get('title') ?? '');
  const rawSlug = String(formData.get('slug') ?? '');
  const content = String(formData.get('content') ?? '');
  const published = formData.get('published') === 'on';

  const input = {
    title,
    slug: slugify(rawSlug),
    content
  };

  const parsed = createPostSchema.safeParse(input);

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;

    return {
      message: 'Please fix the errors below.',
      fieldErrors: {
        title: fieldErrors.title?.[0],
        slug: fieldErrors.slug?.[0],
        content: fieldErrors.content?.[0]
      }
    };
  }

  try {
    await prisma.post.create({
      data: {
        title: parsed.data.title,
        slug: parsed.data.slug,
        content: parsed.data.content,
        published
      }
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
      return {
        message: 'A post with this slug already exists.',
        fieldErrors: {
          slug: 'Slug already in use.'
        }
      };
    }

    return {
      message: 'Unable to create post right now. Please try again.',
      fieldErrors: {}
    };
  }

  revalidatePath('/admin');
  redirect('/admin');
}
