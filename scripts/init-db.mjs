import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env manually if not in process.env
const envPath = path.resolve(__dirname, "../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = val;
      }
    }
  }
}

const dbUrl = process.env.DATABASE_URL || process.env.MYSQL_URL;

console.log("\n========================================================");
console.log("   SHREE VIDHI ORGANICS - AIVEN MYSQL INITIALIZER");
console.log("========================================================\n");

if (!dbUrl || (!dbUrl.startsWith("mysql://") && !dbUrl.startsWith("mysqls://"))) {
  console.log("⚠️  DATABASE_URL is not currently set to a MySQL connection string.");
  console.log("   Current value:", dbUrl || "(empty)");
  console.log("\n👉 To connect to your Aiven.io MySQL instance:");
  console.log("   1. Open .env");
  console.log("   2. Set DATABASE_URL to your Aiven Service URI, for example:");
  console.log('      DATABASE_URL="mysql://avnadmin:YOUR_PASSWORD@YOUR_AIVEN_HOST:PORT/defaultdb?ssl-mode=REQUIRED"');
  console.log("   3. Run: npm run db:init\n");
  process.exit(0);
}

function parseMySQLUri(url) {
  const cleanUrl = url.trim();
  const match = cleanUrl.match(/^mysqls?:\/\/([^:]+):(.*)@([^:\/]+)(?::(\d+))?\/([^?]+)(?:\?.*)?$/);
  if (match) {
    const [, user, password, host, portStr, database] = match;
    return {
      host,
      port: portStr ? parseInt(portStr, 10) : 3306,
      user: decodeURIComponent(user),
      password: decodeURIComponent(password),
      database: decodeURIComponent(database),
      ssl: { rejectUnauthorized: false },
    };
  }
  const parsed = new URL(cleanUrl);
  return {
    host: parsed.hostname,
    port: parsed.port ? parseInt(parsed.port, 10) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: decodeURIComponent(parsed.pathname.replace(/^\//, "")),
    ssl: { rejectUnauthorized: false },
  };
}

async function main() {
  const config = parseMySQLUri(dbUrl);
  console.log(`Connecting to MySQL host: ${config.host}:${config.port}`);
  console.log(`Database: ${config.database}`);
  console.log(`SSL: Enabled (Aiven Cloud TLS Mode)`);

  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log("✅ Successfully connected to Aiven MySQL database!");

    // 1. Users
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        role VARCHAR(20) DEFAULT 'USER',
        created_at VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 2. Addresses
    await connection.query(`
      CREATE TABLE IF NOT EXISTS addresses (
        id VARCHAR(100) PRIMARY KEY,
        user_id VARCHAR(100) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        house_flat VARCHAR(255) NOT NULL,
        street VARCHAR(255) NOT NULL,
        landmark VARCHAR(255),
        city VARCHAR(100) NOT NULL,
        state VARCHAR(100) NOT NULL,
        pin_code VARCHAR(20) NOT NULL,
        is_default BOOLEAN DEFAULT TRUE,
        created_at VARCHAR(50) NOT NULL,
        INDEX idx_user_id (user_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 3. Products
    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(100) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        sku VARCHAR(100) NOT NULL UNIQUE,
        category_id VARCHAR(100) NOT NULL,
        category_name VARCHAR(100) NOT NULL,
        short_desc TEXT,
        description LONGTEXT,
        key_benefits JSON,
        ingredients_text TEXT,
        how_to_use TEXT,
        who_it_is_for VARCHAR(255),
        mrp DECIMAL(10,2) NOT NULL,
        sale_price DECIMAL(10,2) NOT NULL,
        stock INT NOT NULL DEFAULT 50,
        is_featured BOOLEAN DEFAULT FALSE,
        is_bestseller BOOLEAN DEFAULT FALSE,
        is_new_arrival BOOLEAN DEFAULT FALSE,
        rating DECIMAL(3,1) DEFAULT 5.0,
        review_count INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'PUBLISHED',
        images JSON,
        variants JSON,
        created_at VARCHAR(50) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 4. Orders
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(100) PRIMARY KEY,
        order_number VARCHAR(100) NOT NULL UNIQUE,
        user_id VARCHAR(100),
        guest_email VARCHAR(255),
        guest_phone VARCHAR(50),
        status VARCHAR(50) NOT NULL DEFAULT 'PLACED',
        payment_method VARCHAR(50) NOT NULL,
        payment_status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
        subtotal DECIMAL(10,2) NOT NULL,
        discount DECIMAL(10,2) DEFAULT 0,
        shipping_fee DECIMAL(10,2) DEFAULT 0,
        total DECIMAL(10,2) NOT NULL,
        coupon_code VARCHAR(50),
        shipping_address JSON NOT NULL,
        items JSON NOT NULL,
        tracking_number VARCHAR(100),
        tracking_url VARCHAR(255),
        razorpay_order_id VARCHAR(100),
        razorpay_payment_id VARCHAR(100),
        razorpay_status VARCHAR(50),
        created_at VARCHAR(50) NOT NULL,
        updated_at VARCHAR(50),
        INDEX idx_user_id (user_id),
        INDEX idx_order_number (order_number)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 5. Reviews
    await connection.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id VARCHAR(100) PRIMARY KEY,
        product_id VARCHAR(100) NOT NULL,
        product_name VARCHAR(255) NOT NULL,
        user_name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        rating INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        comment TEXT NOT NULL,
        is_verified_purchase BOOLEAN DEFAULT TRUE,
        is_approved BOOLEAN DEFAULT TRUE,
        created_at VARCHAR(50) NOT NULL,
        INDEX idx_product_id (product_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 6. Coupons
    await connection.query(`
      CREATE TABLE IF NOT EXISTS coupons (
        id VARCHAR(100) PRIMARY KEY,
        code VARCHAR(50) NOT NULL UNIQUE,
        description VARCHAR(255),
        discount_type VARCHAR(50) NOT NULL,
        discount_value DECIMAL(10,2) NOT NULL,
        min_cart_value DECIMAL(10,2) DEFAULT 0,
        max_discount DECIMAL(10,2),
        is_active BOOLEAN DEFAULT TRUE,
        used_count INT DEFAULT 0
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 7. OTPs
    await connection.query(`
      CREATE TABLE IF NOT EXISTS otps (
        phone VARCHAR(50) PRIMARY KEY,
        otp VARCHAR(10) NOT NULL,
        expires_at BIGINT NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    // 8. Site Settings
    await connection.query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id VARCHAR(50) PRIMARY KEY,
        data JSON NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("✅ All tables created or verified successfully.");

    // Seed admin if not present
    const [adminRows] = await connection.query(
      "SELECT id FROM users WHERE email = 'shreevidhiorganics@gmail.com'"
    );
    if (adminRows.length === 0) {
      await connection.query(
        "INSERT INTO users (id, name, email, role, created_at) VALUES (?, ?, ?, ?, ?)",
        [
          "usr-admin-1",
          "Shree Vidhi Admin",
          "shreevidhiorganics@gmail.com",
          "ADMIN",
          "2026-01-01T00:00:00Z",
        ]
      );
      console.log("✅ Admin user seeded.");
    }

    console.log("\n🎉 Aiven MySQL Database is 100% ready for production!\n");
  } catch (err) {
    console.error("❌ Database initialization error:", err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

main();

