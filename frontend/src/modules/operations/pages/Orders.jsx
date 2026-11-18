import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, Badge, PageHeader } from '@/app/components/ui.jsx';
import { ORDER_STATUS, rupiah, tanggal } from '@/app/lib/format.js';

export default function Orders() {
  const { data, loading, error, reload } = useApi(api.getOrders);
  return (
    <>
      <PageHeader title="Pesanan" subtitle="Pantau dan perbarui status pesanan." />
      <div className="card">
        <AsyncState loading={loading} error={error} empty={!data?.length} onRetry={reload}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>No. Pesanan</th><th>Pelanggan</th><th>Tanggal</th><th>Item</th><th className="num">Total</th><th>Status</th></tr>
              </thead>
              <tbody>
                {data?.map((o) => (
                  <tr key={o.id}>
                    <td>{o.order_number}</td>
                    <td>{o.customer_name}</td>
                    <td>{tanggal(o.created_at)}</td>
                    <td>{o.items}</td>
                    <td className="num">{rupiah(o.total_amount)}</td>
                    <td><Badge map={ORDER_STATUS} value={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AsyncState>
      </div>
    </>
  );
}
