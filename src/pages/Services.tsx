import { Link } from 'react-router-dom';
import type { Styles } from '../css';

export default function Services() {
  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <span style={styles.badge}>🌿 Healing & Velvære</span>
          <h1 className="site-page-title" style={styles.title}>REIKI HEALING</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            “Her får du et frirum, hvor der er fokus på dig”
          </p>
          <Link to="/booking" style={styles.bookBtn}>
            Book nu →
          </Link>
        </div>

        <div style={styles.treatmentList}>
          <div className="site-treatment-card" style={styles.treatmentCard}>
            <h2 className="site-treatment-title" style={styles.cardTitle}>Om reiki healing</h2>
            <p style={styles.desc}>
              Reiki healing kan hjælpe dig, som har tankemylder, stresssymptomer, uro og andre lignende udfordringer. Eller bare til dig, som vil give dig selv en helt afstressende oplevelse.
            </p>
            <p style={styles.desc}>
              Først og fremmest er Reiki healing for alle, som vil give sig selv en pause fra hverdagens støj og bare være med sig selv.
            </p>
            <p style={styles.desc}>
              Reiki healing stammer fra Japan, hvor “Rei” betyder liv og “ki” energi på japansk. Reikihealing er en blid healingsform, hvor behandleren kanaliserer universel livsenergi videre til modtageren. Kroppen får mulighed for at komme helt ned i en dyb ro og restituere.
            </p>

            <h3 style={styles.sectionHeading}>Hvad kan Reiki healing hjælpe med?</h3>
            <p style={styles.desc}>Reikihealing kan afhjælpe:</p>
            <ul style={styles.pointsList}>
              <li style={styles.pointItem}>Stresssymptomer</li>
              <li style={styles.pointItem}>Tankemylder</li>
              <li style={styles.pointItem}>Belastninger</li>
              <li style={styles.pointItem}>Søvnproblemer</li>
              <li style={styles.pointItem}>Fysiske spændinger og smerter</li>
              <li style={styles.pointItem}>Følelsesmæssige ubalancer</li>
            </ul>

            <h3 style={styles.sectionHeading}>Hvordan foregår behandlingen?</h3>
            <p style={styles.desc}>
              Healingen foregår liggende på en briks med tøj på, hvor behandleren lægger hænderne blidt på nogle områder på kroppen, som har brug for healing og opmærksomhed. Hænderne kan også være oppe oven over kroppen uden berøring.
            </p>
            <p style={styles.desc}>
              Inden en Reiki-behandling vil vi starte med at sidde ned. Jeg vil spørge, hvad du har brug for at have fokuseret på, og så kan vi begynde.
            </p>
            <p style={styles.desc}>
              Under selve healingen ser jeg ofte billeder, farver eller små sætninger, som er kanaliserede beskeder til dig. De kan også kaldes clairvoyante beskeder. Jeg spørger dig altid inden healingen, om du gerne vil have, at jeg formidler billederne eller de små beskeder videre til dig.
            </p>
            <p style={styles.desc}>Jeg har tavshedspligt.</p>

            <div style={styles.practicalBox}>
              <h3 style={styles.sectionHeading}>Praktisk</h3>
              <ul style={styles.priceList}>
                <li style={styles.priceItem}><strong>Reiki healing 60 min:</strong> 400 kr.</li>
                <li style={styles.priceItem}>Inkl. samtale, healing og snak som afslutning på behandlingen.</li>
                <li style={styles.priceItem}><strong>3 x klippekort Reiki-behandling:</strong> 1.100 kr.</li>
                <li style={styles.priceItem}>Et forløb anbefales for at komme i dybden med behandlingen.</li>
                <li style={styles.priceItem}>Du kan betale med MobilePay.</li>
              </ul>
            </div>

            <div style={{ marginTop: '28px' }}>
              <Link to="/booking" style={styles.bookBtn}>
                Book nu →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Styles = {
  page: {
    padding: '56px 24px 80px',
  },
  container: {
    maxWidth: '920px',
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
    margin: 0,
  },
  treatmentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    marginBottom: '48px',
  },
  treatmentCard: {
    backgroundColor: '#F5FAF2',
    border: '1.5px solid #C5DEB8',
    borderRadius: '16px',
    padding: '36px',
    boxShadow: '0 8px 24px rgba(45,90,27,0.06)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '18px',
    marginBottom: '16px',
  },
  icon: {
    fontSize: '36px',
    flexShrink: 0,
  },
  cardTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '0 0 8px 0',
  },
  metaRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  metaBadge: {
    backgroundColor: '#E2F0D9',
    color: '#2D5A1B',
    padding: '4px 10px',
    borderRadius: '14px',
    fontSize: '13px',
    fontWeight: '600',
  },
  desc: {
    fontSize: '16px',
    lineHeight: '1.7',
    color: '#3D5A2C',
    margin: '0 0 20px',
  },
  sectionHeading: {
    fontFamily: 'Georgia, serif',
    fontSize: '22px',
    color: '#1E3D14',
    margin: '32px 0 14px',
  },
  pointsBox: {
    backgroundColor: '#EEF6E8',
    padding: '16px 20px',
    borderRadius: '10px',
    border: '1px solid #D9EDCC',
  },
  pointsList: {
    listStyleType: 'disc',
    paddingLeft: '24px',
    margin: '10px 0 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  pointItem: {
    fontSize: '14px',
    color: '#2D5A1B',
  },
  bookBtn: {
    display: 'inline-block',
    backgroundColor: '#C3C8A8',
    color: '#000000',
    padding: '12px 24px',
    borderRadius: '20px',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '15px',
    boxShadow: '0 2px 8px rgba(45,90,27,0.2)',
  },
  practicalBox: {
    backgroundColor: '#D9EDCC',
    padding: '28px 32px',
    borderRadius: '14px',
    border: '1.5px solid #7FAD65',
  },
  practicalText: {
    fontSize: '15px',
    lineHeight: '1.8',
    color: '#2D5A1B',
    margin: 0,
  },
  priceList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  priceItem: {
    fontSize: '15px',
    lineHeight: '1.6',
    color: '#2D5A1B',
  },
};

