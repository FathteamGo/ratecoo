ROLE

Act as a Senior Full Stack Engineer & System Architect specialized in Next.js 16, Turborepo, and Serverless Databases.

PROJECT CONTEXT

We are building RateCoo.com, a Mini SaaS Review & Rating Widget.
Goal: A platform where users (business owners) can generate a review widget script, embed it on their website, and manage reviews.
Business Model: 1. Free Tier: 1 Widget limit, "Powered by RateCoo" branding, Basic Notif.
2. Pro Tier: 5 Widget limit, No Branding, WhatsApp Notif, AI Reply.

TECH STACK (STRICT & LATEST)

Package Manager: pnpm

Monorepo: Turborepo

Framework: Next.js 16 (App Router) + React 19 (Server Actions)

Backend Engine: Payload CMS 3.0 (Native Next.js) in apps/admin

Language: TypeScript (Strict)

Database: Turso (libSQL)

ORM: Drizzle ORM (Shared schema in packages/db)

Payload Adapter: @payloadcms/db-sqlite (using libSQL/Turso)

UI Library: shadcn/ui + Tailwind CSS

Auth: NextAuth.js v5 (for Member App) & Payload Auth (for Admin App) - syncing on users table.

Deployment: Vercel (Apps) + Turso (DB)

Widget Bundler: Vite (Library Mode) for apps/widget

MONOREPO STRUCTURE

Scaffold the project with this structure. Ensure packages/* are exported correctly in package.json.

ratecoo/
├── apps/
│   ├── landing/      (Next.js: PUBLIC Marketing site. SEO Heavy. No Auth Barrier)
│   ├── member/       (Next.js: PROTECTED User Dashboard. Auth Required via NextAuth. SaaS Logic)
│   ├── admin/        (Payload CMS 3.0: Backend Core. Serves Super Admin UI + Public API)
│   └── widget/       (Preact + Vite: Standalone embed script. Compiles to single `widget.js`)
├── packages/
│   ├── ui/           (Shared shadcn components, Tailwind config)
│   ├── db/           (Shared Drizzle Schema, Zod Schemas, & Singleton DB Client)
│   ├── config/       (Shared eslint, tsconfig)
│   └── typescript-config/


DATABASE SCHEMA (DRIZZLE + TURSO)

Implement the following schema in packages/db. Ensure to export Zod Schemas (createInsertSchema, createSelectSchema) for frontend validation.

users (Shared between NextAuth & Payload)

id: text (uuid, pk)

name, email, image

password (hashed, managed by Payload/NextAuth)

tier: text (enum: 'free', 'pro') - DEFAULT 'free'

created_at

projects (The Widget Instance)

id: text (cuid, pk)

user_id: text (fk users.id)

name: text

slug: text (unique)

settings: json (stores: color, show_branding, auto_approve_status)

api_key: text (for Pro users)

reviews

id: text (cuid, pk)

project_id: text (fk projects.id)

customer_name: text

rating: integer (1-5)

comment: text

source: text (enum: 'widget', 'import')

status: text (enum: 'pending', 'approved', 'rejected')

is_featured: boolean (default false)

FEATURE REQUIREMENTS (LOGIC TO IMPLEMENT)

1. Plan Limits (Service Layer in packages/db or apps/admin)

Free Tier:

Limit: Max 1 project per user.

Constraint: settings.show_branding is FORCE TRUE.

Constraint: Import API throws 403.

Pro Tier:

Limit: Max 5 projects.

Capability: Can toggle settings.show_branding.

2. The Widget (apps/widget)

Tech: Preact (lightweight) bundled with Vite in Library Mode.

Output: A single file dist/widget.js.

Logic:

On load, fetch config from apps/admin/api/custom/widget/[projectId].

Render UI based on config (colors, etc).

On submit, POST to apps/admin/api/reviews.

3. APP: Landing Page (apps/landing)

Purpose: Conversion. High Performance.

Tech: Server Components, Framer Motion.

Routing: / (Home), /pricing, /blog.

Links: "Login" -> apps/member, "Get Started" -> apps/member/register.

4. APP: Member Area (apps/member)

Purpose: User Dashboard.

Auth: NextAuth v5.

State: Use React Query or Server Actions for data fetching.

Pages:

/dashboard: Overview cards.

/projects/new: Create project form (Check Tier Limit!).

/projects/[id]: Manage reviews, Copy Embed Code, Settings.

5. APP: Admin & API (apps/admin)

Purpose:

Super Admin UI: /admin (Payload Panel).

Public API: /api/* (Payload Auto-generated + Custom Endpoints).

Configuration:

Use @payloadcms/db-sqlite with the Turso connection string.

CORS: Configure Payload cors property to allow * (or logic to allow specific domains).

Custom Endpoints (High Perf):

GET /api/custom/widget/:projectId:

Logic: Fetch Project -> Apply "Free Tier" branding logic -> Return JSON.

Caching: Implement next: { revalidate: 60 } or similar strategy to prevent hitting DB on every page view.

INSTRUCTIONS FOR GENERATION

Follow this specific order to avoid dependency errors:

Phase 1: Foundation (packages/*)

Setup packages/config and packages/ui.

Setup packages/db: Install drizzle-orm, @libsql/client. Create Schema. Export db instance. CRITICAL: Ensure db instance is a singleton to prevent connection exhaustion in serverless.

Phase 2: Backend Core (apps/admin)

Initialize Next.js with Payload 3.0.

Connect Payload to packages/db schema (or define Payload Collections that mirror Drizzle schema).

Implement the GET /api/custom/widget/:projectId endpoint with CORS enabled.

Phase 3: Member Dashboard (apps/member)

Initialize Next.js. Setup NextAuth v5.

Create "Create Project" Server Action. Must check Plan Limits before inserting.

Create Dashboard UI.

Phase 4: Widget (apps/widget)

Setup Vite + Preact.

Write the embed logic.

Configure build command to output single file.

CODE STYLE & BEST PRACTICES

Serverless Safety: Minimize open DB connections. Use global cache for DB client in development.

Type Safety: Share types from packages/db to all apps. Do not redefine interfaces manually.

Env Vars: access TURSO_DATABASE_URL only in packages/db and apps/admin.

Icons: Use lucide-react.

Start by generating the Directory Structure and the packages/db Drizzle Setup (Schema + Client).