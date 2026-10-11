import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import { artworkImageUrl, getServices, sanityConfigured, type Service } from '../lib/sanity';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isCurrent = true;
    getServices()
      .then((items) => {
        if (isCurrent) {
          setServices(items);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
          setIsLoading(false);
        }
      });
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <header className="site-page-header" style={styles.header}>
          <h1 className="site-page-title" style={styles.title}>BEHANDLINGER</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            Find den behandling, der passer til dig.
          </p>
        </header>

        {!sanityConfigured && <p style={styles.message}>Behandlingerne bliver snart opdateret.</p>}
        {hasError && <p style={styles.message}>Behandlingerne kunne ikke indlæses lige nu. Prøv igen senere.</p>}
        {isLoading && sanityConfigured && <p style={styles.message}>Indlæser behandlinger...</p>}
        {sanityConfigured && !isLoading && !hasError && services.length === 0 && (
          <p style={styles.message}>Der er endnu ingen behandlinger på siden.</p>
        )}

        <div style={styles.grid}>
          {services.map((service) => {
            const imageUrl = artworkImageUrl(service.image);
            return (
              <Link key={service._id} to={`/behandlinger/${service.slug}`} style={styles.card}>
                {imageUrl && <img src={imageUrl} alt="" style={styles.image} loading="lazy" />}
                <div style={styles.cardContent}>
                  <h2 style={styles.cardTitle}>{service.title}</h2>
                  <p style={styles.description}>{service.summary}</p>
                  {(service.duration || service.price) && (
                    <p style={styles.details}>
                      {[service.duration, service.price].filter(Boolean).join(' · ')}
                    </p>
                  )}
                  <span style={styles.readMore}>Læs mere</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles: Styles = {
  page: { padding: '104px 24px 80px' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { maxWidth: '720px', margin: '0 auto 48px', textAlign: 'center' },
  title: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '38px',
    color: '#1E3D14',
    margin: '0 0 16px',
    fontWeight: 600,
    letterSpacing: '0.08em',
  },
  subtitle: { fontSize: '18px', lineHeight: 1.6, color: '#4A6B35', margin: 0 },
  message: { textAlign: 'center', color: '#4A6B35', margin: '0 auto 36px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' },
  card: {
    display: 'block',
    overflow: 'hidden',
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    color: 'inherit',
    textDecoration: 'none',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  image: { width: '100%', aspectRatio: '4 / 3', objectFit: 'cover', display: 'block' },
  cardContent: { padding: '28px' },
  cardTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '0 0 12px',
    fontWeight: 600,
  },
  description: { fontSize: '16px', lineHeight: 1.7, color: '#3D5A2C', margin: '0 0 16px' },
  details: { fontSize: '14px', color: '#4A6B35', margin: '0 0 18px', fontWeight: 600 },
  readMore: { color: '#1E3D14', fontWeight: 600, textDecoration: 'underline' },
};
