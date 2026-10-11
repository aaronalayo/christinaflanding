-- Store which treatment a booking inquiry is for.
ALTER TABLE bookings ADD COLUMN service_type TEXT NOT NULL DEFAULT 'Healingsession';
