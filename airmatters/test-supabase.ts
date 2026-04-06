import pkg from 'pg';
const { Pool } = pkg;
import dns from 'node:dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectionString = "postgresql://postgres:cVZz7fbp00AJNkTd@db.mrcgkeixqzrwrlkirubv.supabase.co:5432/postgres";

const pool = new Pool({ 
  connectionString,
  connectionTimeoutMillis: 5000,
});

async function test() {
  try {
    console.log("Testing connection to Supabase Direct PG...");
    const client = await pool.connect();
    console.log("Successfully connected to Supabase!");
    const res = await client.query('SELECT NOW()');
    console.log("Current time from DB:", res.rows[0]);
    client.release();
    process.exit(0);
  } catch (err) {
    console.error("Connection failed:", err.message);
    process.exit(1);
  }
}

test();
