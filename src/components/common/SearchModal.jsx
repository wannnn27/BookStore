import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { ACCENT } from "../../constants/data";

export function SearchModal({ open, onClose }) {
  const [q, setQ] = useState("");
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { if (open) setQ(""); }, [open]);
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{ 
        position: "fixed", inset: 0, zIndex: 1000, 
        background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "flex-start", 
        justifyContent: "center", paddingTop: 120, animation: "fadeIn 0.2s ease", 
        backdropFilter: "blur(8px)" 
      }}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        style={{ 
          width: "100%", maxWidth: 600, background: "#fff", borderRadius: 24, 
          padding: "12px", overflow: "hidden", 
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
          border: "1px solid rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "12px", gap: 16 }}>
          <Search size={22} color={ACCENT} />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari buku, penulis, kategori..."
            style={{ 
              flex: 1, background: "none", border: "none", outline: "none", 
              fontSize: 18, color: "#1e293b", caretColor: ACCENT, padding: 0,
              fontWeight: 500
            }}
          />
          <button 
            onClick={onClose} 
            style={{ 
              background: "#f1f5f9", border: "none", color: "#64748b", 
              cursor: "pointer", display: "flex", padding: 8, borderRadius: "50%",
              transition: "0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.background = "#e2e8f0"}
            onMouseOut={e => e.currentTarget.style.background = "#f1f5f9"}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
