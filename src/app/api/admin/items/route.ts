import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: true } : false,
});

export async function GET() {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT id, title, image_url, price_inr, description FROM store_items ORDER BY id DESC');
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
  const { title, image_url, price_inr, description } = await req.json();
  if (!title || !image_url || !price_inr || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO store_items (title, image_url, price_inr, description, created_at, updated_at) VALUES ($1, $2, $3, $4, now(), now()) RETURNING *',
      [title, image_url, price_inr, description]
    );
    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}

export async function PUT(req: NextRequest) {
  const { id, title, image_url, price_inr, description } = await req.json();
  if (!id || !title || !image_url || !price_inr || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  const client = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE store_items SET title = $1, image_url = $2, price_inr = $3, description = $4, updated_at = now() WHERE id = $5 RETURNING *',
      [title, image_url, price_inr, description, id]
    );
    return NextResponse.json(result.rows[0]);
  } finally {
    client.release();
  }
}
