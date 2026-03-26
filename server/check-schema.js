import pool from './db.js';

async function checkSchema() {
  try {
    const tables = ['users', 'books', 'orders', 'order_items', 'addresses'];
    for (const table of tables) {
      const res = await pool.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`, [table]);
      console.log(`Table: ${table}`);
      console.log(res.rows.map(r => `${r.column_name} (${r.data_type})`).join(', '));
      console.log('---');
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSchema();
