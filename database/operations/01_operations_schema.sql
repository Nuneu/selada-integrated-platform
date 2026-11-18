-- =====================================================================
-- SIP - Selada Integrated Platform
-- Modul Business Operations (Gisel)
-- PostgreSQL 14+
--
-- Isi: projects, project_members, project_clients, project_updates,
--      documents, document_access, product_categories, products,
--      carts, cart_items, orders, order_items, transactions, reports
--
-- Catatan desain
--  * Data user/role dimiliki modul User (Nuneu). Di sini hanya FK ke users(id).
--  * Soft delete (deleted_at) dipakai untuk data penting.
--  * Harga & nama produk DISALIN ke order_items saat checkout (snapshot),
--    sesuai skenario uji "harga pada saat pemesanan".
--  * Pembayaran online belum diputuskan -> transactions dibuat generik.
-- =====================================================================

-- ---------- ENUM ----------------------------------------------------
CREATE TYPE project_status   AS ENUM ('draft', 'active', 'on_hold', 'completed', 'cancelled');
CREATE TYPE project_priority AS ENUM ('low', 'medium', 'high');
CREATE TYPE document_visibility AS ENUM ('internal', 'shared', 'private');
CREATE TYPE order_status     AS ENUM ('pending', 'confirmed', 'processing', 'completed', 'cancelled');
CREATE TYPE transaction_type   AS ENUM ('payment', 'refund', 'adjustment');
CREATE TYPE transaction_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
CREATE TYPE cart_status      AS ENUM ('active', 'checked_out', 'abandoned');

-- ---------- trigger updated_at -------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =====================================================================
-- PROJECT MANAGEMENT
-- =====================================================================
CREATE TABLE projects (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    code         VARCHAR(30)  NOT NULL UNIQUE,            -- contoh: PRJ-2026-001
    name         VARCHAR(200) NOT NULL,
    description  TEXT,
    status       project_status   NOT NULL DEFAULT 'draft',
    priority     project_priority NOT NULL DEFAULT 'medium',
    progress     SMALLINT NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
    start_date   DATE,
    due_date     DATE,
    finished_at  TIMESTAMPTZ,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,          -- disetujui tampil di portofolio (Devina)
    created_by   BIGINT NOT NULL REFERENCES users(id),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at   TIMESTAMPTZ,
    CHECK (due_date IS NULL OR start_date IS NULL OR due_date >= start_date)
);
CREATE INDEX idx_projects_status ON projects(status) WHERE deleted_at IS NULL;

-- Staf yang ditugaskan (Role + Permission + Assignment)
CREATE TABLE project_members (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id  BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id     BIGINT NOT NULL REFERENCES users(id),
    role_label  VARCHAR(60) NOT NULL DEFAULT 'member',    -- PM, developer, QA, dst
    assigned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (project_id, user_id)
);
CREATE INDEX idx_project_members_user ON project_members(user_id);

-- Klien / mitra yang terkait proyek (user ber-role client/partner)
CREATE TABLE project_clients (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id  BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    client_id   BIGINT NOT NULL REFERENCES users(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (project_id, client_id)
);
CREATE INDEX idx_project_clients_client ON project_clients(client_id);

-- Riwayat progres (append-only)
CREATE TABLE project_updates (
    id               BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id       BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    updated_by       BIGINT NOT NULL REFERENCES users(id),
    progress         SMALLINT NOT NULL CHECK (progress BETWEEN 0 AND 100),
    status           project_status,                      -- isi bila status ikut berubah
    note             TEXT,
    visible_to_client BOOLEAN NOT NULL DEFAULT FALSE,     -- klien hanya lihat yang true
    created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_project_updates_project ON project_updates(project_id, created_at DESC);

-- =====================================================================
-- DOCUMENT MANAGEMENT
-- =====================================================================
CREATE TABLE documents (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    project_id   BIGINT REFERENCES projects(id) ON DELETE SET NULL,
    title        VARCHAR(200) NOT NULL,
    description  TEXT,
    file_path    VARCHAR(500) NOT NULL,                   -- path di file storage
    file_name    VARCHAR(255) NOT NULL,
    mime_type    VARCHAR(120),
    file_size    BIGINT CHECK (file_size >= 0),           -- byte
    visibility   document_visibility NOT NULL DEFAULT 'internal',
    uploaded_by  BIGINT NOT NULL REFERENCES users(id),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at   TIMESTAMPTZ
);
CREATE INDEX idx_documents_project ON documents(project_id) WHERE deleted_at IS NULL;

-- Aturan akses per dokumen (per user atau per role)
CREATE TABLE document_access (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    document_id  BIGINT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    user_id      BIGINT REFERENCES users(id) ON DELETE CASCADE,
    role_id      BIGINT REFERENCES roles(id) ON DELETE CASCADE,
    can_view     BOOLEAN NOT NULL DEFAULT TRUE,
    can_download BOOLEAN NOT NULL DEFAULT FALSE,
    can_edit     BOOLEAN NOT NULL DEFAULT FALSE,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    CHECK ( (user_id IS NOT NULL)::int + (role_id IS NOT NULL)::int = 1 )  -- salah satu saja
);
CREATE INDEX idx_document_access_doc ON document_access(document_id);

-- =====================================================================
-- PRODUCT CATALOG
-- =====================================================================
CREATE TABLE product_categories (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    slug        VARCHAR(140) NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE products (
    id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id  BIGINT REFERENCES product_categories(id) ON DELETE SET NULL,
    sku          VARCHAR(50)  NOT NULL UNIQUE,
    name         VARCHAR(200) NOT NULL,
    slug         VARCHAR(220) NOT NULL UNIQUE,
    description  TEXT,
    price        NUMERIC(14,2) NOT NULL CHECK (price >= 0),
    stock        INTEGER CHECK (stock >= 0),              -- NULL = stok tidak dikelola
    image_url    VARCHAR(500),
    is_active    BOOLEAN NOT NULL DEFAULT TRUE,
    created_by   BIGINT REFERENCES users(id),
    created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at   TIMESTAMPTZ
);
CREATE INDEX idx_products_category ON products(category_id) WHERE deleted_at IS NULL;

-- =====================================================================
-- CART & ORDER
-- =====================================================================
CREATE TABLE carts (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status      cart_status NOT NULL DEFAULT 'active',
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- satu pelanggan hanya punya satu keranjang aktif
CREATE UNIQUE INDEX uq_carts_one_active ON carts(user_id) WHERE status = 'active';

CREATE TABLE cart_items (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cart_id     BIGINT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id  BIGINT NOT NULL REFERENCES products(id),
    quantity    INTEGER NOT NULL CHECK (quantity > 0),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    UNIQUE (cart_id, product_id)
);

CREATE TABLE orders (
    id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_number   VARCHAR(30) NOT NULL UNIQUE,           -- contoh: ORD-20261117-0001
    customer_id    BIGINT NOT NULL REFERENCES users(id),
    status         order_status NOT NULL DEFAULT 'pending',
    total_amount   NUMERIC(14,2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    customer_name  VARCHAR(150) NOT NULL,                 -- snapshot data pemesan
    customer_phone VARCHAR(30),
    shipping_address TEXT,
    note           TEXT,
    handled_by     BIGINT REFERENCES users(id),           -- admin/staf yang memproses
    created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at     TIMESTAMPTZ
);
CREATE INDEX idx_orders_customer ON orders(customer_id, created_at DESC);
CREATE INDEX idx_orders_status   ON orders(status) WHERE deleted_at IS NULL;

CREATE TABLE order_items (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id      BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id    BIGINT REFERENCES products(id) ON DELETE SET NULL,
    product_name  VARCHAR(200) NOT NULL,                  -- snapshot
    unit_price    NUMERIC(14,2) NOT NULL CHECK (unit_price >= 0),  -- snapshot harga
    quantity      INTEGER NOT NULL CHECK (quantity > 0),
    subtotal      NUMERIC(14,2) GENERATED ALWAYS AS (unit_price * quantity) STORED
);
CREATE INDEX idx_order_items_order ON order_items(order_id);

-- Riwayat perubahan status pesanan (agar jejak terlihat pelanggan & admin)
CREATE TABLE order_status_logs (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    status      order_status NOT NULL,
    changed_by  BIGINT REFERENCES users(id),
    note        TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_order_status_logs_order ON order_status_logs(order_id, created_at);

-- Catatan transaksi (generik; metode bayar belum diputuskan perusahaan)
CREATE TABLE transactions (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id    BIGINT NOT NULL REFERENCES orders(id),
    type        transaction_type   NOT NULL DEFAULT 'payment',
    status      transaction_status NOT NULL DEFAULT 'pending',
    amount      NUMERIC(14,2) NOT NULL CHECK (amount >= 0),
    method      VARCHAR(60),                              -- transfer, tunai, dst (opsional)
    reference   VARCHAR(120),
    paid_at     TIMESTAMPTZ,
    recorded_by BIGINT REFERENCES users(id),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_transactions_order ON transactions(order_id);

-- =====================================================================
-- REPORTS
-- =====================================================================
CREATE TABLE reports (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title         VARCHAR(200) NOT NULL,
    report_type   VARCHAR(50)  NOT NULL,                  -- project_summary, sales, orders, dst
    period_start  DATE,
    period_end    DATE,
    parameters    JSONB NOT NULL DEFAULT '{}'::jsonb,
    result        JSONB,                                  -- ringkasan hasil / metadata file
    file_path     VARCHAR(500),
    generated_by  BIGINT NOT NULL REFERENCES users(id),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ---------- pasang trigger updated_at ------------------------------
DO $$
DECLARE t TEXT;
BEGIN
    FOREACH t IN ARRAY ARRAY[
        'projects','documents','product_categories','products',
        'carts','cart_items','orders','transactions'
    ] LOOP
        EXECUTE format(
            'CREATE TRIGGER trg_%I_updated_at BEFORE UPDATE ON %I
             FOR EACH ROW EXECUTE FUNCTION set_updated_at()', t, t);
    END LOOP;
END $$;
