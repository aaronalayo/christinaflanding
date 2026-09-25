import { useEffect, useState } from 'react';
import type { Styles } from '../css';
import { artworkImageUrl, getArtwork, sanityConfigured, type ArtworkCategory, type Artwork } from '../lib/sanity';

type ArtworkPageProps = {
  category: ArtworkCategory;
  title: string;
  subtitle: string;
};

export default function ArtworkPage({ category, title, subtitle }: ArtworkPageProps) {
  const [artwork, setArtwork] = useState<Artwork[]>([]);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isCurrent = true;

    getArtwork(category)
      .then((items) => {
        if (isCurrent) {
          setArtwork(items);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [category]);

  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <header style={styles.header}>
          <h1 className="site-page-title" style={styles.title}>{title}</h1>
          <p className="site-page-subtitle" style={styles.subtitle}>{subtitle}</p>
        </header>

        {!sanityConfigured && (
          <p style={styles.message}>Galleriet bliver snart opdateret med nye værker.</p>
        )}

        {hasError && (
          <p style={styles.message}>Galleriet kunne ikke indlæses lige nu. Prøv igen senere.</p>
        )}

        {sanityConfigured && !hasError && artwork.length === 0 && (
          <p style={styles.message}>Der er endnu ingen værker i galleriet.</p>
        )}

        <div style={styles.grid}>
          {artwork.map((item) => {
            const imageUrl = artworkImageUrl(item.image);

            return (
              <article key={item._id} style={styles.item}>
                {imageUrl && <img src={imageUrl} alt={item.title} style={styles.image} />}
                <div style={styles.itemText}>
                  <h2 style={styles.itemTitle}>{item.title}</h2>
                  {item.description && <p style={styles.description}>{item.description}</p>}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const styles: Styles = {
  page: {
    padding: '104px 24px 80px',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
  },
  header: {
    maxWidth: '720px',
    margin: '0 auto 48px',
    textAlign: 'center',
  },
  title: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '38px',
    color: '#1E3D14',
    margin: '0 0 16px',
    fontWeight: 600,
    letterSpacing: '0.08em',
  },
  subtitle: {
    fontSize: '18px',
    lineHeight: 1.6,
    color: '#4A6B35',
    margin: 0,
  },
  message: {
    textAlign: 'center',
    color: '#4A6B35',
    margin: '0 auto 36px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '28px',
  },
  item: {
    backgroundColor: 'rgba(247, 243, 239, 0.78)',
    boxShadow: '0 2px 12px rgba(40, 52, 36, 0.08)',
  },
  image: {
    width: '100%',
    aspectRatio: '4 / 3',
    objectFit: 'cover',
    display: 'block',
  },
  itemText: {
    padding: '20px 22px 24px',
  },
  itemTitle: {
    fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif',
    fontSize: '21px',
    color: '#1E3D14',
    margin: 0,
    fontWeight: 600,
  },
  description: {
    fontSize: '15px',
    lineHeight: 1.65,
    color: '#3D5A2C',
    margin: '10px 0 0',
  },
};
