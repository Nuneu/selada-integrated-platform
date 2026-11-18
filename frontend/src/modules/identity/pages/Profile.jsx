import { DummyNotice, PageHeader } from '@/app/components/ui.jsx';

export default function Profile() {
  return (
    <>
      <DummyNotice module="User & Partner" owner="Nuneu" />
      <PageHeader title="Profil" subtitle="Data akun kamu." />
      <form className="card" style={{ maxWidth: 520 }} onSubmit={(e) => e.preventDefault()}>
        <div className="field">
          <label htmlFor="p-name">Nama</label>
          <input id="p-name" className="input" defaultValue="Admin SIP" />
        </div>
        <div className="field">
          <label htmlFor="p-email">Email</label>
          <input id="p-email" className="input" defaultValue="admin@sip.test" />
        </div>
        <button className="btn btn-primary" type="submit">Simpan</button>
      </form>
    </>
  );
}
