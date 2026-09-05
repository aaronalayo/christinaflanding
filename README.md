# Christina Flanding — Healing & Velvære

En holistisk hjemmeside med online booking for Christina Flanding, bygget med React (Vite) og klar til udrulning på Cloudflare Pages med Cloudflare D1 database.

---

## 🌿 Sider & Funktioner

- **Forside (`/`)**: Introduktion til Christina, holistisk filosofi og ydelser.
- **Om mig (`/om-mig`)**: Bagom Christina, tilgang til healing, tryghed og fortrolighed.
- **Behandlinger (`/behandlinger`)**: 1:1 Intuitiv Healing, Chakra & Energibalancering, Fjernhealing.
- **Booking (`/booking`)**: Interaktiv kalender med ledige tider:
  - Mandag, tirsdag & onsdag: 09:30–10:30, 11:00–12:00, 12:30–13:30.
  - Torsdag & fredag: Efter aftale.
  - Viser optagede tider direkte fra Cloudflare D1 databasen.
  - Direkte "Tilføj til Google Kalender" knap ved bekræftelse.
- **Kontakt (`/kontakt`)**: Telefon, e-mail, åbningstider og praktiske informationer.

---

## 🛠 Teknisk Stack

- **Frontend**: React 19, React Router 7, Vite
- **Hosting**: Cloudflare Pages
- **Database**: Cloudflare D1 (Serverless SQLite at the edge)
- **API**: Cloudflare Pages Functions (`/functions/api/bookings.js`)
- **E-mails**: Resend API (To-vejs bekræftelse til klient og healer) med Web3Forms fallback

---

## 🚀 Kom i gang lokalt

```bash
cd christina-flanding
npm install
npm run dev
```

Byg til produktion:
```bash
npm run build
```

