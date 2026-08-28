// GOcuotas — Testimonials.jsx
function Testimonials() {
  const quotes = [
    { name: "Lucía", city: "Montevideo", text: "Compré mi celular nuevo en 12 cuotas sin interés con débito. Fue todo por la app." },
    { name: "Martín", city: "Buenos Aires", text: "Lo recomiendo a todos. Mi hermana también la usó para el colchón." },
    { name: "Paula", city: "Rosario", text: "Fácil, rápido y real. No tiene letra chica. Volvería a usar sí o sí." },
  ];
  return (
    <section style={{ padding: "112px 64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>Testimonios</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: "28px", color: "var(--gc-ink)" }}>
          ¡Conocé las experiencias y opiniones!
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, width: "100%", maxWidth: 1312 }}>
        {quotes.map((q, i) => (
          <div key={i} style={{
            background: "var(--gc-surface)", borderRadius: 8, boxShadow: "var(--shadow-card)",
            padding: 28, display: "flex", flexDirection: "column", gap: 14,
          }}>
            <div style={{ display: "flex", gap: 2, color: "var(--gc-orange-soft)" }}>
              {Array.from({length: 5}).map((_, j) => <i key={j} className="bi bi-star-fill"></i>)}
            </div>
            <div style={{ fontSize: 16, lineHeight: "22px", color: "var(--gc-ink)" }}>
              "{q.text}"
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
              <img src="../../assets/person-avatar.png" alt="" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--gc-ink)" }}>{q.name}</div>
                <div style={{ fontSize: 12, color: "var(--gc-gray-400)" }}>{q.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
window.Testimonials = Testimonials;
