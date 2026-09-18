import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import heroBackground from '../assets/forside_foto.jpeg';

export default function Home() {
  return (
    <div style={styles.pageShell}>
      <section className="site-hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTextBlock}>
            <h1 className="site-hero-title" style={styles.heroTitle}>REIKI HEALING</h1>
            <p className="site-hero-subtitle" style={styles.heroSubtitle}>
              Blide, rogivende behandlinger, der hjælper dig med at komme ned i kroppen, finde ro og skabe plads til det, der virkelig betyder noget.
            </p>
          </div>

          <div className="site-hero-buttons" style={styles.heroBtns}>
            <Link to="/booking" style={styles.primaryBtn}>BOOK BEHANDLING</Link>
          </div>
        </div>
      </section>

      <section className="site-section" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.introBox}>
            <h2 className="site-section-title" style={styles.sectionTitle}>Giv dig selv en pause</h2>
            <p style={styles.sectionText}>
              Reiki healing er for dig, der oplever tankemylder, stress, uro eller bare har brug for et stille sted at komme tilbage til dig selv.
            </p>
          </div>

          <div className="site-grid" style={styles.grid}>
            <div className="site-feature-card" style={styles.card}>
              <h3 style={styles.cardTitle}>Reiki</h3>
              <p style={styles.cardText}>
                En blid behandling, hvor livsenergi flyder gennem dig, så du kan finde ro og balance.
              </p>
              <Link to="/behandlinger" style={styles.cardLink}>Læs mere →</Link>
            </div>

            <div className="site-feature-card" style={styles.card}>
              <h3 style={styles.cardTitle}>Min Kunst</h3>
              <p style={styles.cardText}>
                Kreative praksisser, kunstnerisk nærvær og udtryk, der kan gøre plads til forandring og ro.
              </p>
              <Link to="/om-mig" style={styles.cardLink}>Læs om Christina →</Link>
            </div>

            <div className="site-feature-card" style={styles.card}>
              <h3 style={styles.cardTitle}>Uld Arbejde</h3>
              <p style={styles.cardText}>
                Tænkning, materialitet og naturens værdi i et roligt og jordet hverdagsrum.
              </p>
              <Link to="/booking" style={styles.cardLink}>Læs mere →</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const styles: Styles = {
  pageShell: {
    background: 'linear-gradient(180deg, #f7f3ee 0%, #f3d7c0 100%)',
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(38, 36, 35, 0.18), rgba(38, 36, 35, 0.32)), url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '560px',
    padding: '72px 24px 88px',
    borderBottom: '1px solid rgba(31, 31, 31, 0.08)',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  heroContent: {
    maxWidth: '980px',
    margin: '0 auto',
    textAlign: 'center',
    animation: 'heroFadeUp 0.9s ease-out both',
  },
  heroTextBlock: {
    maxWidth: '760px',
    margin: '0 auto',
    animation: 'heroFadeUp 1.1s ease-out both',
  },
  heroTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: 'clamp(38px, 5.8vw, 78px)',
    lineHeight: '0.96',
    color: '#FFFFFF',
    margin: '0 0 20px 0',
    fontWeight: 600,
    letterSpacing: '-0.06em',
    textShadow: '0 10px 35px rgba(12, 12, 12, 0.28)',
    animation: 'heroFadeUp 0.8s ease-out both',
  },
  heroSubtitle: {
    maxWidth: '640px',
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#F6F0EA',
    margin: '0 auto 32px',
    fontWeight: 400,
    textShadow: '0 4px 18px rgba(12, 12, 12, 0.2)',
    animation: 'heroFadeUp 1s ease-out both',
  },
  heroBtns: {
    display: 'flex',
    gap: '14px',
    justifyContent: 'center',
    flexWrap: 'wrap',
    animation: 'heroFadeUp 1.2s ease-out both',
  },
  primaryBtn: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    color: '#1d1d1f',
    padding: '16px 30px',
    borderRadius: '0',
    fontSize: '13px',
    fontWeight: 600,
    textDecoration: 'none',
    border: '1px solid rgba(255, 255, 255, 0.55)',
    boxShadow: '0 12px 30px rgba(16, 18, 17, 0.18)',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    cursor: 'pointer',
  },
  secondaryBtn: {
    display: 'inline-block',
    backgroundColor: '#f8f4ee',
    color: '#1d1d1f',
    padding: '14px 24px',
    borderRadius: '999px',
    fontSize: '15px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: '1px solid rgba(30, 61, 20, 0.12)',
  },
  section: {
    padding: '72px 24px 96px',
    background: 'linear-gradient(180deg, rgba(247, 243, 238, 0.2) 0%, rgba(243, 215, 192, 0.26) 100%)',
  },
  container: {
    maxWidth: '1040px',
    margin: '0 auto',
    textAlign: 'center',
  },
  introBox: {
    maxWidth: '720px',
    margin: '0 auto 42px',
  },
  sectionTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: 'clamp(30px, 4vw, 48px)',
    color: '#1d1d1f',
    margin: '12px 0 16px',
    fontWeight: 600,
    letterSpacing: '-0.05em',
  },
  sectionText: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#4d4d4d',
    margin: 0,
  },
  grid: {
    display: 'flex',
    gap: '22px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    flex: '1 1 260px',
    maxWidth: '300px',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(29, 29, 31, 0.08)',
    borderRadius: '0',
    padding: '28px 24px',
    textAlign: 'center',
    boxShadow: '0 8px 28px rgba(37, 35, 33, 0.06)',
    transform: 'translateY(0)',
  },
  cardTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '22px',
    color: '#1d1d1f',
    margin: '0 0 12px 0',
    letterSpacing: '-0.04em',
    fontWeight: 600,
  },
  cardText: {
    fontSize: '15px',
    lineHeight: '1.65',
    color: '#4d4d4d',
    marginBottom: '18px',
  },
  cardLink: {
    color: '#1d1d1f',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '14px',
  },
};

