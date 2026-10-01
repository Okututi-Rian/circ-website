This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Redis content cache

The site uses Upstash Redis for server-side cache-aside on public content reads. Cache entries expire after five minutes. A successful admin write to events, communities, team members, gallery images, or site settings invalidates the public content cache; the next read gets fresh data from PostgreSQL and repopulates Redis. Application records and admin-only reads are not cached.

Create an Upstash Redis database and set these server-only variables locally and in Vercel:

```env
UPSTASH_REDIS_REST_URL=your-upstash-rest-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-rest-token
```

For the Vercel Upstash integration, `KV_REST_API_URL` and `KV_REST_API_TOKEN` are also supported. Do not prefix Redis credentials with `NEXT_PUBLIC_`. If the Redis variables are missing or Redis is unavailable, the app falls back to PostgreSQL; Redis caching will begin after valid credentials are configured.
