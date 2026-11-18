import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, PageHeader } from '@/app/components/ui.jsx';
import { rupiah } from '@/app/lib/format.js';

export default function Products() {
  const { data, loading, error, reload } = useApi(api.getProducts);
  return (
    <>
      <PageHeader
        title="Katalog Produk"
        subtitle="Layanan dan perangkat yang dapat dipesan."
        action={<button className="btn btn-accent">+ Produk Baru</button>}
      />
      <AsyncState loading={loading} error={error} empty={!data?.length} onRetry={reload}>
        <div className="grid-cards">
          {data?.map((p) => (
            <article key={p.id} className="card product-card">
              <div className="thumb">Gambar produk</div>
              <span className="badge gray">{p.category}</span>
              <h3 style={{ fontSize: 15, margin: '10px 0 4px' }}>{p.name}</h3>
              <p style={{ color: 'var(--muted)', minHeight: 40 }}>{p.description}</p>
              <div className="price">{rupiah(p.price)}</div>
              <div className="spread">
                <small style={{ color: 'var(--muted)' }}>{p.stock === null ? 'Layanan' : `Stok ${p.stock}`}</small>
                <button className="btn btn-primary">+ Keranjang</button>
              </div>
            </article>
          ))}
        </div>
      </AsyncState>
    </>
  );
}
