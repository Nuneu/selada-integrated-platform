import { Badge, DummyNotice, PageHeader } from '@/app/components/ui.jsx';

const ROLE = {
  admin: ['Admin', 'yellow'], staff: ['Staf', 'blue'], client: ['Klien', 'green'], customer: ['Pelanggan', 'gray'],
};

const USERS = [
  { id: 1, name: 'Admin SIP', email: 'admin@sip.test', role: 'admin' },
  { id: 2, name: 'Staf Developer', email: 'staff@sip.test', role: 'staff' },
  { id: 3, name: 'Klien Contoh', email: 'client@sip.test', role: 'client' },
  { id: 4, name: 'Pelanggan Satu', email: 'customer@sip.test', role: 'customer' },
];

export default function Users() {
  return (
    <>
      <DummyNotice module="User & Partner" owner="Nuneu" />
      <PageHeader
        title="Pengguna"
        subtitle="Kelola akun, role, dan hak akses."
        action={<button className="btn btn-accent">+ Pengguna Baru</button>}
      />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Nama</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><Badge map={ROLE} value={u.role} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
