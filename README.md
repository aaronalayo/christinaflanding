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
- **E-mails**: Resend API (bekræftelse til klient og notifikation til Christina)

## 🔐 GDPR-drift

- Kør `migrations/0001_remove_intentions.sql` én gang på produktions-D1 før lancering. Migrationen sletter det tidligere fritekstfelt, som kunne indeholde følsomme oplysninger.
- Bookingdata skal slettes løbende efter den retention-periode, der står i privatlivspolitikken. Kør kun oprydning efter at have afklaret eventuelle bogføringskrav.
- `cleanup-worker.ts` er konfigureret til at slette bookingrækker 90 dage efter den bookede dato hver dag kl. 03:00 UTC. Deploy den separat med `npx wrangler deploy --config wrangler.cleanup.toml`.
- Udfyld CVR-nummeret i privatlivspolitikken før lancering.
- Kontroller databehandleraftaler og internationale dataoverførsler for Cloudflare og Resend før brug.
- Hjemmesiden bruger aktuelt ingen cookies, analyseværktøjer, marketingpixels eller lokal browserlagring, så der er ikke behov for et cookie-banner i den nuværende version. Tilføj samtykkeløsning før eventuel tracking aktiveres.

---

## 🚀 Kom i gang lokalt

```bash
npm install
npm run dev
```

Byg til produktion:
```bash
npm run build
```

