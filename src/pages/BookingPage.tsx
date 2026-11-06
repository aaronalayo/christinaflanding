import HealingInquiry from '../HealingInquiry';
import type { Styles } from '../css';

export default function BookingPage() {
  const serviceType = 'Reiki Healing';
  const serviceOptions = [serviceType, 'Fjern behandling'];

  return (
    <div className="site-booking-page" style={styles.page}>
      <div className="site-booking-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <CrystalCluster />
          <h1 className="site-page-title" style={styles.title}>Book behandling</h1>
          <CrystalCluster flipped />
          <p className="site-page-subtitle" style={styles.subtitle}>
            Vælg den behandling, du ønsker at booke, og derefter en dato og et ledigt tidspunkt. Når du har indsendt din forespørgsel, modtager du en bekræftelse på e-mail.
          </p>
        </div>

        <HealingInquiry
          serviceType={serviceType}
          serviceOptions={serviceOptions}
        />
      </div>
    </div>
  );
}
function CrystalCluster({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: 'clamp(30px, 5vw, 46px)',
        height: 'clamp(30px, 5vw, 46px)',
        flexShrink: 0,
        color: '#7A9274',
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
    >
      <path d="M19 42 17 17 23 5 30 17 29 42Z" />
      <path d="m17 17 6 3 7-3M23 5l1 15-5 22M30 17l-6 3 5 22" />
      <path d="m7 42-1-16 5-9 6 9-1 16Z" />
      <path d="m6 26 5 3 6-3M11 17v12l-1 13M17 26l-6 3 5 13" />
      <path d="m31 42-1-14 5-8 6 8-1 14Z" />
      <path d="m30 28 5 3 6-3M35 20v11l-1 11M41 28l-6 3 5 11" />
      <path d="M23 45h7M8 45h9M34 45h8" />
    </svg>
  );
}
const styles: Styles = {
  page: {
    padding: '104px 24px 80px',
    backgroundColor: '#F3CFB3',
    minHeight: '100%',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
    textTransform: 'uppercase',
    color: '#1f2c22',
    margin: '20px 0 28px 0',
    fontWeight: 600,
    lineHeight: '0.96',
    letterSpacing: '0.08em',
    textShadow: '0 10px 35px rgba(12, 12, 12, 0.28)',
  },
  subtitle: {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#4f5f4d',
    margin: '0 auto',
    maxWidth: '650px',
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
  },
};
