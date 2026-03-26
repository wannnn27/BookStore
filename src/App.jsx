import { useState, useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { LoginModal } from "./components/auth/LoginModal";
import { RegisterModal } from "./components/auth/RegisterModal";
import { Hero } from "./components/sections/Hero";
import { FeaturedBooks } from "./components/sections/FeaturedBooks";
import { DiscountBanner } from "./components/sections/DiscountBanner";
import { NewBooks } from "./components/sections/NewBooks";
import { Subscribe } from "./components/sections/Subscribe";
import { Testimonial } from "./components/sections/Testimonial";
import Footer from "./components/layout/Footer";
import "./index.css";

import Catalog from "./components/sections/Catalog";
import { CartModal } from "./components/common/CartModal";
import { CheckoutPage } from "./components/sections/CheckoutPage";
import { SuccessPage } from "./components/sections/SuccessPage";
import { Dashboard } from "./components/sections/Dashboard";
import { ProfilePage } from "./components/sections/ProfilePage";
import { ToastProvider, useToast } from "./components/common/Toast";

function AppContent() {
  const [cartOpen, setCartOpen] = useState(false);
  const [authType, setAuthType] = useState(null); // 'login' | 'register' | null
  const [activeSection, setActiveSection] = useState("home");
  const [page, setPage] = useState("home"); // 'home' | 'catalog' | 'checkout' | 'success' | 'dashboard' | 'profile'
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      try {
        setUser(JSON.parse(auth));
      } catch {
        localStorage.removeItem("auth");
      }
    }
  }, []);

  // Redirect non-logged-in users from protected pages
  useEffect(() => {
    if ((page === "dashboard" || page === "profile") && !user) {
      setPage("home");
      setAuthType("login");
    }
  }, [page, user]);

  useEffect(() => {
    if (page !== "home") return;
    const sections = ["home", "featured", "discount", "new-books", "testimonial"];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.4 }
    );
    sections.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [page]);

  const handleReturnHome = () => {
    setPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onAddToCart = (book) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === book.id);
      if (exists) {
        return prev.map(item => item.id === book.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...book, qty: 1 }];
    });
    setCartOpen(true);
  };

  const onRemoveFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const onUpdateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const onCheckout = () => {
    setCartOpen(false);
    if (!user) {
      setPendingCheckout(true);
      setAuthType("login");
      return;
    }
    setPage("checkout");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const onLoginSuccess = (u) => {
    setUser(u);
    setAuthType(null);
    toast.success(`Selamat datang, ${u.name}!`);
    if (pendingCheckout) {
      setPendingCheckout(false);
      setPage("checkout");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setPage("dashboard");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  const onLogout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setPage("home");
    toast.info("Anda telah keluar.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSuccess = async (paymentMethod, address) => {
    if (!user) return;
    
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          address: address,
          paymentMethod: paymentMethod,
          items: cart
        })
      });

      if (response.ok) {
        setCart([]);
        setPage("success");
        window.scrollTo({ top: 0, behavior: "instant" });
        toast.success("Pesanan berhasil dibuat!");
      } else {
        toast.error("Gagal memproses pesanan. Silakan coba lagi.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi kesalahan koneksi ke server.");
    }
  };

  const handleNavigation = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const showNavbar = page !== "checkout" && page !== "success";

  const handleAuthAction = (type) => {
    if (type === "profile") {
      setPage("profile");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if (type === "dashboard") {
      setPage("dashboard");
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setAuthType("login");
    }
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      {showNavbar && (
        <Navbar 
          setCartOpen={() => setCartOpen(true)}
          cartCount={cart.reduce((a, b) => a + b.qty, 0)}
          setLoginOpen={handleAuthAction}
          user={user}
          onLogout={onLogout}
          activeSection={activeSection} 
          onHomeClick={handleReturnHome}
          isCatalog={page !== "home"}
        />
      )}
      
      <CartModal 
        open={cartOpen} 
        onClose={() => setCartOpen(false)} 
        dark={false} 
        cart={cart}
        onRemove={onRemoveFromCart}
        onUpdateQty={onUpdateQty}
        onCheckout={onCheckout}
      />
      <LoginModal
        open={authType === "login"}
        onClose={() => { setAuthType(null); setPendingCheckout(false); }}
        onSwitch={() => setAuthType("register")}
        onLoginSuccess={onLoginSuccess}
      />
      <RegisterModal
        open={authType === "register"}
        onClose={() => setAuthType(null)}
        onSwitch={() => setAuthType("login")}
      />

      {page === "home" && (
        <>
          <Hero dark={false} />
          <FeaturedBooks 
            dark={false} 
            onSeeMore={() => {
              setPage("catalog");
              window.scrollTo({ top: 0, behavior: "instant" });
            }} 
            onAddToCart={onAddToCart}
          />
          <DiscountBanner dark={false} onAddToCart={onAddToCart} />
          <NewBooks dark={false} onAddToCart={onAddToCart} />
          <Subscribe dark={false} />
          <Testimonial dark={false} />
          <Footer dark={false} />
        </>
      )}

      {page === "catalog" && (
        <Catalog onBack={handleReturnHome} onAddToCart={onAddToCart} />
      )}

      {page === "checkout" && (
        <CheckoutPage 
          cart={cart} 
          user={user}
          dark={false} 
          onBack={() => setPage("home")} 
          onSuccess={onSuccess} 
        />
      )}

      {page === "success" && (
        <SuccessPage 
          dark={false} 
          onHome={handleReturnHome} 
        />
      )}

      {page === "dashboard" && user && (
        <Dashboard
          user={user}
          dark={false}
          onNavigate={handleNavigation}
          onAddToCart={onAddToCart}
        />
      )}

      {page === "profile" && user && (
        <ProfilePage
          user={user}
          onBack={handleReturnHome}
          onUpdateSuccess={(u) => {
            setUser(u);
            toast.success("Profil berhasil diperbarui!");
          }}
          onLogout={onLogout}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
