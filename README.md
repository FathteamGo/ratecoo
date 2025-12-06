# 🚀 RateCoo.com

**Collect 5-Star Trust in Seconds.**

Platform widget ulasan & rating modern untuk UMKM dan Bisnis Digital. Gratis selamanya untuk pemula, powerful untuk profesional.

---

## 📖 Tentang Project

**RateCoo** adalah solusi SaaS (Software as a Service) yang memungkinkan pemilik bisnis membuat widget ulasan (review) untuk website mereka hanya dalam hitungan detik.

Project ini dibangun dengan arsitektur **Monorepo modern** yang memisahkan antara:
- Landing Page (Marketing)
- Dashboard Member
- Admin System
- Embed Widget yang ultra-ringan

---

## ✨ Fitur Utama

- **Widget Embed Ringan**: Script loading super cepat (Preact + Vite)
- **Dual Tier System**: Free Tier (Branded) & Pro Tier (White-label + AI Features)
- **Centralized Admin**: Ditenagai oleh Payload CMS 3.0
- **Database di Edge**: Menggunakan Turso (libSQL) untuk latensi rendah di seluruh dunia---

## 🛠️ Tech Stack (Bleeding Edge 2026)

Kami menggunakan teknologi terbaru untuk memastikan performa, skalabilitas, dan developer experience terbaik.

| Kategori | Teknologi | Keterangan |
|----------|-----------|-----------|
| Monorepo | **Turborepo** | Build system super cepat dengan caching |
| Framework | **Next.js 16** | App Router, Server Actions, React 19 |
| Database | **Turso (libSQL)** | Serverless SQLite yang berjalan di Edge |
| ORM | **Drizzle ORM** | Type-safe SQL, ringan, dan cepat |
| CMS / Backend | **Payload CMS 3.0** | Headless CMS native Next.js |
| UI Components | **shadcn/ui** | Tailwind CSS based components |
| Auth | **NextAuth v5** | Autentikasi aman untuk Member Area |
| Widget Build | **Vite** | Bundling script widget menjadi satu file kecil |---

## 📂 Struktur Monorepo

Project ini dibagi menjadi beberapa aplikasi dan paket terpisah di dalam folder `apps` dan `packages`.

```
ratecoo/
├── apps/
│   ├── 🏠 landing/      # Next.js: Halaman Marketing Publik (SEO Focused)
│   ├── 👤 member/       # Next.js: Dashboard User SaaS (Protected Area)
│   ├── ⚙️ admin/        # Payload CMS: Super Admin & Public API Server
│   └── 🔌 widget/       # Preact + Vite: Script Embed (Output: widget.js)
├── packages/
│   ├── 🎨 ui/           # Shared UI Components (shadcn)
│   ├── 🗄️ db/           # Drizzle Schema & DB Connection (Single Source of Truth)
│   └── 🔧 config/       # Shared Config (ESLint, TSConfig)
```
---

## 🚀 Cara Menjalankan (Local Development)

Ikuti langkah ini untuk menjalankan project di komputer lokal.

### 1. Prasyarat

Pastikan kamu sudah menginstall:
- **Node.js** (v20+)
- **pnpm** (Wajib, kami tidak pakai npm/yarn)
- **Turso CLI** (Untuk setup database)

### 2. Instalasi & Setup Environment

#### Clone Repository:
```bash
git clone https://github.com/username/ratecoo.git
cd ratecoo
```

#### Install Dependencies:
```bash
pnpm install
```

#### Setup Database (Turso):
Buat database baru di Turso dan dapatkan URL serta Tokennya.

```bash
turso db create ratecoo-local
turso db tokens create ratecoo-local
```

#### Konfigurasi .env:
Copy file `.env.example` ke `.env` di root folder (atau di masing-masing apps jika perlu spesifik).

Isi variabel wajib:
```env
TURSO_DATABASE_URL="libsql://ratecoo-local-username.turso.io"
TURSO_AUTH_TOKEN="eyJr..."
AUTH_SECRET="random_string_super_rahasia"
PAYLOAD_SECRET="random_string_lainnya"
```

#### Push Schema ke Database:
Jalankan perintah ini untuk membuat tabel di Turso sesuai schema Drizzle kita.

```bash
pnpm db:push
```

### 3. Menjalankan Server

Karena ini Monorepo, kamu bisa menjalankan semua aplikasi sekaligus:

```bash
pnpm dev
```

Secara default, aplikasi akan berjalan di port berikut:
- **Landing Page**: http://localhost:3000
- **Member Dashboard**: http://localhost:3001
- **Admin / API**: http://localhost:3002
- **Widget Dev**: http://localhost:3003

## 🧪 Development Workflow

### Mengelola Database

Jika kamu mengubah schema di `packages/db/schema.ts`, jalankan:

```bash
pnpm db:push   # Push perubahan ke Turso
pnpm db:studio # Buka Drizzle Studio untuk melihat data
```

### Build Widget

Untuk meng-compile widget menjadi satu file siap embed (`dist/widget.js`):

```bash
cd apps/widget
pnpm build
```

---

## 🤝 Kontribusi

Tertarik berkontribusi? Silakan buka Issue atau buat Pull Request. Pastikan kode kamu mengikuti standar ESLint dan Prettier yang sudah dikonfigurasi.

---

## 📄 Lisensi

MIT License © 2026 RateCoo Team.