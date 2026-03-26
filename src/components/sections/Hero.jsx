import { useState, useRef, useCallback, useEffect } from "react";
import { Package, ShieldCheck, Headphones } from "lucide-react";
import { FadeIn } from "../common/FadeIn";
import { BookCover } from "../common/BookCover";
import { FEATURED, ACCENT, ACCENT_DARK } from "../../constants/data";

export function Hero({ dark }) {
  const [active, setActive] = useState(0);
  const isAnimating = useRef(false);
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = width < 768;

  const go = useCallback((dir) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActive((prev) => {
      const next = prev + dir;
      if (next < 0 || next >= FEATURED.length) {
        isAnimating.current = false;
        return prev;
      }
      return next;
    });
    setTimeout(() => { isAnimating.current = false; }, 420);
  }, []);

  // Touch swipe
  const touchStartX = useRef(null);
  function onTouchStart(e) { touchStartX.current = e.touches[0].clientX; }
  function onTouchEnd(e) {
    if (touchStartX.current === null) return;
    const dx = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1);
    touchStartX.current = null;
  }

  // Mouse drag
  const mouseStartX = useRef(null);
  function onMouseDown(e) { mouseStartX.current = e.clientX; }
  function onMouseUp(e) {
    if (mouseStartX.current === null) return;
    const dx = mouseStartX.current - e.clientX;
    if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1);
    mouseStartX.current = null;
  }

  const books = FEATURED;

  const slotCfg = {
    0: { scale: 1,    tx: 0,   opacity: 1,    zIndex: 10 },
    1: { scale: 0.78, tx: isMobile ? 110 : 155, opacity: 0.85, zIndex: 7  },
    2: { scale: 0.62, tx: isMobile ? 180 : 264, opacity: 0.50, zIndex: 4  },
  };

  return (
    <section
      id="home"
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: dark
          ? "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)"
          : "linear-gradient(135deg,#f0f4ff 0%,#eef2ff 100%)",
        position: "relative",
        overflow: "hidden",
        padding: isMobile ? "110px 16px 60px" : "80px 0",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:ACCENT+"15", filter:"blur(80px)", animation:"float 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:-60, left:100, width:300, height:300, borderRadius:"50%", background:"#7c3aed10", filter:"blur(60px)", animation:"float 8s ease-in-out infinite reverse" }} />

      <div className="container" style={{ 
        display:"flex", 
        flexDirection: isMobile ? "column" : "row",
        alignItems:"center", 
        zIndex:1, 
        gap: isMobile ? 32 : 60, 
        justifyContent: "center",
        width: "100%"
      }}>

        {/* ── LEFT: Headline ── */}
        <div style={{ 
          flex: isMobile ? "none" : "1 1 400px", 
          maxWidth: 520,
          textAlign: isMobile ? "center" : "left",
          width: "100%"
        }}>
          <FadeIn delay={0.1}>
            <h1 className="hero-title" style={{ fontSize: isMobile ? 34 : 52, fontWeight: 800, color: dark ? "#f8fafc" : "#1a243d", lineHeight: 1.12, marginBottom: 20, letterSpacing: "-1px", fontFamily: "Georgia, serif" }}>
              Jelajahi &<br />Pilih Bukumu
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight: 1.6, marginBottom: 30, fontSize: 16, maxWidth: 420, margin: isMobile ? "0 auto 30px" : "0 0 32px" }}>
              Temukan buku terbaik dari penulis favorit Anda, jelajahi ratusan buku
              dengan berbagai kategori, nikmati diskon 50%.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <button
              onClick={() => {
                const el = document.getElementById("featured");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ background:ACCENT, color:"#fff", border:"none", padding: "14px 40px", borderRadius:12, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:`0 8px 16px ${ACCENT}40`, transition:"all 0.3s ease" }}
              onMouseEnter={e => e.currentTarget.style.background=ACCENT_DARK}
              onMouseLeave={e => e.currentTarget.style.background=ACCENT}
            >
              Jelajahi Sekarang
            </button>
          </FadeIn>
        </div>

        {/* ── RIGHT: Carousel ── */}
        <div
          style={{ 
            flex: isMobile ? "none" : "1 1 500px", 
            position: "relative", 
            userSelect: "none", 
            cursor: "grab", 
            width: "100%",
            maxWidth: isMobile ? 360 : 600,
            overflow: "hidden",
            marginTop: isMobile ? 30 : 0
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* Edge fades */}
          {!isMobile && <div style={{ position:"absolute", left:0, top:0, bottom:0, width:60, zIndex:3, pointerEvents:"none", background: dark ? "linear-gradient(to right,#0f172a,transparent)" : "linear-gradient(to right,#f0f4ff,transparent)" }} />}
          {!isMobile && <div style={{ position:"absolute", right:0, top:0, bottom:0, width:60, zIndex:3, pointerEvents:"none", background: dark ? "linear-gradient(to left,#1e1b4b,transparent)" : "linear-gradient(to left,#eef2ff,transparent)" }} />}

          {/* ── Book stage ── */}
          <div style={{ position:"relative", height: isMobile ? 240 : 320, display:"flex", alignItems:"center", justifyContent:"center" }}>
            {books.map((b, i) => {
              const offset = i - active;
              const abs = Math.abs(offset);
              if (abs > 2) return null;
              const cfg = slotCfg[abs];
              const tx = offset < 0 ? -cfg.tx : cfg.tx;
              return (
                <div
                  key={b.id ?? i}
                  onClick={() => { if (offset !== 0) go(offset > 0 ? 1 : -1); }}
                  style={{
                    position: "absolute",
                    transform: `translateX(${tx}px) scale(${cfg.scale})`,
                    opacity: cfg.opacity,
                    zIndex: cfg.zIndex,
                    transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                    cursor: offset !== 0 ? "pointer" : "default",
                  }}
                >
                  <BookCover book={b} height={isMobile ? 180 : 260} />
                </div>
              );
            })}
          </div>

          {/* Dot indicators */}
          <div style={{ display:"flex", justifyContent:"center", gap:7, marginTop:20 }}>
            {books.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 20 : 7, height: 7, borderRadius: 4,
                  background: i === active ? ACCENT : (dark ? "#334155" : "#cbd5e1"),
                  cursor: "pointer", transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile features bar (optional) ── */}
      <div className="hide-mobile" style={{ position:"absolute", bottom:0, left:0, right:0, height: 60, display: "flex", alignItems: "center", borderTop:dark?"1px solid white":"1px solid rgba(0,0,0,0.05)", background:dark?"rgba(0,0,0,0.2)":"rgba(255,255,255,0.4)", backdropFilter:"blur(10px)" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Pengiriman Cepat</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Pembayaran Aman</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>Layanan 24/7</span>
        </div>
      </div>
    </section>
  );
}