# 🚀 RateCoo - Quick Reference

## Installation

```bash
pnpm install
```

## Running Locally

```bash
pnpm dev
```

Accesses:
- Landing: http://localhost:3000
- Member: http://localhost:3001 (demo@example.com / password)
- Admin: http://localhost:3002
- Widget: http://localhost:5173

## Environment Setup

```bash
turso auth login
turso db create ratecoo-local
turso db tokens create ratecoo-local
```

Edit `.env.local`:
```
TURSO_DATABASE_URL=libsql://...
TURSO_AUTH_TOKEN=...
AUTH_SECRET=<generate random>
PAYLOAD_SECRET=<generate random>
```

## Database

```bash
pnpm db:push      # Push schema
pnpm db:studio    # Open studio
pnpm db:generate  # Generate migration
```

## Building

```bash
pnpm build        # Build all
pnpm --filter landing build  # Build specific app
```

## Linting & Type Check

```bash
pnpm lint
pnpm type-check
```

## Deployment

### Create Vercel Projects

1. https://vercel.com/new
2. Import GitHub repo
3. Create project for each app folder:
   - `apps/landing`
   - `apps/member`
   - `apps/admin`
   - `apps/widget`

### Set Environment Variables

Each project needs:
```
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
AUTH_SECRET=...
PAYLOAD_SECRET=...
NEXT_PUBLIC_PAYLOAD_API_URL=https://admin-url.vercel.app
NEXT_PUBLIC_API_URL=https://member-url.vercel.app
NEXT_PUBLIC_WIDGET_URL=https://widget-url.vercel.app
```

### Generate Secrets

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## File Structure

```
ratecoo/
├── apps/
│   ├── landing/      (marketing site)
│   ├── member/       (user dashboard)
│   ├── admin/        (admin api & panel)
│   └── widget/       (embed script)
├── packages/
│   ├── db/           (drizzle orm)
│   ├── ui/           (components)
│   ├── config/       (shared config)
│   └── typescript-config/
└── docs/
    ├── README.md
    ├── SETUP_GUIDE.md
    └── DEPLOYMENT.md
```

## API Endpoints

### Get Widget Config
```
GET /api/custom/widget/:projectId
```

### Submit Review
```
POST /api/reviews
Content-Type: application/json

{
  "project_id": "...",
  "customer_name": "John",
  "rating": 5,
  "comment": "Great!"
}
```

## Database Tables

### users
- id, email, name, password, tier, image, created_at, updated_at

### projects
- id, user_id, name, slug, settings, api_key, created_at, updated_at

### reviews
- id, project_id, customer_name, rating, comment, source, status, is_featured, created_at, updated_at

## Plan Limits

| Feature | Free | Pro |
|---------|------|-----|
| Widgets | 1 | 5 |
| Branding | Forced | None |
| Notifications | Email | Email + WhatsApp |
| API Access | No | Yes |

## Troubleshooting

### Build fails
```bash
pnpm turbo run build --force
```

### Clear cache
```bash
pnpm turbo run build --force
rm -rf .turbo
```

### Port conflicts
Edit `package.json` scripts in each app

### Database error
- Check `.env.local` credentials
- Verify turso database exists: `turso db list`
- Regenerate token: `turso db tokens create ratecoo-local`

## Scripts Cheatsheet

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Run all dev servers |
| `pnpm build` | Build all apps |
| `pnpm lint` | Run linter |
| `pnpm type-check` | Check TypeScript |
| `pnpm db:push` | Push schema to DB |
| `pnpm db:studio` | Open Drizzle Studio |
| `pnpm --filter <app> dev` | Run specific app |
| `pnpm --filter <app> build` | Build specific app |

## Documentation

- Full guide: SETUP_GUIDE.md
- Deployment: DEPLOYMENT.md
- Architecture: README_FULL.md
- Requirements: PROMPT.md

## Support Links

- Next.js: https://nextjs.org/docs
- Drizzle: https://orm.drizzle.team
- Turso: https://turso.tech/docs
- NextAuth: https://next-auth.js.org
- Vercel: https://vercel.com/docs

---

**Status**: ✅ Complete & Ready to Deploy

For detailed setup, see **SETUP_GUIDE.md**
For deployment, see **DEPLOYMENT.md**
