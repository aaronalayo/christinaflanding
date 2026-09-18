import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Contact() {
  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <h1 className="site-page-title" style={styles.title}>KONTAKT</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            Har du spørgsmål om behandlingerne, forløb eller specielle ønsker? Tøv ikke med at række ud.
          </p>
        </div>

        <div className="site-contact-grid" style={styles.grid}>
          {/* Card 1: Contact Info */}
          <div className="site-contact-card" style={styles.card}>
            <h2 style={styles.cardHeading}>Kontaktoplysninger</h2>
            
            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>💌</span>
              <div>
                <strong style={styles.infoLabel}>E-mail</strong>
                <a href="mailto:kontakt@christinaflanding.dk" style={styles.infoLink}>
                  kontakt@christinaflanding.dk
                </a>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📞</span>
              <div>
                <strong style={styles.infoLabel}>Telefon & SMS</strong>
                <a href="tel:+4531331332" style={styles.infoLink}>
                  31 33 13 32
                </a>
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#5A8048' }}>
                  Send gerne en SMS, hvis jeg er optaget i en session.
                </p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>📍</span>
              <div>
                <strong style={styles.infoLabel}>Sted</strong>
                <p style={{ margin: 0, fontSize: '15px', color: '#2D5A1B' }}>
                  Behandlingen foregår i mit anneks<br />
                  Herstedvesterstræde 41<br />
                  Herstedvester Landsby i Albertslund
                </p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>🕰️</span>
              <div>
                <strong style={styles.infoLabel}>Behandlingstider</strong>
                <p style={{ margin: 0, fontSize: '14px', color: '#3D5A2C', lineHeight: '1.6' }}>
                  Mandag – Onsdag: 09:30 – 13:30<br />
                  Torsdag & Fredag: Efter individuel aftale<br />
                  Lørdag – Søndag: Lukket
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Quick Booking Action */}
          <div className="site-contact-card" style={{ ...styles.card, backgroundColor: '#E9E0D6', border: '1px solid rgba(30, 61, 20, 0.18)' }}>
            <h2 style={styles.cardHeading}>Klar til at booke?</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#2D5A1B', marginBottom: '24px' }}>
              Du behøver ikke vente på svar for at reservere en tid. Vores online kalender viser ledige tider i realtid, og du kan sikre din session med det samme.
            </p>

            <Link to="/booking" style={styles.bookBtn}>
              BOOK BEHANDLING
            </Link>

            <div style={{ marginTop: '28px', borderTop: '1px solid rgba(30, 61, 20, 0.18)', paddingTop: '20px' }}>
              <strong style={{ color: '#1E3D14', fontSize: '14px', display: 'block', marginBottom: '6px' }}>
                Afbud & ændringer:
              </strong>
              <p style={{ fontSize: '13px', color: '#4A6B35', margin: 0, lineHeight: '1.6' }}>
                Bliver du forhindret, bedes afbud meddeles senest 24 timer forud for din aftale via telefon eller e-mail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Styles = {
  page: {
    padding: '104px 24px 80px',
    backgroundColor: '#F3CFB3',
  },
  container: {
    maxWidth: '960px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  title: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '38px',
    color: '#1E3D14',
    margin: '0 0 16px 0',
    fontWeight: 600,
    letterSpacing: '-0.04em',
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#4A6B35',
    margin: '0 auto',
    maxWidth: '650px',
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
  },
  grid: {
    display: 'flex',
    gap: '28px',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1 1 380px',
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    border: '0',
    borderRadius: '0',
    padding: '36px',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  cardHeading: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '22px',
    color: '#1E3D14',
    margin: '0 0 24px 0',
    fontWeight: 600,
  },
  infoRow: {
    display: 'flex',
    gap: '16px',
    alignItems: 'flex-start',
    marginBottom: '22px',
  },
  infoIcon: {
    fontSize: '24px',
    flexShrink: 0,
  },
  infoLabel: {
    display: 'block',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.6px',
    color: '#5A8048',
    marginBottom: '4px',
    fontFamily: 'sans-serif',
  },
  infoLink: {
    fontSize: '16px',
    color: '#2D5A1B',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  bookBtn: {
    display: 'inline-block',
    backgroundColor: '#E9D8C5',
    color: '#182A1A',
    padding: '14px 28px',
    borderRadius: '0',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: '1px solid rgba(30, 61, 20, 0.25)',
    boxShadow: '0 6px 18px rgba(9, 10, 9, 0.12)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    cursor: 'pointer',
  },
};

