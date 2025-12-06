# Database Configuration

## Development (SQLite - Local)

File database lokal: `packages/db/local.db`

**Lokasi lengkap:** `D:\01_WEB\01_Projects\ratecoo\packages\db\local.db`

### Cara menggunakan:

1. **Push schema ke database:**
   ```bash
   cd packages/db
   pnpm db:push
   ```

2. **Buka Drizzle Studio (Database GUI):**
   ```bash
   cd packages/db
   pnpm db:studio
   ```
   Buka: https://local.drizzle.studio

3. **Lokasi database:**
   - File: `packages/db/local.db`
   - Size: ~40 KB (empty)
   - Format: SQLite

### Tables:
- `users` - User accounts (email, name, tier, password)
- `projects` - User projects (name, slug, settings, api_key)
- `reviews` - Customer reviews (name, email, whatsapp, rating, comment)

## Production (Turso)

Set environment variables:
```bash
NODE_ENV=production
TURSO_DATABASE_URL="libsql://your-db.turso.io"
TURSO_AUTH_TOKEN="your-token"
```

## Auto-switching

Kode otomatis switch berdasarkan `NODE_ENV`:
- `development` (default) → SQLite local (`packages/db/local.db`)
- `production` → Turso cloud database

File: `packages/db/src/client.ts`
