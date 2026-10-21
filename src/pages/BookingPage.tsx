import HealingInquiry from '../HealingInquiry';
import type { Styles } from '../css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getServices, type Service } from '../lib/sanity';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [hasServiceError, setHasServiceError] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    getServices()
      .then((items) => {
        if (isCurrent) {
          setServices(items);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasServiceError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const serviceType = searchParams.get('service')?.trim() || services[0]?.title || 'Healingsession';
  const serviceOptions = [...new Set([serviceType, ...services.map((service) => service.title)])];

  return (
    <div className="site-booking-page" style={styles.page}>
      <div className="site-booking-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          {/* <span style={styles.badge}>Book behandlinger</span> */}
          <h1 className="site-page-title" style={styles.title}>Book behandling</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            Vælg den behandling, du ønsker at booke, og derefter en dato og et ledigt tidspunkt. Når du har indsendt din forespørgsel, modtager du en bekræftelse på e-mail.
          </p>
        </div>

        {hasServiceError && (
          <p role="status" style={styles.serviceError}>
            Behandlingerne kunne ikke indlæses. Du kan stadig sende en bookingforespørgsel.
          </p>
        )}
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
  serviceError: {
    textAlign: 'center',
    color: '#7a3026',
    margin: '0 auto 16px',
  },
};
