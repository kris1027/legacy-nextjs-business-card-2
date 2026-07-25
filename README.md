# Business Card Website

Personal business card website. Built with Next.js 16 and deployed on Vercel.

## Tech Stack

- **Framework** - Next.js 16 (App Router)
- **Language** - TypeScript
- **Styling** - CSS Modules
- **Forms** - React Hook Form + Zod
- **Email** - Resend
- **Testing** - Vitest
- **Analytics** - Vercel Analytics + Speed Insights
- **Package manager** - pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start development server           |
| `pnpm build`     | Production build                   |
| `pnpm start`     | Start production server            |
| `pnpm test`      | Run tests                          |
| `pnpm lint`      | Lint with ESLint                   |
| `pnpm typecheck` | Type-check with TypeScript         |
| `pnpm format`    | Format with Prettier               |
| `pnpm validate`  | Format, lint, typecheck, and build |

## Project Structure

```
app/           # Next.js App Router pages
components/    # React components (layout, sections, cosmos)
hooks/         # Custom React hooks
lib/           # Shared utilities and content
types/         # TypeScript type definitions
docs/          # Agent and architecture docs
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```
RESEND_API_KEY=   # Resend API key for the inquiry form
```

## Pre-commit Hooks

Husky runs `lint-staged` on every commit - Prettier formats staged files, then ESLint and TypeScript checks run automatically.

## Deployment

Deployed on Vercel. Every push to `main` triggers a production deploy automatically.

## Screenshots

<img width="400" alt="SCR-20260725-oxgb" src="https://github.com/user-attachments/assets/2efe4b1f-3958-47fe-befc-36eb2a7b2fc0" />
<img width="400" alt="SCR-20260725-oxed" src="https://github.com/user-attachments/assets/a46563f4-402d-4366-91c4-37db9f00170d" />
<img width="400" alt="SCR-20260725-owyt" src="https://github.com/user-attachments/assets/5dde2d55-d8d1-455d-aa48-ff980ca8a742" />
<img width="400" alt="SCR-20260725-oytr" src="https://github.com/user-attachments/assets/0d2feacd-0807-4fb5-8392-8ae031b5d9cd" />

