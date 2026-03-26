import { useState, useEffect } from "react";
import { User, ShoppingBag, LayoutDashboard, ChevronDown, LogOut, Settings } from "lucide-react";
import { ACCENT, NAV_LINKS } from "../../constants/data";

export function Navbar({ setCartOpen, cartCount, setLoginOpen, user, onLogout, activeSection, onHomeClick, isCatalog }) {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!showDropdown) return;
    const handler = () => setShowDropdown(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showDropdown]);

  const linkToId = {
    "Beranda": "home",
    "Unggulan": "featured",
    "Buku Baru": "new-books",
    "Testimoni": "testimonial"
  };

  const scrollTo = (link) => {
    if (isCatalog) {
      return onHomeClick();
    }
    const id = linkToId[link] || link.toLowerCase().replace(" ", "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const logoClick = () => {
    if (isCatalog) return onHomeClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", justifyContent: "center",
        boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.04)" : "none",
      }}
    >
      <div style={{ maxWidth: 1200, width: "100%", padding: "0 24px", display: "flex", alignItems: "center", height: 72 }}>
        {/* Logo */}
        <div onClick={logoClick} style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto", cursor: "pointer" }}>
          <div style={{ width: 36, height: 36, background: `linear-gradient(135deg, ${ACCENT}, #d97706)`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 2px 8px ${ACCENT}30` }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>1</span>
          </div>
          <span style={{ fontWeight: 800, color: "#1a1a2e", fontSize: 18, letterSpacing: "-0.5px" }}>One-Book</span>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 32, marginRight: 48 }}>
          {NAV_LINKS.map((link) => {
            const id = linkToId[link] || link.toLowerCase().replace(" ", "-");
            const isActive = isCatalog ? link === "Beranda" : (activeSection === id);
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: isActive ? ACCENT : "#4b5563",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: 15,
                  borderBottom: isActive ? `2px solid ${ACCENT}` : "2px solid transparent",
                  paddingBottom: 4,
                  transition: "all 0.2s ease",
                }}
                onMouseOver={e => { if (!isActive) e.currentTarget.style.color = ACCENT; }}
                onMouseOut={e => { if (!isActive) e.currentTarget.style.color = "#4b5563"; }}
              >
                {link}
              </button>
            );
          })}
        </div>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#4b5563",
              display: "flex", padding: 8, borderRadius: 10,
              transition: "all 0.2s ease", position: "relative"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#f1f5f9"}
            onMouseOut={e => e.currentTarget.style.background = "transparent"}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <div style={{
                position: "absolute", top: 2, right: 2,
                width: 18, height: 18,
                background: "linear-gradient(135deg, #ef4444, #dc2626)",
                color: "#fff", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                boxShadow: "0 2px 6px rgba(239, 68, 68, 0.3)",
                animation: "popIn 0.3s ease",
              }}>
                {cartCount}
              </div>
            )}
          </button>

          {user ? (
            <div style={{ position: "relative" }}>
              <div 
                onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}
                style={{ 
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer", padding: "6px 14px", 
                  borderRadius: 14, background: "rgba(0,0,0,0.02)",
                  border: `1px solid ${showDropdown ? ACCENT + "40" : "rgba(0,0,0,0.06)"}`,
                  transition: "all 0.3s ease",
                }}
                onMouseOver={e => e.currentTarget.style.borderColor = ACCENT + "40"}
                onMouseOut={e => { if (!showDropdown) e.currentTarget.style.borderColor = "rgba(0,0,0,0.06)"; }}
              >
                <div style={{ 
                  width: 32, height: 32, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                  color: "#fff", 
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 13,
                  boxShadow: `0 2px 8px ${ACCENT}30`,
                }}>
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <span style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, whiteSpace: "nowrap" }}>{user.name}</span>
                <ChevronDown size={14} color="#64748b" style={{ transition: "transform 0.2s", transform: showDropdown ? "rotate(180deg)" : "rotate(0)" }} />
              </div>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: "absolute", top: "calc(100% + 8px)", right: 0,
                    width: 230,
                    background: "rgba(255,255,255,0.98)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    borderRadius: 16,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
                    padding: 8,
                    animation: "fadeInDown 0.2s ease",
                    zIndex: 200,
                  }}
                >
                  {/* User Info */}
                  <div style={{ padding: "14px 14px 12px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: 4 }}>
                    <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, marginBottom: 2 }}>{user.name}</p>
                    <p style={{ color: "#64748b", fontSize: 12 }}>{user.email}</p>
                  </div>

                  {/* Menu Items */}
                  {[
                    { icon: <LayoutDashboard size={16} />, label: "Dashboard", action: () => { setShowDropdown(false); setLoginOpen("dashboard"); }},
                    { icon: <User size={16} />, label: "Edit Profil", action: () => { setShowDropdown(false); setLoginOpen("profile"); }},
                    { icon: <Settings size={16} />, label: "Pengaturan", action: () => { setShowDropdown(false); setLoginOpen("profile"); }},
                  ].map((item) => (
                    <button
                      key={item.label}
                      onClick={item.action}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 12,
                        padding: "10px 14px", borderRadius: 10,
                        background: "none", border: "none",
                        color: "#4b5563",
                        cursor: "pointer", fontSize: 14, fontWeight: 500,
                        transition: "all 0.2s ease",
                        textAlign: "left",
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = "rgba(0,0,0,0.03)"; e.currentTarget.style.color = ACCENT; }}
                      onMouseOut={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#4b5563"; }}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}

                  <div style={{ height: 1, background: "rgba(0,0,0,0.06)", margin: "4px 0" }} />

                  <button
                    onClick={() => { setShowDropdown(false); onLogout(); }}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 12,
                      padding: "10px 14px", borderRadius: 10,
                      background: "none", border: "none",
                      color: "#ef4444",
                      cursor: "pointer", fontSize: 14, fontWeight: 600,
                      transition: "all 0.2s ease",
                      textAlign: "left",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.06)"}
                    onMouseOut={e => e.currentTarget.style.background = "none"}
                  >
                    <LogOut size={16} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen("login")}
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                border: "none", cursor: "pointer",
                color: "#fff",
                display: "flex", alignItems: "center", gap: 8,
                padding: "9px 22px", borderRadius: 12,
                fontWeight: 700, fontSize: 14,
                transition: "all 0.3s ease",
                boxShadow: `0 2px 10px ${ACCENT}30`,
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 4px 16px ${ACCENT}40`; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 2px 10px ${ACCENT}30`; }}
            >
              <User size={16} />
              Masuk
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
