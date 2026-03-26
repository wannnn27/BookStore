import { useState } from "react";

export function BookCover({ book, height = 180, hover = false }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        height,
        width: height * 0.68,
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: hov && hover ? "0 20px 40px rgba(0,0,0,0.35)" : "0 8px 24px rgba(0,0,0,0.2)",
        transform: hov && hover ? "scale(1.05) rotate(-1deg)" : "scale(1)",
        transition: "all 0.35s cubic-bezier(.34,1.56,.64,1)",
        flexShrink: 0,
        position: "relative",
        cursor: "pointer",
      }}
    >
      <img
        src={book.cover}
        alt={book.title}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
