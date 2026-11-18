export const rupiah = (n) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

export const tanggal = (iso) =>
  iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-';

export const ukuranFile = (bytes) =>
  bytes >= 1048576 ? `${(bytes / 1048576).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;

// status -> [label, warna badge]
export const PROJECT_STATUS = {
  draft: ['Draft', 'gray'], active: ['Berjalan', 'blue'], on_hold: ['Ditunda', 'yellow'],
  completed: ['Selesai', 'green'], cancelled: ['Dibatalkan', 'red'],
};
export const ORDER_STATUS = {
  pending: ['Menunggu', 'yellow'], confirmed: ['Dikonfirmasi', 'blue'], processing: ['Diproses', 'blue'],
  completed: ['Selesai', 'green'], cancelled: ['Dibatalkan', 'red'],
};
export const VISIBILITY = {
  internal: ['Internal', 'gray'], shared: ['Dibagikan', 'blue'], private: ['Privat', 'yellow'],
};
