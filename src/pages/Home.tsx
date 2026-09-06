import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <span style={styles.heroBadge}>🌿 Velkommen til et trygt rum</span>
          <h1 style={styles.heroTitle}>Genfind din indre ro og balance</h1>
          <p style={styles.heroSubtitle}>
            Intuitiv healing og energiterapi skræddersyet til dig, der ønsker at slippe stress, spændinger og genoprette harmoni i krop og sind.
          </p>
          <div style={styles.heroBtns}>
            <Link to="/booking" style={styles.primaryBtn}>
              Book en session nu →
            </Link>
            <Link to="/behandlinger" style={styles.secondaryBtn}>
              Se behandlinger
            </Link>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section style={styles.section}>
        <div style={styles.container}>
          <div style={styles.introBox}>
            <span style={{ fontSize: '36px' }}>✨</span>
            <h2 style={styles.sectionTitle}>Et nærværende pusterum for krop og sjæl</h2>
            <p style={styles.sectionText}>
              I en travl hverdag kan kroppen ophobe ubalancer, stress og blokeringer. Gennem blid og intuitiv healing hjælper jeg dit energisystem med at slippe det, der tynger, så du kan mærke dig selv med fornyet lethed, klarhed og ro.
            </p>
          </div>

          {/* Highlights */}
          <div style={styles.grid}>
            <div style={styles.card}>
              <div style={styles.cardIcon}>🌸</div>
              <h3 style={styles.cardTitle}>Intuitiv Healing</h3>
              <p style={styles.cardText}>
                Fokus på at løsne dybereliggende spændinger og genoprette den naturlige energistrøm i kroppen.
              </p>
              <Link to="/behandlinger" style={styles.cardLink}>Læs mere →</Link>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>💫</div>
              <h3 style={styles.cardTitle}>Chakra & Energi</h3>
              <p style={styles.cardText}>
                Balancering af dine energicentre (chakraer), så krop, følelser og tanker arbejder i harmoni.
              </p>
              <Link to="/behandlinger" style={styles.cardLink}>Læs mere →</Link>
            </div>

            <div style={styles.card}>
              <div style={styles.cardIcon}>🕊️</div>
              <h3 style={styles.cardTitle}>Fjernhealing</h3>
              <p style={styles.cardText}>
                Modtag healing i trygheden af dit eget hjem. Energi kender ingen fysiske afstande.
              </p>
              <Link to="/behandlinger" style={styles.cardLink}>Læs mere →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote / Philosophy */}
      <section style={styles.quoteSection}>
        <div style={styles.container}>
          <blockquote style={styles.quote}>
            "Healing handler ikke om at fikse dig — det handler om at hjælpe dig med at huske, hvem du er, når støjen lægger sig."
          </blockquote>
          <p style={styles.quoteAuthor}>— Christina Flanding</p>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={styles.ctaBanner}>
        <div style={styles.container}>
          <h2 style={{ ...styles.sectionTitle, color: '#1E3D14' }}>
            Er du klar til at give dig selv et kærligt frirum?
          </h2>
          <p style={{ ...styles.sectionText, maxWidth: '600px', margin: '0 auto 24px' }}>
            Se de ledige tider i kalenderen og book din session online i dag.
          </p>
          <Link to="/booking" style={styles.primaryBtn}>
            Gå til online booking →
          </Link>
        </div>
      </section>
    </div>
  );
}

const styles: Styles = {
  hero: {
    backgroundColor: '#EEF6E8',
    padding: '72px 24px',
    textAlign: 'center',
    borderBottom: '1px solid #C5DEB8',
  },
  heroContent: {
    maxWidth: '750px',
    margin: '0 auto',
  },
  heroBadge: {
    display: 'inline-block',
    padding: '6px 14px',
    backgroundColor: '#D9EDCC',
    color: '#1E3D14',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: 'bold',
    marginBottom: '18px',
  },
  heroTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '44px',
    lineHeight: '1.2',
    color: '#1E3D14',
    margin: '0 0 20px 0',
    fontWeight: 'bold',
  },
  heroSubtitle: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#4A6B35',
    margin: '0 0 32px 0',
  },
  heroBtns: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  primaryBtn: {
    display: 'inline-block',
    backgroundColor: '#2D5A1B',
    color: 'white',
    padding: '14px 28px',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    boxShadow: '0 4px 12px rgba(45,90,27,0.25)',
    transition: 'background-color 0.2s',
  },
  secondaryBtn: {
    display: 'inline-block',
    backgroundColor: '#FFF',
    color: '#1E3D14',
    padding: '14px 24px',
    borderRadius: '24px',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: '1.5px solid #7FAD65',
    transition: 'all 0.2s',
  },
  section: {
    padding: '64px 24px',
  },
  container: {
    maxWidth: '1000px',
    margin: '0 auto',
    textAlign: 'center',
  },
  introBox: {
    maxWidth: '700px',
    margin: '0 auto 48px',
  },
  sectionTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '32px',
    color: '#1E3D14',
    margin: '12px 0 16px',
    fontWeight: 'bold',
  },
  sectionText: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#4A6B35',
    margin: 0,
  },
  grid: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    flex: '1 1 280px',
    maxWidth: '340px',
    backgroundColor: '#F5FAF2',
    border: '1.5px solid #C5DEB8',
    borderRadius: '16px',
    padding: '32px 24px',
    textAlign: 'center',
    boxShadow: '0 6px 20px rgba(45,90,27,0.06)',
  },
  cardIcon: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  cardTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    color: '#1E3D14',
    margin: '0 0 12px 0',
  },
  cardText: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#5A8048',
    marginBottom: '20px',
  },
  cardLink: {
    color: '#2D5A1B',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  quoteSection: {
    backgroundColor: '#D9EDCC',
    padding: '56px 24px',
    borderTop: '1px solid #C5DEB8',
    borderBottom: '1px solid #C5DEB8',
  },
  quote: {
    fontFamily: 'Georgia, serif',
    fontSize: '22px',
    fontStyle: 'italic',
    lineHeight: '1.6',
    color: '#1E3D14',
    maxWidth: '750px',
    margin: '0 auto 16px',
  },
  quoteAuthor: {
    fontFamily: 'sans-serif',
    fontSize: '14px',
    color: '#4A6B35',
    fontWeight: 'bold',
    margin: 0,
  },
  ctaBanner: {
    backgroundColor: '#EEF6E8',
    padding: '64px 24px',
    textAlign: 'center',
  },
};

