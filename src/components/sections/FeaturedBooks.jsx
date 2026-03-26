import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "../common/FadeIn";
import { BookCard } from "../common/BookCard";
import { FEATURED, ACCENT } from "../../constants/data";
import { useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setWidth(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return width;
}

function arrowStyle(dark, disabled) {
  return {
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: "none",
    background: disabled
      ? dark
        ? "#1e293b"
        : "#e2e8f0"
      : ACCENT,
    color: disabled ? "#64748b" : "#fff",
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.25s ease",
  };
}

export function FeaturedBooks({ dark, onSeeMore, onAddToCart }) {
  const [idx, setIdx] = useState(0);
  const width = useWindowWidth();
  const visible = width < 640 ? 1 : width < 1024 ? 2 : 4;
  const maxIndex = Math.max(0, FEATURED.length - visible);

  const next = () => setIdx((p) => Math.min(p + 1, maxIndex));
  const prev = () => setIdx((p) => Math.max(p - 1, 0));

  return (
    <section
      id="featured"
      style={{
        padding: "100px 24px",
        background: dark ? "#0f172a" : "#f8fafc",
      }}
    >
      <div className="container">
        
        {/* HEADER */}
        <FadeIn>
          <div
            style={{
              textAlign: "center",
              marginBottom: 60,
              position: "relative"
            }}
          >
            <h2
              style={{
                fontSize: 44,
                fontWeight: 800,
                color: dark ? "#f8fafc" : "#0f172a",
                marginBottom: 12,
                fontFamily: "Georgia, serif"
              }}
            >
              Koleksi Buku
            </h2>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 16 }}>
              Temukan koleksi terpopuler kami
            </p>
          </div>
        </FadeIn>

        {/* SLIDER WRAPPER */}
        <div style={{ position: "relative" }}>
          {/* NAV BUTTONS — SIDE POSITIONING */}
          <button
            onClick={prev}
            disabled={idx === 0}
            style={{
              ...arrowStyle(dark, idx === 0),
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={next}
            disabled={idx === maxIndex}
            style={{
              ...arrowStyle(dark, idx === maxIndex),
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 10,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <ChevronRight size={24} />
          </button>

          <div
            style={{
              overflow: "hidden",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 24,
                transform: `translateX(-${idx * (100 / visible)}%)`,
                transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {FEATURED.map((book, i) => (
                <div
                  key={i}
                  style={{
                    minWidth: `calc(${100 / visible}% - 18px)`,
                    transition: "all 0.4s ease",
                  }}
                >
                  <FadeIn delay={i * 0.05}>
                    <div
                      style={{
                        transform:
                          i >= idx && i < idx + visible
                            ? "scale(1)"
                            : "scale(0.94)",
                        opacity:
                          i >= idx && i < idx + visible ? 1 : 0.4,
                        transition: "all 0.4s ease",
                      }}
                    >
                      <BookCard book={book} dark={dark} type="featured" onAddToCart={onAddToCart} />
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>

            {/* GRADIENT FADE (PRO LOOK) */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: dark
                  ? "linear-gradient(to right, #0f172a, transparent)"
                  : "linear-gradient(to right, #f8fafc, transparent)",
                pointerEvents: "none",
                zIndex: 2
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 60,
                background: dark
                  ? "linear-gradient(to left, #0f172a, transparent)"
                  : "linear-gradient(to left, #f8fafc, transparent)",
                pointerEvents: "none",
                zIndex: 2
              }}
            />
          </div>
        </div>

        {/* FOOTER LINK */}
        <FadeIn delay={0.4}>
          <div style={{ textAlign: "center", marginTop: 60, padding: "20px", borderTop: dark ? "1px solid #ffffff08" : "1px solid #00000008" }}>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 16 }}>
              Ingin mencari buku lebih banyak lagi?{" "}
              <span 
                onClick={(e) => {
                  e.preventDefault();
                  onSeeMore();
                }}
                style={{ 
                  color: ACCENT, 
                  cursor: "pointer", 
                  fontWeight: 600, 
                  textDecoration: "underline",
                  marginLeft: 4,
                  padding: "10px",
                  transition: "0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.color = dark ? "#fff" : "#0ea5e9"}
                onMouseOut={(e) => e.currentTarget.style.color = ACCENT}
              >
                Klik di sini
              </span>
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
