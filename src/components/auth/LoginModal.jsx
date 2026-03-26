import { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { ACCENT } from "../../constants/data";

export function LoginModal({ open, onClose, onSwitch, onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setMessage("");
      setEmail("");
      setPassword("");
    }
  }, [open]);

  if (!open) return null;

  const handleLogin = async (e) => {
    e && e.preventDefault();
    if (!email || !password) {
      setMessage("Masukkan email dan password");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", JSON.stringify(data.user));
        setMessage("Login berhasil! Mengalihkan...");
        setMessageType("success");
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 1000);
      } else {
        setMessage(data.error || "Login gagal");
        setMessageType("error");
      }
    } catch (error) {
      setMessage("Koneksi ke server gagal");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div
      onClick={handleClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)",
        zIndex: 1000,
        animation: "modal-overlay-in 0.3s ease",
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.2s ease",
        padding: "20px",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 430,
          background: "#fff",
          borderRadius: 24,
          padding: "44px 36px 36px",
          position: "relative",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02)",
          animation: "modal-content-in 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: "absolute", top: 16, right: 16,
            background: "#f8fafc", border: "none",
            color: "#94a3b8", cursor: "pointer",
            width: 36, height: 36, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease",
          }}
          onMouseOver={e => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
          onMouseOut={e => { e.currentTarget.style.background = "#f8fafc"; e.currentTarget.style.color = "#94a3b8"; }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `linear-gradient(135deg, ${ACCENT}15, ${ACCENT}08)`,
            border: `1px solid ${ACCENT}18`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <LogIn size={24} color={ACCENT} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Selamat Datang Kembali
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>
            Masuk untuk melanjutkan petualangan membacamu.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email */}
          <div style={{ position: "relative" }}>
            <Mail size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field-icon"
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div style={{ position: "relative" }}>
            <Lock size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-field-icon"
              style={{ paddingRight: 48 }}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", color: "#94a3b8", cursor: "pointer",
                padding: 4, display: "flex", borderRadius: 6, transition: "0.2s",
              }}
              onMouseOver={e => e.currentTarget.style.color = "#64748b"}
              onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Remember & Forgot */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 13, cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: ACCENT, width: 16, height: 16 }} /> Ingat saya
            </label>
            <span style={{ color: ACCENT, fontSize: 13, cursor: "pointer", fontWeight: 600, transition: "0.2s" }}
              onMouseOver={e => e.currentTarget.style.opacity = "0.8"}
              onMouseOut={e => e.currentTarget.style.opacity = "1"}
            >
              Lupa password?
            </span>
          </div>

          {/* Message */}
          {message && (
            <div style={{
              padding: "12px 16px",
              borderRadius: 10,
              background: messageType === "success" ? "rgba(34, 197, 94, 0.06)" : "rgba(239, 68, 68, 0.06)",
              border: `1px solid ${messageType === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"}`,
              color: messageType === "success" ? "#16a34a" : "#dc2626",
              fontSize: 13, textAlign: "center", fontWeight: 500,
              animation: "fadeIn 0.3s ease",
            }}>
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? `${ACCENT}aa` : `linear-gradient(135deg, ${ACCENT}, #d97706)`,
              color: "#fff", border: "none",
              padding: "16px", borderRadius: 12,
              fontWeight: 700, fontSize: 15,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: `0 4px 16px ${ACCENT}30`,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "all 0.3s ease",
              marginTop: 8,
            }}
            onMouseOver={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
          >
            {loading ? (
              <>
                <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                Memproses...
              </>
            ) : (
              <>
                <LogIn size={18} />
                Masuk Sekarang
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "28px 0" }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #e2e8f0)" }} />
          <span style={{ color: "#94a3b8", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px" }}>ATAU</span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #e2e8f0)" }} />
        </div>

        {/* Social Login */}
        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            flex: 1, padding: "13px", borderRadius: 12,
            border: "1px solid #e2e8f0", background: "#fff",
            color: "#475569", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontSize: 14, fontWeight: 600, transition: "all 0.2s ease",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Google
          </button>
          <button style={{
            flex: 1, padding: "13px", borderRadius: 12,
            border: "1px solid #e2e8f0", background: "#fff",
            color: "#475569", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
            fontSize: 14, fontWeight: 600, transition: "all 0.2s ease",
          }}
            onMouseOver={e => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.background = "#f8fafc"; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.background = "#fff"; }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </button>
        </div>

        {/* Switch to register */}
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 28, textAlign: "center" }}>
          Belum punya akun?{" "}
          <span
            onClick={onSwitch}
            style={{ color: ACCENT, cursor: "pointer", fontWeight: 700, transition: "0.2s" }}
            onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={e => e.currentTarget.style.textDecoration = "none"}
          >
            Daftar Gratis
          </span>
        </p>
      </div>
    </div>
  );
}