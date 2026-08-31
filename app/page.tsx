const stats = [['Total Workforce','1,247'],['Present','1,204'],['Absent','24'],['Late','11'],['Geo Exceptions','8'],['Missing Punches','4']];

export default function Home() {
  return <main className="container">
    <header className="header"><div><div className="brand">Workforce Attendance</div><div className="muted">Workforce control dashboard</div></div><span className="pill">Phase 1</span></header>
    <section className="grid">{stats.map(([label,value]) => <div className="card" key={label}><div className="muted">{label}</div><div className="stat">{value}</div></div>)}</section>
    <section className="card" style={{marginTop:16}}><h2>Payroll Readiness</h2><p className="muted">Resolve attendance exceptions before locking payroll.</p><div className="grid"><div><strong>1,204</strong><br/><span className="muted">Ready</span></div><div><strong>43</strong><br/><span className="danger">Needs attention</span></div><div><strong>96.6%</strong><br/><span className="success">Ready rate</span></div></div></section>
    <section className="card" style={{marginTop:16}}><h2>Recent Exceptions</h2><p className="muted">Missing punches, geofence exceptions and pending corrections will appear here once connected to live attendance data.</p></section>
  </main>;
}
