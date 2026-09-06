import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          {/* Col 1: Brand */}
          <div style={styles.col}>
            <div style={styles.brandTitle}>🌿 Christina Flanding</div>
            <p style={styles.text}>
              Intuitiv healing, energiterapi og nærvær. Skab ro, balance og fornyet energi i krop og sind.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div style={styles.col}>
            <div style={styles.colTitle}>Hurtige links</div>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Forside</Link></li>
              <li><Link to="/om-mig" style={styles.link}>Om Christina</Link></li>
              <li><Link to="/behandlinger" style={styles.link}>Behandlinger</Link></li>
              <li><Link to="/booking" style={styles.link}>Book session</Link></li>
              <li><Link to="/kontakt" style={styles.link}>Kontakt</Link></li>
            </ul>
          </div>

          {/* Col 3: Practical */}
          <div style={styles.col}>
            <div style={styles.colTitle}>Åbningstider & Tider</div>
            <p style={styles.text}>
              Mandag – Onsdag: 09:30 – 13:30<br />
              Torsdag & Fredag: Efter aftale<br />
              Lørdag & Søndag: Lukket
            </p>
            <div style={{ marginTop: '12px' }}>
              <Link to="/booking" style={styles.ctaLink}>
                Find ledig tid her →
              </Link>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Christina Flanding. Alle rettigheder forbeholdes.
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles: Styles = {
  footer: {
    backgroundColor: '#1E3D14',
    color: '#E2EDD9',
    marginTop: 'auto',
    borderTop: '3px solid #7FAD65',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '48px 24px 24px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '36px',
    justifyContent: 'space-between',
    marginBottom: '36px',
  },
  col: {
    flex: '1 1 240px',
  },
  brandTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: '12px',
  },
  colTitle: {
    fontFamily: 'sans-serif',
    fontSize: '14px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: '#B8D9A0',
    marginBottom: '14px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#D5E6CB',
    margin: 0,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  link: {
    color: '#D5E6CB',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  ctaLink: {
    color: '#B8D9A0',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.15)',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#9AB88A',
  },
};

