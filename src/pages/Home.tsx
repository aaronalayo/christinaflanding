import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Styles } from '../css';
import heroBackground from '../assets/forside_foto_2.png';
import { artworkImageUrl, getArtwork, getServices, sanityConfigured, type Service } from '../lib/sanity';

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
  {
    key: 'uld',
    title: 'Filtning i Uld',
    to: '/uld',
    text: 'Tænkning, materialitet og naturens værdi i et roligt og jordet hverdagsrum.',
  },
] as const;

export default function Home() {
  const [featuredImages, setFeaturedImages] = useState<Record<string, string | undefined>>({});
  const [services, setServices] = useState<Service[]>([]);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);

  useEffect(() => {
    if (!sanityConfigured) {
      return;
    }

    let isCurrent = true;

    getServices()
      .then((items) => {
        if (isCurrent) {
          setServices(items);
          setFeaturedImages((currentImages) => ({
            ...currentImages,
            behandlinger: artworkImageUrl(items[0]?.image),
          }));
        }
      })
      .catch(() => {
        if (isCurrent) {
          console.error('Could not load homepage services from Sanity.');
        }
      });

    Promise.all([getArtwork('kunst'), getArtwork('uld')])
      .then(([kunstArtwork, uldArtwork]) => {
        if (!isCurrent) {
          return;
        }

        setFeaturedImages((currentImages) => ({
          ...currentImages,
          kunst: artworkImageUrl(kunstArtwork[0]?.image),
          uld: artworkImageUrl(uldArtwork[0]?.image),
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

  useEffect(() => {
    if (services.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveServiceIndex((currentIndex) => (currentIndex + 1) % services.length);
    }, 6000);

    return () => window.clearInterval(intervalId);
  }, [services.length]);

  const activeService = services[activeServiceIndex];
  const bookingHref = activeService
    ? `/booking?service=${encodeURIComponent(activeService.title)}`
    : '/booking';

  return (
    <div style={styles.pageShell}>
      <section className="site-hero" style={styles.hero}>
        <div style={styles.heroContent}>
          {activeService ? (
            <div key={activeService._id} className="site-hero-service-slide">
              <div style={styles.heroTextBlock}>
                <h1 className="site-hero-title" style={styles.heroTitle}>{activeService.title}</h1>
                <p className="site-hero-subtitle" style={styles.heroSubtitle}>
                  {activeService.tagline || activeService.summary}
                </p>
              </div>

              <div className="site-hero-buttons" style={styles.heroBtns}>
                <Link to={bookingHref} style={styles.primaryBtn}>BOOK {activeService.title}</Link>
              </div>

              {services.length > 1 && (
                <div className="site-hero-service-indicators" aria-label="Vælg behandling">
                  {services.map((service, index) => (
                    <button
                      key={service._id}
                      type="button"
                      className={`site-hero-service-indicator${index === activeServiceIndex ? ' is-active' : ''}`}
                      aria-label={`Vis ${service.title}`}
                      aria-pressed={index === activeServiceIndex}
                      onClick={() => setActiveServiceIndex(index)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              <div style={styles.heroTextBlock}>
                <h1 className="site-hero-title" style={styles.heroTitle}>REIKI HEALING</h1>
                <p className="site-hero-subtitle" style={styles.heroSubtitle}>
                  Blide, rogivende behandlinger, der hjælper dig med at komme ned i kroppen, finde ro og skabe plads til det, der virkelig betyder noget.
                </p>
              </div>

              <div className="site-hero-buttons" style={styles.heroBtns}>
                <Link to="/booking" style={styles.primaryBtn}>BOOK BEHANDLING</Link>
              </div>
            </>
          )}
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
