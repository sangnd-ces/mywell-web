# MyWell Web

Monorepo cho 4 portal web của nền tảng MyWell.

| Portal | App | Port |
|---|---|---|
| Hospital | apps/hospital | 3001 |
| Hotel Frontdesk | apps/hotel | 3002 |
| GS Command Center | apps/gs | 3003 |
| MyWell Admin | apps/admin | 3004 |

## Quick start

```bash
corepack enable && corepack prepare pnpm@10 --activate
pnpm install
pnpm dev
```

See `docs/onboarding.md` for full setup.

## Stack

- Next.js 15 (App Router) + TypeScript strict
- pnpm workspaces + Turborepo
- Tailwind CSS + design tokens (3-layer CSS vars)
- TanStack Query + Zustand + next-intl (vi/en) + Socket.IO client
- Biome (lint+format)
