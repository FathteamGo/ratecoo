# RateCoo Monorepo - Setup Guide

This is the complete RateCoo SaaS application ready for deployment to Vercel.

## Project Structure

```
ratecoo/
├── apps/
│   ├── landing/      # Marketing site (Next.js)
│   ├── member/       # User dashboard (Next.js + NextAuth)
│   ├── admin/        # Payload CMS admin panel
│   └── widget/       # Embed widget (Preact + Vite)
├── packages/
│   ├── db/           # Drizzle ORM + Turso
│   ├── ui/           # Shared UI components
│   ├── config/       # Shared configs
│   └── typescript-config/
```

## Quick Start

### Prerequisites
- Node.js 20+
- pnpm 9+
- Turso account (turso.tech)

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Setup Database (Turso)

Create a Turso database:

```bash
turso auth login
turso db create ratecoo-prod
turso db tokens create ratecoo-prod
```

### 3. Configure Environment

Update `.env.local` with your Turso credentials:

```bash
TURSO_DATABASE_URL="libsql://your-db-name.turso.io"
TURSO_AUTH_TOKEN="your-token-here"
AUTH_SECRET="generate-a-random-secret"
PAYLOAD_SECRET="generate-another-random-secret"
```

### 4. Push Database Schema

```bash
pnpm db:push
```

### 5. Run Development Servers

```bash
pnpm dev
```

This will start all 4 apps:
- Landing: http://localhost:3000
- Member: http://localhost:3001
- Admin: http://localhost:3002
- Widget: http://localhost:3003

## Deployment to Vercel

### Create Vercel Projects

For each app, create a Vercel project:

```bash
# Landing
vercel --prod --cwd apps/landing

# Member
vercel --prod --cwd apps/member

# Admin
vercel --prod --cwd apps/admin

# Widget
vercel --prod --cwd apps/widget
```

### Environment Variables

Add these to each Vercel project:

```
TURSO_DATABASE_URL=...
TURSO_AUTH_TOKEN=...
AUTH_SECRET=...
PAYLOAD_SECRET=...
NEXT_PUBLIC_PAYLOAD_API_URL=https://admin-yourname.vercel.app
NEXT_PUBLIC_API_URL=https://member-yourname.vercel.app
NEXT_PUBLIC_WIDGET_URL=https://widget-yourname.vercel.app
```

### Build Commands

Each app has its own `next.config.js` and build pipeline through turbo.

## Features Implemented

✅ **Monorepo Structure** - Turborepo + pnpm workspaces
✅ **Database** - Drizzle ORM + Turso (libSQL)
✅ **Authentication** - NextAuth v5 for member area
✅ **Admin CMS** - Payload CMS 3.0
✅ **Landing Page** - Marketing site with Framer Motion
✅ **Member Dashboard** - Create projects, manage reviews
✅ **Widget** - Embeddable Preact widget
✅ **API Endpoints** - Widget config & review submission
✅ **Plan Limits** - Free (1 widget) vs Pro (5 widgets)
✅ **Branding** - Free tier forced branding

## API Endpoints

### Public Widget API
- `GET /api/custom/widget/:projectId` - Fetch widget config
- `POST /api/reviews` - Submit review

### Admin Panel
- Accessible at `/admin` on Payload CMS

## Database Schema

### users
- id, email, name, image, password, tier (free|pro)

### projects
- id, user_id, name, slug, settings (JSON), api_key

### reviews
- id, project_id, customer_name, rating, comment, source, status, is_featured

## Development Workflow

### Add a Package
```bash
cd packages/[package-name]
pnpm init
# Edit package.json
```

### Run Type Check
```bash
pnpm type-check
```

### Run Linting
```bash
pnpm lint
```

### Database Migrations
```bash
# Generate migration
pnpm db:generate

# Push to database
pnpm db:push

# Open Drizzle Studio
pnpm db:studio
```

## Common Issues

### "Cannot find module" errors
- Run `pnpm install` again
- Clear turbo cache: `pnpm turbo run build --force`

### Database connection fails
- Check `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in `.env.local`
- Verify Turso database is created: `turso db list`

### Port conflicts
- Change ports in each app's `package.json` dev script

## Next Steps

1. ✅ Clone and install
2. ✅ Setup Turso database
3. ✅ Configure environment variables
4. ✅ Run `pnpm dev`
5. ✅ Create Vercel projects
6. ✅ Deploy

## Support

For issues, check:
- Individual app README files
- Drizzle docs: https://orm.drizzle.team
- Next.js docs: https://nextjs.org
- Payload CMS docs: https://payloadcms.com
