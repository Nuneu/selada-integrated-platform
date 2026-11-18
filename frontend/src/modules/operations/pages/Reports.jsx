import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, PageHeader, StatCard } from '@/app/components/ui.jsx';
import { rupiah } from '@/app/lib/format.js';

export default function Reports() {
  const { data, loading, error, reload } = useApi(api.getReportSummary);
  return (
    <>
      <PageHeader
        title="Laporan"
        subtitle="Ringkasan proyek dan penjualan."
        action={<button className="btn">Ekspor</button>}
      />
      <AsyncState loading={loading} error={error} onRetry={reload}>
        {data && (
          <div className="grid-4">
            <StatCard label="Total Proyek" value={data.projects_total} />
            <StatCard label="Proyek Aktif" value={data.projects_active} />
            <StatCard label="Total Pesanan" value={data.orders_total} />
            <StatCard label="Pendapatan" value={rupiah(data.revenue)} />
          </div>
        )}
      </AsyncState>
      <div className="card state">Grafik laporan akan ditambahkan di fase berikutnya.</div>
    </>
  );
}
