import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, Badge, PageHeader, Progress } from '@/app/components/ui.jsx';
import { PROJECT_STATUS, tanggal } from '@/app/lib/format.js';

export default function Projects() {
  const { data, loading, error, reload } = useApi(api.getProjects);
  const [q, setQ] = useState('');
  const rows = (data ?? []).filter((p) => `${p.code} ${p.name}`.toLowerCase().includes(q.toLowerCase()));

  return (
    <>
      <PageHeader
        title="Proyek"
        subtitle="Kelola proyek, penugasan staf, dan progres."
        action={<button className="btn btn-accent">+ Proyek Baru</button>}
      />
      <div className="card">
        <div className="row" style={{ marginBottom: 14 }}>
          <input className="input" placeholder="Cari kode atau nama proyek…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <AsyncState loading={loading} error={error} empty={!rows.length} onRetry={reload}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Kode</th><th>Nama</th><th>Status</th><th>Progres</th><th>Tenggat</th></tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td>{p.code}</td>
                    <td><Link to={`/app/projects/${p.id}`}>{p.name}</Link></td>
                    <td><Badge map={PROJECT_STATUS} value={p.status} /></td>
                    <td style={{ width: 200 }}><Progress value={p.progress} /></td>
                    <td>{tanggal(p.due_date)}</td>
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
