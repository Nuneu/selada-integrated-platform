import { api } from '../api/index.js';
import { useApi } from '@/app/hooks/useApi.js';
import { AsyncState, Badge, PageHeader } from '@/app/components/ui.jsx';
import { VISIBILITY, tanggal, ukuranFile } from '@/app/lib/format.js';

export default function Documents() {
  const { data, loading, error, reload } = useApi(api.getDocuments);
  return (
    <>
      <PageHeader
        title="Dokumen"
        subtitle="Dokumen proyek dengan pengaturan akses."
        action={<button className="btn btn-accent">+ Unggah Dokumen</button>}
      />
      <div className="card">
        <AsyncState loading={loading} error={error} empty={!data?.length} onRetry={reload}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Judul</th><th>Proyek</th><th>Berkas</th><th>Ukuran</th><th>Akses</th><th>Diunggah</th></tr>
              </thead>
              <tbody>
                {data?.map((d) => (
                  <tr key={d.id}>
                    <td>{d.title}</td>
                    <td>{d.project}</td>
                    <td>{d.file_name}</td>
                    <td>{ukuranFile(d.file_size)}</td>
                    <td><Badge map={VISIBILITY} value={d.visibility} /></td>
                    <td>{tanggal(d.created_at)}</td>
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
