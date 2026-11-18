import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// Alias '@' -> src, jadi import bersama cukup: import { x } from '@/app/...'
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 5173,
    // Saat backend Laravel jalan (php artisan serve -> :8000)
    proxy: { '/api': 'http://localhost:8000' },
  },
});
