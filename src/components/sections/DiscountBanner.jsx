import { FadeIn } from "../common/FadeIn";
import { BookCover } from "../common/BookCover";
import { FEATURED, ACCENT } from "../../constants/data";

export function DiscountBanner({ dark, onAddToCart }) {
  return (
    <section
      id="discount"
      style={{
        padding: "80px 0",
        background: dark ? "#1e293b" : "#edf1ff",
        overflow: "hidden",
      }}
    >
      <div 
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 60,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* LEFT — BOOK */}
        <FadeIn direction="left" delay={0.1}>
          <div
            style={{
              flex: "1 1 50%",
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* CENTERED CONTAINER */}
            <div
              style={{
                position: "relative",
                width: 440,
                height: 380,
                margin: "0 auto", // 🔥 bikin center
              }}
            >
              {/* BACK BOOK */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 60,
                  transform: "translateX(-70%) rotate(-10deg)",
                  filter: "drop-shadow(0 25px 45px rgba(0,0,0,0.15))",
                }}
              >
                <BookCover book={FEATURED[1]} height={310} />
              </div>

              {/* FRONT BOOK */}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  transform: "translateX(-20%) rotate(6deg)",
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.25))",
                  zIndex: 2,
                }}
              >
                <BookCover book={FEATURED[3]} height={350} />
              </div>
            </div>
          </div>
        </FadeIn>

        {/* RIGHT — TEXT */}
        <FadeIn direction="right" delay={0.2}>
          <div
            style={{
              flex: "1 1 400px",
              textAlign: typeof window !== "undefined" && window.innerWidth < 768 ? "center" : "left",
            }}
          >
            {/* LABEL */}
            <div
              style={{
                display: "inline-block",
                padding: "8px 18px",
                background: ACCENT + "22",
                color: ACCENT,
                borderRadius: 20,
                fontWeight: 700,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Penawaran Khusus
            </div>

            {/* TITLE */}
            <h2
              style={{
                fontSize: typeof window !== "undefined" && window.innerWidth < 768 ? 42 : 60,
                fontWeight: 800,
                color: dark ? "#f8fafc" : "#1a243d",
                marginBottom: 24,
                lineHeight: 1.1,
                letterSpacing: "-1px",
              }}
            >
              Diskon Hingga <br />
              50%
            </h2>

            {/* TEXT */}
            <p
              style={{
                color: dark ? "#94a3b8" : "#64748b",
                lineHeight: 1.8,
                marginBottom: 40,
                maxWidth: 440,
                fontSize: 18,
              }}
            >
              Manfaatkan hari-hari diskon yang kami sediakan untuk Anda. Baca
              buku dari penulis favorit Anda. Semakin banyak Anda menjelajah,
              semakin banyak diskon yang kami siapkan.
            </p>

            {/* BUTTON */}
            <button
              onClick={() => onAddToCart(FEATURED[3])}
              style={{
                background: ACCENT,
                color: "#fff",
                border: "none",
                padding: "18px 46px",
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 16,
                cursor: "pointer",
                boxShadow: `0 8px 20px ${ACCENT}40`,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = `0 12px 28px ${ACCENT}50`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 8px 20px ${ACCENT}40`;
              }}
            >
              Beli Sekarang
            </button>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}