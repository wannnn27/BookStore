// server/test-db.js
import pool from './db.js';

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW() as current_time');
    console.log('✅ Koneksi Berhasil!');
    console.log('Waktu dari DB:', res.rows[0].current_time);
    process.exit(0);
  } catch (err) {
    console.error('❌ Koneksi Gagal!');
    console.error('Detail Error:', err.message);
    process.exit(1);
  }
}

testConnection();
