import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import christinaPhoto from '../assets/IMG_8347.jpeg';
import PageTitle from '../components/PageTitle';
import { artworkImageUrl, getAboutPage, type AboutPageContent } from '../lib/sanity';

const defaultAboutPage: AboutPageContent = {
  title: 'OM CHRISTINA FLANDING',
  portraitAlt: 'Christina Flanding',
  paragraphs: [
    { _key: 'welcome', text: 'Tak for, at du er landet her. Det sætter jeg stor pris på.' },
    { _key: 'reiki', text: 'Første gang jeg lærte Reiki-healing at kende, var på en rejse i Nepal, hvor jeg tog et kursus i Kathmandu. I 2024 genoptog jeg Reiki-healingen, og jeg har nu Reiki 1, 2 og 3, hvor 3. grad er mestergraden inden for Reiki-healing.' },
    { _key: 'journey', text: 'Min egen vej har ikke været lige, og jeg har prøvet mange ting.' },
    { _key: 'nepal', text: 'Jeg har vandret på Caminoen i Spanien og rejst til Nepal to gange, hvor jeg har boet på et tibetansk buddhistisk kloster, arbejdet på et børnehjem og vandret i Himalaya.' },
    { _key: 'work', text: 'Jeg har arbejdet med mennesker som handicaphjælper, i børnehave og som skolelærer.' },
    { _key: 'calling', text: 'Jeg mærker et kald til healingen, og jeg glæder mig meget til at kunne hjælpe dig.' },
  ],
  ctaText: 'Du er altid velkommen til at booke en behandling eller kontakte mig med eventuelle spørgsmål.',
  ctaButtonLabel: 'BOOK BEHANDLING',
  ctaButtonLink: '/booking',
};

export default function About() {
  const [aboutPage, setAboutPage] = useState(defaultAboutPage);

  useEffect(() => {
    let isCurrent = true;
    getAboutPage()
      .then((content) => {
        if (isCurrent && content) {
          setAboutPage(content);
        }
      })
      .catch((error: unknown) => {
        console.error('Could not load About page content from Sanity.', error);
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  const portraitUrl = artworkImageUrl(aboutPage.portrait);

  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <div className="site-page-header" style={styles.header}>
          <PageTitle className="site-page-title" style={styles.title}>{aboutPage.title}</PageTitle>
        </div>

        <div
          className="about-photo-slot"
          style={styles.photoSlot}
        >
          <img src={portraitUrl || christinaPhoto} alt={aboutPage.portraitAlt || ''} style={styles.photoImage} />
        </div>

        <div className="site-content-card" style={styles.contentBox}>
          {aboutPage.paragraphs?.map((paragraph) => (
            <p key={paragraph._key} style={styles.text}>{paragraph.text}</p>
          ))}

          <div style={styles.ctaBox}>
            {aboutPage.ctaText && (
              <h4 style={{ color: '#1E3D14', margin: '0 0 12px', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontWeight: 600 }}>
                {aboutPage.ctaText}
              </h4>
            )}
            {aboutPage.ctaButtonLabel && (
              <Link to={aboutPage.ctaButtonLink || '/booking'} style={styles.ctaBtn}>
                {aboutPage.ctaButtonLabel}
              </Link>
            )}
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
    letterSpacing: '0.08em',
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
    backgroundColor: '#ffffff',
    color: '#182A1A',
    padding: '14px 26px',
    borderRadius: '0',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '14px',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    border: '0',
    boxShadow: '0 6px 18px rgba(9, 10, 9, 0.12)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    cursor: 'pointer',
  },
};
