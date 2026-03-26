import { useState, useEffect } from "react";
import {
  BookOpen, ShoppingBag, TrendingUp,
  User, Settings, ChevronRight, ArrowRight, Star,
  Package, CreditCard
} from "lucide-react";
import { ACCENT, ACCENT_DARK, BOOKS } from "../../constants/data";

export function Dashboard({ user, onNavigate, onAddToCart }) {
  const [greeting, setGreeting] = useState("");
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Selamat Pagi");
    else if (hour < 17) setGreeting("Selamat Siang");
    else if (hour < 20) setGreeting("Selamat Sore");
    else setGreeting("Selamat Malam");

    setTimeout(() => setAnimate(true), 50);
  }, []);

  const stats = [
    { label: "Buku Dibeli", value: "0", icon: BookOpen, color: "#3b82f6", bg: "rgba(59, 130, 246, 0.08)" },
    { label: "Pesanan Aktif", value: "0", icon: Package, color: "#22c55e", bg: "rgba(34, 197, 94, 0.08)" },
    { label: "Total Belanja", value: "Rp 0", icon: CreditCard, color: "#f59e0b", bg: "rgba(245, 158, 11, 0.08)" },
    { label: "Poin Reward", value: "0", icon: Star, color: "#a855f7", bg: "rgba(168, 85, 247, 0.08)" },
  ];

  const quickActions = [
    { label: "Jelajahi Koleksi", desc: "Temukan buku favorit", icon: BookOpen, action: () => onNavigate("catalog") },
    { label: "Edit Profil", desc: "Perbarui data Anda", icon: User, action: () => onNavigate("profile") },
    { label: "Pesanan Saya", desc: "Lacak pesanan", icon: Package, action: () => {} },
    { label: "Pengaturan", desc: "Kelola akun", icon: Settings, action: () => onNavigate("profile") },
  ];

  const recommendedBooks = BOOKS.slice(0, 4);

  return (
    <div style={{ paddingTop: 90, paddingBottom: 60, minHeight: "100vh", background: "#f1f5f9" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Welcome Banner - dark accent banner for visual contrast */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
            borderRadius: 24,
            padding: "40px 36px",
            marginBottom: 28,
            position: "relative",
            overflow: "hidden",
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 8px 32px rgba(15, 23, 42, 0.15)",
          }}
        >
          {/* Decorative circles */}
          <div style={{ position: "absolute", top: -50, right: -30, width: 200, height: 200, borderRadius: "50%", background: `${ACCENT}08`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, right: 80, width: 160, height: 160, borderRadius: "50%", background: `${ACCENT}06`, pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
            <div>
              <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600, marginBottom: 8, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                {greeting} 👋
              </p>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9", marginBottom: 8, letterSpacing: "-0.5px" }}>
                {user?.name || "User"}
              </h1>
              <p style={{ color: "#64748b", fontSize: 15, lineHeight: 1.6, maxWidth: 500 }}>
                Selamat datang kembali di One-Book. Temukan buku-buku inspiratif untuk menemani harimu.
              </p>
            </div>

            <button
              onClick={() => onNavigate("catalog")}
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
                color: "#fff", border: "none",
                padding: "14px 28px", borderRadius: 14,
                fontWeight: 700, fontSize: 15,
                cursor: "pointer",
                boxShadow: `0 4px 16px ${ACCENT}30`,
                display: "flex", alignItems: "center", gap: 10,
                transition: "all 0.3s ease",
              }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Mulai Belanja
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Stats Grid - Light cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16, marginBottom: 32,
        }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "22px 24px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${0.1 + i * 0.1}s`,
                opacity: animate ? 1 : 0,
                transform: animate ? "translateY(0)" : "translateY(20px)",
                cursor: "pointer",
              }}
              onMouseOver={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: stat.bg,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <stat.icon size={22} color={stat.color} />
                </div>
                <TrendingUp size={16} color="#cfd5de" />
              </div>
              <p style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", marginBottom: 4, letterSpacing: "-0.5px" }}>
                {stat.value}
              </p>
              <p style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 20 }}>
            Aksi Cepat
          </h2>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}>
            {quickActions.map((action, i) => (
              <div
                key={action.label}
                onClick={action.action}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: "28px 20px",
                  textAlign: "center",
                  cursor: "pointer",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + i * 0.08}s`,
                  opacity: animate ? 1 : 0,
                  transform: animate ? "translateY(0)" : "translateY(20px)",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = `${ACCENT}30`; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = "#f1f5f9"; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}06)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 14px",
                }}>
                  <action.icon size={22} color={ACCENT} />
                </div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                  {action.label}
                </p>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>
                  {action.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Books */}
        <div
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b" }}>
              Rekomendasi Untukmu
            </h2>
            <button
              onClick={() => onNavigate("catalog")}
              style={{
                background: "none", border: "none", color: ACCENT,
                cursor: "pointer", fontSize: 14, fontWeight: 600,
                display: "flex", alignItems: "center", gap: 6,
                transition: "0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.gap = "10px"}
              onMouseOut={e => e.currentTarget.style.gap = "6px"}
            >
              Lihat Semua
              <ChevronRight size={16} />
            </button>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {recommendedBooks.map((book) => (
              <div
                key={book.id}
                style={{
                  background: "#fff",
                  border: "1px solid #f1f5f9",
                  borderRadius: 16,
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}
                onMouseOver={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = `${ACCENT}20`; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)"; }}
                onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "#f1f5f9"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
              >
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img
                    src={book.cover}
                    alt={book.title}
                    style={{ width: "100%", height: 180, objectFit: "cover" }}
                  />
                  <div style={{
                    position: "absolute", top: 10, left: 10,
                    background: `linear-gradient(135deg, ${ACCENT}, #d97706)`, color: "#fff",
                    padding: "4px 10px", borderRadius: 8,
                    fontSize: 11, fontWeight: 700,
                    boxShadow: `0 2px 6px ${ACCENT}30`,
                  }}>
                    {book.badge}
                  </div>
                </div>
                <div style={{ padding: 16 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e293b", marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {book.title}
                  </h3>
                  <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 12 }}>
                    {book.author}
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: ACCENT }}>
                      Rp {book.price.toLocaleString("id-ID")}
                    </span>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddToCart(book); }}
                      style={{
                        background: `${ACCENT}10`, color: ACCENT,
                        border: "none", padding: "8px 14px", borderRadius: 10,
                        fontWeight: 700, fontSize: 12, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 6,
                        transition: "all 0.2s ease",
                      }}
                      onMouseOver={e => { e.currentTarget.style.background = `linear-gradient(135deg, ${ACCENT}, #d97706)`; e.currentTarget.style.color = "#fff"; }}
                      onMouseOut={e => { e.currentTarget.style.background = `${ACCENT}10`; e.currentTarget.style.color = ACCENT; }}
                    >
                      <ShoppingBag size={14} />
                      Beli
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
