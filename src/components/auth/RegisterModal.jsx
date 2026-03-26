import { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff, User, UserPlus, Check } from "lucide-react";
import { ACCENT } from "../../constants/data";

export function RegisterModal({ open, onClose, onSwitch }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsVisible(true);
      setMessage("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirm("");
    }
  }, [open]);

  if (!open) return null;

  // Password strength
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { score: 20, label: "Sangat Lemah", color: "#ef4444" };
    if (score === 2) return { score: 40, label: "Lemah", color: "#f97316" };
    if (score === 3) return { score: 60, label: "Cukup", color: "#eab308" };
    if (score === 4) return { score: 80, label: "Kuat", color: "#22c55e" };
    return { score: 100, label: "Sangat Kuat", color: "#10b981" };
  };

  const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e && e.preventDefault();

    if (!name || !email || !password || !confirm) {
      setMessage("Semua field harus diisi");
      setMessageType("error");
      return;
    }
    if (password.length < 6) {
      setMessage("Password minimal 6 karakter");
      setMessageType("error");
      return;
    }
    if (password !== confirm) {
      setMessage("Password tidak cocok");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Berhasil daftar! Mengalihkan ke login...");
        setMessageType("success");
        setTimeout(() => onSwitch(), 1500);
      } else {
        setMessage(data.error || "Gagal mendaftar");
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
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Close */}
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
            <UserPlus size={24} color={ACCENT} />
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", marginBottom: 8, letterSpacing: "-0.5px" }}>
            Mulai Petualanganmu
          </h2>
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.5 }}>
            Daftar sekarang untuk akses penuh ke koleksi kami.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Name */}
          <div style={{ position: "relative" }}>
            <User size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-field-icon"
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div style={{ position: "relative" }}>
            <Mail size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
            <input
              type="email"
              placeholder="Alamat Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field-icon"
              autoComplete="email"
            />
          </div>

          {/* Passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Kata Sandi"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="input-field-icon"
                autoComplete="new-password"
              />
            </div>
            <div style={{ position: "relative" }}>
              <Lock size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", zIndex: 1 }} />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Konfirmasi"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className="input-field-icon"
                autoComplete="new-password"
              />
              {confirm && password === confirm && (
                <Check size={16} color="#22c55e" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }} />
              )}
            </div>
          </div>

          {/* Password strength bar */}
          {password && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ height: 4, background: "#e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 2, width: `${strength.score}%`, background: strength.color, transition: "all 0.3s ease" }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <span style={{ fontSize: 12, color: strength.color, fontWeight: 600 }}>
                  {strength.label}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: 12, display: "flex", alignItems: "center", gap: 4, transition: "0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "#64748b"}
                  onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  {showPassword ? "Sembunyikan" : "Tampilkan"}
                </button>
              </div>
            </div>
          )}

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
                Mendaftarkan...
              </>
            ) : (
              <>
                <UserPlus size={18} />
                Daftar Akun Baru
              </>
            )}
          </button>
        </form>

        {/* Switch */}
        <p style={{ color: "#64748b", fontSize: 14, marginTop: 24, textAlign: "center" }}>
          Sudah punya akun?{" "}
          <span
            onClick={onSwitch}
            style={{ color: ACCENT, cursor: "pointer", fontWeight: 700, transition: "0.2s" }}
            onMouseOver={e => e.currentTarget.style.textDecoration = "underline"}
            onMouseOut={e => e.currentTarget.style.textDecoration = "none"}
          >
            Masuk
          </span>
        </p>
      </div>
    </div>
  );
}