🚀 RateCoo.comCollect 5-Star Trust in Seconds.Platform widget ulasan & rating modern untuk UMKM dan Bisnis Digital. Gratis selamanya untuk pemula, powerful untuk profesional.📖 Tentang ProjectRateCoo adalah solusi SaaS (Software as a Service) yang memungkinkan pemilik bisnis membuat widget ulasan (review) untuk website mereka hanya dalam hitungan detik.Project ini dibangun dengan arsitektur Monorepo modern yang memisahkan antara Landing Page (Marketing), Dashboard Member, Admin System, dan Embed Widget yang ultra-ringan.✨ Fitur UtamaWidget Embed Ringan: Script loading super cepat (Preact + Vite).Dual Tier System: Free Tier (Branded) & Pro Tier (White-label + AI Features).Centralized Admin: Ditenagai oleh Payload CMS 3.0.Database di Edge: Menggunakan Turso (libSQL) untuk latensi rendah di seluruh dunia.🛠️ Tech Stack (Bleeding Edge 2026)Kami menggunakan teknologi terbaru untuk memastikan performa, skalabilitas, dan developer experience terbaik.KategoriTeknologiKeteranganMonorepoTurborepoBuild system super cepat dengan caching.FrameworkNext.js 16App Router, Server Actions, React 19.DatabaseTurso (libSQL)Serverless SQLite yang berjalan di Edge.ORMDrizzle ORMType-safe SQL, ringan, dan cepat.CMS / BackendPayload CMS 3.0Headless CMS native Next.js.UI Componentshadcn/uiTailwind CSS based components.AuthNextAuth v5Autentikasi aman untuk Member Area.Widget BuildViteBundling script widget menjadi satu file kecil.📂 Struktur MonorepoProject ini dibagi menjadi beberapa aplikasi dan paket terpisah di dalam folder apps dan packages.ratecoo/
├── apps/
│   ├── 🏠 landing/      # Next.js: Halaman Marketing Publik (SEO Focused)
│   ├── 👤 member/       # Next.js: Dashboard User SaaS (Protected Area)
│   ├── ⚙️ admin/        # Payload CMS: Super Admin & Public API Server
│   └── 🔌 widget/       # Preact + Vite: Script Embed (Output: widget.js)
├── packages/
│   ├── 🎨 ui/           # Shared UI Components (shadcn)
│   ├── 🗄️ db/           # Drizzle Schema & DB Connection (Single Source of Truth)
│   └── 🔧 config/       # Shared Config (ESLint, TSConfig)
🚀 Cara Menjalankan (Local Development)Ikuti langkah ini untuk menjalankan project di komputer lokal.1. PrasyaratPastikan kamu sudah menginstall:Node.js (v20+)pnpm (Wajib, kami tidak pakai npm/yarn)Turso CLI (Untuk setup database)2. Instalasi & Setup EnvironmentClone Repository:git clone [https://github.com/username/ratecoo.git](https://github.com/username/ratecoo.git)
cd ratecoo
Install Dependencies:pnpm install
Setup Database (Turso):Buat database baru di Turso dan dapatkan URL serta Tokennya.turso db create ratecoo-local
turso db tokens create ratecoo-local
Konfigurasi .env:Copy file .env.example ke .env di root folder (atau di masing-masing apps jika perlu spesifik).Isi variabel wajib:TURSO_DATABASE_URL="libsql://ratecoo-local-username.turso.io"
TURSO_AUTH_TOKEN="eyJr..."
AUTH_SECRET="random_string_super_rahasia"
PAYLOAD_SECRET="random_string_lainnya"
Push Schema ke Database:Jalankan perintah ini untuk membuat tabel di Turso sesuai schema Drizzle kita.pnpm db:push
3. Menjalankan ServerKarena ini Monorepo, kamu bisa menjalankan semua aplikasi sekaligus:pnpm dev
Secara default, aplikasi akan berjalan di port berikut:Landing Page: http://localhost:3000Member Dashboard: http://localhost:3001Admin / API: http://localhost:3002Widget Dev: http://localhost:5173🧪 Development WorkflowMengelola DatabaseJika kamu mengubah schema di packages/db/schema.ts, jalankan:pnpm db:push   # Push perubahan ke Turso
pnpm db:studio # Buka Drizzle Studio untuk melihat data
Build WidgetUntuk meng-compile widget menjadi satu file siap embed (dist/widget.js):cd apps/widget
pnpm build
🤝 KontribusiTertarik berkontribusi? Silakan buka Issue atau buat Pull Request. Pastikan kode kamu mengikuti standar ESLint dan Prettier yang sudah dikonfigurasi.📄 LisensiMIT License © 2026 RateCoo Team.