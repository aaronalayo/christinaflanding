import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>🌿 Mød Christina</span>
          <h1 style={styles.title}>Om Christina Flanding</h1>
          <p style={styles.subtitle}>
            Healer, energiterapeut og formidler af ro, balance og personlig udvikling.
          </p>
        </div>

        <div style={styles.contentBox}>
          <h2 style={styles.heading}>Min tilgang til healing</h2>
          <p style={styles.text}>
            Jeg tror på, at kroppen besidder en enestående evne til at hele sig selv, når vi giver den roen og energien til det. I mit arbejde møder jeg dig præcis der, hvor du er — med nærvær, empati og et trygt rum uden fordømmelse.
          </p>
          <p style={styles.text}>
            Uanset om du søger hjælp til fysiske spændinger, stress, uro i nervesystemet eller følelsesmæssig udmattelse, arbejder vi sammen om at løsne blokeringer og genskabe et sundt energiflow.
          </p>

          <h2 style={styles.heading}>Hvad kan du forvente?</h2>
          <div style={styles.featureList}>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🌱</span>
              <div>
                <strong>Et trygt & kærligt rum:</strong> Her er plads til hele dig, og alt foregår i et roligt tempo på dine præmisser.
              </div>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>🕊️</span>
              <div>
                <strong>Intuitiv indføling:</strong> Hver session er unik og tilpasses præcist til de behov og ubalancer, din krop udtrykker.
              </div>
            </div>
            <div style={styles.featureItem}>
              <span style={styles.featureIcon}>✨</span>
              <div>
                <strong>Fuld tavshedspligt:</strong> Alt hvad vi taler om og arbejder med under en session forbliver 100% fortroligt.
              </div>
            </div>
          </div>

          <div style={styles.ctaBox}>
            <h3 style={{ color: '#1E3D14', margin: '0 0 12px', fontFamily: 'Georgia, serif' }}>
              Vil du opleve en session?
            </h3>
            <p style={{ color: '#4A6B35', margin: '0 0 20px', fontSize: '15px' }}>
              Du er altid velkommen til at booke en session eller kontakte mig med eventuelle spørgsmål.
            </p>
            <Link to="/booking" style={styles.ctaBtn}>
              Book en tid online →
            </Link>
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
    maxWidth: '820px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
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
  contentBox: {
    backgroundColor: '#F5FAF2',
    border: '1.5px solid #C5DEB8',
    borderRadius: '16px',
    padding: '40px 36px',
    boxShadow: '0 8px 24px rgba(45,90,27,0.06)',
  },
  heading: {
    fontFamily: 'Georgia, serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '28px 0 14px',
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#3D5A2C',
    margin: '0 0 16px',
  },
  featureList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    margin: '20px 0 32px',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '14px',
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#2D5A1B',
  },
  featureIcon: {
    fontSize: '22px',
    flexShrink: 0,
  },
  ctaBox: {
    backgroundColor: '#D9EDCC',
    padding: '24px',
    borderRadius: '12px',
    textAlign: 'center',
    marginTop: '36px',
    border: '1px solid #7FAD65',
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: '#2D5A1B',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
  },
};

