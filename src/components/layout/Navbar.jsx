import { useState, useEffect } from "react";
import {
  User, ShoppingBag, LayoutDashboard, ChevronDown,
  LogOut, Settings, Menu, X, BookOpen, Package, Headphones, ShieldCheck
} from "lucide-react";
import { ACCENT, NAV_LINKS } from "../../constants/data";

export function Navbar({ setCartOpen, cartCount, setLoginOpen, user, onLogout, activeSection, onHomeClick, isCatalog, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (!showDropdown) return;
    const h = () => setShowDropdown(false);
    document.addEventListener("click", h);
    return () => document.removeEventListener("click", h);
  }, [showDropdown]);

  const linkToId = {
    "Beranda": "home", "Unggulan": "featured",
    "Buku Baru": "new-books", "Testimoni": "testimonial"
  };

  const linkIcons = {
    "Beranda": <BookOpen size={18} />,
    "Unggulan": <ShieldCheck size={18} />,
    "Buku Baru": <Package size={18} />,
    "Testimoni": <Headphones size={18} />
  };

  const scrollTo = (link) => {
    setMobileOpen(false);
    if (isCatalog) return onHomeClick();
    const id = linkToId[link] || link.toLowerCase().replace(" ", "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const cartAction = onCartClick || (() => setCartOpen(true));

  return (
    <>
      {/* ─── NAVBAR ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", height: 68 }}>

          {/* Logo */}
          <div
            onClick={() => { isCatalog ? onHomeClick() : window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginRight: "auto" }}
          >
            <div style={{
              width: 36, height: 36,
              background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
              borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", boxShadow: `0 4px 12px ${ACCENT}40`,
            }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>1</span>
            </div>
            <span style={{ fontWeight: 800, color: "#1a1a2e", fontSize: 18, letterSpacing: "-0.5px" }}>
              One-Book
            </span>
          </div>

          {/* Desktop Links */}
          <div style={{ display: "flex", gap: 4, marginRight: "auto" }} className="nav-desktop-links">
            {NAV_LINKS.map((link) => {
              const id = linkToId[link] || link.toLowerCase().replace(" ", "-");
              const isActive = isCatalog ? link === "Beranda" : activeSection === id;
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    color: isActive ? ACCENT : "#4b5563",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 15, padding: "6px 14px", borderRadius: 10,
                    position: "relative", transition: "all 0.2s ease",
                  }}
                  onMouseOver={e => { if (!isActive) { e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = `${ACCENT}0D`; } }}
                  onMouseOut={e => { if (!isActive) { e.currentTarget.style.color = "#4b5563"; e.currentTarget.style.background = "none"; } }}
                >
                  {link}
                  {isActive && (
                    <div style={{
                      position: "absolute", bottom: 2, left: "50%",
                      transform: "translateX(-50%)",
                      width: 20, height: 2, borderRadius: 2,
                      background: ACCENT,
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

            {/* Cart button */}
            <button
              onClick={cartAction}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 10px", borderRadius: 12,
                position: "relative", transition: "all 0.2s ease",
                display: "flex", alignItems: "center", gap: 6,
                color: "#4b5563",
              }}
              onMouseOver={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = ACCENT; }}
              onMouseOut={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#4b5563"; }}
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <div
                  key={cartCount}
                  style={{
                    position: "absolute", top: 2, right: 2,
                    minWidth: 18, height: 18,
                    background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                    color: "#fff", borderRadius: 20,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 10, fontWeight: 900,
                    boxShadow: `0 2px 8px ${ACCENT}60`,
                    padding: "0 4px",
                    animation: "badgeBounce 0.4s cubic-bezier(0.175,0.885,0.32,1.275)",
                    border: "2px solid #fff",
                  }}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </button>

            {/* Desktop: user menu or login */}
            {user ? (
              <div style={{ position: "relative" }} className="nav-desktop-links">
                <div
                  onClick={e => { e.stopPropagation(); setShowDropdown(v => !v); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 8,
                    cursor: "pointer", padding: "6px 12px", borderRadius: 14,
                    background: showDropdown ? `${ACCENT}08` : "rgba(0,0,0,0.02)",
                    border: `1px solid ${showDropdown ? ACCENT + "40" : "rgba(0,0,0,0.06)"}`,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                    color: "#fff", display: "flex", alignItems: "center",
                    justifyContent: "center", fontWeight: 800, fontSize: 12,
                    boxShadow: `0 2px 8px ${ACCENT}30`,
                  }}>
                    {user.name?.[0]?.toUpperCase() ?? "U"}
                  </div>
                  <span style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, whiteSpace: "nowrap" }}>
                    {user.name}
                  </span>
                  <ChevronDown size={13} color="#64748b" style={{ transition: "transform 0.2s", transform: showDropdown ? "rotate(180deg)" : "none" }} />
                </div>

                {showDropdown && (
                  <div
                    onClick={e => e.stopPropagation()}
                    style={{
                      position: "absolute", top: "calc(100% + 10px)", right: 0,
                      width: 230, background: "rgba(255,255,255,0.99)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 18, boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
                      padding: 8, animation: "fadeInDown 0.2s ease", zIndex: 300,
                    }}
                  >
                    <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid rgba(0,0,0,0.06)", marginBottom: 4 }}>
                      <p style={{ fontWeight: 700, color: "#1e293b", fontSize: 14, marginBottom: 2 }}>{user.name}</p>
                      <p style={{ color: "#94a3b8", fontSize: 12 }}>{user.email}</p>
                    </div>
                    {[
                      { icon: <LayoutDashboard size={15} />, label: "Dashboard", action: () => { setShowDropdown(false); setLoginOpen("dashboard"); } },
                      { icon: <User size={15} />, label: "Edit Profil", action: () => { setShowDropdown(false); setLoginOpen("profile"); } },
                      { icon: <Settings size={15} />, label: "Pengaturan", action: () => { setShowDropdown(false); setLoginOpen("profile"); } },
                    ].map(item => (
                      <button key={item.label} onClick={item.action} style={{
                        width: "100%", display: "flex", alignItems: "center", gap: 10,
                        padding: "10px 14px", borderRadius: 10, background: "none", border: "none",
                        color: "#4b5563", cursor: "pointer", fontSize: 14, fontWeight: 500,
                        transition: "all 0.15s ease", textAlign: "left",
                      }}
                        onMouseOver={e => { e.currentTarget.style.background = `${ACCENT}0D`; e.currentTarget.style.color = ACCENT; }}
                        onMouseOut={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#4b5563"; }}
                      >
                        {item.icon}{item.label}
                      </button>
                    ))}
                    <div style={{ height: 1, background: "rgba(0,0,0,0.05)", margin: "4px 0" }} />
                    <button onClick={() => { setShowDropdown(false); onLogout(); }} style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 14px", borderRadius: 10, background: "none", border: "none",
                      color: "#ef4444", cursor: "pointer", fontSize: 14, fontWeight: 600,
                      transition: "all 0.15s ease", textAlign: "left",
                    }}
                      onMouseOver={e => e.currentTarget.style.background = "#fef2f2"}
                      onMouseOut={e => e.currentTarget.style.background = "none"}
                    >
                      <LogOut size={15} />Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setLoginOpen("login")}
                className="nav-desktop-links"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                  border: "none", cursor: "pointer", color: "#fff",
                  display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 20px", borderRadius: 12,
                  fontWeight: 700, fontSize: 14, transition: "all 0.3s ease",
                  boxShadow: `0 4px 12px ${ACCENT}35`,
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = `0 6px 18px ${ACCENT}50`; }}
                onMouseOut={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 12px ${ACCENT}35`; }}
              >
                <User size={16} />Masuk
              </button>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="hamburger-btn"
              aria-label="Buka menu"
              style={{
                background: "none", border: "none", cursor: "pointer",
                width: 40, height: 40, borderRadius: 12,
                display: "none", alignItems: "center", justifyContent: "center",
                color: "#374151", transition: "all 0.2s ease",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#f3f4f6"}
              onMouseOut={e => e.currentTarget.style.background = "none"}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─── MOBILE DRAWER OVERLAY ─── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 998,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            animation: "fadeIn 0.25s ease",
          }}
        />
      )}

      {/* ─── MOBILE DRAWER ─── */}
      <div style={{
        position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 999,
        width: "min(300px, 85vw)",
        background: "#fff",
        boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
        display: "flex", flexDirection: "column",
        transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        overflowY: "auto",
      }}>
        {/* Drawer Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "20px 20px 16px",
          borderBottom: "1px solid #f1f5f9",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
              borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>1</span>
            </div>
            <span style={{ fontWeight: 800, color: "#1a1a2e", fontSize: 16 }}>One-Book</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              background: "#f3f4f6", border: "none", cursor: "pointer",
              width: 36, height: 36, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#6b7280", transition: "all 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.background = "#e5e7eb"}
            onMouseOut={e => e.currentTarget.style.background = "#f3f4f6"}
          >
            <X size={20} />
          </button>
        </div>

        {/* User info (if logged in) */}
        {user && (
          <div style={{
            margin: "12px 16px",
            background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}06)`,
            border: `1px solid ${ACCENT}22`,
            borderRadius: 16, padding: "14px 16px",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
              background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
              color: "#fff", display: "flex", alignItems: "center",
              justifyContent: "center", fontWeight: 900, fontSize: 18,
              boxShadow: `0 4px 12px ${ACCENT}40`,
            }}>
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div>
              <p style={{ fontWeight: 800, color: "#1e293b", fontSize: 15 }}>{user.name}</p>
              <p style={{ color: "#94a3b8", fontSize: 12 }}>{user.email}</p>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <div style={{ padding: "8px 12px", flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, padding: "8px 8px 4px" }}>
            Menu
          </p>
          {NAV_LINKS.map(link => {
            const id = linkToId[link] || link.toLowerCase().replace(" ", "-");
            const isActive = isCatalog ? link === "Beranda" : activeSection === id;
            return (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", textAlign: "left",
                  padding: "13px 12px", borderRadius: 12, border: "none",
                  background: isActive ? `${ACCENT}12` : "none",
                  color: isActive ? ACCENT : "#374151",
                  fontWeight: isActive ? 700 : 500, fontSize: 15,
                  cursor: "pointer", transition: "all 0.15s ease",
                  marginBottom: 2,
                }}
                onMouseOver={e => { if (!isActive) { e.currentTarget.style.background = "#f9fafb"; e.currentTarget.style.color = "#1a1a2e"; } }}
                onMouseOut={e => { if (!isActive) { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#374151"; } }}
              >
                <span style={{ color: isActive ? ACCENT : "#9ca3af" }}>{linkIcons[link]}</span>
                {link}
                {isActive && (
                  <div style={{
                    marginLeft: "auto", width: 6, height: 6,
                    borderRadius: "50%", background: ACCENT,
                  }} />
                )}
              </button>
            );
          })}

          {/* Divider */}
          <div style={{ height: 1, background: "#f1f5f9", margin: "12px 0" }} />

          {/* Cart */}
          <button
            onClick={() => { setMobileOpen(false); cartAction(); }}
            style={{
              display: "flex", alignItems: "center", gap: 14,
              width: "100%", textAlign: "left",
              padding: "13px 12px", borderRadius: 12, border: "none",
              background: "none", color: "#374151",
              fontWeight: 500, fontSize: 15,
              cursor: "pointer", transition: "all 0.15s ease",
              marginBottom: 2,
            }}
            onMouseOver={e => { e.currentTarget.style.background = "#f9fafb"; }}
            onMouseOut={e => { e.currentTarget.style.background = "none"; }}
          >
            <ShoppingBag size={18} color="#9ca3af" />
            Keranjang
            {cartCount > 0 && (
              <span style={{
                marginLeft: "auto",
                background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                color: "#fff", borderRadius: 20,
                fontSize: 11, fontWeight: 900, padding: "2px 10px",
                boxShadow: `0 2px 8px ${ACCENT}40`,
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* If logged in: dashboard & profile */}
          {user && (
            <>
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen("dashboard"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", textAlign: "left",
                  padding: "13px 12px", borderRadius: 12, border: "none",
                  background: "none", color: "#374151",
                  fontWeight: 500, fontSize: 15,
                  cursor: "pointer", transition: "all 0.15s ease", marginBottom: 2,
                }}
                onMouseOver={e => e.currentTarget.style.background = "#f9fafb"}
                onMouseOut={e => e.currentTarget.style.background = "none"}
              >
                <LayoutDashboard size={18} color="#9ca3af" />
                Dashboard
              </button>
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen("profile"); }}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  width: "100%", textAlign: "left",
                  padding: "13px 12px", borderRadius: 12, border: "none",
                  background: "none", color: "#374151",
                  fontWeight: 500, fontSize: 15,
                  cursor: "pointer", transition: "all 0.15s ease", marginBottom: 2,
                }}
                onMouseOver={e => e.currentTarget.style.background = "#f9fafb"}
                onMouseOut={e => e.currentTarget.style.background = "none"}
              >
                <User size={18} color="#9ca3af" />
                Edit Profil
              </button>
            </>
          )}
        </div>

        {/* Bottom actions */}
        <div style={{ padding: "16px 16px 24px", borderTop: "1px solid #f1f5f9" }}>
          {user ? (
            <button
              onClick={() => { setMobileOpen(false); onLogout(); }}
              style={{
                width: "100%", padding: "14px", borderRadius: 14,
                background: "#fef2f2", border: "1px solid #fecaca",
                color: "#ef4444", fontWeight: 700, fontSize: 15, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.2s ease",
              }}
              onMouseOver={e => e.currentTarget.style.background = "#fee2e2"}
              onMouseOut={e => e.currentTarget.style.background = "#fef2f2"}
            >
              <LogOut size={18} /> Keluar
            </button>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen("register"); }}
                style={{
                  width: "100%", padding: "14px", borderRadius: 14,
                  background: "none", border: `1.5px solid ${ACCENT}`,
                  color: ACCENT, fontWeight: 700, fontSize: 15, cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
              >
                Daftar
              </button>
              <button
                onClick={() => { setMobileOpen(false); setLoginOpen("login"); }}
                style={{
                  width: "100%", padding: "14px", borderRadius: 14,
                  background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                  border: "none", color: "#fff", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", boxShadow: `0 4px 14px ${ACCENT}40`,
                  transition: "all 0.2s ease",
                }}
              >
                Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
