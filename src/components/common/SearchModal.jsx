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
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 120, animation: "fadeIn 0.2s ease", backdropFilter: "blur(4px)" }}
    >
      <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 600, background: "#1e293b", borderRadius: 16, padding: "8px 12px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", alignItems: "center", padding: "12px", gap: 16 }}>
          <Search size={24} color="#94a3b8" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari buku, penulis, kategori..."
            style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 18, color: "#f1f5f9", caretColor: ACCENT, padding: 0 }}
          />
          <button onClick={onClose} style={{ background: "#334155", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", padding: 8, borderRadius: "50%" }}>
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
