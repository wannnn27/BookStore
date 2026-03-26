import { X } from "lucide-react";

export function ModalWrapper({ children, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backdropFilter: "blur(4px)",
      zIndex: 1000,
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%",
        maxWidth: 400,
        background: "#181c33",
        borderRadius: 12,
        padding: "40px 32px",
        position: "relative",
      }}>
        
        <button onClick={onClose} style={{
          position: "absolute",
          top: 16,
          right: 16,
          background: "none",
          border: "none",
          color: "#94a3b8",
          cursor: "pointer",
        }}>
          <X size={20} />
        </button>

        {children}
      </div>
    </div>
  );
}