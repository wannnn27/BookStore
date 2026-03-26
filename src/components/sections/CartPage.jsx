import { useState } from "react";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag, Gift, ChevronLeft, Sparkles } from "lucide-react";
import { ACCENT } from "../../constants/data";
import { FadeIn } from "../common/FadeIn";

const formatPrice = (p) => "Rp " + p.toLocaleString("id-ID");

function CartItem({ item, onRemove, onUpdateQty }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => onRemove(item.id), 350);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 20,
        padding: "24px",
        background: "#fff",
        borderRadius: 20,
        border: "1px solid #f1f5f9",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        opacity: removing ? 0 : 1,
        transform: removing ? "translateX(60px) scale(0.95)" : "translateX(0) scale(1)",
        alignItems: "flex-start",
      }}
    >
      {/* Book Cover */}
      <div style={{ position: "relative", flexShrink: 0 }}>
        <img
          src={item.cover}
          alt={item.title}
          style={{
            width: 90, height: 125,
            borderRadius: 14, objectFit: "cover",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop"; }}
        />
        {item.badge && (
          <span style={{
            position: "absolute", top: -8, left: -8,
            background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
            color: "#fff", fontSize: 9, fontWeight: 800,
            padding: "3px 8px", borderRadius: 20,
            boxShadow: `0 2px 8px ${ACCENT}40`,
            whiteSpace: "nowrap",
          }}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <span style={{
              fontSize: 10, fontWeight: 800, color: ACCENT,
              textTransform: "uppercase", letterSpacing: 1
            }}>{item.genre}</span>
            <h3 style={{
              fontSize: 17, fontWeight: 800, color: "#1e293b",
              marginTop: 4, marginBottom: 4, lineHeight: 1.3,
              overflow: "hidden", textOverflow: "ellipsis",
              display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
            }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#94a3b8", marginBottom: 16 }}>{item.author}</p>
          </div>
          <button
            onClick={handleRemove}
            title="Hapus"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#cbd5e1", padding: 6, borderRadius: 10,
              transition: "all 0.2s ease", flexShrink: 0,
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.background = "#fef2f2"; }}
            onMouseOut={(e) => { e.currentTarget.style.color = "#cbd5e1"; e.currentTarget.style.background = "none"; }}
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Price & Qty Row */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <div>
            <span style={{ fontSize: 20, fontWeight: 900, color: "#1e293b" }}>
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span style={{ fontSize: 13, color: "#94a3b8", textDecoration: "line-through", marginLeft: 8 }}>
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          {/* Qty control */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "#f8fafc", borderRadius: 14,
            border: "1.5px solid #e2e8f0", overflow: "hidden",
          }}>
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                width: 38, height: 38, display: "flex", alignItems: "center",
                justifyContent: "center", color: "#64748b", transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = `${ACCENT}15`; e.currentTarget.style.color = ACCENT; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#64748b"; }}
            >
              <Minus size={15} />
            </button>
            <span style={{
              minWidth: 36, textAlign: "center",
              fontWeight: 800, fontSize: 15, color: "#1e293b",
            }}>{item.qty}</span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                width: 38, height: 38, display: "flex", alignItems: "center",
                justifyContent: "center", color: "#64748b", transition: "all 0.2s",
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = `${ACCENT}15`; e.currentTarget.style.color = ACCENT; }}
              onMouseOut={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#64748b"; }}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Subtotal row */}
        <div style={{ marginTop: 8 }}>
          <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Subtotal: </span>
          <span style={{ fontSize: 14, fontWeight: 800, color: ACCENT }}>
            {formatPrice(item.price * item.qty)}
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyCart({ onContinue }) {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px" }}>
      <div style={{
        width: 120, height: 120,
        background: "linear-gradient(135deg, #f8fafc, #f1f5f9)",
        borderRadius: 32, display: "flex", alignItems: "center",
        justifyContent: "center", margin: "0 auto 32px",
        boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        animation: "float 4s ease-in-out infinite",
      }}>
        <ShoppingBag size={52} color="#cbd5e1" />
      </div>
      <h2 style={{ fontSize: 28, fontWeight: 800, color: "#1e293b", marginBottom: 12 }}>
        Keranjang Kosong
      </h2>
      <p style={{ color: "#94a3b8", fontSize: 16, maxWidth: 340, margin: "0 auto 40px", lineHeight: 1.7 }}>
        Belum ada buku di keranjangmu. Yuk, mulai temukan buku favorit dan tambahkan ke keranjang!
      </p>
      <button
        onClick={onContinue}
        style={{
          background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
          color: "#fff", border: "none",
          padding: "16px 40px", borderRadius: 16,
          fontWeight: 800, fontSize: 16, cursor: "pointer",
          boxShadow: `0 8px 24px ${ACCENT}35`,
          transition: "all 0.3s ease",
          display: "inline-flex", alignItems: "center", gap: 10,
        }}
        onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${ACCENT}45`; }}
        onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 8px 24px ${ACCENT}35`; }}
      >
        <Sparkles size={18} />
        Jelajahi Koleksi Buku
      </button>
    </div>
  );
}

export function CartPage({ cart, onRemove, onUpdateQty, onCheckout, onBack }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const savings = cart.reduce((sum, item) => {
    const orig = item.originalPrice || item.price;
    return sum + (orig - item.price) * item.qty;
  }, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f1f5f9", paddingTop: 80 }}>
      <style>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes badgePop {
          0% { transform: scale(1); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @media (max-width: 900px) {
          .cart-layout { grid-template-columns: 1fr !important; }
          .cart-summary-sticky { position: static !important; }
        }
        @media (max-width: 640px) {
          .cart-page-container { padding: 24px 16px 80px !important; }
          .cart-header { padding: 16px !important; }
        }
      `}</style>

      {/* Page Header */}
      <div style={{
        background: "#fff",
        borderBottom: "1px solid #f1f5f9",
        position: "sticky", top: 72, zIndex: 50,
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px" }} >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <button
              onClick={onBack}
              style={{
                background: "#f8fafc", border: "1.5px solid #e2e8f0", cursor: "pointer",
                color: "#64748b", width: 42, height: 42, borderRadius: 14,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.2s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#64748b"; }}
            >
              <ChevronLeft size={22} />
            </button>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 900, color: "#1e293b", letterSpacing: "-0.5px" }}>
                Keranjang Belanja
              </h1>
              {cart.length > 0 && (
                <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>
                  {totalItems} item · {cart.length} judul buku
                </p>
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div style={{
              background: `${ACCENT}10`, color: ACCENT,
              padding: "8px 16px", borderRadius: 20,
              fontSize: 13, fontWeight: 700,
            }}>
              <Gift size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
              Gratis Ongkir!
            </div>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <EmptyCart onContinue={onBack} />
      ) : (
        <div
          className="container cart-page-container"
          style={{ padding: "32px 24px 80px" }}
        >
          <div
            className="cart-layout"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 28,
              alignItems: "start",
            }}
          >
            {/* Left: Cart Items */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Items header */}
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0 4px",
              }}>
                <h2 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b" }}>
                  Produk ({totalItems})
                </h2>
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>
                  Hemat {formatPrice(savings)} 🎉
                </span>
              </div>

              {cart.map((item, i) => (
                <FadeIn key={item.id} delay={i * 0.06}>
                  <CartItem
                    item={item}
                    onRemove={onRemove}
                    onUpdateQty={onUpdateQty}
                  />
                </FadeIn>
              ))}

              {/* Continue Shopping */}
              <button
                onClick={onBack}
                style={{
                  background: "none", border: "1.5px dashed #e2e8f0",
                  color: "#94a3b8", cursor: "pointer",
                  padding: "16px", borderRadius: 20,
                  fontWeight: 700, fontSize: 14,
                  transition: "all 0.2s ease",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}
                onMouseOver={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = `${ACCENT}06`; }}
                onMouseOut={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#94a3b8"; e.currentTarget.style.background = "none"; }}
              >
                <ChevronLeft size={16} />
                Lanjut Belanja
              </button>
            </div>

            {/* Right: Summary */}
            <div className="cart-summary-sticky" style={{ position: "sticky", top: 160 }}>
              <div style={{
                background: "#fff", borderRadius: 24,
                border: "1px solid #f1f5f9",
                overflow: "hidden",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}>
                {/* Summary Header */}
                <div style={{
                  background: `linear-gradient(135deg, ${ACCENT}12, ${ACCENT}06)`,
                  padding: "24px 28px",
                  borderBottom: "1px solid #f1f5f9",
                }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900, color: "#1e293b", marginBottom: 4 }}>
                    Ringkasan Pesanan
                  </h3>
                  <p style={{ fontSize: 13, color: "#94a3b8" }}>{totalItems} item dipilih</p>
                </div>

                <div style={{ padding: "24px 28px" }}>
                  {/* Item list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24 }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{
                        display: "flex", alignItems: "center", gap: 12
                      }}>
                        <img
                          src={item.cover}
                          alt={item.title}
                          style={{ width: 40, height: 54, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
                          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop"; }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontSize: 13, fontWeight: 700, color: "#1e293b",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>{item.title}</p>
                          <p style={{ fontSize: 12, color: "#94a3b8" }}>×{item.qty}</p>
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#475569", flexShrink: 0 }}>
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#f1f5f9", marginBottom: 20 }} />

                  {/* Price breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, color: "#64748b" }}>Subtotal</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{formatPrice(total)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 14, color: "#64748b" }}>Ongkos Kirim</span>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#10b981" }}>Gratis</span>
                    </div>
                    {savings > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 14, color: "#64748b" }}>Hemat</span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#ef4444" }}>-{formatPrice(savings)}</span>
                      </div>
                    )}
                  </div>

                  {/* Divider */}
                  <div style={{ height: 1, background: "#f1f5f9", marginBottom: 20 }} />

                  {/* Total */}
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28
                  }}>
                    <span style={{ fontSize: 17, fontWeight: 800, color: "#1e293b" }}>Total</span>
                    <span style={{ fontSize: 26, fontWeight: 900, color: ACCENT }}>
                      {formatPrice(total)}
                    </span>
                  </div>

                  {/* Promo badge */}
                  <div style={{
                    background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                    border: "1px solid #bbf7d0",
                    borderRadius: 14, padding: "12px 16px",
                    display: "flex", alignItems: "center", gap: 10,
                    marginBottom: 20,
                  }}>
                    <Tag size={16} color="#16a34a" />
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 800, color: "#166534" }}>Gratis Ongkir!</p>
                      <p style={{ fontSize: 11, color: "#4ade80" }}>Berlaku untuk semua wilayah Indonesia</p>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={onCheckout}
                    style={{
                      width: "100%",
                      background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
                      color: "#fff", border: "none",
                      padding: "18px", borderRadius: 18,
                      fontWeight: 800, fontSize: 16, cursor: "pointer",
                      boxShadow: `0 8px 24px ${ACCENT}35`,
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      position: "relative", overflow: "hidden",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = `0 14px 32px ${ACCENT}50`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 8px 24px ${ACCENT}35`;
                    }}
                  >
                    Checkout Sekarang
                    <ArrowRight size={20} />
                  </button>

                  <p style={{
                    textAlign: "center", fontSize: 12, color: "#94a3b8",
                    marginTop: 14, display: "flex", alignItems: "center",
                    justifyContent: "center", gap: 6,
                  }}>
                    🔒 Pembayaran aman & terenkripsi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
