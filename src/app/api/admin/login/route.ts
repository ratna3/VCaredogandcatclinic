import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: { rejectUnauthorized: false },
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
