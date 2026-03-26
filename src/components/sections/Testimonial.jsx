import { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { FadeIn } from "../common/FadeIn";
import { Stars } from "../common/Stars";
import { TESTIMONIALS, ACCENT } from "../../constants/data";

export function Testimonial({ dark }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="testimonial" style={{ padding: "0 24px 100px", background: dark ? "#0f172a" : "#f8fafc" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", marginBottom: 16 }}>Apa Kata Pembaca Kami</h2>
            <p style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 16, maxWidth: 600, margin: "0 auto" }}>Dengarkan pengalaman dari komunitas pembaca kami tentang perjalanan mereka bersama koleksi e-book kami.</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, maxWidth: 1100, margin: "0 auto" }}>
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={t.name + i} delay={i * 0.1}>
              <div style={{
                background: dark ? "#1e293b" : "#fff", borderRadius: 20, padding: 36, textAlign: "left",
                border: idx === i ? `2px solid ${ACCENT}` : (dark ? "2px solid #334155" : "2px solid #e2e8f0"),
                boxShadow: idx === i ? `0 20px 40px ${ACCENT}25` : "0 4px 16px rgba(0,0,0,0.03)",
                transition: "all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                transform: idx === i ? "translateY(-8px) scale(1.02)" : "translateY(0) scale(1)",
                position: "relative"
              }}>
                <Quote size={40} color={ACCENT} style={{ opacity: 0.15, position: "absolute", top: 32, right: 32 }} />
                <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${ACCENT}` }} />
                  <div>
                    <h4 style={{ fontWeight: 800, color: dark ? "#f8fafc" : "#0f172a", fontSize: 16 }}>{t.name}</h4>
                    <span style={{ color: dark ? "#94a3b8" : "#64748b", fontSize: 13, fontWeight: 600 }}>{t.role}</span>
                  </div>
                </div>
                <p style={{ color: dark ? "#cbd5e1" : "#475569", fontSize: 15, lineHeight: 1.8, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <Stars rating={t.rating} />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
