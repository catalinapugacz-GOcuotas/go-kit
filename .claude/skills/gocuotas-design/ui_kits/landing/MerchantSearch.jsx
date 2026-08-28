// GOcuotas — MerchantSearch.jsx
function MerchantSearch() {
  const cats = ["Moda", "Tecnología", "Hogar", "Gastronomía", "Viajes", "Deporte", "Belleza", "Educación"];
  return (
    <section style={{ padding: "112px 64px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ fontSize: 16, lineHeight: "20px", color: "var(--gc-pink)" }}>¿Dónde podés comprar?</div>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, lineHeight: "28px", color: "var(--gc-ink)" }}>
          Nuestros comercios
        </h2>
      </div>
      <div style={{
        width: "100%", maxWidth: 1312, background: "var(--gc-surface)",
        borderRadius: 100, boxShadow: "var(--shadow-card)",
        padding: "8px 8px 8px 24px", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ fontSize: 14, lineHeight: "20px", color: "var(--gc-gray-400)" }}>
          ¿Qué te gustaría comprar?
        </div>
        <button className="gc-btn gc-btn--primary">Buscar</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, width: "100%", maxWidth: 1312 }}>
        {cats.map((c, i) => (
          <div key={c} style={{
            background: "var(--gc-surface)", borderRadius: 8, boxShadow: "var(--shadow-card)",
            padding: "18px 20px", display: "flex", alignItems: "center", gap: 12,
            fontSize: 16, lineHeight: "20px", color: "var(--gc-ink)", fontWeight: 500,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: "var(--gc-pink-50)",
              display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gc-pink)",
            }}><i className={`bi bi-${["bag","laptop","house","cup-hot","airplane","bicycle","scissors","book"][i]}`}></i></div>
            {c}
          </div>
        ))}
      </div>
    </section>
  );
}
window.MerchantSearch = MerchantSearch;
