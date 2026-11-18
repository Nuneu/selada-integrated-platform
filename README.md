# SIP — Selada Integrated Platform

Platform terintegrasi PT Selada Indonesia Produktif: Company Profile, User Portal,
Project Management, dan E-Commerce.

Stack: **React (Vite)** · **Laravel** (backend, belum dibuat) · **PostgreSQL**
Tema: gelap futuristik, biru `#3b82f6` + kuning `#facc15` (`frontend/src/app/styles/theme.css`)

## Pembagian modul

| Modul | Pemilik | Folder frontend | Branch |
|---|---|---|---|
| Corporate & Content | Devina | `frontend/src/modules/corporate/` | `feature/corporate-content` |
| User & Partner | Nuneu | `frontend/src/modules/identity/` | `feature/user-management` |
| Business Operations | Gisel | `frontend/src/modules/operations/` | `feature/business-operations` |

Halaman yang sekarang ada masih **DUMMY** (ditandai kotak kuning bertulisan
"Halaman dummy"). Ganti dengan versi asli, lalu hapus `<DummyNotice />`-nya.

## Struktur

```
frontend/src/
├── app/                  KERANGKA BERSAMA (ubah lewat Pull Request saja)
│   ├── App.jsx           menggabungkan route semua modul
│   ├── components/       PublicLayout, DashboardLayout, ui.jsx
│   ├── styles/theme.css  warna & komponen dasar
│   ├── api/http.js       pembantu fetch + format response standar
│   ├── hooks/ lib/
└── modules/
    ├── corporate/        routes.jsx + pages/
    ├── identity/         routes.jsx + pages/
    └── operations/       routes.jsx + pages/ + api/
backend/                  (Laravel, menyusul)
database/operations/      SQL modul Operations
docs/
```

Cara kerja tiap modul: **edit `routes.jsx` dan `pages/` milik modulmu saja**.
Menu sidebar/navbar otomatis ikut dari `routes.jsx` modul masing-masing.

## Menjalankan frontend

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

Alamat yang bisa dicoba: `/` (website), `/login`, `/app` (dashboard).
Default memakai data contoh (`VITE_USE_MOCK=true`).

## Database (modul Operations)

```bash
createdb sip_dev
psql -d sip_dev -f database/operations/00_shared_stub.sql   # lewati bila tabel users/roles Nuneu sudah ada
psql -d sip_dev -f database/operations/01_operations_schema.sql
psql -d sip_dev -f database/operations/02_seed.sql
```

## Aturan kerja Git

1. Jangan push langsung ke `main` / `develop`. Selalu lewat Pull Request + review.
2. Sebelum mulai kerja: `git pull origin develop`.
3. Edit file modul sendiri. File di `app/` diubah lewat PR dan kabari tim.
4. Jangan commit `.env`, password, atau `node_modules`.
5. Format commit: `feat: ...`, `fix: ...`, `chore: ...`.
