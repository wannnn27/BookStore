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
    1: { scale: 0.78, tx: isMobile ? 120 : 155, opacity: 0.85, zIndex: 7  },
    2: { scale: 0.62, tx: isMobile ? 200 : 264, opacity: 0.50, zIndex: 4  },
  };

  return (
    <section
      id="home"
      style={{
        minHeight: isMobile ? "auto" : "100vh",
        display: "flex",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "center",
        background: dark
          ? "linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%)"
          : "linear-gradient(135deg,#f0f4ff 0%,#eef2ff 100%)",
        position: "relative",
        padding: isMobile ? "100px 0 60px" : "80px 0",
      }}
    >
      {/* Ambient blobs */}
      <div style={{ position:"absolute", top:-80, right:-80, width:400, height:400, borderRadius:"50%", background:ACCENT+"15", filter:"blur(80px)", animation:"float 6s ease-in-out infinite" }} />
      <div style={{ position:"absolute", bottom:-60, left:100, width:300, height:300, borderRadius:"50%", background:"#7c3aed10", filter:"blur(60px)", animation:"float 8s ease-in-out infinite reverse" }} />

      <div className="container mobile-stack" style={{ display:"flex", alignItems:"center", zIndex:1, gap: isMobile ? 32 : 60, justifyContent: "center" }}>

        {/* ── LEFT: Headline ── */}
        <div className="mobile-center" style={{ flex: "1 1 420px", maxWidth: 520, width: "100%" }}>
          <FadeIn delay={0.1}>
            <h1 className="hero-title" style={{ fontSize: isMobile ? 34 : 52, fontWeight: 800, color: dark ? "#f8fafc" : "#1a243d", lineHeight: 1.12, marginBottom: 16, letterSpacing: "-1px", fontFamily: "Georgia, serif" }}>
              Jelajahi &<br />Pilih Bukumu
            </h1>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", lineHeight: 1.65, marginBottom: isMobile ? 24 : 40, fontSize: isMobile ? 14 : 16, maxWidth: 420, margin: "0 auto 24px" }}>
              Temukan buku terbaik dari penulis favorit Anda, jelajahi ratusan buku dengan berbagai kategori.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <button
              onClick={() => document.getElementById("featured").scrollIntoView({ behavior:"smooth" })}
              style={{ 
                background:ACCENT, color:"#fff", border:"none", padding: isMobile ? "12px 32px" : "16px 40px", 
                borderRadius:10, fontWeight:700, fontSize:15, cursor:"pointer", 
                boxShadow:`0 8px 20px ${ACCENT}35`, transition:"all 0.3s ease", marginBottom: isMobile ? 20 : 0 
              }}
              onMouseEnter={e => { e.currentTarget.style.background=ACCENT_DARK; e.currentTarget.style.transform="translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background=ACCENT; e.currentTarget.style.transform="translateY(0)"; }}
            >
              Jelajahi Sekarang
            </button>
          </FadeIn>
        </div>

        {/* ── RIGHT: Coverflow Carousel ── */}
        <div
          style={{ 
            flex: "1 1 500px", position: "relative", userSelect: "none", cursor: "grab", 
            maxWidth: "100%", overflow: "hidden", 
            paddingBottom: isMobile ? 20 : 0 
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {/* Edge fades */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:40, zIndex:3, pointerEvents:"none", background: dark ? "linear-gradient(to right,#0f172a,transparent)" : "linear-gradient(to right,#f0f4ff,transparent)" }} />
          <div style={{ position:"absolute", right:0, top:0, bottom:0, width:40, zIndex:3, pointerEvents:"none", background: dark ? "linear-gradient(to left,#1e1b4b,transparent)" : "linear-gradient(to left,#eef2ff,transparent)" }} />

          {/* Arrows */}
          {!isMobile && active > 0 && (
            <button
              onClick={() => go(-1)}
              style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", zIndex:5, width:36, height:36, borderRadius:"50%", border:"none", background:dark?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.9)", boxShadow:"0 2px 14px rgba(0,0,0,0.14)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark?"#e2e8f0":"#334155"} strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
          )}

          {!isMobile && active < books.length - 1 && (
            <button
              onClick={() => go(1)}
              style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", zIndex:5, width:36, height:36, borderRadius:"50%", border:"none", background:dark?"rgba(255,255,255,0.14)":"rgba(255,255,255,0.9)", boxShadow:"0 2px 14px rgba(0,0,0,0.14)", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={dark?"#e2e8f0":"#334155"} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}

          {/* Stage */}
          <div style={{ position:"relative", height: isMobile ? 220 : 320, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
            {books.map((b, i) => {
              const offset = i - active;
              const abs    = Math.abs(offset);
              if (abs > 2) return null;
              const cfg = {
                0: { scale: 1,    tx: 0,   opacity: 1,    zIndex: 10 },
                1: { scale: 0.82, tx: isMobile ? 90 : 155, opacity: 0.85, zIndex: 7  },
                2: { scale: 0.7,  tx: isMobile ? 160 : 264, opacity: 0.50, zIndex: 4  },
              }[abs];
              const tx = offset < 0 ? -cfg.tx : cfg.tx;
              return (
                <div
                  key={b.id ?? i}
                  onClick={() => { if (offset !== 0) go(offset > 0 ? 1 : -1); }}
                  style={{
                    position:   "absolute",
                    transform:  `translateX(${tx}px) scale(${cfg.scale})`,
                    opacity:    cfg.opacity,
                    zIndex:     cfg.zIndex,
                    transition: "all 0.45s cubic-bezier(0.19,1,0.22,1)",
                    cursor:     offset !== 0 ? "pointer" : "default",
                    filter:     abs === 0 ? "drop-shadow(0 20px 40px rgba(0,0,0,0.22))" : "none",
                  }}
                >
                  <BookCover book={b} height={isMobile ? 180 : 260} />
                </div>
              );
            })}
          </div>

          {/* Indicators */}
          <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:16 }}>
            {books.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 20 : 6,
                  height: 6,
                  borderRadius: 4,
                  background: i === active ? ACCENT : (dark ? "#334155" : "#d1d5db"),
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom feature bar ── */}
      <div className="hide-mobile" style={{ position:"absolute", bottom:0, left:0, right:0, display:"flex", justifyContent:"center", borderTop:dark?"1px solid #ffffff10":"1px solid #00000008", backgroundColor:dark?"rgba(15,23,42,0.8)":"rgba(255,255,255,0.7)", backdropFilter:"blur(10px)" }}>
        <div className="container" style={{ padding:"20px 24px", display:"flex", justifyContent:"space-between", gap:20 }}>
          {[
            { icon:<Package size={22} color={ACCENT}/>,     label:"Pengiriman Cepat & Instan" },
            { icon:<ShieldCheck size={22} color={ACCENT}/>,  label:"Pembayaran 100% Aman" },
            { icon:<Headphones size={22} color={ACCENT}/>,   label:"Layanan Pelanggan 24/7" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:12, color:dark?"#cbd5e1":"#475569", fontSize:15, fontWeight:600 }}>
              <div style={{ padding:10, background:dark?"#1e293b":"#f1f5f9", borderRadius:10, display:"flex" }}>
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}