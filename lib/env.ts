import { z } from 'zod';

const envSchema = z.object({
  ADMIN_PASSWORD_HASH: z
    .string({ required_error: 'ADMIN_PASSWORD_HASH is required' })
    .min(20, 'ADMIN_PASSWORD_HASH must be a hash value, not a plain password'),
  SESSION_SECRET: z
    .string({ required_error: 'SESSION_SECRET is required' })
    .min(32, 'SESSION_SECRET must be at least 32 characters'),
  DATABASE_URL: z.string({ required_error: 'DATABASE_URL is required' }).min(1, 'DATABASE_URL is required')
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => `${issue.path.join('.') || 'env'}: ${issue.message}`)
    .join('; ');

  throw new Error(`Invalid environment configuration: ${details}`);
}

export const env = parsedEnv.data;
