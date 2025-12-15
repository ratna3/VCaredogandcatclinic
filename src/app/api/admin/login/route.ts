import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT * FROM admin_users WHERE email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      // If no user exists, allow creating a default admin when correct credentials provided
      const defaultEmail = 'vcaredogandcat@gmail.com';
      const defaultPassword = 'Admin@123!vcare';
      if (email === defaultEmail && password === defaultPassword) {
        // Insert user with hashed password using PostgreSQL crypt
        await client.query(
          `INSERT INTO admin_users (email, password_hash, created_at) VALUES ($1, crypt($2, gen_salt('bf')), now())`,
          [email, password]
        );
        // successful login
        return NextResponse.json({ success: true }, {
          status: 200,
          headers: {
            'Set-Cookie': `admin_auth=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
          }
        });
      }
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const user = result.rows[0];
    // Check password using PostgreSQL crypt
    const pwCheck = await client.query(
      `SELECT (password_hash = crypt($1, password_hash)) AS match FROM admin_users WHERE email = $2`,
      [password, email]
    );
    if (pwCheck.rows[0]?.match) {
      // Set a session cookie (for demo, use a simple cookie)
      return NextResponse.json({ success: true }, {
        status: 200,
        headers: {
          'Set-Cookie': `admin_auth=1; Path=/; HttpOnly; SameSite=Strict; Max-Age=86400`
        }
      });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } finally {
    client.release();
  }
}
