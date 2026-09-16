import HealingInquiry from '../HealingInquiry';
import type { Styles } from '../css';

export default function BookingPage() {
  return (
    <div className="site-booking-page" style={styles.page}>
      <div className="site-booking-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <span style={styles.badge}>Book behandlinger</span>
          <h1 className="site-page-title" style={styles.title}>Book din session</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            Vælg en dato og et ledigt tidspunkt i kalenderen nedenfor. Når du har indsendt din forespørgsel, modtager du en bekræftelse på e-mail.
          </p>
        </div>

        <HealingInquiry />
      </div>
    </div>
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
  badge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: 'rgba(122, 146, 116, 0.12)',
    color: '#2d4b2d',
    borderRadius: '0',
    fontSize: '13px',
    fontWeight: '700',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '14px',
  },
  title: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
    color: '#1f2c22',
    margin: '0 0 16px 0',
    letterSpacing: '-0.03em',
  },
  subtitle: {
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#4f5f4d',
    margin: '0 auto',
    maxWidth: '650px',
  },
};

