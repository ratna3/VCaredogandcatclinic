-- Ensure pgcrypto is available (required for crypt/gen_salt)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insert or update admin user password (idempotent)
-- Note: `username` is NOT NULL in the table, so set it from the email local-part
INSERT INTO admin_users (email, username, password_hash, created_at)
VALUES (
  'vcaredogandcat@gmail.com',
  split_part('vcaredogandcat@gmail.com','@',1),
  crypt('Admin@123!vcare', gen_salt('bf')),
  now()
)
ON CONFLICT (email) DO UPDATE
SET password_hash = crypt('Admin@123!vcare', gen_salt('bf')),
    username = COALESCE(admin_users.username, split_part(EXCLUDED.email, '@', 1)),
    updated_at = now();
