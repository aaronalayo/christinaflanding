import HealingInquiry from '../HealingInquiry';
import type { Styles } from '../css';

export default function BookingPage() {
  return (
    <div className="site-booking-page" style={styles.page}>
      <div className="site-booking-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <span style={styles.badge}>🌿 Online Tidsbestilling</span>
          <h1 className="site-page-title" style={styles.title}>Book Din Healingsession</h1>
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
    padding: '48px 24px 80px',
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
    fontSize: '17px',
    lineHeight: '1.6',
    color: '#4A6B35',
    margin: '0 auto',
    maxWidth: '650px',
  },
};

