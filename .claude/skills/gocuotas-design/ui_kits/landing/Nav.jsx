// GOcuotas — Nav.jsx
function Nav() {
  return (
    <nav style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 48px", height: 36, width: "100%",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, color: "#fff" }}>
        <LogoIso color="#fff" />
        <LogoWordmark color="#fff" />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <button className="gc-btn gc-btn--tertiary" style={{ color: "#fff", opacity: .9 }}>Ayuda</button>
        <button className="gc-btn gc-btn--secondary-light">Ingresar</button>
      </div>
    </nav>
  );
}
window.Nav = Nav;
