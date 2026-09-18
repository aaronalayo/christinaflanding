import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import christinaPhoto from '../assets/foto-portrait.jpeg';

export default function About() {
  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <h1 className="site-page-title" style={styles.title}>OM CHRISTINA FLANDING</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>
            Healer, energiterapeut og formidler af ro, balance og personlig udvikling.
          </p>
        </div>

        <div
          className="about-photo-slot"
          style={styles.photoSlot}
        >
          <img src={christinaPhoto} alt="Christina Flanding" style={styles.photoImage} />
        </div>

        <div className="site-content-card" style={styles.contentBox}>
          <h2 style={styles.heading}>Min rejse</h2>
          <p style={styles.text}>
            Jeg hedder Christina, og tak for at du er kommet her forbi. Det sætter jeg stor pris på.
          </p>
          <p style={styles.text}>
            I det meste af mit liv har jeg haft det spirituelle med mig.
          </p>

          <p style={styles.text}>
            Mit første store kald var pilgrimsvandring på Caminoen i Spanien i 2009, hvor jeg gik 500 km på 3,5 uge. Rejsen var selvfølgelig ikke rigtig planlagt i god tid. Jeg havde hjertesorg, og jeg tænkte, at nu skulle jeg gå helt alene. Det var selvfølgelig slet ikke det, der kom til at ske. Men afsted kom jeg, alene, og måtte sige farvel til min familie i lufthavnen på min første rejse alene nogensinde.
          </p>
          <p style={styles.text}>
            Det blev en livsændrende oplevelse for mig, en rejse med virkelig mange intuitive oplevelser og øvelse i at være i nuet. Jeg mødte så meget kærlighed og fik en camino-familie, som jeg gik med. Vi kom fra alle mulige steder i verden. En australsk ven fortalte mig om alle sine fantastiske rejser i Nepal. Der blev sået et frø om en drøm om at rejse til Nepal, og han vidste jo ikke, at jeg var meget fascineret af tibetansk buddhisme.
          </p>
          <p style={styles.text}>
            Så jeg landede i Nepal året efter på endnu en rejse alene. Her tog jeg for første gang et kursus i Reiki-healing. Jeg vandrede i Himalaya og mødte fantastiske mennesker.
          </p>
          <p style={styles.text}>
            Min anden rejse til Nepal i 2015 førte mig til Kopan Monastery i Kathmandu, hvor jeg boede på et tibetansk buddhistisk kloster på et 10-dages kursus for vesterlændinge. Her blev reinkarnation for første gang mere virkelig for mig. Det var, som om alt det, jeg havde lært og troede på, blev vendt helt på hovedet.
          </p>
          <p style={styles.text}>
            I 2023/24 har jeg uddannet mig i Reiki 1, 2 og 3 og har taget kurser i meditation og krystaller. Reiki-healing og meditation har været en del af mit eget daglige liv i de sidste 2 år, og jeg har brugt det på mig selv, når jeg havde brug for ro og for at få ladet mit system op igen.
          </p>
          <p style={styles.text}>
            Ud over at være interesseret i spiritualitet har jeg altid beskæftiget mig med billedkunst. Jeg er uddannet arkitekt fra Kunstakademiets Arkitektskole i 2013, og derudover har jeg i 2023 færdiggjort en 3-årig kunstterapiuddannelse. Kunstnerisk arbejde er en stor del af mit liv.
          </p>

          <div style={styles.ctaBox}>
            <h3 style={{ color: '#1E3D14', margin: '0 0 12px', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontWeight: 600 }}>
              Vil du opleve en session?
            </h3>
            <p style={{ color: '#4A6B35', margin: '0 0 20px', fontSize: '15px' }}>
              Du er altid velkommen til at booke en session eller kontakte mig med eventuelle spørgsmål.
            </p>
            <Link to="/booking" style={styles.ctaBtn}>
              BOOK BEHANDLING
            </Link>
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
    maxWidth: '820px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
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
    margin: 0,
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
  },
  photoSlot: {
    width: 'min(100%, 360px)',
    aspectRatio: '4 / 5',
    margin: '0 auto 40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    backgroundColor: '#D9EDCC',
    border: '1px solid rgba(30, 61, 20, 0.18)',
    borderRadius: '0',
    overflow: 'hidden',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  photoImage: {
    width: '100%',
    height: '100%',
    display: 'block',
    objectFit: 'cover',
  },
  contentBox: {
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    border: '0',
    borderRadius: '0',
    padding: '40px 36px',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  heading: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '24px',
    color: '#1E3D14',
    margin: '28px 0 14px',
    fontWeight: 600,
  },
  text: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#3D5A2C',
    margin: '0 0 16px',
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
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
    borderRadius: '0',
    textAlign: 'center',
    marginTop: '36px',
    border: '0',
  },
  ctaBtn: {
    display: 'inline-block',
    backgroundColor: '#E9D8C5',
    color: '#182A1A',
    padding: '14px 26px',
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

