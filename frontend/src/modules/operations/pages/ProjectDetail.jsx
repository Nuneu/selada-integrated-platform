import { Link, useParams } from 'react-router-dom';
import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, Badge, PageHeader, Progress } from '@/app/components/ui.jsx';
import { PROJECT_STATUS, tanggal } from '@/app/lib/format.js';

export default function ProjectDetail() {
  const { id } = useParams();
  const { data: p, loading, error, reload } = useApi(() => api.getProject(id), [id]);

  return (
    <>
      <PageHeader
        title={p?.name ?? 'Detail Proyek'}
        subtitle={p?.code}
        action={<Link to="/app/projects" className="btn">← Kembali</Link>}
      />
      <AsyncState loading={loading} error={error} onRetry={reload}>
        {p && (
          <div className="grid-2">
            <div className="card">
              <h3 style={{ marginBottom: 14 }}>Riwayat Progres</h3>
              {p.updates.length === 0 && <div className="state">Belum ada pembaruan.</div>}
              <ul className="timeline">
                {p.updates.map((u) => (
                  <li key={u.id}>
                    <time>{tanggal(u.created_at)} · {u.updated_by}</time>
                    <div style={{ margin: '4px 0' }}>{u.note}</div>
                    <Progress value={u.progress} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="card">
              <h3 style={{ marginBottom: 14 }}>Informasi</h3>
              <dl style={{ display: 'grid', gap: 10 }}>
                <div className="spread"><dt>Status</dt><dd><Badge map={PROJECT_STATUS} value={p.status} /></dd></div>
                <div className="spread"><dt>Mulai</dt><dd>{tanggal(p.start_date)}</dd></div>
                <div className="spread"><dt>Tenggat</dt><dd>{tanggal(p.due_date)}</dd></div>
                <div className="spread"><dt>Staf</dt><dd>{p.members.join(', ') || '-'}</dd></div>
                <div className="spread"><dt>Klien</dt><dd>{p.clients.join(', ') || '-'}</dd></div>
              </dl>
              <button className="btn btn-primary" style={{ marginTop: 18, width: '100%' }}>+ Tambah Progres</button>
            </div>
          </div>
        )}
      </AsyncState>
    </>
  );
}
