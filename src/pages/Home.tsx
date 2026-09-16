import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import heroBackground from '../assets/forside_foto.jpeg';

export default function Home() {
  return (
    <div style={styles.pageShell}>
      <section className="site-hero" style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTextBlock}>
            <h1 className="site-hero-title" style={styles.heroTitle}>REIKI</h1>
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
    background: '#F3CFB3',
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(17, 26, 19, 0.42), rgba(17, 26, 19, 0.56)), url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '540px',
    padding: '54px 24px 72px',
    borderBottom: '1px solid rgba(30, 61, 20, 0.18)',
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
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(34px, 5.8vw, 72px)',
    lineHeight: '0.96',
    color: '#FFFFFF',
    margin: '0 0 18px 0',
    fontWeight: 'bold',
    letterSpacing: '-0.06em',
    textShadow: '0 2px 18px rgba(9, 10, 9, 0.42)',
    animation: 'heroFadeUp 0.8s ease-out both',
  },
  heroSubtitle: {
    maxWidth: '640px',
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#F8F3EE',
    margin: '0 0 26px 0',
    textShadow: '0 1px 12px rgba(9, 10, 9, 0.28)',
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
    backgroundColor: '#E9D8C5',
    color: '#182A1A',
    padding: '14px 26px',
    borderRadius: '0',
    fontSize: '15px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: '1px solid rgba(255, 255, 255, 0.55)',
    boxShadow: '0 6px 18px rgba(9, 10, 9, 0.18)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    cursor: 'pointer',
  },
  secondaryBtn: {
    display: 'inline-block',
    backgroundColor: '#f8f4ee',
    color: '#1E3D14',
    padding: '14px 24px',
    borderRadius: '999px',
    fontSize: '15px',
    fontWeight: 'bold',
    textDecoration: 'none',
    border: '1px solid rgba(30, 61, 20, 0.28)',
  },
  section: {
    padding: '64px 24px',
    backgroundColor: '#F3CFB3',
  },
  container: {
    maxWidth: '1040px',
    margin: '0 auto',
    textAlign: 'center',
  },
  introBox: {
    maxWidth: '720px',
    margin: '0 auto 36px',
  },
  sectionTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: 'clamp(30px, 4vw, 48px)',
    color: '#1E3D14',
    margin: '12px 0 16px',
    fontWeight: 'bold',
    letterSpacing: '-0.04em',
  },
  sectionText: {
    fontSize: '17px',
    lineHeight: '1.7',
    color: '#4A6B35',
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
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    border: '1px solid rgba(30, 61, 20, 0.18)',
    borderRadius: '0',
    padding: '26px 20px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
    transform: 'translateY(0)',
  },
  cardTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '22px',
    color: '#1E3D14',
    margin: '0 0 12px 0',
  },
  cardText: {
    fontSize: '15px',
    lineHeight: '1.65',
    color: '#55704b',
    marginBottom: '18px',
  },
  cardLink: {
    color: '#2D5A1B',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
};

