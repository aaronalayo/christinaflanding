import HealingInquiry from '../HealingInquiry';
import type { Styles } from '../css';

export default function BookingPage() {
  const serviceType = 'Reiki Healing';
  const serviceOptions = [serviceType, 'Fjern behandling'];

  return (
    <div className="site-booking-page" style={styles.page}>
      <div className="site-booking-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <h1 className="site-page-title" style={styles.title}>Book behandling</h1>
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
    margin: '0 0 16px 0',
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
