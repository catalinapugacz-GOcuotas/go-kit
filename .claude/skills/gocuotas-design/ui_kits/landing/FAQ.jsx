// GOcuotas — FAQ.jsx
function FAQ() {
  const [open, setOpen] = React.useState(1);
  const items = [
    { q: "¿Cómo me registro?", a: "Descargás la app, validás tu identidad con tu documento y listo. Te toma 3 minutos." },
    { q: "¿Necesito tarjeta de crédito?", a: "No. Gocuoteás con tu tarjeta de débito o prepaga. No hay intereses y las cuotas son fijas." },
    { q: "¿Cuántas cuotas puedo elegir?", a: "Depende del comercio — la app te muestra las opciones disponibles antes de comprar." },
    { q: "¿Tiene costo usar GOcuotas?", a: "Registrarte es gratis. Algunos comercios pueden tener una comisión, siempre visible antes de confirmar." },
    { q: "¿Dónde puedo usarla?", a: "En más de 70.000 comercios físicos y online. Explorá la lista en la sección Comercios." },
  ];
  return (
    <section style={{ padding: "112px 64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>¿Tenés dudas?</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: "28px", color: "var(--gc-ink)" }}>
          Preguntas frecuentes
        </h2>
      </div>
      <div style={{ width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderRadius: 8, overflow: "hidden" }}>
              <button onClick={() => setOpen(isOpen ? -1 : i)} style={{
                width: "100%", border: 0, cursor: "pointer", textAlign: "left",
                display: "flex", alignItems: "center", gap: 12, padding: "16px 20px",
                background: isOpen ? "var(--gc-bg-info)" : "#fff",
                borderBottom: isOpen ? 0 : "1px solid #E9ECEF",
                font: "500 16px/20px var(--font-sans)", color: "var(--gc-ink)",
              }}>
                <i className="bi bi-question-circle" style={{ color: "var(--gc-pink)", fontSize: 20 }}></i>
                <span style={{ flex: 1 }}>{it.q}</span>
                <i className={`bi ${isOpen ? "bi-dash" : "bi-plus"}`} style={{ color: "var(--gc-pink)", fontSize: 20 }}></i>
              </button>
              {isOpen && (
                <div style={{
                  background: "var(--gc-bg-info-soft)", padding: "14px 20px",
                  font: "400 14px/20px var(--font-sans)", color: "var(--gc-ink-soft)",
                }}>{it.a}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
window.FAQ = FAQ;
