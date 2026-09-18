import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="site-footer-container" style={styles.container}>
        <div className="site-footer-grid" style={styles.grid}>
          {/* Col 1: Brand */}
          <div className="site-footer-column" style={styles.col}>
            <div style={styles.brandTitle}>Christina Flanding</div>
            <p style={styles.text}>
              Intuitiv healing, energiterapi og nærvær. Skab ro, balance og fornyet energi i krop og sind.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="site-footer-column" style={styles.col}>
            <div style={styles.colTitle}>Links</div>
            <ul style={styles.list}>
              <li><Link to="/" style={styles.link}>Forside</Link></li>
              <li><Link to="/om-mig" style={styles.link}>Om Christina</Link></li>
              <li><Link to="/behandlinger" style={styles.link}>Behandlinger</Link></li>
              <li><Link to="/booking" style={styles.link}>Book session</Link></li>
              <li><Link to="/kontakt" style={styles.link}>Kontakt</Link></li>
              <li><Link to="/privatlivspolitik" style={styles.link}>Privatlivspolitik</Link></li>
              <li><Link to="/vilkaar" style={styles.link}>Vilkår for booking</Link></li>
            </ul>
          </div>

          {/* Col 3: Practical */}
          <div className="site-footer-column" style={styles.col}>
            <div style={styles.colTitle}>Åbningstider</div>
            <p style={{ ...styles.text, marginTop: '12px' }}>
              Herstedvesterstræde 41<br />
              Herstedvester Landsby i Albertslund<br />
              Tlf. 31 33 13 32
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
    backgroundColor: '#C3C8A8',
    color: '#000000',
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
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '20px',
    fontWeight: 600,
    color: '#000000',
    marginBottom: '12px',
    letterSpacing: '0.02em',
  },
  colTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '14px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    color: '#000000',
    marginBottom: '14px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.7',
    color: '#000000',
    margin: 0,
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
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
    color: '#000000',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s',
  },
  ctaLink: {
    color: '#000000',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.15)',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#000000',
  },
};

