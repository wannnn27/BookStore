import { useState, useEffect } from "react";
import {
  User, Mail, Phone, Lock, Save, ArrowLeft, Camera, Shield, Eye, EyeOff,
  Check, AlertCircle
} from "lucide-react";
import { ACCENT, ACCENT_DARK } from "../../constants/data";

export function ProfilePage({ user, onBack, onUpdateSuccess, onLogout }) {
  const [activeTab, setActiveTab] = useState("personal");
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSaved, setShowSaved] = useState(false);

  // Password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordMessageType, setPasswordMessageType] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
    }
  }, [user]);

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

  const strength = getPasswordStrength(newPassword);

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const isValidPhone = (p) => !p || /^[0-9+\-\s()]{8,20}$/.test(p);

  const getCompletionPercentage = () => {
    let total = 3;
    let filled = 0;
    if (name) filled++;
    if (email) filled++;
    if (phone) filled++;
    return Math.round((filled / total) * 100);
  };

  const completion = getCompletionPercentage();

  async function handleUpdateProfile(e) {
    e && e.preventDefault();
    
    if (!name.trim()) {
      setMessage("Nama tidak boleh kosong");
      setMessageType("error");
      return;
    }
    if (!isValidEmail(email)) {
      setMessage("Format email tidak valid");
      setMessageType("error");
      return;
    }
    if (!isValidPhone(phone)) {
      setMessage("Format nomor telepon tidak valid");
      setMessageType("error");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), phone: phone.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("auth", JSON.stringify(data.user));
        onUpdateSuccess(data.user);
        setMessage("Profil berhasil diperbarui!");
        setMessageType("success");
        setShowSaved(true);
        setTimeout(() => setShowSaved(false), 3000);
      } else {
        setMessage(data.error || "Gagal memperbarui");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Kesalahan koneksi ke server.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  async function handleChangePassword(e) {
    e && e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessage("Semua field harus diisi");
      setPasswordMessageType("error");
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage("Password baru minimal 6 karakter");
      setPasswordMessageType("error");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMessage("Konfirmasi password tidak cocok");
      setPasswordMessageType("error");
      return;
    }

    setPasswordLoading(true);
    setPasswordMessage("");

    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}/password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordMessage("Password berhasil diubah!");
        setPasswordMessageType("success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMessage(data.error || "Gagal mengubah password");
        setPasswordMessageType("error");
      }
    } catch (err) {
      setPasswordMessage("Kesalahan koneksi ke server.");
      setPasswordMessageType("error");
    } finally {
      setPasswordLoading(false);
    }
  }

  const tabs = [
    { id: "personal", label: "Informasi Pribadi", icon: User },
    { id: "security", label: "Keamanan", icon: Shield },
  ];

  const inputStyle = {
    width: "100%", padding: "14px 16px 14px 48px", borderRadius: 12,
    border: "1.5px solid #e2e8f0", background: "#f8fafc",
    color: "#1e293b", outline: "none", fontSize: 15,
    fontFamily: "inherit", transition: "all 0.3s ease",
  };

  const sectionStyle = {
    background: "#fff",
    borderRadius: 20,
    padding: "28px",
    border: "1px solid #f1f5f9",
    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
    animation: "fadeInUp 0.4s ease both",
  };

  return (
    <div style={{ paddingTop: 90, paddingBottom: 60, minHeight: "100vh", background: "#f1f5f9" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px" }}>
        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "none", border: "none", color: "#64748b",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            marginBottom: 28, padding: "10px 14px", borderRadius: 12,
            transition: "all 0.2s ease",
          }}
          onMouseOver={e => { e.currentTarget.style.color = ACCENT; e.currentTarget.style.background = "#fff"; }}
          onMouseOut={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.background = "none"; }}
        >
          <ArrowLeft size={18} />
          Kembali ke Beranda
        </button>

        {/* Profile Header */}
        <div
          style={{
            ...sectionStyle,
            display: "flex", alignItems: "center", gap: 28,
            background: `linear-gradient(135deg, rgba(245,158,11,0.04), rgba(217,119,6,0.02))`,
            border: `1px solid ${ACCENT}12`,
            flexWrap: "wrap",
            marginBottom: 24,
            animationDelay: "0s",
          }}
        >
          {/* Avatar */}
          <div style={{ position: "relative" }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: `linear-gradient(135deg, ${ACCENT}, #d97706)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 32, fontWeight: 800, color: "#fff",
              boxShadow: `0 4px 16px ${ACCENT}30`,
            }}>
              {user?.name ? user.name[0].toUpperCase() : "U"}
            </div>
            <button
              style={{
                position: "absolute", bottom: 0, right: -2,
                width: 32, height: 32, borderRadius: "50%",
                background: ACCENT, border: "3px solid #fff",
                color: "#fff", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "0.3s",
                boxShadow: `0 2px 8px ${ACCENT}30`,
              }}
              onMouseOver={e => e.currentTarget.style.transform = "scale(1.1)"}
              onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <Camera size={14} />
            </button>
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1e293b", marginBottom: 4, letterSpacing: "-0.5px" }}>
              {user?.name || "User"}
            </h1>
            <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 16 }}>
              {user?.email || "user@email.com"}
            </p>

            {/* Completion bar */}
            <div style={{ maxWidth: 280 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>Kelengkapan Profil</span>
                <span style={{ fontSize: 12, color: completion === 100 ? "#22c55e" : ACCENT, fontWeight: 700 }}>
                  {completion}%
                </span>
              </div>
              <div style={{ height: 6, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{
                  height: "100%", borderRadius: 3,
                  background: completion === 100
                    ? "linear-gradient(90deg, #22c55e, #10b981)"
                    : `linear-gradient(90deg, ${ACCENT}, ${ACCENT_DARK})`,
                  width: `${completion}%`,
                  transition: "width 0.5s ease",
                }} />
              </div>
            </div>
          </div>

          {/* Saved badge */}
          {showSaved && (
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 10,
              background: "rgba(34, 197, 94, 0.08)",
              border: "1px solid rgba(34, 197, 94, 0.15)",
              color: "#16a34a", fontSize: 13, fontWeight: 600,
              animation: "fadeIn 0.3s ease",
            }}>
              <Check size={16} /> Tersimpan
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {/* Sidebar Nav */}
          <div style={{ width: 240, flexShrink: 0 }}>
            <div style={{ ...sectionStyle, padding: 12, animationDelay: "0.1s" }}>
              {tabs.map(tab => (
                <div
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 12,
                    cursor: "pointer",
                    fontWeight: activeTab === tab.id ? 700 : 500,
                    fontSize: 14,
                    color: activeTab === tab.id ? ACCENT : "#4b5563",
                    background: activeTab === tab.id ? `${ACCENT}08` : "transparent",
                    transition: "all 0.2s ease",
                    marginBottom: 4,
                  }}
                  onMouseOver={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "#f8fafc"; }}
                  onMouseOut={e => { if (activeTab !== tab.id) e.currentTarget.style.background = "transparent"; }}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </div>
              ))}

              <div style={{ margin: "12px 0", height: 1, background: "#f1f5f9" }} />

              <div
                onClick={onLogout}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "12px 16px", borderRadius: 12,
                  cursor: "pointer",
                  fontWeight: 600, fontSize: 14,
                  color: "#ef4444",
                  background: "transparent",
                  transition: "all 0.2s ease",
                }}
                onMouseOver={e => e.currentTarget.style.background = "rgba(239, 68, 68, 0.06)"}
                onMouseOut={e => e.currentTarget.style.background = "transparent"}
              >
                <ArrowLeft size={18} />
                Keluar Akun
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, minWidth: 300 }}>
            {/* Personal Info Tab */}
            {activeTab === "personal" && (
              <div style={{ ...sectionStyle, animationDelay: "0.15s" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                  Informasi Pribadi
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 28 }}>
                  Perbarui informasi pribadi Anda. Pastikan email aktif.
                </p>

                <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Name */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Nama Lengkap
                    </label>
                    <div style={{ position: "relative" }}>
                      <User size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Alamat Email
                    </label>
                    <div style={{ position: "relative" }}>
                      <Mail size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="email"
                        placeholder="email@contoh.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                      {email && !isValidEmail(email) && (
                        <AlertCircle size={16} color="#ef4444" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }} />
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Nomor Telepon
                    </label>
                    <div style={{ position: "relative" }}>
                      <Phone size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type="text"
                        placeholder="+62 xxx-xxxx-xxxx"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  {message && (
                    <div style={{
                      padding: "12px 16px", borderRadius: 10,
                      background: messageType === "success" ? "rgba(34, 197, 94, 0.06)" : "rgba(239, 68, 68, 0.06)",
                      border: `1px solid ${messageType === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"}`,
                      color: messageType === "success" ? "#16a34a" : "#dc2626",
                      fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8,
                      animation: "fadeIn 0.3s ease",
                    }}>
                      {messageType === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
                      {message}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      background: loading ? `${ACCENT}aa` : `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
                      color: "#fff", border: "none",
                      padding: "16px 32px", borderRadius: 12,
                      fontWeight: 700, fontSize: 15,
                      cursor: loading ? "not-allowed" : "pointer",
                      boxShadow: `0 4px 16px ${ACCENT}25`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "all 0.3s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseOver={e => { if (!loading) e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {loading ? (
                      <>
                        <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                        Menyimpan...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Simpan Perubahan
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div style={{ ...sectionStyle, animationDelay: "0.15s" }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>
                  Ubah Password
                </h2>
                <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 28 }}>
                  Pastikan password baru kuat dan unik.
                </p>

                <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Current */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Password Saat Ini
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={18} color="#94a3b8" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type={showPasswords ? "text" : "password"}
                        placeholder="Masukkan password saat ini"
                        value={currentPassword}
                        onChange={e => setCurrentPassword(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Password Baru
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type={showPasswords ? "text" : "password"}
                        placeholder="Minimal 6 karakter"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                    </div>
                    {newPassword && (
                      <div style={{ marginTop: 8 }}>
                        <div style={{ height: 4, background: "#e2e8f0", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", borderRadius: 2, width: `${strength.score}%`, background: strength.color, transition: "all 0.3s ease" }} />
                        </div>
                        <span style={{ fontSize: 12, color: strength.color, fontWeight: 600, marginTop: 4, display: "block" }}>
                          {strength.label}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Confirm */}
                  <div>
                    <label style={{ display: "block", color: "#64748b", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                      Konfirmasi Password Baru
                    </label>
                    <div style={{ position: "relative" }}>
                      <Lock size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
                      <input
                        type={showPasswords ? "text" : "password"}
                        placeholder="Ulangi password baru"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = ACCENT; e.target.style.boxShadow = `0 0 0 3px ${ACCENT}12`; e.target.style.background = "#fff"; }}
                        onBlur={e => { e.target.style.borderColor = "#e2e8f0"; e.target.style.boxShadow = "none"; e.target.style.background = "#f8fafc"; }}
                      />
                      {confirmPassword && newPassword === confirmPassword && (
                        <Check size={16} color="#22c55e" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)" }} />
                      )}
                    </div>
                  </div>

                  {/* Toggle visibility */}
                  <button
                    type="button"
                    onClick={() => setShowPasswords(!showPasswords)}
                    style={{
                      background: "none", border: "none", color: "#94a3b8",
                      cursor: "pointer", fontSize: 13, display: "flex",
                      alignItems: "center", gap: 6, alignSelf: "flex-start",
                      transition: "0.2s", fontWeight: 500,
                    }}
                    onMouseOver={e => e.currentTarget.style.color = "#64748b"}
                    onMouseOut={e => e.currentTarget.style.color = "#94a3b8"}
                  >
                    {showPasswords ? <EyeOff size={16} /> : <Eye size={16} />}
                    {showPasswords ? "Sembunyikan password" : "Tampilkan password"}
                  </button>

                  {/* Message */}
                  {passwordMessage && (
                    <div style={{
                      padding: "12px 16px", borderRadius: 10,
                      background: passwordMessageType === "success" ? "rgba(34, 197, 94, 0.06)" : "rgba(239, 68, 68, 0.06)",
                      border: `1px solid ${passwordMessageType === "success" ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)"}`,
                      color: passwordMessageType === "success" ? "#16a34a" : "#dc2626",
                      fontSize: 13, fontWeight: 500, display: "flex", alignItems: "center", gap: 8,
                      animation: "fadeIn 0.3s ease",
                    }}>
                      {passwordMessageType === "success" ? <Check size={16} /> : <AlertCircle size={16} />}
                      {passwordMessage}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    style={{
                      background: passwordLoading ? `${ACCENT}aa` : `linear-gradient(135deg, ${ACCENT}, ${ACCENT_DARK})`,
                      color: "#fff", border: "none",
                      padding: "16px 32px", borderRadius: 12,
                      fontWeight: 700, fontSize: 15,
                      cursor: passwordLoading ? "not-allowed" : "pointer",
                      boxShadow: `0 4px 16px ${ACCENT}25`,
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                      transition: "all 0.3s ease",
                      alignSelf: "flex-start",
                    }}
                    onMouseOver={e => { if (!passwordLoading) e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    {passwordLoading ? (
                      <>
                        <span className="spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                        Mengubah...
                      </>
                    ) : (
                      <>
                        <Shield size={18} />
                        Ubah Password
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
