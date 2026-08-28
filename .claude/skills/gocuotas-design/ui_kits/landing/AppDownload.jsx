// GOcuotas — AppDownload.jsx
function AppDownload() {
  return (
    <section style={{
      margin: "112px 64px 0", background: "var(--gc-bg-info)", borderRadius: 8,
      padding: "48px 64px", display: "flex", gap: 40, alignItems: "center",
    }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>Llegá más lejos</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 36, lineHeight: "42px", color: "var(--gc-ink)" }}>
          Bajá la app y empezá<br/>a gocuotear hoy
        </h2>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-ink-soft)" }}>
          Gratis en iOS y Android.
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
          <a href="#"><img src="../../assets/store-appstore.png" alt="App Store" style={{ height: 48 }} /></a>
          <a href="#"><img src="../../assets/store-googleplay.png" alt="Google Play" style={{ height: 48 }} /></a>
        </div>
      </div>
      <img src="../../assets/illust-couch.png" alt="" style={{ width: 320, height: "auto" }} />
    </section>
  );
}
window.AppDownload = AppDownload;
