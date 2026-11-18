// API modul Business Operations (Gisel). Endpoint sesuai dokumen SIP bagian 11.5.
import { request, USE_MOCK } from '@/app/api/http.js';
import { mockApi } from './mock.js';

const http = {
  getProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  addProjectUpdate: (id, payload) => request(`/projects/${id}/updates`, { method: 'POST', body: payload }),
  getDocuments: () => request('/documents'),
  getProducts: () => request('/products'),
  getCart: () => request('/cart'),
  updateCart: (payload) => request('/cart', { method: 'POST', body: payload }),
  createOrder: (payload) => request('/orders', { method: 'POST', body: payload }),
  getOrders: () => request('/orders'),
  updateOrderStatus: (id, status) => request(`/orders/${id}/status`, { method: 'PATCH', body: { status } }),
  getReportSummary: () => request('/reports/summary'),
};

export const api = USE_MOCK ? mockApi : http;
