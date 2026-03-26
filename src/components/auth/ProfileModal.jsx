import { useState } from "react";
import { ModalWrapper } from "./ModalWrapper";
import { ACCENT } from "../../constants/data";
import { User, Mail, Phone, Save, X } from "lucide-react";

export function ProfileModal({ open, onClose, user, onUpdateSuccess }) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function handleUpdate() {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Berhasil memperbarui profil!");
        localStorage.setItem("auth", JSON.stringify(data.user));
        onUpdateSuccess(data.user);
        setTimeout(onClose, 1500);
      } else {
        setMessage(data.error || "Gagal memperbarui");
      }
    } catch (err) {
      setMessage("Kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    width: "100%", padding: "14px 16px 14px 48px", borderRadius: 12, border: "1px solid #2d3748", 
    background: "#1f2746", color: "#fff", outline: "none", fontSize: 15
  };

  return (
    <ModalWrapper onClose={onClose}>
      <div style={{ textAlign: "center", marginBottom: 32, position: "relative" }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Pengaturan Profil</h2>
        <p style={{ color: "#94a3b8", fontSize: 14 }}>Perbarui informasi pribadi Anda.</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <User size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input type="text" placeholder="Nama Lengkap" value={name} onChange={e => setName(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ position: "relative" }}>
          <Mail size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ position: "relative" }}>
          <Phone size={18} color={ACCENT} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)" }} />
          <input type="text" placeholder="Nomor Telepon" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} />
        </div>
      </div>

      {message && (
        <p style={{ color: message.includes("Berhasil") ? "#4ade80" : "#f87171", fontSize: 13, marginTop: 16, textAlign: "center", fontWeight: 600 }}>
          {message}
        </p>
      )}

      <button 
        onClick={handleUpdate} 
        disabled={loading}
        style={{
          width: "100%", background: ACCENT, color: "#fff", border: "none", padding: "16px", borderRadius: 12, fontWeight: 700, marginTop: 28, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "0.3s", opacity: loading ? 0.7 : 1
        }}
      >
        <Save size={20} />
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>

      <button onClick={onClose} style={{
        width: "100%", background: "none", color: "#94a3b8", border: "none", padding: "12px", borderRadius: 8, fontWeight: 600, marginTop: 12, cursor: "pointer", fontSize: 13
      }}>
        Batalkan
      </button>
    </ModalWrapper>
  );
}
