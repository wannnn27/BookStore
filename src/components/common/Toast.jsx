import { useState, useCallback, createContext, useContext } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 4000) => {
    const id = ++toastId;
    setToasts(prev => [...prev, { id, message, type, duration, exiting: false }]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, 300);
      }, duration);
    }

    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);




  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onRemove }) {
  const icons = {
    success: <CheckCircle size={22} color="#22c55e" />,
    error: <XCircle size={22} color="#ef4444" />,
    info: <Info size={22} color="#3b82f6" />,
    warning: <AlertTriangle size={22} color="#f59e0b" />,
  };

  const colors = {
    success: "#22c55e",
    error: "#ef4444",
    info: "#3b82f6",
    warning: "#f59e0b",
  };

  return (
    <div className={`toast toast-${toast.type} ${toast.exiting ? "toast-exit" : ""}`}>
      {icons[toast.type]}
      <span style={{ flex: 1, color: "#f1f5f9", fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>
        {toast.message}
      </span>
      <button
        onClick={() => onRemove(toast.id)}
        style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 4, display: "flex", borderRadius: 6, transition: "0.2s" }}
        onMouseOver={e => e.currentTarget.style.color = "#f1f5f9"}
        onMouseOut={e => e.currentTarget.style.color = "#64748b"}
      >
        <X size={16} />
      </button>
      {toast.duration > 0 && (
        <div
          className="toast-progress"
          style={{
            background: colors[toast.type],
            animationDuration: `${toast.duration}ms`,
          }}
        />
      )}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");

  return {
    success: (msg, dur) => context.addToast(msg, "success", dur),
    error: (msg, dur) => context.addToast(msg, "error", dur),
    info: (msg, dur) => context.addToast(msg, "info", dur),
    warning: (msg, dur) => context.addToast(msg, "warning", dur),
  };
}
