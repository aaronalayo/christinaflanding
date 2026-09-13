-- Remove previously stored free-text intentions, which may contain sensitive data.
-- Run once against the production D1 database before launch.
ALTER TABLE bookings DROP COLUMN intentions;
