// GOcuotas — Hero.jsx
function Hero() {
  return (
    <section style={{
      background: "var(--gc-pink)", width: "100%", padding: "40px 48px 80px",
      display: "flex", flexDirection: "column", gap: 112, alignItems: "center",
    }}>
      <Nav />
      <div style={{
        display: "grid", gridTemplateColumns: "634px 540px", gap: 26,
        alignItems: "center", maxWidth: 1200, width: "100%",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <h1 style={{
            fontWeight: 700, fontSize: 60, lineHeight: "64px", color: "#fff", margin: 0,
            letterSpacing: "-0.01em",
          }}>
            Comprá en cuotas sin interés<br/>con tu débito
          </h1>
          <div>
            <button className="gc-btn gc-btn--accent">Registrarme gratis</button>
          </div>
          <div style={{ fontSize: 20, lineHeight: "24px", color: "#fff" }}>
            ¡Más de 70.000 comercios para elegir!
          </div>
        </div>
        <img src="../../assets/hero-phone.png" alt="" style={{
          width: 540, height: 466, objectFit: "contain",
        }} />
      </div>
    </section>
  );
}
window.Hero = Hero;
