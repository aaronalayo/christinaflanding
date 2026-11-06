import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import heroBackground from '../assets/forside_foto_2.png';
import { artworkImageUrl, getArtwork, getServices, sanityConfigured } from '../lib/sanity';

const cardConfig = [
  {
    key: 'behandlinger',
    title: 'Behandlinger',
    to: '/behandlinger',
    text: 'Udforsk behandlinger, der støtter ro, nærvær og balance.',
  },
  {
    key: 'kunst',
    title: 'Min Kunst',
    to: '/kunst',
    text: 'Kreative praksisser, kunstnerisk nærvær og udtryk, der kan gøre plads til forandring og ro.',
  },
  // {
  //   key: 'uld',
  //   title: 'Filtning i Uld',
  //   to: '/uld',
  //   text: 'Tænkning, materialitet og naturens værdi i et roligt og jordet hverdagsrum.',
  // },
] as const;

export default function Home() {
  const [featuredImages, setFeaturedImages] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (!sanityConfigured) {
      return;
    }

    let isCurrent = true;

    getServices()
      .then((services) => {
        if (isCurrent) {
          setFeaturedImages((currentImages) => ({
            ...currentImages,
            behandlinger: artworkImageUrl(services[0]?.image),
          }));
        }
      })
      .catch(() => {
        if (isCurrent) {
          console.error('Could not load homepage services from Sanity.');
        }
      });

    getArtwork('kunst')
      .then((kunstArtwork) => {
        if (!isCurrent) {
          return;
        }

        setFeaturedImages((currentImages) => ({
          ...currentImages,
          kunst: artworkImageUrl(kunstArtwork[0]?.image),
        }));
      })
      .catch(() => {
        if (isCurrent) {
          console.error('Could not load homepage artwork from Sanity.');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

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
            <Link to="/booking" style={styles.primaryBtn}>Book Behandling</Link>
          </div>
        </div>
      </section>

      <section className="site-section" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.introBox}>
            <div style={styles.welcomeHeading}>
              <CrystalCluster />
              <h2 className="site-section-title" style={styles.sectionTitle}>Velkommen</h2>
              <CrystalCluster flipped />
            </div>
            <p style={styles.introLead}>
              Hos mig kan du få ladet dit energisystem op og give dig selv en pause.
            </p>
            <p style={styles.sectionText}>
              Reiki healing er en meget blid healingsmetode, hvor jeg har fokus på at lade kroppens
              energicentre op igen (chakraer). Jeg arbejder med at fjerne blokeringer, så der kan
              komme frit flow i hele kroppen.
            </p>
          </div>

          <div className="site-grid" style={styles.grid}>
            {cardConfig.map((card) => {
              const imageUrl = featuredImages[card.key];

              return (
                <Link key={card.key} to={card.to} className="site-feature-card" style={styles.card}>
                  {imageUrl && <img src={imageUrl} alt={card.title} style={styles.cardImage} loading="lazy" />}
                  <div style={styles.cardBody}>
                    <h3 style={styles.cardTitle}>{card.title}</h3>
                    <p style={styles.cardText}>{card.text}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

function CrystalCluster({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        width: 'clamp(30px, 5vw, 46px)',
        height: 'clamp(30px, 5vw, 46px)',
        flexShrink: 0,
        color: '#7A9274',
        transform: flipped ? 'scaleX(-1)' : undefined,
      }}
    >
      <path d="M19 42 17 17 23 5 30 17 29 42Z" />
      <path d="m17 17 6 3 7-3M23 5l1 15-5 22M30 17l-6 3 5 22" />
      <path d="m7 42-1-16 5-9 6 9-1 16Z" />
      <path d="m6 26 5 3 6-3M11 17v12l-1 13M17 26l-6 3 5 13" />
      <path d="m31 42-1-14 5-8 6 8-1 14Z" />
      <path d="m30 28 5 3 6-3M35 20v11l-1 11M41 28l-6 3 5 11" />
      <path d="M23 45h7M8 45h9M34 45h8" />
    </svg>
  );
}

const styles: Styles = {
  pageShell: {
    background: 'linear-gradient(180deg, #f7f3ee 0%, #f3d7c0 100%)',
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(172, 172, 172, 0.25), rgba(38, 36, 35, 0.32)), url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '760px',
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
    fontWeight: 400,
    letterSpacing: '0.2em',
    textShadow: '0 10px 35px rgba(12, 12, 12, 0.28)',
    animation: 'heroFadeUp 0.8s ease-out both',
  },
  heroSubtitle: {
    maxWidth: '630px',
    fontSize: '18px',
    lineHeight: '1.7',
    color: '#FFFFFF',
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
  welcomeHeading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'clamp(12px, 3vw, 24px)',
  },
  introLead: {
    fontSize: '21px',
    lineHeight: '1.6',
    color: '#1E3D14',
    margin: '0 auto 16px',
    fontWeight: 500,
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
    lineHeight: '1.8',
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
    display: 'block',
    flex: '1 1 260px',
    maxWidth: '300px',
    background: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(29, 29, 31, 0.08)',
    borderRadius: '0',
    overflow: 'hidden',
    color: 'inherit',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease',
    textAlign: 'left',
  },
  cardImage: {
    width: '100%',
    aspectRatio: '4 / 3',
    objectFit: 'cover',
    display: 'block',
    backgroundColor: '#e8dccd',
  },
  cardBody: {
    padding: '24px 22px 28px',
  },
  cardTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    textTransform: 'uppercase',
    fontSize: '22px',
    color: '#1d1d1f',
    margin: '0 0 12px 0',
    letterSpacing: '-0.02em',
    fontWeight: 600,
    textAlign: 'center',
  },
  cardText: {
    fontSize: '15px',
    lineHeight: '1.65',
    color: '#4d4d4d',
    margin: 0,
    textAlign: 'center',
  },
};
