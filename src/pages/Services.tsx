import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Services() {
  const treatments = [
    {
      title: 'Intuitiv Healing (1:1 Session)',
      duration: '60 minutter',
      price: 'Kontakt for pris / Efter aftale',
      icon: '🌿',
      desc: 'En dybdegående, individuel healing-session hvor vi arbejder med at frigøre fysiske og følelsesmæssige spændinger, berolige nervesystemet og genoprette balancen.',
      points: [
        'Kort indledende samtale om dine behov og intentioner',
        'Blid, nærværende energioverførsel på briks (fuldt påklædt)',
        'Fokus på dyb afspænding, jordforbindelse og indre ro',
        'Afsluttende integration og vejledning',
      ],
    },
    {
      title: 'Chakra & Energibalancering',
      duration: '60 minutter',
      price: 'Kontakt for pris / Efter aftale',
      icon: '✨',
      desc: 'Målrettet gennemgang og rensning af kroppens 7 primære energicentre (chakraer). Ideel hvis du føler dig energiforladt, blokeret eller i mental ubalance.',
      points: [
        'Kortlægning af energimæssige ubalancer og blokeringer',
        'Harmonisering af energiflowet fra rod til krone',
        'Styrkelse af kroppens naturlige selvhelende kræfter',
        'Følelse af fornyet vitalitet og overskud',
      ],
    },
    {
      title: 'Fjernhealing',
      duration: '45 - 60 minutter',
      price: 'Kontakt for pris / Efter aftale',
      icon: '🕊️',
      desc: 'Healing på afstand, hvor du modtager energien i dit eget hjem. Energi er ikke begrænset af tid eller fysisk afstand — effekten er lige så dyb og nærværende.',
      points: [
        'Foregår mens du slapper af i rolige omgivelser derhjemme',
        'Aftalt tidspunkt med sms/telefon før og efter sessionen',
        'Feedback og oplevelser deles efterfølgende',
        'Perfekt hvis du bor langt væk eller foretrækker hjemlige rammer',
      ],
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>🌿 Ydelser & Behandlinger</span>
          <h1 style={styles.title}>Mine Behandlinger</h1>
          <p style={styles.subtitle}>
            Alle sessioner foregår i et trygt og fortroligt rum med fokus på din trivsel og balance.
          </p>
        </div>

        <div style={styles.treatmentList}>
          {treatments.map((t, idx) => (
            <div key={idx} style={styles.treatmentCard}>
              <div style={styles.cardTop}>
                <span style={styles.icon}>{t.icon}</span>
                <div>
                  <h2 style={styles.cardTitle}>{t.title}</h2>
                  <div style={styles.metaRow}>
                    <span style={styles.metaBadge}>⏱ {t.duration}</span>
                    <span style={styles.metaBadge}>💳 {t.price}</span>
                  </div>
                </div>
              </div>

              <p style={styles.desc}>{t.desc}</p>

              <div style={styles.pointsBox}>
                <strong style={{ color: '#1E3D14', fontSize: '14px' }}>Sessionen indeholder:</strong>
                <ul style={styles.pointsList}>
                  {t.points.map((pt, i) => (
                    <li key={i} style={styles.pointItem}>✓ {pt}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: '24px' }}>
                <Link to="/booking" style={styles.bookBtn}>
                  Book denne session →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Practical info */}
        <div style={styles.practicalBox}>
          <h3 style={{ color: '#1E3D14', fontFamily: 'Georgia, serif', margin: '0 0 12px' }}>
            Praktisk information til din session
          </h3>
          <p style={styles.practicalText}>
            • Kom gerne i behageligt, løstsiddende tøj, da sessionen foregår fuldt påklædt.<br />
            • Drik gerne rigeligt med vand før og efter sessionen for at understøtte kroppens udrensning.<br />
            • Giv dig selv lidt ro og tid efterfølgende til at lade energien integrere sig.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Styles = {
  page: {
    padding: '56px 24px 80px',
  },
  container: {
    maxWidth: '920px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#D9EDCC',
    color: '#1E3D14',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '14px',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: '38px',
    color: '#1E3D14',
    margin: '0 0 16px 0',
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#4A6B35',
    margin: 0,
  },
  treatmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '48px',
  },
  treatmentCard: {
    backgroundColor: '#F5FAF2',
    border: '1.5px solid #C5DEB8',
    borderRadius: '16px',
    padding: '36px',
    boxShadow: '0 8px 24px rgba(45,90,27,0.06)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '18px',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '36px',
    flexShrink: 0,
  },
  cardTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '0 0 8px 0',
  },
  metaRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  metaBadge: {
    backgroundColor: '#E2F0D9',
    color: '#2D5A1B',
    padding: '4px 10px',
    borderRadius: '14px',
    fontSize: '13px',
    fontWeight: '600',
  },
  desc: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#3D5A2C',
    margin: '0 0 20px',
  },
  pointsBox: {
    backgroundColor: '#EEF6E8',
    padding: '16px 20px',
    borderRadius: '10px',
    border: '1px solid #D9EDCC',
  },
  pointsList: {
    listStyle: 'none',
    padding: 0,
    margin: '10px 0 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  pointItem: {
    fontSize: '14px',
    color: '#2D5A1B',
  },
  bookBtn: {
    display: 'inline-block',
    backgroundColor: '#2D5A1B',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
    boxShadow: '0 2px 8px rgba(45,90,27,0.2)',
  },
  practicalBox: {
    backgroundColor: '#D9EDCC',
    padding: '28px 32px',
    borderRadius: '14px',
    border: '1.5px solid #7FAD65',
  },
  practicalText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#2D5A1B',
    margin: 0,
  },
};

