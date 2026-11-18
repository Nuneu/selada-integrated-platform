import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, PageHeader } from '@/app/components/ui.jsx';
import { rupiah } from '@/app/lib/format.js';

export default function Cart() {
  const cart = useApi(api.getCart);
  const products = useApi(api.getProducts);

  const loading = cart.loading || products.loading;
  const error = cart.error || products.error;
  const lines = (cart.data ?? []).map((c) => ({
    ...c,
    product: products.data?.find((p) => p.id === c.product_id),
  })).filter((l) => l.product);
  const total = lines.reduce((s, l) => s + l.product.price * l.quantity, 0);

  return (
    <>
      <PageHeader title="Keranjang" subtitle="Periksa item sebelum checkout." />
      <AsyncState loading={loading} error={error} empty={!lines.length} onRetry={() => { cart.reload(); products.reload(); }}>
        <div className="card">
          <div className="table-wrap">
            <table>
              <thead><tr><th>Produk</th><th className="num">Harga</th><th className="num">Jumlah</th><th className="num">Subtotal</th></tr></thead>
              <tbody>
                {lines.map((l) => (
                  <tr key={l.product_id}>
                    <td>{l.product.name}</td>
                    <td className="num">{rupiah(l.product.price)}</td>
                    <td className="num">{l.quantity}</td>
                    <td className="num">{rupiah(l.product.price * l.quantity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="spread" style={{ marginTop: 18 }}>
            <div>Total <strong className="price" style={{ fontSize: 20, marginLeft: 8 }}>{rupiah(total)}</strong></div>
            <button className="btn btn-accent">Checkout</button>
          </div>
        </div>
      </AsyncState>
    </>
  );
}
