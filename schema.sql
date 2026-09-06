-- Cloudflare D1 Database Schema for Christina Flanding Healing Bookings
-- Run this in Cloudflare Dashboard: Workers & Pages -> D1 -> Console, or via wrangler CLI

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  booking_date TEXT NOT NULL,       -- Format: YYYY-MM-DD
  booking_time TEXT NOT NULL,       -- Format: '09:30 – 10:30' or custom time
  intentions TEXT,
  status TEXT DEFAULT 'confirmed',  -- 'confirmed', 'pending', 'cancelled'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index for fast slot lookup by date
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date, status);

