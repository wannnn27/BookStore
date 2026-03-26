import { useInView } from "../../hooks/useInView";

export function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useInView();
  const translateY = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  const translateX = direction === "left" ? 40 : direction === "right" ? -40 : 0;
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : `translate(${translateX}px,${translateY}px)`,
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(.34,1.2,.64,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
