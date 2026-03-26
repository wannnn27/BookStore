import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import midtrans from 'midtrans-client';
import bcrypt from 'bcrypt';
import pool from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Init Midtrans
const snap = new midtrans.Snap({
  isProduction: false,            // ganti true saat live
  serverKey: process.env.MIDTRANS_SERVER_KEY || 'YOUR_MIDTRANS_SERVER_KEY',
});

// --- ROUTES ---

// Auth Routes
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'Email sudah terdaftar' });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { rows } = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    res.json({ message: 'Registrasi Berhasil!', user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mendaftar ke database' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Email atau password salah' });
    }

    res.json({ 
      message: 'Login Berhasil!', 
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone } 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error saat login' });
  }
});

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  // Input validation
  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Nama tidak boleh kosong' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Format email tidak valid' });
  }

  try {
    // Check if email already taken by another user
    const emailCheck = await pool.query('SELECT id FROM users WHERE email = $1 AND id != $2', [email, id]);
    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ error: 'Email sudah digunakan oleh akun lain' });
    }

    const { rows } = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING id, name, email, phone',
      [name.trim(), email.trim(), phone ? phone.trim() : null, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    res.json({ message: 'Profil diperbarui!', user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal memperbarui profil' });
  }
});

// Change password
app.put('/api/users/:id/password', async (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ error: 'Semua field harus diisi' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ error: 'Password baru minimal 6 karakter' });
  }

  try {
    // Get current user
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: 'User tidak ditemukan' });
    }

    const user = userResult.rows[0];

    // Verify current password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Password saat ini salah' });
    }

    // Hash new password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);

    res.json({ message: 'Password berhasil diubah!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengubah password' });
  }
});

// 1. GET semua buku per genre
app.get('/api/books', async (req, res) => {
  const { genre } = req.query;
  try {
    const columns = `b.id, b.title, b.author, b.description as desc, b.price, b.original_price as "originalPrice", b.stock, b.cover_url as cover, g.name as genre, b.rating, b.review_count as reviews`;
    const query = genre
      ? `SELECT ${columns} FROM books b
         JOIN genres g ON b.genre_id = g.id
         WHERE g.name = $1 ORDER BY b.created_at DESC`
      : `SELECT ${columns} FROM books b
         JOIN genres g ON b.genre_id = g.id
         ORDER BY b.created_at DESC`;

    const { rows } = await pool.query(query, genre ? [genre] : []);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// 2. POST buat order baru
app.post('/api/orders', async (req, res) => {
  const { userId, address, paymentMethod, items } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Simpan Alamat Terlebih Dahulu
    const addressResult = await client.query(
      `INSERT INTO addresses (user_id, name, phone, address, city, zip)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [userId, address.name, address.phone, address.address, address.city, address.zip]
    );
    const addressId = addressResult.rows[0].id;

    // 2. Hitung Total & Buat Order
    const total = items.reduce((s, i) => s + (i.price * i.qty), 0);
    const code  = 'BK' + Math.random().toString(36).substring(2, 10).toUpperCase();

    const orderResult = await client.query(
      `INSERT INTO orders (user_id, address_id, payment_method, total_amount, order_code, status, payment_status)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [userId, addressId, paymentMethod, total, code, 'Menunggu Pembayaran', 'Belum Bayar']
    );
    const orderId = orderResult.rows[0].id;

    // 3. Masukkan Order Items & Kurangi Stok
    for (const item of items) {
      await client.query(
        `INSERT INTO order_items (order_id, book_id, qty, price) VALUES ($1, $2, $3, $4)`,
        [orderId, item.id, item.qty, item.price]
      );
      // Kurangi stok
      await client.query(`UPDATE books SET stock = stock - $1 WHERE id = $2`, [item.qty, item.id]);
    }

    await client.query('COMMIT');
    res.json({ 
      success: true, 
      orderId: orderId,
      orderCode: code,
      totalAmount: total 
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

// 3. Midtrans Payment Token
app.post('/api/payment/token', async (req, res) => {
  try {
    const { orderId, amount, customerName, email } = req.body;

    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: amount,
      },
      customer_details: {
        first_name: customerName,
        email: email,
      },
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
