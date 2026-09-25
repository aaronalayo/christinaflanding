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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Native Browser SEO Hook - Safely updates tab title and metadata
  useEffect(() => {
    document.title = `${title} - Galleri`;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', subtitle || `Udforsk ${title} i galleriet.`);
  }, [title, subtitle]);

  useEffect(() => {
    let isCurrent = true;
    getArtwork(category)
      .then((items) => { if (isCurrent) setArtwork(items); })
      .catch(() => { if (isCurrent) setHasError(true); });
    return () => { isCurrent = false; };
  }, [category]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setSelectedIndex((current) => current === null ? null : (current + 1) % artwork.length);
      if (event.key === 'ArrowLeft') setSelectedIndex((current) => current === null ? null : (current - 1 + artwork.length) % artwork.length);
      if (event.key === 'Escape') setSelectedIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [artwork.length, selectedIndex]);

  const selectedItem = selectedIndex === null ? null : artwork[selectedIndex] ?? null;

  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        {!sanityConfigured && <p style={styles.message}>Galleriet bliver snart opdateret med nye værker.</p>}
        {hasError && <p style={styles.message}>Galleriet kunne ikke indlæses lige nu. Prøv igen senere.</p>}
        {sanityConfigured && !hasError && artwork.length === 0 && <p style={styles.message}>Der er endnu ingen værker i galleriet.</p>}

        <div style={styles.grid}>
          {artwork.map((item, index) => {
            const imageUrl = artworkImageUrl(item.image);
            if (!imageUrl) return null;
            return (
              <button key={item._id} type="button" onClick={() => setSelectedIndex(index)} style={styles.item} aria-label={item.title}>
                <img src={imageUrl} alt={item.title} style={styles.image} loading="lazy" />
              </button>
            );
          })}
        </div>

        {selectedItem && (
          <div role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }} style={styles.modalBackdrop}>
            <button type="button" onClick={() => setSelectedIndex(null)} style={styles.closeButton} aria-label="Luk billede">×</button>
            <div style={styles.modalCard}>
              <div style={styles.modalViewport}>
                <img src={artworkImageUrl(selectedItem.image)} alt={selectedItem.title} style={styles.modalImage} />
              </div>
              <div style={styles.controlsRow}>
                <button type="button" onClick={() => setSelectedIndex((c) => c === null ? null : (c - 1 + artwork.length) % artwork.length)} style={styles.navButtonLeft} aria-label="Forrige billede">‹</button>
                <button type="button" onClick={() => setSelectedIndex((c) => c === null ? null : (c + 1) % artwork.length)} style={styles.navButtonRight} aria-label="Næste billede">›</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Styles = {
  page: { padding: '104px 24px 80px' },
  container: { maxWidth: '1100px', margin: '0 auto' },
  header: { maxWidth: '720px', margin: '0 auto 48px', textAlign: 'center' },
  title: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '38px', color: '#1E3D14', margin: '0 0 16px', fontWeight: 600, letterSpacing: '0.08em' },
  subtitle: { fontSize: '18px', lineHeight: 1.6, color: '#4A6B35', margin: 0 },
  message: { textAlign: 'center', color: '#4A6B35', margin: '0 auto 36px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px', alignItems: 'stretch' },
  item: { display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', outline: 'none', boxShadow: 'none' },
  image: { width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block', backgroundColor: '#e8dccd' },
  itemText: { padding: '20px 22px 24px' },
  itemTitle: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '21px', color: '#1E3D14', margin: 0, fontWeight: 600 },
  description: { fontSize: '15px', lineHeight: 1.65, color: '#3D5A2C', margin: '10px 0 0' },
  modalBackdrop: { position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 24px', backdropFilter: 'blur(8px)' },
  modalCard: { position: 'relative', width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' },
  modalViewport: { width: '100%', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' },
  modalImage: { display: 'block', width: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)' },
  controlsRow: { width: '100%', maxWidth: '480px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '24px' },
  navButtonLeft: { border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none', boxShadow: 'none', userSelect: 'none' },
  navButtonRight: { border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none', boxShadow: 'none', userSelect: 'none' },
  closeButton: { position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1020, outline: 'none', boxShadow: 'none', userSelect: 'none' }
};
