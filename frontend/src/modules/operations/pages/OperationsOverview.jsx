import { Link } from 'react-router-dom';
import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, Badge, PageHeader, Progress, StatCard } from '@/app/components/ui.jsx';
import { ORDER_STATUS, PROJECT_STATUS, rupiah } from '@/app/lib/format.js';

export default function OperationsOverview() {
  const summary = useApi(api.getReportSummary);
  const projects = useApi(api.getProjects);
  const orders = useApi(api.getOrders);

  return (
    <>
      <PageHeader title="Ringkasan Operasional" subtitle="Proyek, pesanan, dan pendapatan sekilas." />

      <AsyncState {...summary} onRetry={summary.reload}>
        {summary.data && (
          <div className="grid-4">
            <StatCard label="Proyek Berjalan" value={summary.data.projects_active} hint={`dari ${summary.data.projects_total} proyek`} />
            <StatCard label="Total Pesanan" value={summary.data.orders_total} />
            <StatCard label="Pesanan Menunggu" value={summary.data.orders_pending} hint="perlu diproses" />
            <StatCard label="Pendapatan" value={rupiah(summary.data.revenue)} />
          </div>
        )}
      </AsyncState>

      <div className="grid-2">
        <div className="card">
          <div className="spread" style={{ marginBottom: 12 }}>
            <h3>Proyek Terbaru</h3>
            <Link to="/app/projects" className="btn">Lihat semua</Link>
          </div>
          <AsyncState {...projects} empty={!projects.data?.length} onRetry={projects.reload}>
            <div className="table-wrap">
              <table>
                <tbody>
                  {projects.data?.slice(0, 4).map((p) => (
                    <tr key={p.id}>
                      <td><Link to={`/app/projects/${p.id}`}>{p.name}</Link></td>
                      <td><Badge map={PROJECT_STATUS} value={p.status} /></td>
                      <td style={{ width: 180 }}><Progress value={p.progress} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AsyncState>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Pesanan Terakhir</h3>
          <AsyncState {...orders} empty={!orders.data?.length} onRetry={orders.reload}>
            {orders.data?.slice(0, 4).map((o) => (
              <div key={o.id} className="spread" style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                <div>
                  <div>{o.order_number}</div>
                  <small style={{ color: 'var(--muted)' }}>{rupiah(o.total_amount)}</small>
                </div>
                <Badge map={ORDER_STATUS} value={o.status} />
              </div>
            ))}
          </AsyncState>
        </div>
      </div>
    </>
  );
}
