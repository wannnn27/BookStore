import { Users, MessageCircle, Share2, MapPin, Mail, Phone } from "lucide-react";
import { ACCENT } from "../../constants/data";

export default function Footer({ dark }) {
  return (
    <footer style={{
      background: dark ? "#0f172a" : "#f8fafc",
      color: "#64748b",
      padding: "100px 24px 40px",
      borderTop: dark ? "1px solid #ffffff08" : "1px solid #00000008",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background decoration */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `radial-gradient(circle at 20% 80%, ${ACCENT}10 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${ACCENT}05 0%, transparent 50%)` }}></div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: ACCENT, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>1</span>
              </div>
              <span style={{ fontWeight: 800, color: dark ? "#fff" : "#1a1a2e", fontSize: 18, letterSpacing: "-0.5px" }}>One-Book</span>
            </div>
            <p style={{ color: "#64748b", lineHeight: 1.6, marginBottom: 24 }}>
              Temukan dunia literatur di ujung jari Anda. Koleksi buku terbaik dengan harga terjangkau dan pengiriman cepat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ color: dark ? "#f1f5f9" : "#1a1a2e", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Tautan Cepat</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Beranda</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Koleksi</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Diskon</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Buku Baru</a></li>
              <li><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Kontak</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 style={{ color: dark ? "#f1f5f9" : "#1a1a2e", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Kategori</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Fiksi</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Non-Fiksi</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Pendidikan</a></li>
              <li style={{ marginBottom: 8 }}><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Anak-Anak</a></li>
              <li><a href="#" style={{ color: "#64748b", textDecoration: "none" }}>Biografi</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ color: dark ? "#f1f5f9" : "#1a1a2e", fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Kontak Kami</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <MapPin size={20} color="#64748b" />
              <span style={{ color: "#64748b" }}>Jl. Buku No. 123, Jakarta</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Phone size={20} color="#64748b" />
              <span style={{ color: "#64748b" }}>+62 812-3456-7890</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Mail size={20} color="#64748b" />
              <span style={{ color: "#64748b" }}>info@one-book.com</span>
            </div>
          </div>
        </div>

        <div style={{ borderTop: dark ? "1px solid #ffffff08" : "1px solid #00000008", paddingTop: 24, textAlign: "center" }}>
          <p style={{ color: "#64748b", margin: 0 }}>
            © 2025 One-Book. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
