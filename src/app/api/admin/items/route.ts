import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT s.id, s.title, s.image_url, s.price_inr, s.description, s.category_id, c.name as category
      FROM store_items s
      LEFT JOIN categories c ON s.category_id = c.id
      ORDER BY s.id DESC
    `);
    return NextResponse.json(result.rows);
  } finally {
    client.release();
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM store_items WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } finally {
    client.release();
  }
}


export async function POST(req: NextRequest) {
  const { title, image_url, price_inr, description, category_id } = await req.json();
  if (!title || !image_url || !price_inr || !description || !category_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO store_items (title, image_url, price_inr, description, category_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, now(), now()) RETURNING *',
      [title, image_url, price_inr, description, category_id]
    );
    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function PUT(req: NextRequest) {
  const { id, title, image_url, price_inr, description, category_id } = await req.json();
  if (!id || !title || !image_url || !price_inr || !description || !category_id) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE store_items SET title = $1, image_url = $2, price_inr = $3, description = $4, category_id = $5, updated_at = now() WHERE id = $6 RETURNING *',
      [title, image_url, price_inr, description, category_id, id]
    );
    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
