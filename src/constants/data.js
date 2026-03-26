export const ACCENT = "#f59e0b"; // Amber-500
export const ACCENT_DARK = "#d97706"; // Amber-600

export const BOOKS = [
  { id: 1, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", price: 89000, originalPrice: 110000, genre: "Sastra", rating: 4.9, reviews: 2341, cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=560&fit=crop", badge: "Bestseller", desc: "Kisah Minke, pemuda Jawa terpelajar yang terjebak di antara dua dunia berbeda — Eropa dan Nusantara — di masa kolonial Belanda. Novel pertama dari tetralogi Buru yang monumental." },
  { id: 2, title: "Sapiens", author: "Yuval Noah Harari", price: 145000, originalPrice: 175000, genre: "Non-Fiksi", rating: 4.8, reviews: 5120, cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=560&fit=crop", badge: "Terlaris", desc: "Perjalanan singkat sejarah umat manusia dari Zaman Batu hingga era modern. Harari menjawab pertanyaan besar: apa yang membuat Homo sapiens menguasai dunia?" },
  { id: 3, title: "Atomic Habits", author: "James Clear", price: 129000, originalPrice: 155000, genre: "Self-Help", rating: 4.9, reviews: 8903, cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=560&fit=crop", badge: "Populer", desc: "Panduan praktis dan terbukti untuk membangun kebiasaan baik, menghilangkan kebiasaan buruk, dan menguasai pola kecil yang menghasilkan perubahan luar biasa." },
  { id: 4, title: "Laut Bercerita", author: "Leila S. Chudori", price: 95000, originalPrice: 115000, genre: "Sastra", rating: 4.7, reviews: 1876, cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=560&fit=crop", badge: "Pilihan Editor", desc: "Novel yang mengisahkan perjuangan aktivis mahasiswa yang hilang dalam kegelapan rezim Orde Baru. Penuh empati dan keberanian yang membekas." },
  { id: 5, title: "The Psychology of Money", author: "Morgan Housel", price: 119000, originalPrice: 140000, genre: "Keuangan", rating: 4.8, reviews: 4210, cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=560&fit=crop", badge: "New", desc: "Eksplorasi mendalam tentang cara orang berpikir tentang uang dan bagaimana psikologi memengaruhi keputusan finansial kita sehari-hari." },
  { id: 6, title: "Filosofi Teras", author: "Henry Manampiring", price: 98000, originalPrice: 120000, genre: "Self-Help", rating: 4.6, reviews: 3102, cover: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400&h=560&fit=crop", badge: "Lokal", desc: "Pengenalan filsafat Stoa yang relevan dengan kehidupan modern orang Indonesia. Buku panduan hidup tenang di tengah dunia yang penuh drama." },
  { id: 7, title: "Dune", author: "Frank Herbert", price: 165000, originalPrice: 200000, genre: "Fiksi Ilmiah", rating: 4.8, reviews: 6741, cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=560&fit=crop", badge: "Klasik", desc: "Epik fiksi ilmiah yang berlatar di planet gurun Arrakis, mengisahkan perjuangan Paul Atreides di tengah perebutan kekuasaan galaksi dan sumber daya terlangka di alam semesta." },
  { id: 8, title: "Educated", author: "Tara Westover", price: 138000, originalPrice: 160000, genre: "Memoar", rating: 4.7, reviews: 2934, cover: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=560&fit=crop", badge: "Award", desc: "Memoar yang luar biasa tentang seorang perempuan yang tumbuh tanpa pendidikan formal, namun berhasil mendapatkan gelar PhD dari Cambridge University." },
];

export const GENRES = ["Semua", "Sastra", "Non-Fiksi", "Self-Help", "Keuangan", "Fiksi Ilmiah", "Memoar"];

export const PAYMENT_METHODS = [
  { id: "bca", name: "Transfer BCA", desc: "Virtual Account BCA" },
  { id: "mandiri", name: "Transfer Mandiri", desc: "Virtual Account Mandiri" },
  { id: "gopay", name: "GoPay", desc: "E-wallet GoPay" },
  { id: "ovo", name: "OVO", desc: "E-wallet OVO" },
  { id: "dana", name: "DANA", desc: "E-wallet DANA" },
  { id: "card", name: "Kartu Kredit/Debit", desc: "Visa, Mastercard, JCB" },
  { id: "cod", name: "COD", desc: "Bayar di tempat" },
];

export const FEATURED = BOOKS; 
export const NEW_BOOKS = BOOKS.slice(0, 3); 

export const TESTIMONIALS = [
  { name: "Rial Loz", role: "Pecinta Buku", text: "Website terbaik untuk membeli buku, proses pembeliannya sangat mudah dan banyak diskon besar.", rating: 4.5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { name: "Maria Santos", role: "Pembaca Setia", text: "Website terbaik untuk membeli buku, proses pembeliannya sangat mudah dan banyak diskon besar.", rating: 4.5, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { name: "Alex Kim", role: "Kolektor Buku", text: "Website terbaik untuk membeli buku, proses pembeliannya sangat mudah dan banyak diskon besar.", rating: 4.5, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" },
];

export const NAV_LINKS = ["Beranda", "Unggulan", "Buku Baru", "Testimoni"];
