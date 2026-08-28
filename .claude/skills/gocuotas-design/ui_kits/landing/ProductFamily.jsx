// GOcuotas — ProductFamily.jsx (GOqr + GOtarjeta)
function ProductFamily() {
  return (
    <section style={{ padding: "112px 64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>Conocé más productos</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: "28px", color: "var(--gc-ink)" }}>
          Gocuoteá con toda la familia
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "640px 640px", gap: 32 }}>
        {/* GOqr */}
        <div style={{
          background: "var(--gc-pink)", borderRadius: 8, boxShadow: "var(--shadow-card)",
          padding: "32px 36px", color: "#fff", display: "flex", gap: 20, alignItems: "center",
          minHeight: 220, position: "relative", overflow: "hidden",
        }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{
              display: "inline-flex", alignItems: "center", alignSelf: "flex-start",
              background: "var(--gc-orange)", color: "#fff", fontWeight: 700, fontSize: 12,
              lineHeight: "16px", padding: "4px 10px", borderRadius: 100,
            }}>¡Novedad!</span>
            <div style={{ fontWeight: 700, fontSize: 28, lineHeight: "32px" }}>GOqr</div>
            <div style={{ fontSize: 16, lineHeight: "20px" }}>
              ¡Comprá con cualquier QR! Y pagá en cuotas fijas.
            </div>
            <button className="gc-btn gc-btn--secondary-light" style={{ alignSelf: "flex-start", marginTop: 8 }}>
              Descubrir
            </button>
          </div>
          <i className="bi bi-qr-code" style={{ fontSize: 120, opacity: .9 }}></i>
        </div>

        {/* GOtarjeta */}
        <div style={{
          background: "var(--gc-violet)", borderRadius: 8, boxShadow: "var(--shadow-card)",
          padding: "32px 36px", color: "#fff", display: "flex", gap: 20, alignItems: "center", minHeight: 220,
        }}>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 28, lineHeight: "32px" }}>GOtarjeta</div>
            <div style={{ fontSize: 16, lineHeight: "20px" }}>
              Tu Mastercard prepaga. Cargás desde la app, pagás donde quieras.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#EB001B", display: "inline-block" }} />
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "#F79E1B", marginLeft: -10, display: "inline-block" }} />
              <span style={{ fontWeight: 700, fontSize: 12, marginLeft: 6 }}>mastercard</span>
            </div>
            <button className="gc-btn gc-btn--secondary-light" style={{ alignSelf: "flex-start", marginTop: 8 }}>
              Conocé GOtarjeta
            </button>
          </div>
          <img src="../../assets/illust-card.png" alt="" style={{ width: 180, height: "auto", objectFit: "contain" }} />
        </div>
      </div>
    </section>
  );
}
window.ProductFamily = ProductFamily;
