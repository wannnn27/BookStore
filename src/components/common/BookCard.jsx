import { useState } from "react";
import { Search, Heart, Eye } from "lucide-react";
import { BookCover } from "./BookCover";
import { Stars } from "./Stars";
import { ACCENT, ACCENT_DARK } from "../../constants/data";

export function BookCard({ book, dark, type, onAddToCart }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: dark ? "#1e293b" : "#fff",
        borderRadius: 16, 
        padding: "20px 16px", 
        textAlign: "center",
        boxShadow: hov ? "0 12px 30px rgba(0,0,0,0.08)" : "0 4px 12px rgba(0,0,0,0.03)",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer", 
        position: "relative", 
        overflow: "hidden", 
        border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
        height: "100%",
        display: "flex",
        flexDirection: "column"
      }}
    >
      {/* hover overlay icons */}
      <div style={{ 
        position: "absolute", top: 12, right: 12, display: "flex", flexDirection: "column", gap: 8, zIndex: 2, 
        opacity: hov ? 1 : 0, transform: hov ? "translateX(0)" : "translateX(10px)", transition: "all 0.3s ease" 
      }}>
        {[<Search size={14} color="#fff" />, <Heart size={14} color="#fff" />, <Eye size={14} color="#fff" />].map((ic, i) => (
          <button key={i} style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(15,23,42,0.8)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }} onMouseOver={(e)=>e.currentTarget.style.background=ACCENT} onMouseOut={(e)=>e.currentTarget.style.background="rgba(15,23,42,0.8)"}>
            {ic}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
        <BookCover book={book} height={160} hover />
      </div>
      <h3 style={{ fontWeight: 700, color: dark ? "#f8fafc" : "#0f172a", marginBottom: 4, fontSize: 15, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</h3>
      <p style={{ fontSize: 12, color: dark ? "#94a3b8" : "#64748b", marginBottom: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.author}</p>
      
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 10px", marginBottom: 16, alignItems: "center", marginTop: "auto" }}>
        <span style={{ fontWeight: 800, color: ACCENT, fontSize: 16 }}>Rp {book.price.toLocaleString("id-ID")}</span>
        {book.originalPrice && <span style={{ color: "#9ca3af", textDecoration: "line-through", fontSize: 12 }}>Rp {book.originalPrice.toLocaleString("id-ID")}</span>}
      </div>
      {type === "new" && <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><Stars rating={book.rating} /></div>}
      
      <button
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(book);
        }}
        style={{
          background: dark ? "#334155" : "#f1f5f9", color: dark ? "#f8fafc" : "#0f172a", border: "none", borderRadius: 10,
          padding: "10px 8px", fontWeight: 700, fontSize: 13, cursor: "pointer", width: "100%",
          transition: "all 0.2s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "#334155" : "#f1f5f9"; e.currentTarget.style.color = dark ? "#f8fafc" : "#0f172a"; }}
      >
        Tambah ke Keranjang
      </button>
    </div>
  );
}
