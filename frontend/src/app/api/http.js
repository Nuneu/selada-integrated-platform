// Pembantu HTTP bersama untuk semua modul.
// Format response standar SIP:
//   sukses: { success: true,  message, data }
//   gagal : { success: false, message, errors }
//
// VITE_USE_MOCK=true  -> tiap modul memakai data contoh miliknya
// VITE_USE_MOCK=false -> memanggil API Laravel
export const USE_MOCK = (import.meta.env.VITE_USE_MOCK ?? 'true') === 'true';
const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

function getToken() {
  try { return localStorage.getItem('sip_token'); } catch { return null; }
}

export async function request(path, { method = 'GET', body } = {}) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || `Request gagal (${res.status})`);
  }
  return json.data;
}
