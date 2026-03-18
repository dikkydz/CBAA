# 🍢 Cimol Bojot AA

Website full-stack untuk bisnis jajanan **Cimol Bojot AA** khas Sumedang. Dibangun dengan Next.js 16, Prisma 7, Supabase, dan Tailwind CSS v4.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)
![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E?logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)

---

## ✨ Fitur

- 🛒 **Frontend Publik** — Beranda, Menu, Detail Produk, Checkout, Tentang, Kontak
- 🛡️ **Admin Panel** — Dashboard, Absensi, Pegawai, Role & Akses
- 🛍️ **Cart System** — Persistent cart dengan localStorage
- 📱 **Responsive** — Mobile-first design
- 🎨 **Brand Colors** — Primary `#9c3232` · Secondary `#e4bd6a`

---

## 🛠️ Tech Stack

| Teknologi | Versi | Kegunaan |
|---|---|---|
| Next.js | 16.x | Framework (App Router) |
| Prisma ORM | 7.x | Database schema & queries |
| Supabase | Latest | PostgreSQL + Auth + Storage |
| Tailwind CSS | v4 | Styling |
| TypeScript | 5.7 | Type safety |
| React Hook Form + Zod | Latest | Form validation |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-org/cimol-bojot-aa.git
cd cimol-bojot-aa
npm install
```

### 2. Setup Environment Variables

Buat dua file env di root project:

**`.env`** — untuk Prisma CLI:
```env
DIRECT_URL="postgresql://postgres.PROJECTREF:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

**`.env.local`** — untuk Next.js runtime:
```env
DATABASE_URL="postgresql://postgres.PROJECTREF:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.PROJECTREF:PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"

NEXT_PUBLIC_SUPABASE_URL=https://PROJECTREF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **Kenapa dua file?** `.env` untuk Prisma CLI yang butuh port `5432` (Session Pooler). `.env.local` untuk Next.js runtime yang pakai port `6543` (Transaction Pooler).

### 3. Setup Database
```bash
npx prisma db push      # Push schema ke Supabase
npx prisma generate     # Generate Prisma Client
npm run db:seed         # Isi data awal
```

### 4. Jalankan
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) ✅

---

## 📁 Struktur Project
```
src/
├── app/
│   ├── (public)/              # Frontend publik (Navbar + Footer)
│   │   ├── page.tsx           # Beranda → /
│   │   ├── menu/              # → /menu
│   │   ├── checkout/          # → /checkout
│   │   ├── tentang/           # → /tentang
│   │   └── kontak/            # → /kontak
│   ├── admin/                 # Admin panel (dark theme)
│   │   ├── page.tsx           # Dashboard → /admin
│   │   ├── login/             # → /admin/login
│   │   ├── absensi/           # → /admin/absensi
│   │   ├── pegawai/           # → /admin/pegawai
│   │   └── roles/             # → /admin/roles
│   └── api/                   # API Routes
│       ├── products/
│       ├── orders/
│       └── contact/
├── components/
│   ├── layout/                # Navbar, Footer, WhatsAppButton
│   ├── home/                  # HeroSection, MarqueeSection, dll
│   ├── products/              # ProductCard
│   ├── cart/                  # CartDrawer
│   └── admin/                 # AdminNav
├── context/
│   └── CartContext.tsx        # Global cart state
├── generated/prisma/          # Auto-generated — jangan diedit
├── lib/
│   ├── prisma.ts
│   ├── supabase.ts
│   └── utils.ts
└── types/index.ts
```

---

## 🗄️ Database

### Prisma 7 — Hal Penting

Prisma 7 berbeda dari versi sebelumnya:

- **`prisma.config.ts`** wajib ada di root project
- Database URL dikonfigurasi di `prisma.config.ts`, **bukan** di `schema.prisma`
- Provider berubah dari `prisma-client-js` → `prisma-client`
- Output path wajib diset, client di-generate ke `src/generated/prisma/`
- Import dari `@/generated/prisma/client`, bukan dari `@prisma/client`
- Node.js minimum **20.19**

### Commands
```bash
npm run db:push      # Push schema ke database
npm run db:generate  # Generate Prisma Client
npm run db:seed      # Isi data awal
npm run db:studio    # Buka GUI database (localhost:5555)
npm run db:migrate   # Buat migration file (production)
```

### Schema Models

| Model | Tabel | Keterangan |
|---|---|---|
| Product | products | Data produk |
| Category | categories | Kategori produk |
| Order | orders | Pesanan dari checkout |
| OrderItem | order_items | Item per pesanan |
| Testimonial | testimonials | Ulasan pelanggan |
| ContactMessage | contact_messages | Pesan dari form kontak |
| UserProfile | user_profiles | Profil admin/pegawai |
| Role | roles | owner, admin, pegawai |
| Permission | permissions | Hak akses per role |
| Absensi | absensis | Absensi harian pegawai |

---

## 🔌 API Endpoints

| Method | Endpoint | Keterangan |
|---|---|---|
| `GET` | `/api/products` | List produk (`?category=`, `?featured=true`, `?q=`) |
| `POST` | `/api/orders` | Buat pesanan baru |
| `GET` | `/api/orders` | List semua pesanan |
| `PATCH` | `/api/orders/[id]` | Update status pesanan |
| `POST` | `/api/contact` | Kirim pesan kontak |

---

## 🎨 Design System
```
Primary:    #9c3232  → Background utama, button CTA
Secondary:  #e4bd6a  → Aksen emas, navbar, highlight
Background: #fdf6f0  → Background halaman publik
Foreground: #1a0808  → Teks utama
Muted:      #7a5252  → Teks deskripsi
Border:     #edd5c8  → Border card & input
```

**Font:**
- Display: `Cormorant Garamond` (heading)
- Body: `DM Sans` (teks)

---

## ☁️ Deploy ke Vercel
```bash
# Push ke GitHub
git push origin main

# Atau deploy langsung via CLI
npx vercel
```

Di Vercel Dashboard → Settings → Environment Variables, tambahkan semua isi `.env.local`.

> ✅ `postinstall` script otomatis menjalankan `prisma generate` saat deploy.

---

## 🐛 Troubleshooting

**`Tenant or user not found`**
→ Prisma CLI / seed menggunakan Transaction Pooler. Pastikan `DIRECT_URL` menggunakan port `5432`.

**`Cannot find module generated/prisma`**
→ Jalankan `npx prisma generate`

**`Cannot apply unknown utility class`**
→ Project pakai Tailwind v4. Hapus `@apply border-border` dan gunakan CSS native.

**`ERR_TOO_MANY_REDIRECTS` di /admin/login**
→ Pastikan layout admin tidak melakukan auth check untuk route login.

**Gambar produk tidak muncul (404)**
→ Data di database masih pakai path lokal. Update kolom `image` di Prisma Studio dengan URL Unsplash atau Supabase Storage.

---

## 📋 Scripts Lengkap
```bash
npm run dev          # Development server (Turbopack)
npm run build        # Build production
npm run start        # Jalankan production build
npm run lint         # ESLint check
npm run db:push      # Push schema ke database
npm run db:generate  # Generate Prisma Client
npm run db:migrate   # Buat migration (production)
npm run db:studio    # GUI database browser
npm run db:seed      # Isi data awal
```

---

## 📄 Lisensi

Private — Internal use only © 2025 Cimol Bojot AA