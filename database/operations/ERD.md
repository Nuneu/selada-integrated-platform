# ERD — Modul Business Operations (Gisel)

Tabel bertanda **(Nuneu)** dimiliki modul User & Partner; di sini hanya sebagai referensi FK.

```mermaid
erDiagram
    users ||--o{ project_members : "ditugaskan"
    users ||--o{ project_clients : "klien/mitra"
    users ||--o{ carts : "punya"
    users ||--o{ orders : "memesan"
    users ||--o{ documents : "mengunggah"
    users ||--o{ reports : "membuat"

    projects ||--o{ project_members : ""
    projects ||--o{ project_clients : ""
    projects ||--o{ project_updates : "riwayat progres"
    projects ||--o{ documents : "dokumen"

    documents ||--o{ document_access : "aturan akses"
    roles ||--o{ document_access : ""

    product_categories ||--o{ products : ""
    products ||--o{ cart_items : ""
    products ||--o{ order_items : "snapshot"

    carts ||--o{ cart_items : ""
    orders ||--o{ order_items : ""
    orders ||--o{ order_status_logs : ""
    orders ||--o{ transactions : ""

    users { bigint id PK }
    roles { bigint id PK }
    projects {
        bigint id PK
        varchar code UK
        varchar name
        enum status
        enum priority
        smallint progress
        date start_date
        date due_date
        bool is_published
        bigint created_by FK
    }
    project_members { bigint project_id FK
        bigint user_id FK
        varchar role_label }
    project_clients { bigint project_id FK
        bigint client_id FK }
    project_updates {
        bigint id PK
        bigint project_id FK
        smallint progress
        text note
        bool visible_to_client
    }
    documents {
        bigint id PK
        bigint project_id FK
        varchar title
        varchar file_path
        enum visibility
        bigint uploaded_by FK
    }
    document_access {
        bigint document_id FK
        bigint user_id FK
        bigint role_id FK
        bool can_view
        bool can_download
    }
    product_categories { bigint id PK
        varchar name
        varchar slug UK }
    products {
        bigint id PK
        varchar sku UK
        varchar name
        numeric price
        int stock
        bool is_active
    }
    carts { bigint id PK
        bigint user_id FK
        enum status }
    cart_items { bigint cart_id FK
        bigint product_id FK
        int quantity }
    orders {
        bigint id PK
        varchar order_number UK
        bigint customer_id FK
        enum status
        numeric total_amount
    }
    order_items {
        bigint order_id FK
        bigint product_id FK
        varchar product_name
        numeric unit_price
        int quantity
        numeric subtotal
    }
    order_status_logs { bigint order_id FK
        enum status
        bigint changed_by FK }
    transactions { bigint order_id FK
        enum type
        enum status
        numeric amount }
    reports { bigint id PK
        varchar report_type
        jsonb parameters
        jsonb result
        bigint generated_by FK }
```

## Catatan keputusan

| Keputusan | Alasan |
|---|---|
| `order_items` menyimpan `product_name` dan `unit_price` | Harga saat pesan tidak berubah walau produk diedit (skenario uji dokumen SIP). |
| `projects.is_published` | Penanda data yang boleh diberikan ke Devina untuk portofolio; data internal tidak otomatis publik. |
| `project_updates.visible_to_client` | Klien/mitra hanya melihat progres yang diizinkan. |
| `products.stock` boleh NULL | Pengelolaan stok belum diputuskan; NULL = tidak dikelola (cocok untuk layanan). |
| `transactions` generik | Pembayaran online belum diputuskan perusahaan. |
| Soft delete (`deleted_at`) | Dokumen SIP menyarankan arsip untuk data penting. |
| `order_status_logs` (tabel tambahan) | Tidak ada di dokumen awal; dibutuhkan agar riwayat status terlihat — boleh dibuang bila tim tidak setuju. |
