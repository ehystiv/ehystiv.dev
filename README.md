# ehystiv.dev

Personal website of Stefano Bichicchi, built with [Astro](https://astro.build), TypeScript and Tailwind CSS v4. Deployed on Vercel.

## Developing

Once you've installed dependencies with `npm install`, start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of the app:

```sh
npm run build
```

The build output is generated for Vercel (`.vercel/output/`) via `@astrojs/vercel`, with ISR enabled. To preview the production behavior locally, use the [Vercel CLI](https://vercel.com/docs/cli): `vercel dev`.

## Environment variables

Copy `.env.example` (or create `.env`) with:

| Variable       | Required | Purpose                                    |
| -------------- | -------- | ------------------------------------------ |
| `API_TOKEN`    | Yes      | api-ninjas.com key for the joke of the day |
| `GITHUB_TOKEN` | No       | raises GitHub API rate limit for stars     |
