-- =====================================================================
-- SIP - Selada Integrated Platform
-- 00_shared_stub.sql  (SEMENTARA)
--
-- Tabel milik modul User & Partner (Nuneu). Ini hanya STUB minimal supaya
-- tabel Business Operations bisa dijalankan dan diuji sendiri.
-- Setelah migration Nuneu siap, JANGAN jalankan file ini; ganti dengan
-- migration asli dan sesuaikan FOREIGN KEY bila nama kolom berbeda.
-- =====================================================================

CREATE TABLE IF NOT EXISTS users (
    id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name        VARCHAR(150) NOT NULL,
    email       VARCHAR(190) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    is_active   BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
    deleted_at  TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS roles (
    id    BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name  VARCHAR(50) NOT NULL UNIQUE   -- admin, staff, client, customer
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id  BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role_id  BIGINT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);
