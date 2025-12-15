-- Ensure pgcrypto is available (required for crypt/gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert or update admin user password (idempotent)
INSERT INTO admin_users (email, password_hash, created_at)
VALUES (
  'vcaredogandcat@gmail.com',
  crypt('Admin@123!vcare', gen_salt('bf')),
  now()
)
ON CONFLICT (email) DO UPDATE
SET password_hash = crypt('Admin@123!vcare', gen_salt('bf')),
    updated_at = now();
