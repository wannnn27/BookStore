import { useState, useMemo, useEffect } from "react";
import { Search, Filter, BookOpen, ArrowLeft, Star, X, ShoppingCart, AlertCircle, RefreshCw } from "lucide-react";
import { FadeIn } from "../common/FadeIn";
import { BOOKS, GENRES, ACCENT } from "../../constants/data";

function formatPrice(p) {
  return "Rp " + p.toLocaleString("id-ID");
}

function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={14} fill={i <= Math.round(rating) ? "#f59e0b" : "none"} color={i <= Math.round(rating) ? "#f59e0b" : "#d1d5db"} />
      ))}
    </div>
  );
}

function BookModal({ book, onClose, onAddCart }) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function handleAdd() {
    for (let i = 0; i < qty; i++) onAddCart(book);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 1200);
  }

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1200, background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
        animation: "modal-overlay-in 0.3s ease",
      }}
      onClick={onClose}
    >
        <style>{`
          @media (max-width: 768px) {
            .book-modal-content {
              flex-direction: column !important;
            }
            .book-modal-image {
              max-width: 100% !important;
              height: 300px !important;
            }
            .book-modal-info {
              padding: 24px !important;
            }
          }
        `}</style>
        <div
          className="book-modal-content"
          style={{
            background: "#fff", borderRadius: 24, maxWidth: 800, width: "100%",
            maxHeight: "90vh", overflowY: "auto",
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)", display: "flex",
            animation: "modal-content-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          onClick={e => e.stopPropagation()}
        >
          <div className="book-modal-image" style={{ width: "100%", maxWidth: 320, flexShrink: 0 }}>
            <img src={book.cover} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 400 }} />
          </div>
        <div style={{ flex: 1, padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: 12, color: ACCENT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{book.genre}</span>
              <button onClick={onClose} style={{ background: "rgba(0,0,0,0.04)", border: "none", cursor: "pointer", color: "#9ca3af", width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "0.2s" }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(0,0,0,0.08)"}
                onMouseOut={e => e.currentTarget.style.background = "rgba(0,0,0,0.04)"}
              ><X size={20} /></button>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: "#111827", marginTop: 8, lineHeight: 1.2 }}>{book.title}</h2>
            <p style={{ color: "#6b7280", marginTop: 4 }}>oleh <span style={{ fontWeight: 600, color: "#374151" }}>{book.author}</span></p>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
              <Stars rating={book.rating} />
              <span style={{ fontSize: 14, color: "#6b7280" }}>{book.rating} · {book.reviews.toLocaleString()} ulasan</span>
            </div>
            <p style={{ color: "#4b5563", marginTop: 24, lineHeight: 1.7, fontSize: 15 }}>{book.desc}</p>
          </div>
          
          <div style={{ marginTop: 32 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: "#111827" }}>{formatPrice(book.price)}</span>
              <span style={{ color: "#9ca3af", textDecoration: "line-through", fontSize: 16 }}>{formatPrice(book.originalPrice)}</span>
              <span style={{ background: "#fef2f2", color: "#ef4444", fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 20 }}>Hemat {formatPrice(book.originalPrice - book.price)}</span>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ padding: "10px 16px", background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 16 }}>−</button>
                <span style={{ padding: "10px 12px", minWidth: 40, textAlign: "center", fontWeight: 700, color: "#111827" }}>{qty}</span>
                <button onClick={() => setQty(q => q+1)} style={{ padding: "10px 16px", background: "none", border: "none", cursor: "pointer", color: "#374151", fontWeight: 600, fontSize: 16 }}>+</button>
              </div>
              <button
                onClick={handleAdd}
                style={{ flex: 1, padding: "16px", borderRadius: 12, border: "none", fontWeight: 700, cursor: "pointer", transition: "all 0.3s ease", background: added ? "#10b981" : `linear-gradient(135deg, ${ACCENT}, #d97706)`, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: added ? "0 4px 12px rgba(16,185,129,0.3)" : `0 4px 12px ${ACCENT}30` }}
              >
                {added ? "✓ Ditambahkan ke Keranjang" : <><ShoppingCart size={18} /> Tambah ke Keranjang</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BookCard({ book, onAddToCart, onView, idx }) {
  const [hov, setHov] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    onAddToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      onClick={() => onView(book)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff", borderRadius: 20, overflow: "hidden",
        boxShadow: hov ? "0 20px 40px -10px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hov ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", cursor: "pointer",
        border: hov ? `1px solid ${ACCENT}40` : "1px solid #f1f5f9",
      }}
    >
      <div style={{ position: "relative", height: 240, background: "#f8fafc" }}>
        <img
          src={book.cover}
          alt={book.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", transform: hov ? "scale(1.05)" : "scale(1)" }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop"; }}
        />
        {book.badge && (
          <span style={{ position: "absolute", top: 12, left: 12, background: `linear-gradient(135deg, ${ACCENT}, #d97706)`, color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 20, boxShadow: `0 2px 8px ${ACCENT}30` }}>{book.badge}</span>
        )}
        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center", opacity: hov ? 1 : 0, transition: "all 0.3s ease", transform: hov ? "translateY(0)" : "translateY(10px)" }}>
          <button 
            onClick={handleAdd}
            style={{ 
              background: added ? "#10b981" : "#fff", color: added ? "#fff" : "#111827", 
              border: "none", padding: "10px 22px", borderRadius: 30, fontWeight: 700, fontSize: 13, 
              boxShadow: "0 8px 20px rgba(0,0,0,0.12)", cursor: "pointer", transition: "all 0.2s ease",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {added ? "✓ Ditambahkan" : <><ShoppingCart size={14} /> Keranjang</>}
          </button>
        </div>
      </div>
      <div style={{ padding: 18 }}>
        <span style={{ fontSize: 11, color: ACCENT, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{book.genre}</span>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#111827", marginTop: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</h3>
        <p style={{ fontSize: 13, color: "#6b7280", marginTop: 3 }}>{book.author}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10 }}>
          <Stars rating={book.rating} />
          <span style={{ fontSize: 12, color: "#9ca3af" }}>({book.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 14 }}>
          <span style={{ fontWeight: 800, color: "#111827", fontSize: 16 }}>{formatPrice(book.price)}</span>
          <span style={{ fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>{formatPrice(book.originalPrice)}</span>
          <span style={{ marginLeft: "auto", background: "#fef2f2", color: "#ef4444", fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>
            -{Math.round((1 - book.price / book.originalPrice) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Catalog({ onBack, onAddToCart }) {
  const [books, setBooks] = useState([]);
  const [activeCat, setActiveCat] = useState("Semua");
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingLocal, setUsingLocal] = useState(false);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/books${activeCat !== "Semua" ? `?genre=${activeCat}` : ""}`);
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setBooks(data);
        setUsingLocal(false);
      } else {
        // Empty result from DB, use local data 
        setBooks(BOOKS);
        setUsingLocal(true);
      }
    } catch (err) {
      console.warn("API unavailable, using local data:", err.message);
      setBooks(BOOKS);
      setUsingLocal(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [activeCat]);

  const filtered = useMemo(() => {
    let result = books;
    if (usingLocal && activeCat !== "Semua") {
      result = result.filter(b => b.genre === activeCat);
    }
    if (search) {
      result = result.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase())
      );
    }
    return result;
  }, [books, search, activeCat, usingLocal]);

  return (
    <div style={{ paddingTop: 30, minHeight: "100vh", background: "#f1f5f9" }}>
      <div className="container" style={{ padding: "20px 0 60px" }}>
        
        {/* HEADER */}
        <FadeIn>
          <div style={{ marginBottom: 32 }}>
            <button 
              onClick={onBack}
              style={{
                display: "flex", alignItems: "center", gap: 8, border: "none", background: "none",
                color: ACCENT, cursor: "pointer", fontWeight: 600, fontSize: 15, marginBottom: 20,
                padding: "10px 16px", borderRadius: 12, transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <ArrowLeft size={18} /> Kembali ke Beranda
            </button>
            <h1 style={{ fontSize: 40, fontWeight: 800, color: "#1a1a2e", marginBottom: 8, letterSpacing: "-0.5px" }}>Koleksi Kami</h1>
            <p style={{ color: "#64748b", fontSize: 16 }}>Dunia tak terbatas dalam sebuah buku.</p>
          </div>
        </FadeIn>

        {/* SEARCH SECTION */}
        <div style={{ 
          marginBottom: 20, background: "#fff", padding: "24px", borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9"
        }}>
          <h3 style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1, marginBottom: 14 }}>Cari Koleksi</h3>
          <div style={{ position: "relative" }}>
            <Search size={20} color={ACCENT} style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)" }} />
            <input 
              type="text" 
              placeholder="Cari judul buku atau nama penulis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%", padding: "16px 20px 16px 56px", borderRadius: 14,
                border: "1.5px solid #f1f5f9",
                background: "#f8fafc", color: "#1a1a2e",
                fontSize: 15, outline: "none", transition: "all 0.3s ease",
                fontFamily: "inherit",
              }}
              onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; }}
              onBlur={e => { e.target.style.borderColor = "#f1f5f9"; e.target.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* CATEGORY SECTION */}
        <div style={{ 
          marginBottom: 36, background: "#fff", padding: "24px", borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.04)", border: "1px solid #f1f5f9"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <Filter size={14} color={ACCENT} />
            <h3 style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: 1 }}>Kategori Genre</h3>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {GENRES.map(g => (
              <button
                key={g}
                onClick={() => setActiveCat(g)}
                style={{
                  padding: "11px 22px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 600,
                  cursor: "pointer", transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  background: activeCat === g ? `linear-gradient(135deg, ${ACCENT}, #d97706)` : "#f8fafc",
                  color: activeCat === g ? "#fff" : "#4b5563",
                  boxShadow: activeCat === g ? `0 4px 14px ${ACCENT}35` : "none",
                  transform: activeCat === g ? "translateY(-2px)" : "translateY(0)"
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0" }}>
            <div className="spinner spinner-amber" style={{ width: 36, height: 36, margin: "0 auto 16px" }} />
            <p style={{ color: "#64748b", fontSize: 15, fontWeight: 500 }}>Memuat koleksi buku...</p>
          </div>
        )}

        {/* ERROR/FALLBACK NOTICE */}
        {!loading && usingLocal && (
          <div style={{
            display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
            background: "rgba(245, 158, 11, 0.06)", border: `1px solid ${ACCENT}20`,
            borderRadius: 14, marginBottom: 24, animation: "fadeIn 0.3s ease",
          }}>
            <AlertCircle size={18} color={ACCENT} />
            <span style={{ color: "#92400e", fontSize: 13, fontWeight: 500, flex: 1 }}>
              Menampilkan katalog lokal. Database server tidak tersedia.
            </span>
            <button
              onClick={fetchBooks}
              style={{
                display: "flex", alignItems: "center", gap: 6, background: "none", border: "none",
                color: ACCENT, cursor: "pointer", fontWeight: 600, fontSize: 13,
              }}
            >
              <RefreshCw size={14} /> Coba Lagi
            </button>
          </div>
        )}

        {/* RESULTS GRID */}
        {!loading && filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px 0" }}>
            <div style={{ width: 80, height: 80, borderRadius: 20, background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <BookOpen size={36} color="#cbd5e1" />
            </div>
            <h3 style={{ color: "#1a1a2e", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Buku tidak ditemukan</h3>
            <p style={{ color: "#64748b", fontSize: 15 }}>Coba gunakan kata kunci atau kategori lain.</p>
            <button
              onClick={() => { setSearch(""); setActiveCat("Semua"); }}
              style={{
                marginTop: 20, background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                color: "#fff", border: "none", padding: "12px 28px", borderRadius: 12,
                fontWeight: 700, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 12px ${ACCENT}30`,
                transition: "all 0.3s ease",
              }}
              onMouseOver={e => e.currentTarget.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              Reset Filter
            </button>
          </div>
        ) : !loading && (
          <>
            <p style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              Menampilkan {filtered.length} buku
            </p>
            <div style={{ 
              display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", 
              gap: 24, transition: "all 0.3s ease" 
            }}>
              {filtered.map((book, i) => (
                <FadeIn key={book.id} delay={i * 0.04}>
                  <BookCard book={book} onAddToCart={onAddToCart} onView={setSelectedBook} idx={i} />
                </FadeIn>
              ))}
            </div>
          </>
        )}
      </div>

      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} onAddCart={onAddToCart} />
      )}
    </div>
  );
}
