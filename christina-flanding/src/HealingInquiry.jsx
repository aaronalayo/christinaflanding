import React, { useState, useEffect } from 'react';

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

// Returns next `count` dates (as Date objects) that fall on `dayOfWeek` (1=Mon…5=Fri)
function getUpcomingDates(dayOfWeek, count = 5) {
  const results = [];
  const cursor  = new Date();
  cursor.setHours(0, 0, 0, 0);
  cursor.setDate(cursor.getDate() + 1); // start from tomorrow
  while (results.length < count) {
    if (cursor.getDay() === dayOfWeek) results.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return results;
}

function fmtDate(date) {
  const currentYear = new Date().getFullYear();
  const yearStr = date.getFullYear() !== currentYear ? ` ${date.getFullYear()}` : '';
  return `${date.getDate()}. ${DK_MONTHS[date.getMonth()]}${yearStr}`;
}

function dateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
}

function getGoogleCalendarUrl(booking) {
  if (!booking || !booking.booking_date) return '#';
  const [y, m, d] = booking.booking_date.split('-');
  const timeMatch = (booking.booking_time || '').match(/(\d{1,2}):(\d{2})\s*–\s*(\d{1,2}):(\d{2})/);
  let startISO = '';
  let endISO = '';

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
  const details = encodeURIComponent(`Healingsession hos Christina Flanding\nTid: ${booking.booking_time}\nNavn: ${booking.name}\nTelefon: ${booking.phone}`);
  const location = encodeURIComponent("Christina Flanding Healing");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}`;
}

// ─── Root ────────────────────────────────────────────────────────────────────

export default function HealingInquiry() {
  const [submittedBooking, setSubmittedBooking] = useState(null);
  const [selectedDay,      setSelectedDay]      = useState(null);   // SCHEDULE entry
  const [selectedDate,     setSelectedDate]     = useState(null);   // Date object
  const [selectedTime,     setSelectedTime]     = useState('');     // slot string
  const [bookedSlots,      setBookedSlots]      = useState([]);     // [{ date: 'YYYY-MM-DD', time: '...' }]
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

  function isSlotBooked(date, time) {
    if (!date || !time) return false;
    const key = dateKey(date);
    return bookedSlots.some(b => b.date === key && b.time === time);
  }

  function handleSelectDay(entry) {
    setSelectedDay(entry);
    setSelectedDate(null);
    setSelectedTime('');
  }

  function handleSelectDate(date) {
    setSelectedDate(date);
    setSelectedTime('');
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDay)  { alert('Vælg venligst en dag.');        return; }
    if (!selectedDate) { alert('Vælg venligst en dato.');       return; }
    if (!selectedTime) { alert('Vælg venligst et tidspunkt.');  return; }

    const formData = new FormData(e.target);
    const bookingData = {
      name:         formData.get('name'),
      email:        formData.get('email'),
      phone:        formData.get('phone'),
      booking_date: dateKey(selectedDate),
      booking_time: selectedTime,
      intentions:   formData.get('intentions') || '',
    };

    setSubmitting(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmittedBooking({
          ...bookingData,
          displayDate: `${selectedDay.day} ${fmtDate(selectedDate)}`
        });
        // Optimistically update booked slots so slot is blocked immediately
        setBookedSlots(prev => [...prev, { date: bookingData.booking_date, time: bookingData.booking_time }]);
      } else {
        alert(data.error || 'Noget gik galt. Prøv venligst igen.');
      }
    } catch (err) {
      // Fallback for static dev environments
      setSubmittedBooking({
        ...bookingData,
        displayDate: `${selectedDay.day} ${fmtDate(selectedDate)}`
      });
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
    <div style={s.container}>
      <div style={{ textAlign: 'center', marginBottom: '28px' }}>
        <h2 style={s.heading}>🌿 Book en Healingsession 🌿</h2>
        <p style={s.subheading}>Vælg dag, dato og tidspunkt — og udfyld dine oplysninger.</p>
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
      {selectedDate && (
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
      {selectedTime && (
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

function StepLabel({ step, label, done }) {
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

function DayGrid({ selectedDay, onSelect }) {
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

function DatePicker({ entry, selectedDate, onSelect, isSlotBooked }) {
  const [weeksToShow, setWeeksToShow] = useState(6);
  const [customError, setCustomError] = useState('');

  const dates = getUpcomingDates(entry.dayIndex, weeksToShow);
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  function handleCustomDateChange(e) {
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

function TimePicker({ entry, selectedDate, selectedTime, onSelect, isSlotBooked }) {
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

function BookingForm({ onSubmit, submitting }) {
  return (
    <form onSubmit={onSubmit} style={s.form}>
      <div style={s.row}>
        <div style={s.formGroup}>
          <label style={s.label}>Dit Navn</label>
          <input type="text" name="name" required placeholder="Navn" style={s.input} />
        </div>
        <div style={s.formGroup}>
          <label style={s.label}>Din E-mail</label>
          <input type="email" name="email" required placeholder="email@eksempel.dk" style={s.input} />
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Telefonnummer</label>
        <input type="tel" name="phone" required placeholder="+45 12 34 56 78" style={s.input} />
      </div>

      <div style={s.formGroup}>
        <label style={s.label}>Hvad er dine primære mål eller intentioner for denne session?</label>
        <textarea
          name="intentions"
          placeholder="F.eks. følelsesmæssig rensning, stressreduktion, fysiske blokeringer..."
          style={{ ...s.input, height: '100px', resize: 'vertical' }}
          required
        />
      </div>

      <button type="submit" disabled={submitting} style={{ ...s.button, opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Sender forespørgsel...' : 'Send Forespørgsel'}
      </button>
    </form>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const s = {
  container:        { maxWidth: '620px', margin: '40px auto', padding: '34px', fontFamily: 'Georgia, serif', border: '2px solid #7FAD65', borderRadius: '16px', backgroundColor: '#EEF6E8', boxShadow: '0 10px 32px rgba(45,90,27,0.15)' },
  heading:          { color: '#1E3D14', margin: '0 0 10px 0', fontWeight: 'bold', fontSize: '24px' },
  subheading:       { color: '#4A6B35', margin: 0, fontSize: '14px', fontStyle: 'italic' },
  form:             { display: 'flex', flexDirection: 'column', gap: '18px' },
  row:              { display: 'flex', gap: '15px', flexWrap: 'wrap' },
  formGroup:        { display: 'flex', flexDirection: 'column', gap: '6px', flex: '1 1 200px' },
  label:            { fontSize: '13px', fontWeight: 'bold', color: '#1E3D14', fontFamily: 'sans-serif' },
  input:            { padding: '12px', borderRadius: '8px', border: '1.5px solid #7FAD65', fontSize: '15px', outline: 'none', backgroundColor: '#F5FAF2', fontFamily: 'sans-serif', color: '#1E3D14' },
  button:           { padding: '14px', background: '#2D5A1B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', marginTop: '6px', cursor: 'pointer', fontFamily: 'sans-serif', letterSpacing: '0.5px' },
  successContainer: { maxWidth: '520px', margin: '60px auto', padding: '36px 28px', textAlign: 'center', fontFamily: 'Georgia, serif', background: '#E2F0D9', borderRadius: '16px', border: '2px solid #7FAD65', boxShadow: '0 10px 32px rgba(45,90,27,0.12)' },
  confirmedCard:    { backgroundColor: '#F2F8EE', padding: '16px', borderRadius: '10px', border: '1.5px solid #7FAD65', margin: '16px 0 20px', fontFamily: 'sans-serif' },
  gcalBtn:          { display: 'inline-block', padding: '12px 20px', backgroundColor: '#2D5A1B', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', fontFamily: 'sans-serif', transition: 'background 0.2s', boxShadow: '0 2px 8px rgba(45,90,27,0.25)' },
  efterAftaleBox:   { display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '8px', borderLeft: '4px solid #3D6B2C', backgroundColor: '#D9EDCC', fontFamily: 'sans-serif' },
  summary:          { fontFamily: 'sans-serif', fontSize: '14px', color: '#1E3D14', backgroundColor: '#C8E6B0', padding: '10px 16px', borderRadius: '8px', border: '1.5px solid #7FAD65', marginTop: '4px' },
};

// Button variants
const sc = {
  dayBtn:        { flex: '1 1 90px', padding: '12px 8px', borderRadius: '10px', border: '1.5px solid #7FAD65', backgroundColor: '#F2F8EE', color: '#1E3D14', fontFamily: 'Georgia, serif', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' },
  dayBtnActive:  { flex: '1 1 90px', padding: '12px 8px', borderRadius: '10px', border: '2px solid #2D5A1B', backgroundColor: '#2D5A1B', color: 'white', fontFamily: 'Georgia, serif', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', boxShadow: '0 2px 8px rgba(45,90,27,0.25)' },
  dateBtn:       { padding: '9px 16px', borderRadius: '20px', border: '1.5px solid #7FAD65', backgroundColor: '#F2F8EE', color: '#1E3D14', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s' },
  dateBtnActive: { padding: '9px 16px', borderRadius: '20px', border: '2px solid #2D5A1B', backgroundColor: '#2D5A1B', color: 'white', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s', boxShadow: '0 2px 6px rgba(45,90,27,0.3)' },
  dateBtnBooked: { padding: '9px 14px', borderRadius: '20px', border: '1.5px solid #ccc', backgroundColor: '#eee', color: '#999', fontFamily: 'sans-serif', fontSize: '12px', cursor: 'not-allowed', opacity: 0.75 },
  moreBtn:       { padding: '9px 15px', borderRadius: '20px', border: '1.5px dashed #7FAD65', backgroundColor: '#EBF4E5', color: '#2D5A1B', fontFamily: 'sans-serif', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.15s' },
  customDateBox: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px', padding: '10px 14px', backgroundColor: '#E2F0D9', borderRadius: '8px', border: '1px solid #B8D9A0' },
  calendarInput: { padding: '8px 12px', borderRadius: '8px', border: '1.5px solid #7FAD65', backgroundColor: '#F5FAF2', color: '#1E3D14', fontFamily: 'sans-serif', fontSize: '13px', outline: 'none', cursor: 'pointer' },
  timeBtn:       { flex: '1 1 0', padding: '13px 8px', borderRadius: '8px', border: '1.5px solid #7FAD65', backgroundColor: '#F2F8EE', color: '#1E3D14', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' },
  timeBtnActive: { flex: '1 1 0', padding: '13px 8px', borderRadius: '8px', border: '2px solid #2D5A1B', backgroundColor: '#2D5A1B', color: 'white', fontFamily: 'sans-serif', fontSize: '15px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', boxShadow: '0 2px 8px rgba(45,90,27,0.3)' },
  timeBtnBooked: { flex: '1 1 0', padding: '10px 8px', borderRadius: '8px', border: '1.5px solid #ccc', backgroundColor: '#ebebeb', color: '#999', fontFamily: 'sans-serif', fontSize: '14px', cursor: 'not-allowed', textAlign: 'center', opacity: 0.7 },
};
