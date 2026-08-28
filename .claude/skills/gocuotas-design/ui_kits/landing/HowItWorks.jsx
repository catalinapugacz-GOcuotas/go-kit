// GOcuotas — HowItWorks.jsx
function HowItWorks() {
  const steps = [
    { img: "../../assets/step-cellphone.png",  title: "Bajá la app",        body: "Registrate en pocos pasos, es gratis." },
    { img: "../../assets/step-creditcard.png", title: "Elegís el comercio", body: "Para comprar online o en tienda física." },
    { img: "../../assets/step-handshake.png",  title: "¡Comprás y listo!",  body: "En cuotas, sin interés con tu tarjeta de débito o prepaga." },
  ];
  return (
    <section style={{ padding: "112px 64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 56 }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>¿Cómo funciona?</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: "28px", color: "var(--gc-ink)" }}>
          Comprá en 3 pasos
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 416px)", gap: 32, paddingTop: 160 }}>
        {steps.map((s, i) => (
          <div key={i} style={{
            position: "relative", background: "var(--gc-surface)", borderRadius: 8,
            boxShadow: "var(--shadow-card)", height: 292, padding: "200px 32px 28px",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4, textAlign: "center",
          }}>
            <img src={s.img} alt="" style={{
              position: "absolute", left: "50%", top: -158, transform: "translateX(-50%)",
              width: 280, height: 330, objectFit: "contain",
            }} />
            <div style={{ fontWeight: 700, fontSize: 16, lineHeight: "20px", color: "var(--gc-ink)" }}>{s.title}</div>
            <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-ink)" }}>{s.body}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 24 }}>
        <button className="gc-btn gc-btn--secondary"><i className="bi bi-play-fill" style={{ marginRight: 4 }}></i>Cómo funciona en 1 minuto</button>
        <button className="gc-btn gc-btn--primary">Crear mi cuenta</button>
      </div>
    </section>
  );
}
window.HowItWorks = HowItWorks;
