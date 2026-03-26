import { X, ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { ACCENT } from "../../constants/data";

export function CartModal({ open, onClose, dark, cart, onRemove, onUpdateQty, onCheckout }) {
  if (!open) return null;

  const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const formatPrice = (p) => "Rp " + p.toLocaleString("id-ID");

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
      display: "flex", justifyContent: "flex-end", animation: "fadeIn 0.3s ease-out"
    }} onClick={onClose}>
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cart-item:hover { transform: translateX(-4px); }
        .qty-btn:hover { background: ${ACCENT}20 !important; }
      `}</style>
      
      <div 
        style={{
          width: "100%", maxWidth: 440, height: "100%",
          background: dark ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)",
          boxShadow: "-20px 0 50px rgba(0,0,0,0.15)",
          display: "flex", flexDirection: "column",
          position: "relative", animation: "slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          borderLeft: `1px solid ${dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"}`
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ padding: "32px 32px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 900, color: dark ? "#fff" : "#1e293b", letterSpacing: "-0.5px" }}>Keranjang</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: ACCENT }} />
              <p style={{ fontSize: 13, color: dark ? "#94a3b8" : "#64748b", fontWeight: 500 }}>{cart.length} item pilihan Anda</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              background: dark ? "#334155" : "#f1f5f9", border: "none", cursor: "pointer", 
              color: dark ? "#94a3b8" : "#4b5563", width: 40, height: 40, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "rotate(90deg)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "rotate(0)"}
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0 32px 32px" }} className="hide-scrollbar">
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: 120 }}>
              <div style={{ 
                width: 90, height: 90, background: dark ? "#1e293b" : "#f8fafc", 
                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", 
                margin: "0 auto 24px" 
              }}>
                <ShoppingCart size={40} color={dark ? "#334155" : "#cbd5e1"} />
              </div>
              <h3 style={{ color: dark ? "#fff" : "#1e293b", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Belum ada buku</h3>
              <p style={{ color: "#94a3b8", fontSize: 14, maxWidth: 220, margin: "0 auto" }}>Mulai petualanganmu dengan menambahkan buku favorit.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {cart.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="cart-item"
                  style={{ 
                    display: "flex", gap: 16, alignItems: "center", 
                    background: dark ? "rgba(30, 41, 59, 0.4)" : "#fff", 
                    padding: "16px", borderRadius: 20, transition: "0.3s",
                    border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.02)"
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <img src={item.cover} alt={item.title} style={{ width: 80, height: 110, borderRadius: 12, objectFit: "cover", boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }} />
                    <button 
                      onClick={() => onRemove(item.id)} 
                      style={{ 
                        position: "absolute", top: -8, right: -8, background: "#ef4444", color: "#fff", 
                        border: "none", width: 24, height: 24, borderRadius: "50%", 
                        display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        boxShadow: "0 4px 8px rgba(239, 68, 68, 0.3)"
                      }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: 16, fontWeight: 800, color: dark ? "#fff" : "#1e293b", marginBottom: 2, lineHeight: 1.2 }}>{item.title}</h4>
                    <p style={{ fontSize: 12, color: "#94a3b8", marginBottom: 12 }}>{item.author}</p>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontWeight: 800, color: ACCENT, fontSize: 15 }}>{formatPrice(item.price)}</span>
                      <div style={{ 
                        display: "flex", alignItems: "center", background: dark ? "#0f172a" : "#f8fafc", 
                        borderRadius: 12, padding: "2px", border: `1px solid ${dark ? "#1e293b" : "#e2e8f0"}` 
                      }}>
                        <button onClick={() => onUpdateQty(item.id, -1)} className="qty-btn" style={{ background: "none", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#fff" : "#1e293b" }}><Minus size={14} /></button>
                        <span style={{ fontSize: 14, fontWeight: 800, color: dark ? "#fff" : "#1e293b", minWidth: 32, textAlign: "center" }}>{item.qty}</span>
                        <button onClick={() => onUpdateQty(item.id, 1)} className="qty-btn" style={{ background: "none", border: "none", cursor: "pointer", width: 30, height: 30, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: dark ? "#fff" : "#1e293b" }}><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Panel */}
        {cart.length > 0 && (
          <div style={{ 
            padding: "32px", background: dark ? "#111827" : "#fff", 
            borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
            boxShadow: "0 -10px 30px rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 }}>Total Pembayaran</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 32, fontWeight: 900, color: dark ? "#fff" : "#1e293b" }}>{formatPrice(total)}</span>
                </div>
              </div>
              <div style={{ textAlign: "right", paddingBottom: 6 }}>
                <span style={{ fontSize: 13, background: "#f0fdf4", color: "#16a34a", fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>Gratis Ongkir!</span>
              </div>
            </div>
            
            <button 
              onClick={onCheckout}
              style={{ 
                width: "100%", background: ACCENT, color: "#fff", border: "none", borderRadius: 20, padding: "20px",
                fontWeight: 800, fontSize: 17, cursor: "pointer", boxShadow: `0 12px 24px ${ACCENT}30`,
                transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 15px 30px ${ACCENT}50`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 12px 24px ${ACCENT}30`; }}
            >
              Lanjutkan ke Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
