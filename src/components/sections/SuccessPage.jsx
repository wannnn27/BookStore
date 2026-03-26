import { useState, useEffect } from "react";
import { Check, ArrowRight } from "lucide-react";
import { ACCENT } from "../../constants/data";

export function SuccessPage({ onHome, dark }) {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);

  const orderId = "#BK" + Math.random().toString(36).substr(2, 8).toUpperCase();

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0f172a" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div 
        style={{ 
          background: dark ? "#1e293b" : "#fff", borderRadius: 32, padding: "48px 32px", maxWidth: 450, width: "100%", 
          textAlign: "center", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
          opacity: show ? 1 : 0, transform: show ? "scale(1)" : "scale(0.95)", transition: "all 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        }}
      >
        <div style={{ 
          width: 80, height: 80, background: "#dcfce7", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", 
          margin: "0 auto mb-24", marginBottom: 24, transform: show ? "scale(1)" : "scale(0)", transition: "all 0.8s 0.2s"
        }}>
          <Check size={40} color="#10b981" />
        </div>
        <h2 style={{ fontSize: 28, fontWeight: 800, color: dark ? "#fff" : "#111827", marginBottom: 12 }}>Pesanan Berhasil! 🎉</h2>
        <p style={{ color: "#64748b", fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Terima kasih telah berbelanja di One-Book. Pesananmu sedang diproses dan akan segera dikirimkan ke alamatmu.
        </p>
        
        <div style={{ background: ACCENT + "10", padding: 16, borderRadius: 20, textAlign: "left", marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>No. Pesanan</p>
          <p style={{ fontWeight: 800, color: dark ? "#fff" : "#111827", fontSize: 18, fontFamily: "monospace" }}>{orderId}</p>
        </div>
        
        <p style={{ fontSize: 13, color: "#9ca3af", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <span>📧 Konfirmasi email terkirim</span>
          <span style={{ opacity: 0.3 }}>•</span>
          <span>🔔 Notifikasi pesanan aktif</span>
        </p>
        
        <button 
          onClick={onHome} 
          style={{ 
            width: "100%", padding: "18px", background: ACCENT, color: "#fff", border: "none", 
            borderRadius: 16, fontWeight: 700, fontSize: 16, cursor: "pointer", 
            boxShadow: `0 10px 20px ${ACCENT}30`, transition: "0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >
          Kembali Belanja <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
