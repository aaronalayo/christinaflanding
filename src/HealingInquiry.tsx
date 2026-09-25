import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { Styles } from './css';

// ─── Data ───────────────────────────────────────────────────────────────────

const SCHEDULE = [
  { day: 'Mandag',  dayIndex: 1, efterAftale: false },
  { day: 'Tirsdag', dayIndex: 2, efterAftale: false },
  { day: 'Onsdag',  dayIndex: 3, efterAftale: false },
  { day: 'Torsdag', dayIndex: 4, efterAftale: true  },
  { day: 'Fredag',  dayIndex: 5, efterAftale: true  },
];

const SLOTS = ['09:30 – 10:30', '11:00 – 12:00', '12:30 – 13:30'];

const DK_MONTHS = ['jan','feb','mar','apr','maj','jun','jul','aug','sep','okt','nov','dec'];
const DAY_NAMES = ['søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag'];

type ScheduleEntry = (typeof SCHEDULE)[number];
type BookedSlot = { date: string; time: string };
type Booking = {
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  booking_time: string;
  displayDate: string;
};

// Returns next `count` dates (as Date objects) that fall on `dayOfWeek` (1=Mon…5=Fri)
function getUpcomingDates(dayOfWeek: number, count = 5): Date[] {
  const results: Date[] = [];
  const cursor  = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1); // start from tomorrow
  while (results.length < count) {
    if (cursor.getDay() === dayOfWeek) results.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return results;
}

function fmtDate(date: Date) {
  const currentYear = new Date().getFullYear();
  const yearStr = date.getFullYear() !== currentYear ? ` ${date.getFullYear()}` : '';
  return `${date.getDate()}. ${DK_MONTHS[date.getMonth()]}${yearStr}`;
}

function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function getGoogleCalendarUrl(booking: Booking | null) {
  if (!booking || !booking.booking_date) return '#';
  const [y, m, d] = booking.booking_date.split('-');
  const timeMatch = (booking.booking_time || '').match(/(\d{1,2}):(\d{2})\s*–\s*(\d{1,2}):(\d{2})/);
  let startISO: string;
  let endISO: string;

  if (timeMatch) {
    const startH = timeMatch[1].padStart(2, '0');
    const startM = timeMatch[2];
    const endH = timeMatch[3].padStart(2, '0');
    const endM = timeMatch[4];
    startISO = `${y}${m}${d}T${startH}${startM}00`;
    endISO   = `${y}${m}${d}T${endH}${endM}00`;
  } else {
    startISO = `${y}${m}${d}`;
    endISO   = `${y}${m}${d}`;
  }

  const title = encodeURIComponent("Healingsession - Christina Flanding");
  const details = encodeURIComponent(`Healingsession hos Christina Flanding\nTid: ${booking.booking_time}`);
  const location = encodeURIComponent("Christina Flanding Healing");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}`;
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function HealingInquiry() {
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);
  const [selectedDay,      setSelectedDay]      = useState<ScheduleEntry | null>(null);
  const [selectedDate,     setSelectedDate]     = useState<Date | null>(null);
  const [selectedTime,     setSelectedTime]     = useState('');     // slot string
  const [bookedSlots,      setBookedSlots]      = useState<BookedSlot[]>([]);
  const [submitting,       setSubmitting]       = useState(false);

  // Fetch booked slots on mount from Cloudflare D1 via /api/bookings
  useEffect(() => {
    fetch('/api/bookings')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.booked)) {
          setBookedSlots(data.booked);
        }
      })
      .catch(() => {
        // Offline or preview fallback
      });
  }, []);

  function isSlotBooked(date: Date | null, time: string) {
    if (!date || !time) return false;
    const key = dateKey(date);
    return bookedSlots.some(b => b.date === key && b.time === time);
  }

  function handleSelectDay(entry: ScheduleEntry) {
    setSelectedDay(entry);
    setSelectedDate(null);
    setSelectedTime('');
  }

  function handleSelectDate(date: Date) {
    setSelectedDate(date);
    setSelectedTime('');
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedDay)  { alert('Vælg venligst en dag.');        return; }
    if (!selectedDate) { alert('Vælg venligst en dato.');       return; }
    if (!selectedTime) { alert('Vælg venligst et tidspunkt.');  return; }

    const formData = new FormData(e.currentTarget);
    const bookingData = {
      name:         String(formData.get('name') || ''),
      email:        String(formData.get('email') || ''),
      phone:        String(formData.get('phone') || ''),
      booking_date: dateKey(selectedDate),
      booking_time: selectedTime,
    };

    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      let data: { success: boolean; error?: string; emailErrors?: string[] };
      try {
        data = await res.json();
      } catch {
        data = { success: false, error: `Serverfejl (${res.status}): Serveren returnerede ikke et gyldigt JSON-svar.` };
      }

      if (res.ok && data.success) {
        if (data.emailErrors?.length) {
          alert('Din tid er booket, men e-mailen blev ikke sendt:\n' + data.emailErrors.join('\n'));
        }
        setSubmittedBooking({
          ...bookingData,
          displayDate: `${selectedDay.day} ${fmtDate(selectedDate)}`
        });
        // Optimistically update booked slots so slot is blocked immediately
        setBookedSlots(prev => [...prev, { date: bookingData.booking_date, time: bookingData.booking_time }]);
      } else {
        alert(data.error || `Fejl (${res.status}): Noget gik galt ved reservationen.`);
      }
    } catch (err) {
      console.error('Booking network error:', err);
      const message = err instanceof Error ? err.message : 'Ukendt netværksfejl';
      alert(`Forbindelsesfejl: Kunne ikke få kontakt til serveren (${message}). Tjek din internetforbindelse eller om backend kører.`);
    } finally {
      setSubmitting(false);
    }
  };


  if (submittedBooking) {
    return (
      <div style={s.successContainer}>
        <div style={{ fontSize: '40px' }}>🌿</div>
        <h3 style={{ color: '#1E3D14', margin: '12px 0 8px', fontSize: '22px' }}>
          Booking modtaget med taknemmelighed
        </h3>
        <p style={{ color: '#4A6B35', lineHeight: '1.6', margin: '0 0 16px' }}>
          Tak for din reservation, <strong>{submittedBooking.name}</strong>.<br />
          Vi glæder os til at byde dig velkommen:
        </p>

        {/* Confirmed booking card */}
        <div style={s.confirmedCard}>
          <div style={{ fontWeight: 'bold', fontSize: '15px', color: '#1E3D14', marginBottom: '4px' }}>
            📅 {submittedBooking.displayDate}
          </div>
          <div style={{ fontSize: '14px', color: '#2D5A1B', fontWeight: '600' }}>
            ⏰ {submittedBooking.booking_time}
          </div>
        </div>

        {/* Add to Google Calendar button */}
        <a
          href={getGoogleCalendarUrl(submittedBooking)}
          target="_blank"
          rel="noopener noreferrer"
          style={s.gcalBtn}
        >
          🗓 Tilføj til Google Kalender
        </a>

        <p style={{ fontSize: '12px', color: '#5A8048', marginTop: '16px', fontStyle: 'italic' }}>
          Du vil snarest modtage en bekræftelse på e-mail og SMS.
        </p>
      </div>
    );
  }

  return (
    <div className="booking-shell" style={s.container}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        {/* <h2 style={s.heading}>🌿 Book en Healingsession 🌿</h2> */}
        <h2 style={s.subheading}>Vælg dag, dato og tidspunkt — og udfyld dine oplysninger.</h2>
      </div>

      {/* ── Step 1: pick day ── */}
      <StepLabel step="1" label="Vælg dag" done={!!selectedDay} />
      <DayGrid selectedDay={selectedDay} onSelect={handleSelectDay} />

      {/* ── Step 2: pick date ── */}
      {selectedDay && (
        <>
          <StepLabel step="2" label={`Vælg dato (${selectedDay.day})`} done={!!selectedDate} />
          <DatePicker
            entry={selectedDay}
            selectedDate={selectedDate}
            onSelect={handleSelectDate}
            isSlotBooked={isSlotBooked}
          />
        </>
      )}

      {/* ── Step 3: pick time ── */}
      {selectedDay && selectedDate && (
        <>
          <StepLabel step="3" label="Vælg tidspunkt" done={!!selectedTime} />
          <TimePicker
            entry={selectedDay}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelect={setSelectedTime}
            isSlotBooked={isSlotBooked}
          />
        </>
      )}

      {/* ── Booking summary ── */}
      {selectedDay && selectedDate && selectedTime && (
        <div style={s.summary}>
          ✅ <strong>{selectedDay.day} {fmtDate(selectedDate)}</strong> — <strong>{selectedTime}</strong>
        </div>
      )}

      {/* ── Step 4: form ── */}
      <div style={{ marginTop: '24px', borderTop: '1.5px solid #7FAD65', paddingTop: '24px' }}>
        <StepLabel step="4" label="Dine oplysninger" done={false} />
        <BookingForm onSubmit={handleFormSubmit} submitting={submitting} />
      </div>
    </div>
  );
}

// ─── Step label ───────────────────────────────────────────────────────────────

function StepLabel({ step, label, done }: { step: string; label: string; done: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
      <span style={{
        width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: done ? '#2D5A1B' : '#7FAD65', color: 'white', fontSize: '12px', fontWeight: 'bold', fontFamily: 'sans-serif', flexShrink: 0,
      }}>
        {done ? '✓' : step}
      </span>
      <span style={{ fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 'bold', color: '#1E3D14', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Day grid ─────────────────────────────────────────────────────────────────

function DayGrid({ selectedDay, onSelect }: { selectedDay: ScheduleEntry | null; onSelect: (entry: ScheduleEntry) => void }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '22px' }}>
      {SCHEDULE.map(entry => {
        const active = selectedDay?.day === entry.day;
        return (
          <button
            key={entry.day}
            type="button"
            onClick={() => onSelect(entry)}
            style={active ? sc.dayBtnActive : sc.dayBtn}
          >
            <span style={{ display: 'block', fontWeight: 'bold', fontSize: '14px' }}>{entry.day}</span>
            {entry.efterAftale && (
              <span style={{ fontSize: '11px', opacity: 0.85 }}>Efter aftale</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Date picker ──────────────────────────────────────────────────────────────

function DatePicker({ entry, selectedDate, onSelect, isSlotBooked }: {
  entry: ScheduleEntry;
  selectedDate: Date | null;
  onSelect: (date: Date) => void;
  isSlotBooked: (date: Date | null, time: string) => boolean;
}) {
  const [weeksToShow, setWeeksToShow] = useState(6);
  const [customError, setCustomError] = useState('');

  const dates = getUpcomingDates(entry.dayIndex, weeksToShow);
  const [tomorrowStr] = useState(() => new Date(Date.now() + 86400000).toISOString().split('T')[0]);

  function handleCustomDateChange(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    if (!val) return;
    const [y, m, d] = val.split('-').map(Number);
    const dateObj = new Date(y, m - 1, d);
    if (dateObj.getDay() !== entry.dayIndex) {
      setCustomError(`Den valgte dato er en ${DAY_NAMES[dateObj.getDay()]}. Vælg venligst en ${entry.day.toLowerCase()}.`);
    } else {
      setCustomError('');
      onSelect(dateObj);
    }
  }

  return (
    <div style={{ marginBottom: '22px' }}>
      {/* Quick date pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
        {dates.map(date => {
          const active = selectedDate && dateKey(date) === dateKey(selectedDate);
          // Check if all slots are booked for regular days
          const fullyBooked = !entry.efterAftale && SLOTS.every(slot => isSlotBooked(date, slot));

          if (fullyBooked) {
            return (
              <button
                key={dateKey(date)}
                type="button"
                disabled
                style={sc.dateBtnBooked}
                title="Alle tider denne dag er optaget"
              >
                <s>{fmtDate(date)}</s> <span style={{ fontSize: '10px' }}>(Optaget)</span>
              </button>
            );
          }

          return (
            <button
              key={dateKey(date)}
              type="button"
              onClick={() => {
                setCustomError('');
                onSelect(date);
              }}
              style={active ? sc.dateBtnActive : sc.dateBtn}
            >
              {fmtDate(date)}
            </button>
          );
        })}
        {weeksToShow < 24 && (
          <button
            type="button"
            onClick={() => setWeeksToShow(prev => prev + 6)}
            style={sc.moreBtn}
            title="Vis flere datoer længere fremme"
          >
            + Vis flere uger
          </button>
        )}
      </div>

      {/* Direct calendar picker for any future month/date */}
      <div style={sc.customDateBox}>
        <span style={{ fontSize: '13px', color: '#1E3D14', fontFamily: 'sans-serif', fontWeight: '600' }}>
          🗓 Eller vælg direkte i kalenderen:
        </span>
        <input
          type="date"
          min={tomorrowStr}
          value={selectedDate ? dateKey(selectedDate) : ''}
          onChange={handleCustomDateChange}
          style={sc.calendarInput}
        />
      </div>
      {customError && (
        <span style={{ display: 'block', marginTop: '6px', fontSize: '12px', color: '#c0392b', fontFamily: 'sans-serif' }}>
          {customError}
        </span>
      )}
    </div>
  );
}

// ─── Time picker ──────────────────────────────────────────────────────────────

function TimePicker({ entry, selectedDate, selectedTime, onSelect, isSlotBooked }: {
  entry: ScheduleEntry;
  selectedDate: Date;
  selectedTime: string;
  onSelect: (time: string) => void;
  isSlotBooked: (date: Date | null, time: string) => boolean;
}) {
  if (entry.efterAftale) {
    return (
      <div style={{ marginBottom: '22px' }}>
        <div style={s.efterAftaleBox}>
          <span style={{ fontSize: '18px' }}>🌿</span>
          <div>
            <strong style={{ color: '#1E3D14' }}>{entry.day}: Efter aftale</strong>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#4A6B35' }}>
              Skriv dit ønskede tidspunkt — vi aftaler nærmere.
            </p>
          </div>
        </div>
        <input
          type="text"
          placeholder="F.eks. 10:00 eller omkring middag"
          style={{ ...s.input, marginTop: '8px' }}
          value={selectedTime}
          onChange={e => onSelect(e.target.value)}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '22px' }}>
      {SLOTS.map(slot => {
        const active = selectedTime === slot;
        const booked = isSlotBooked(selectedDate, slot);

        if (booked) {
          return (
            <button
              key={slot}
              type="button"
              disabled
              style={sc.timeBtnBooked}
              title="Dette tidspunkt er optaget"
            >
              <s>{slot}</s>
              <span style={{ display: 'block', fontSize: '10px', fontWeight: 'bold', color: '#888' }}>
                Optaget
              </span>
            </button>
          );
        }

        return (
          <button
            key={slot}
            type="button"
            onClick={() => onSelect(slot)}
            style={active ? sc.timeBtnActive : sc.timeBtn}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

// ─── Booking form ─────────────────────────────────────────────────────────────

function BookingForm({ onSubmit, submitting }: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
}) {
  return (
    <form onSubmit={onSubmit} style={s.form}>
      <div className="booking-form-row" style={s.row}>
        <div className="booking-form-group" style={s.formGroup}>
          <label style={s.label}>Dit Navn</label>
          <input type="text" name="name" required placeholder="Navn" style={s.input} />
        </div>
        <div className="booking-form-group" style={s.formGroup}>
          <label style={s.label}>Din E-mail</label>
          <input type="email" name="email" required placeholder="email@eksempel.dk" style={s.input} />
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Telefonnummer</label>
        <input type="tel" name="phone" required placeholder="31 33 13 32" style={s.input} />
      </div>

      <p style={s.privacyNote}>
        Skriv ikke helbredsoplysninger eller andre følsomme oplysninger i formularen. Vi bruger kun dine oplysninger til at håndtere din booking.
      </p>

      <label style={s.checkboxLabel}>
        <input type="checkbox" name="privacy_acknowledged" required />
        <span>Jeg har læst og forstået <a href="/privatlivspolitik" target="_blank" rel="noreferrer">privatlivspolitikken</a>.</span>
      </label>

      <button type="submit" disabled={submitting} style={{ ...s.button, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Sender forespørgsel...' : 'Send Forespørgsel'}
      </button>
    </form>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s: Styles = {
  container:        { maxWidth: '620px', margin: '28px auto', padding: '26px', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', border: '1px solid #d9d0c8', borderRadius: '0', backgroundColor: '#f5f0ea', boxShadow: 'none' },
  heading:          { color: '#1f2c22', margin: '0 0 10px 0', fontWeight: '700', fontSize: '20px', letterSpacing: '-0.02em', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  subheading:       { color: '#4f5f4d', margin: 0, fontSize: '14px', fontStyle: 'italic', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  form:             { display: 'flex', flexDirection: 'column', gap: '12px' },
  row:              { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  formGroup:        { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' },
  label:            { fontSize: '13px', fontWeight: '700', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  input:            { padding: '12px', borderRadius: '0', border: '1px solid #b8a896', fontSize: '15px', outline: 'none', backgroundColor: '#f1eae3', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', color: '#1f2c22' },
  inputPlaceholder: { color: '#6a5d52' },
  button:           { padding: '12px 18px', background: '#d8c7b3', color: '#1f2c22', border: '1px solid #93806d', borderRadius: '0', fontWeight: '700', fontSize: '14px', marginTop: '6px', cursor: 'pointer', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease' },
  successContainer: { maxWidth: '520px', margin: '60px auto', padding: '36px 28px', textAlign: 'center', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', background: '#f5f0ea', borderRadius: '0', border: '1px solid #d9d0c8', boxShadow: 'none' },
  confirmedCard:    { backgroundColor: '#f3efe9', padding: '16px', borderRadius: '0', border: '1px solid #d9d0c8', margin: '16px 0 20px', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  gcalBtn:          { display: 'inline-block', padding: '12px 20px', backgroundColor: '#e7dfd6', color: '#1f2c22', textDecoration: 'none', borderRadius: '0', fontWeight: '700', fontSize: '14px', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease' },
  efterAftaleBox:   { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '0', borderLeft: '3px solid #6d846f', backgroundColor: '#efebe7', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  summary:          { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '14px', color: '#1f2c22', backgroundColor: '#f1eee8', padding: '10px 16px', borderRadius: '0', border: '1px solid #d9d0c8', marginTop: '4px' },
  privacyNote:      { margin: 0, padding: '12px 14px', backgroundColor: '#f3efe9', borderLeft: '3px solid #c7bdae', color: '#4f5f4d', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', lineHeight: '1.5' },
  checkboxLabel:    { display: 'flex', alignItems: 'flex-start', gap: '9px', color: '#2d4b2d', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', lineHeight: '1.5' },
};

// Button variants
const sc: Styles = {
  dayBtn:        { flex: '1 1 90px', padding: '12px 8px', borderRadius: '0', border: '1px solid #b9a994', backgroundColor: '#f1eae3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease', textAlign: 'center' },
  dayBtnActive:  { flex: '1 1 90px', padding: '12px 8px', borderRadius: '0', border: '1px solid #93806d', backgroundColor: '#d8c7b3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease', textAlign: 'center', boxShadow: 'none' },
  dateBtn:       { padding: '9px 16px', borderRadius: '0', border: '1px solid #b9a994', backgroundColor: '#f1eae3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease' },
  dateBtnActive: { padding: '9px 16px', borderRadius: '0', border: '1px solid #93806d', backgroundColor: '#d8c7b3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease', boxShadow: 'none' },
  dateBtnBooked: { padding: '9px 14px', borderRadius: '0', border: '1px solid #d7d7d7', backgroundColor: '#f0f0f0', color: '#8b8b8b', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '12px', cursor: 'not-allowed', opacity: 0.75 },
  moreBtn:       { padding: '9px 15px', borderRadius: '0', border: '1px dashed #93806d', backgroundColor: '#eadfce', color: '#2d4b2d', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease' },
  customDateBox: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px', padding: '10px 14px', backgroundColor: '#eadfce', borderRadius: '0', border: '1px solid #b9a994' },
  calendarInput: { padding: '8px 12px', borderRadius: '0', border: '1px solid #b8a896', backgroundColor: '#f1eae3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '13px', outline: 'none', cursor: 'pointer' },
  timeBtn:       { flex: '1 1 0', padding: '13px 8px', borderRadius: '0', border: '1px solid #b9a994', backgroundColor: '#f1eae3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease', textAlign: 'center' },
  timeBtnActive: { flex: '1 1 0', padding: '13px 8px', borderRadius: '0', border: '1px solid #93806d', backgroundColor: '#d8c7b3', color: '#1f2c22', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease', textAlign: 'center', boxShadow: 'none' },
  timeBtnBooked: { flex: '1 1 0', padding: '10px 8px', borderRadius: '0', border: '1px solid #d7d7d7', backgroundColor: '#f0f0f0', color: '#8b8b8b', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '14px', cursor: 'not-allowed', textAlign: 'center', opacity: 0.7 },
};
