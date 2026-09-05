import React from 'react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>🌿 Kom i kontakt</span>
          <h1 style={styles.title}>Kontakt Christina</h1>
          <p style={styles.subtitle}>
            Har du spørgsmål om behandlingerne, forløb eller specielle ønsker? Tøv ikke med at række ud.
          </p>
        </div>

        <div style={styles.grid}>
          {/* Card 1: Contact Info */}
          <div style={styles.card}>
            <h2 style={styles.cardHeading}>Kontaktoplysninger</h2>
            
            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>✉️</span>
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
                <a href="tel:+4512345678" style={styles.infoLink}>
                  +45 12 34 56 78
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
                  Klinik i rolige omgivelser<br />
                  (Præcis adresse oplyses ved bekræftet booking)
                </p>
              </div>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.infoIcon}>⏰</span>
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
          <div style={{ ...styles.card, backgroundColor: '#D9EDCC', border: '1.5px solid #7FAD65' }}>
            <h2 style={styles.cardHeading}>Klar til at booke?</h2>
            <p style={{ fontSize: '15px', lineHeight: '1.7', color: '#2D5A1B', marginBottom: '24px' }}>
              Du behøver ikke vente på svar for at reservere en tid. Vores online kalender viser ledige tider i realtid, og du kan sikre din session med det samme.
            </p>

            <Link to="/booking" style={styles.bookBtn}>
              Gå direkte til booking →
            </Link>

            <div style={{ marginTop: '28px', borderTop: '1px solid #B8D9A0', paddingTop: '20px' }}>
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

const styles = {
  page: {
    padding: '56px 24px 80px',
  },
  container: {
    maxWidth: '960px',
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
    margin: '0 auto',
    maxWidth: '650px',
  },
  grid: {
    display: 'flex',
    gap: '28px',
    flexWrap: 'wrap',
  },
  card: {
    flex: '1 1 380px',
    backgroundColor: '#F5FAF2',
    border: '1.5px solid #C5DEB8',
    borderRadius: '16px',
    padding: '36px',
    boxShadow: '0 8px 24px rgba(45,90,27,0.06)',
  },
  cardHeading: {
    fontFamily: 'Georgia, serif',
    fontSize: '22px',
    color: '#1E3D14',
    margin: '0 0 24px 0',
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
    backgroundColor: '#2D5A1B',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '24px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '16px',
    boxShadow: '0 4px 12px rgba(45,90,27,0.25)',
  },
};

