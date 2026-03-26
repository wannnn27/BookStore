import { useState } from "react";
import { FadeIn } from "../common/FadeIn";
import { ACCENT, ACCENT_DARK } from "../../constants/data";

export function Subscribe({ dark }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section style={{ padding: "0 24px", background: dark ? "#0f172a" : "#f8fafc", paddingBottom: "100px" }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "80px 40px", textAlign: "center",
        background: "linear-gradient(135deg,#1a1a3e 0%,#2d2d5e 50%,#1a3a5e 100%)",
        position: "relative", borderRadius: 24,
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=60)", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.15, mixBlendMode: "overlay" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontSize: 48, fontWeight: 800, color: "#fff", marginBottom: 20, lineHeight: 1.15, letterSpacing: "-1px" }}>
              Berlangganan Untuk<br />Pembaruan Terbaru
            </h2>
            <p style={{ color: "#cbd5e1", fontSize: 16, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.6 }}>Bergabunglah dengan newsletter kami untuk mendapatkan rekomendasi buku mingguan dan kode diskon eksklusif langsung ke email Anda.</p>
          </FadeIn>
          <FadeIn delay={0.2}>
            {done ? (
              <div style={{ color: "#86efac", fontSize: 20, fontWeight: 700, background: "rgba(255,255,255,0.1)", padding: "20px", borderRadius: 12, display: "inline-block", backdropFilter: "blur(10px)" }}>✅ Terima kasih telah berlangganan! Periksa email Anda.</div>
            ) : (
              <div style={{ maxWidth: 520, margin: "0 auto", display: "flex", gap: 12, background: "rgba(255,255,255,0.1)", padding: 8, borderRadius: 16, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan alamat email Anda"
                  style={{ flex: 1, padding: "16px 20px", borderRadius: 10, border: "none", fontSize: 16, background: "rgba(255,255,255,0.9)", outline: "none", color: "#0f172a", fontWeight: 500 }}
                />
                <button
                  onClick={() => { if (email && email.includes("@")) setDone(true); }}
                  style={{
                    background: ACCENT, color: "#fff", border: "none", padding: "0 32px",
                    borderRadius: 10, fontWeight: 700, fontSize: 16, cursor: "pointer",
                    boxShadow: `0 8px 20px ${ACCENT}40`, transition: "all 0.25s",
                  }}
                  onMouseEnter={(e) => { e.target.style.background = ACCENT_DARK; }}
                  onMouseLeave={(e) => { e.target.style.background = ACCENT; }}
                >
                  Langganan
                </button>
              </div>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
