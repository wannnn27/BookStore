import { useState } from "react";
import { ArrowLeft, Check, Truck, CreditCard, ChevronRight, MapPin, Wallet, ShieldCheck } from "lucide-react";
import { ACCENT, PAYMENT_METHODS } from "../../constants/data";

function formatPrice(p) {
  return "Rp " + p.toLocaleString("id-ID");
}

export function CheckoutPage({ cart, user, onBack, onSuccess, dark }) {
  const [step, setStep] = useState(1);
  const [payMethod, setPayMethod] = useState("");
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    zip: "",
  });

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const isFormValid = form.name && form.phone && form.address && form.city && form.zip;

  const cardStyle = {
    background: dark ? "rgba(30, 41, 59, 0.7)" : "#ffffff",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    padding: 32,
    border: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
    boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
  };

  return (
    <div style={{ minHeight: "100vh", background: dark ? "#0f172a" : "#f1f5f9", paddingBottom: 100 }}>
      {/* HEADER & STEPPER */}
      <div style={{ background: dark ? "#1e293b" : "#fff", borderBottom: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, padding: "24px", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#64748b", display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
            <ArrowLeft size={20} /> <span className="hide-mobile">Batal</span>
          </button>

          <div style={{ display: "flex", gap: 32 }}>
            {["Alamat", "Pembayaran", "Konfirmasi"].map((label, i) => {
              const active = step === i + 1;
              const done = step > i + 1;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ 
                    width: 32, height: 32, borderRadius: "50%", background: done ? "#10b981" : (active ? ACCENT : (dark ? "#334155" : "#e2e8f0")),
                    color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, transition: "0.3s"
                  }}>
                    {done ? <Check size={18} /> : i + 1}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: active ? (dark ? "#fff" : "#1e293b") : "#94a3b8", display: "inline-block" }} className="hide-mobile">{label}</span>
                </div>
              );
            })}
          </div>

          <div style={{ color: "#94a3b8", fontSize: 13, fontWeight: 600 }} className="hide-mobile">
            Langkah {step} dari 3
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "40px auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 380px", gap: 32 }} className="checkout-main">
        <style>{`
          @media (max-width: 850px) { .checkout-main { grid-template-columns: 1fr !important; } .hide-mobile { display: none !important; } }
          input:focus, textarea:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 4px ${ACCENT}15 !important; }
        `}</style>

        {/* FORMS */}
        <div>
          {/* STEP 1: ALAMAT */}
          {step === 1 && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 10, background: ACCENT + "15", borderRadius: 12 }}><MapPin size={24} color={ACCENT} /></div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: dark ? "#fff" : "#1e293b" }}>Alamat Pengiriman</h2>
              </div>

              <div style={{ display: "grid", gap: 20 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Input label="Nama Lengkap" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Masukkan nama Anda" dark={dark} />
                  <Input label="No. Telepon" value={form.phone} onChange={v => setForm({...form, phone: v})} placeholder="08xx-xxxx-xxxx" dark={dark} />
                </div>
                <Input label="Alamat Lengkap" value={form.address} onChange={v => setForm({...form, address: v})} placeholder="Jalan, No. Rumah, RT/RW, Kelurahan, Kecamatan" textarea dark={dark} />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <Input label="Kota" value={form.city} onChange={v => setForm({...form, city: v})} placeholder="Contoh: Jakarta" dark={dark} />
                  <Input label="Kode Pos" value={form.zip} onChange={v => setForm({...form, zip: v})} placeholder="10xxx" dark={dark} />
                </div>
              </div>

              <button onClick={() => setStep(2)} disabled={!isFormValid} style={primaryBtnStyle(isFormValid)}>
                Lanjut ke Pembayaran <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* STEP 2: PEMBAYARAN */}
          {step === 2 && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 10, background: ACCENT + "15", borderRadius: 12 }}><Wallet size={24} color={ACCENT} /></div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: dark ? "#fff" : "#1e293b" }}>Metode Pembayaran</h2>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {PAYMENT_METHODS.map(pm => (
                  <div 
                    key={pm.id} 
                    onClick={() => setPayMethod(pm.id)}
                    style={{ 
                      display: "flex", alignItems: "center", gap: 16, padding: "18px 24px", borderRadius: 20, cursor: "pointer", transition: "0.2s",
                      border: `2px solid ${payMethod === pm.id ? ACCENT : (dark ? "#334155" : "#f1f5f9")}`,
                      background: payMethod === pm.id ? ACCENT + "08" : (dark ? "#1e293b" : "#fff"),
                    }}
                  >
                    <div style={{ width: 24, height: 24, borderRadius: "50%", border: `2px solid ${payMethod === pm.id ? ACCENT : "#d1d5db"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {payMethod === pm.id && <div style={{ width: 12, height: 12, borderRadius: "50%", background: ACCENT }} />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 800, color: dark ? "#fff" : "#1e293b", fontSize: 16 }}>{pm.name}</p>
                      <p style={{ fontSize: 13, color: "#64748b" }}>{pm.desc}</p>
                    </div>
                    <CreditCard size={20} color={payMethod === pm.id ? ACCENT : "#64748b"} />
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
                <button onClick={() => setStep(1)} style={secondaryBtnStyle(dark)}>Kembali</button>
                <button onClick={() => setStep(3)} disabled={!payMethod} style={primaryBtnStyle(!!payMethod)}>Tinjau Pesanan</button>
              </div>
            </div>
          )}

          {/* STEP 3: KONFIRMASI */}
          {step === 3 && (
            <div style={cardStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                <div style={{ padding: 10, background: "#10b98115", borderRadius: 12 }}><ShieldCheck size={24} color="#10b981" /></div>
                <h2 style={{ fontSize: 24, fontWeight: 900, color: dark ? "#fff" : "#1e293b" }}>Konfirmasi Pesanan</h2>
              </div>

              <div style={{ background: dark ? "#0f172a" : "#f8fafc", padding: 24, borderRadius: 24, marginBottom: 32 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Dikirim ke</h4>
                    <p style={{ fontWeight: 800, color: dark ? "#fff" : "#1e293b", fontSize: 15 }}>{form.name}</p>
                    <p style={{ fontSize: 14, color: "#64748b", margin: "4px 0" }}>{form.address}</p>
                    <p style={{ fontSize: 14, color: "#64748b" }}>{form.city}, {form.zip}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", marginBottom: 12 }}>Pembayaran</h4>
                    <p style={{ fontWeight: 800, color: dark ? "#fff" : "#1e293b", fontSize: 15 }}>{PAYMENT_METHODS.find(p => p.id === payMethod)?.name}</p>
                    <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Biaya Admin: Rp 0</p>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16 }}>
                <button onClick={() => setStep(2)} style={secondaryBtnStyle(dark)}>Ubah Data</button>
                <button onClick={() => onSuccess(payMethod, form)} style={primaryBtnStyle(true)}>
                  Bayar {formatPrice(total)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SIDEBAR SUMMARY */}
        <div style={{ position: "sticky", top: 110, height: "fit-content" }}>
          <div style={{ ...cardStyle, padding: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: dark ? "#fff" : "#1e293b", marginBottom: 20 }}>Ringkasan</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <img src={item.cover} style={{ width: 44, height: 60, borderRadius: 8, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 800, color: dark ? "#fff" : "#1e293b", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 170 }}>{item.title}</p>
                    <p style={{ fontSize: 12, color: "#6b7280" }}>x{item.qty}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: dark ? "#cbd5e1" : "#4b5563" }}>{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${dark ? "rgba(255,255,255,0.05)" : "#f1f5f9"}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ color: "#64748b", fontSize: 14 }}>Subtotal</span>
                <span style={{ fontWeight: 700, color: dark ? "#fff" : "#1e293b" }}>{formatPrice(total)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <span style={{ color: "#64748b", fontSize: 14 }}>Ongkir</span>
                <span style={{ fontWeight: 700, color: "#10b981" }}>Gratis</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <span style={{ fontWeight: 800, color: dark ? "#fff" : "#1e293b" }}>Total</span>
                <span style={{ fontSize: 24, fontWeight: 900, color: ACCENT }}>{formatPrice(total)}</span>
              </div>
              
              <div style={{ background: "#f0fdf4", color: "#166534", padding: "12px 16px", borderRadius: 16, display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600 }}>
                <Truck size={18} />
                <span>Gratis ongkir ke seluruh pelosok tanah air!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, placeholder, textarea, dark }) {
  const Component = textarea ? "textarea" : "input";
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 800, color: "#64748b", marginBottom: 8, display: "block", textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</label>
      <Component
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={textarea ? 3 : undefined}
        style={{ 
          width: "100%", padding: "14px 18px", borderRadius: 16, outline: "none", transition: "0.2s",
          border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`,
          background: dark ? "#0f172a" : "#fff",
          color: dark ? "#fff" : "#1e293b",
          fontSize: 15
        }}
      />
    </div>
  );
}

function primaryBtnStyle(active) {
  return {
    width: "100%", padding: "18px", borderRadius: 18, border: "none", marginTop: 32,
    background: active ? ACCENT : "#94a3b8", color: "#fff", fontWeight: 800, fontSize: 16,
    cursor: active ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
    transition: "0.3s", boxShadow: active ? `0 12px 24px ${ACCENT}33` : "none"
  };
}

function secondaryBtnStyle(dark) {
  return {
    flex: 1, padding: "18px", borderRadius: 18, fontWeight: 800, cursor: "pointer", transition: "0.2s",
    background: "none", border: `1px solid ${dark ? "#334155" : "#e2e8f0"}`, color: dark ? "#94a3b8" : "#64748b"
  };
}