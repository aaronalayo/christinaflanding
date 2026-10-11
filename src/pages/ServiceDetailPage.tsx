import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { Styles } from '../css';
import { artworkImageUrl, getService, sanityConfigured, type Service } from '../lib/sanity';

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const [result, setResult] = useState<{
    slug: string;
    service: Service | null;
    hasError: boolean;
  } | null>(null);

  useEffect(() => {
    let isCurrent = true;
    getService(slug)
      .then((item) => {
        if (isCurrent) {
          setResult({slug, service: item, hasError: false});
        }
      })
      .catch(() => {
        if (isCurrent) {
          setResult({slug, service: null, hasError: true});
        }
      });
    return () => {
      isCurrent = false;
    };
  }, [slug]);

  const currentResult = result?.slug === slug ? result : null;
  const service = currentResult?.service ?? null;
  const hasError = currentResult?.hasError ?? false;
  const isLoading = currentResult === null;
  const imageUrl = service ? artworkImageUrl(service.image) : undefined;
  const bookingHref = service ? `/booking?service=${encodeURIComponent(service.title)}` : '/booking';
  const introHeading = service?.sections?.find((section) => section.heading)?.heading
    ?? (service?.title.toLowerCase().startsWith('reiki') ? 'Om Reiki' : `Om ${service?.title ?? ''}`);

  return (
    <div className="site-content-page" style={styles.page}>
      <article className="site-content-container" style={styles.container}>
        {!sanityConfigured && <p style={styles.message}>Behandlingen bliver snart opdateret.</p>}
        {hasError && <p style={styles.message}>Behandlingen kunne ikke indlæses lige nu. Prøv igen senere.</p>}
        {isLoading && sanityConfigured && <p style={styles.message}>Indlæser behandling...</p>}
        {sanityConfigured && !isLoading && !hasError && !service && (
          <p style={styles.message}>Behandlingen blev ikke fundet.</p>
        )}

        {service && (
          <>
            <header style={styles.header}>
              <h1 className="site-page-title" style={styles.title}>{service.title}</h1>
              {service.tagline && <p className="site-page-subtitle" style={styles.subtitle}>{service.tagline}</p>}
              <Link to={bookingHref} style={{ ...styles.bookButton, marginTop: '14px' }}>BOOK BEHANDLING</Link>
            </header>

            <div className="site-treatment-card" style={styles.treatmentCard}>
              {imageUrl && <img src={imageUrl} alt="" style={styles.image} />}
              <h2 className="site-treatment-title" style={styles.sectionHeading}>{introHeading}</h2>
              {service.sections?.map((section) => (
                <section key={section._key} style={styles.section}>
                  {section.heading && section.heading !== introHeading && (
                    <h3 style={styles.sectionTitle}>{section.heading}</h3>
                  )}
                  {section.text?.split(/\n+/).filter(Boolean).map((paragraph, index) => (
                    <p key={`${section._key}-paragraph-${index}`} style={styles.description}>{paragraph}</p>
                  ))}
                  {!!section.bulletPoints?.length && !section.heading?.toLowerCase().includes('pris') && (
                    <ul style={styles.pointsList}>
                      {section.bulletPoints.map((point, index) => (
                        <li key={`${section._key}-point-${index}`} style={styles.pointItem}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {section.heading?.toLowerCase().includes('pris') && (
                    <div style={styles.practicalBox}>
                      <ul style={styles.priceList}>
                        {section.bulletPoints?.map((point, index) => (
                          <li key={`${section._key}-price-${index}`} style={styles.priceItem}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}
              <div style={{ marginTop: '28px' }}>
                <Link to={bookingHref} style={styles.bookButton}>BOOK BEHANDLING</Link>
              </div>
            </div>
          </>
        )}
      </article>
    </div>
  );
}

const styles: Styles = {
  page: { padding: '104px 24px 80px' },
  container: { maxWidth: '920px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '40px' },
  title: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '38px',
    color: '#1E3D14',
    margin: '0 0 16px',
    fontWeight: 600,
    letterSpacing: '0.08em',
  },
  subtitle: { fontSize: '18px', lineHeight: 1.7, color: '#4A6B35', margin: 0 },
  message: { textAlign: 'center', color: '#4A6B35', margin: '0 auto 36px' },
  treatmentCard: {
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    border: 0,
    borderRadius: 0,
    padding: '36px',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  image: { width: '100%', maxHeight: '480px', objectFit: 'cover', marginBottom: '32px' },
  sectionHeading: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '0 0 8px',
    fontWeight: 600,
  },
  section: { marginBottom: '24px' },
  sectionTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '22px',
    color: '#1E3D14',
    margin: '12px 0 14px',
    fontWeight: 600,
  },
  description: { fontSize: '16px', lineHeight: 1.7, color: '#3D5A2C', margin: '0 0 20px' },
  pointsList: { listStyleType: 'disc', paddingLeft: '24px', margin: '10px 0 24px', display: 'flex', flexDirection: 'column', gap: '8px' },
  pointItem: { fontSize: '14px', color: '#2D5A1B' },
  practicalBox: { backgroundColor: 'rgba(247, 243, 239, 0.78)', padding: '14px 26px', border: 0 },
  priceList: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' },
  priceItem: { fontSize: '15px', lineHeight: 1.6, color: '#2D5A1B' },
  bookButton: {
    display: 'inline-block',
    backgroundColor: '#ffffff',
    color: '#182A1A',
    padding: '14px 26px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
    letterSpacing: '0.05em',
    boxShadow: '0 6px 18px rgba(9, 10, 9, 0.12)',
  },
};
