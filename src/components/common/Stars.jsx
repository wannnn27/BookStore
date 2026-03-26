export function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.floor(rating) ? "#FBBF24" : s - 0.5 <= rating ? "#FBBF24" : "#D1D5DB", fontSize: 14 }}>
          {s <= Math.floor(rating) ? "★" : s - 0.5 <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
}
