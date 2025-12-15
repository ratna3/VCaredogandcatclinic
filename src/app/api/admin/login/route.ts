import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

export async function POST(req: NextRequest) {
  let client;
  try {
    const { email, password } = await req.json();
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM admin_users WHERE email = $1`,
      [email]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
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
  } catch (error) {
    // Log error details for debugging
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Server error', details: error instanceof Error ? error.message : String(error) }, { status: 500 });
  } finally {
    if (client) client.release();
  }
}
