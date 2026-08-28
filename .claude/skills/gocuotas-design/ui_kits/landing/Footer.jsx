// GOcuotas — Footer.jsx
function Footer() {
  const cols = [
    { title: "Producto",  links: ["Cómo funciona", "Comercios", "GOqr", "GOtarjeta"] },
    { title: "Empresa",   links: ["Nosotros", "Prensa", "Trabajá con nosotros"] },
    { title: "Ayuda",     links: ["Centro de ayuda", "Contactanos", "Términos", "Privacidad"] },
  ];
  return (
    <footer style={{
      background: "var(--gc-pink-50)", marginTop: 112, padding: "64px 64px 40px",
      display: "flex", flexDirection: "column", gap: 40,
    }}>
      <div style={{ display: "grid", gridTemplateColumns: "280px repeat(3, 1fr)", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--gc-pink)" }}>
            <LogoIso color="var(--gc-pink)" />
            <LogoWordmark color="var(--gc-pink)" />
          </div>
          <div style={{ fontSize: 14, lineHeight: "20px", color: "var(--gc-ink-soft)" }}>
            Comprá en cuotas sin interés con tu débito.
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 8, color: "var(--gc-pink)", fontSize: 20 }}>
            <i className="bi bi-instagram"></i><i className="bi bi-facebook"></i>
            <i className="bi bi-twitter-x"></i><i className="bi bi-linkedin"></i>
          </div>
        </div>
        {cols.map(c => (
          <div key={c.title} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--gc-ink)" }}>{c.title}</div>
            {c.links.map(l => (
              <a key={l} href="#" style={{ fontSize: 14, lineHeight: "22px", color: "var(--gc-ink-soft)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid #f0d9e3", paddingTop: 20,
        display: "flex", justifyContent: "space-between",
        fontSize: 12, color: "var(--gc-gray-400)",
      }}>
        <div>© {new Date().getFullYear()} GOcuotas. Todos los derechos reservados.</div>
        <div>Uruguay · Argentina</div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
