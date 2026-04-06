import pkg from 'pg';
const { Pool } = pkg;
import dns from 'node:dns';
import { promisify } from 'node:util';

const resolve = promisify(dns.resolve4);
dns.setServers(['8.8.8.8', '1.1.1.1']);

const hostname = "ep-super-shape-ahtilgy7.c-3.us-east-1.aws.neon.tech";
const connectionString = `postgresql://neondb_owner:npg_1lDkTsO6dEcR@${hostname}/neondb?sslmode=require`;

async function test() {
  try {
    console.log("Attempting to resolve hostname using dns.resolve4...");
    const ips = await resolve(hostname);
    console.log("Resolved IPs:", ips);

    console.log("Testing connection with standard pg driver and custom lookup...");
    const pool = new Pool({ 
      connectionString,
      connectionTimeoutMillis: 5000,
      // Custom lookup function that uses dns.resolve instead of the OS resolver
      lookup: (hostname, options, cb) => {
        dns.resolve4(hostname, (err, addresses) => {
          if (err) return cb(err);
          cb(null, addresses[0], 4);
        });
      }
    });

    const client = await pool.connect();
    console.log("Successfully connected to the database!");
    const res = await client.query('SELECT NOW()');
    console.log("Current time from DB:", res.rows[0]);
    client.release();
    process.exit(0);
  } catch (err) {
    console.error("Test failed:", err.stack);
    process.exit(1);
  }
}

test();
