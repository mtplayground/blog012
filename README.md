# blog012

A minimal blog/CMS built with Next.js App Router, Prisma (SQLite), and markdown content.

## Features

- Public blog index with published posts
- Individual markdown post pages with syntax highlighting
- Admin login with cookie-based auth
- Admin post management (create, edit, publish/unpublish, delete)
- Docker + docker-compose support

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- Prisma ORM with SQLite
- Zod for environment/input validation

## Prerequisites

- Node.js 20+
- npm 10+

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment template:

```bash
cp .env.example .env
```

3. Generate an admin password hash and update `.env`:

```bash
node -e "const bcrypt=require('bcryptjs'); bcrypt.hash('change-me-password', 12).then(h=>console.log(h));"
```

Set the output as `ADMIN_PASSWORD_HASH` in `.env`.

4. Set environment variables in `.env`:

```dotenv
ADMIN_PASSWORD_HASH=<bcrypt-hash>
SESSION_SECRET=<long-random-string-at-least-32-chars>
DATABASE_URL=file:./dev.db
```

5. Run database migrations:

```bash
npm run prisma:migrate
```

6. Start the app:

```bash
npm run dev
```

App runs at `http://0.0.0.0:8080`.

## Useful Commands

```bash
npm run build        # production build
npm run start        # production server on 0.0.0.0:8080
npm run lint         # lint
npm run format       # format files
npm run prisma:generate
npm run prisma:migrate
```

## Admin Usage

- Login page: `/admin/login`
- Dashboard: `/admin`

Use the plaintext password that matches your `ADMIN_PASSWORD_HASH`.

## Docker Deployment

### Build and run with docker-compose

```bash
docker compose up -d --build
```

### Stop services

```bash
docker compose down
```

### Data persistence

`docker-compose.yml` mounts a named volume at `/app/data` and sets:

```dotenv
DATABASE_URL=file:/app/data/dev.db
```

This keeps the SQLite database persistent across container restarts.

## Production Notes

- Set `NEXT_PUBLIC_SITE_URL` to your public URL for correct canonical/OG metadata.
- Use a strong `SESSION_SECRET` and secure admin password.
- Keep `.env` private; do not commit real secrets.
