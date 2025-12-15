import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

// GET: List all categories
export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, name FROM categories ORDER BY name ASC');
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

// POST: Create a new category
export async function POST(req: NextRequest) {
  const { name } = await req.json();
  if (!name) return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  const client = await pool.connect();
  try {
    const result = await client.query('INSERT INTO categories (name) VALUES ($1) RETURNING id, name', [name]);
    return NextResponse.json(result.rows[0]);
  } catch (e) {
    if ((e as any).code === '23505') {
      return NextResponse.json({ error: 'Category already exists' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error', details: (e as any).message }, { status: 500 });
  } finally {
    client.release();
  }
}

// DELETE: Delete a category by id
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM categories WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}
