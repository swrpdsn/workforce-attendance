export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#f7f8fa', fontFamily: 'Arial, sans-serif', color: '#111827' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#6b7280' }}>Workforce Control</div>
            <h1 style={{ fontSize: 36, margin: '8px 0' }}>Attendance Dashboard</h1>
            <p style={{ color: '#6b7280', margin: 0 }}>Real-time workforce visibility across project locations.</p>
          </div>
          <div style={{ padding: '10px 14px', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 14 }}>Demo Construction Company</div>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
          {[
            ['Workforce', '1,247'], ['Present', '1,106'], ['Absent', '84'], ['Late', '31'], ['Geo Exceptions', '8'], ['Missing Punches', '18'],
          ].map(([label, value]) => (
            <div key={label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, padding: 20 }}>
              <div style={{ color: '#6b7280', fontSize: 13 }}>{label}</div>
              <div style={{ fontSize: 30, fontWeight: 700, marginTop: 8 }}>{value}</div>
            </div>
          ))}
        </section>

        <section style={{ marginTop: 28, background: '#fff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{ padding: 20, borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between' }}>
            <strong>Location Pulse</strong><span style={{ color: '#6b7280', fontSize: 14 }}>1 Sep 2026</span>
          </div>
          {[
            ['Mundra Project', '482', '451', '23', '8'],
            ['Dahej Project', '517', '468', '37', '12'],
            ['Mumbai Office', '248', '187', '24', '5'],
          ].map(([location, total, present, absent, late]) => (
            <div key={location} style={{ display: 'grid', gridTemplateColumns: '2fr repeat(4,1fr)', gap: 12, padding: '18px 20px', borderBottom: '1px solid #f0f0f0', fontSize: 14 }}>
              <strong>{location}</strong><span>{total} workers</span><span>Present {present}</span><span>Absent {absent}</span><span>Late {late}</span>
            </div>
          ))}
        </section>

        <div style={{ marginTop: 28, padding: 20, background: '#111827', color: '#fff', borderRadius: 14 }}>
          <strong>Phase 1 foundation is live.</strong>
          <div style={{ marginTop: 6, color: '#d1d5db', fontSize: 14 }}>Database schema, server-side geofence engine and test foundation are ready for the next implementation pass.</div>
        </div>
      </div>
    </main>
  )
}
