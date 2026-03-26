import { useState } from "react";
import { Search, ShoppingBag } from "lucide-react";
import { FadeIn } from "../common/FadeIn";
import { BookCover } from "../common/BookCover";
import { Stars } from "../common/Stars";
import { NEW_BOOKS, ACCENT } from "../../constants/data";

function NewBookRow({ book, dark, onAddToCart }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 20, padding: "20px",
        background: dark ? "#1e293b" : "#fff", borderRadius: 16,
        border: dark ? "1px solid #334155" : "1px solid #e2e8f0",
        boxShadow: hov ? `0 12px 32px ${ACCENT}15` : "0 4px 12px rgba(0,0,0,0.02)",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.3s ease", cursor: "pointer",
        position: "relative"
      }}
    >
      <div style={{ borderRadius: 8, overflow: "hidden", filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}>
        <BookCover book={book} height={110} />
      </div>
      <div style={{ flex: 1 }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4, display: "block" }}>Buku Baru</span>
        <h4 style={{ fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", marginBottom: 6, fontSize: 16 }}>{book.title}</h4>
        <div style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "center" }}>
          <span style={{ fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", fontSize: 16 }}>Rp {book.price.toLocaleString("id-ID")}</span>
          <span style={{ color: "#9ca3af", textDecoration: "line-through", fontSize: 13 }}>Rp {book.originalPrice.toLocaleString("id-ID")}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stars rating={book.rating} />
          <button 
            onClick={(e) => { e.stopPropagation(); onAddToCart(book); }}
            style={{ 
              background: ACCENT, color: "#fff", border: "none", borderRadius: 8, 
              width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "0.2s"
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.1)"}
            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function NewBooks({ dark, onAddToCart }) {
  return (
    <section id="new-books" style={{ padding: "100px 24px", background: dark ? "#0f172a" : "#f8fafc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", marginBottom: 16 }}>Rilis Terbaru</h2>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>Jelajahi tambahan terbaru di perpustakaan kami dan temukan bacaan favorit Anda berikutnya.</p>
          </div>
        </FadeIn>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {NEW_BOOKS.map((book, i) => (
            <FadeIn key={book.title + i} delay={i * 0.07}>
              <NewBookRow book={book} dark={dark} onAddToCart={onAddToCart} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
