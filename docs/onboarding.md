# Onboarding

## Requirements
- Node 20 (use nvm)
- pnpm 10 (via corepack)
- Git 2.40+

## Setup

```bash
corepack enable
pnpm install
for app in hospital hotel gs admin; do
  cp apps/$app/.env.example apps/$app/.env.local
done
pnpm dev
```

Apps run on 3001 (hospital), 3002 (hotel), 3003 (gs), 3004 (admin).

## Mock login
Visit /vi/login, submit any email+password. Mock session cookie is set.
