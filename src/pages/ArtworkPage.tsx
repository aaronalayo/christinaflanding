import { useEffect, useState } from 'react';
import type { Styles } from '../css';
import { artworkImageUrl, getArtwork, sanityConfigured, type ArtworkCategory, type Artwork, type ArtworkGroup } from '../lib/sanity';
import PageTitle from '../components/PageTitle';

const artworkGroupTitles: Record<ArtworkGroup, string> = {
  uld: 'Uld',
  illustrationer: 'Illustrationer',
  'tegning & maleri': 'Tegning & maleri',
};

const artworkGroupOrder: Array<ArtworkGroup | 'other'> = [
  'illustrationer',
  'tegning & maleri',
  'other',
  'uld',
];

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
  const groupedArtwork = artwork.reduce<Map<ArtworkGroup | 'other', { item: Artwork; index: number }[]>>((groups, item, index) => {
    const group = item.group && item.group in artworkGroupTitles ? item.group : 'other';
    const items = groups.get(group) ?? [];
    items.push({ item, index });
    groups.set(group, items);
    return groups;
  }, new Map());
  const orderedArtworkGroups = artworkGroupOrder.flatMap((group) => {
    const items = groupedArtwork.get(group);
    return items ? [{ group, items }] : [];
  });

  return (
    <div className="site-content-page" style={styles.page}>
      <div className="site-content-container" style={styles.container}>
        <header style={styles.header}>
          <PageTitle className="site-page-title" style={styles.title}>{title}</PageTitle>
          <p className="site-page-subtitle" style={styles.subtitle}>{subtitle}</p>
        </header>
        {!sanityConfigured && <p style={styles.message}>Galleriet bliver snart opdateret med nye værker.</p>}
        {hasError && <p style={styles.message}>Galleriet kunne ikke indlæses lige nu. Prøv igen senere.</p>}
        {sanityConfigured && !hasError && artwork.length === 0 && <p style={styles.message}>Der er endnu ingen værker i galleriet.</p>}

        {orderedArtworkGroups.map(({ group, items }) => (
          <section key={group} style={styles.groupSection}>
            <h2 style={styles.groupTitle}>{group === 'other' ? 'Øvrige værker' : artworkGroupTitles[group]}</h2>
            <div style={styles.grid}>
              {items.map(({ item, index }) => {
                const imageUrl = artworkImageUrl(item.image);
                if (!imageUrl) return null;
                return (
                  <button key={item._id} type="button" onClick={() => setSelectedIndex(index)} style={styles.item} aria-label={item.title}>
                    <img src={imageUrl} alt={item.title} style={styles.image} loading="lazy" />
                  </button>
                );
              })}
            </div>
          </section>
        ))}

        {selectedItem && (
          <div className="artwork-modal-backdrop" role="dialog" aria-modal="true" onClick={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null); }} style={styles.modalBackdrop}>
            <button type="button" onClick={() => setSelectedIndex(null)} style={styles.closeButton} aria-label="Luk billede">×</button>
            <div className="artwork-modal-card" style={styles.modalCard}>
              <div style={styles.modalViewport}>
                <img src={artworkImageUrl(selectedItem.image)} alt={selectedItem.title} style={styles.modalImage} />
              </div>
              <div style={styles.controlsRow}>
                <button type="button" onClick={() => setSelectedIndex((c) => c === null ? null : (c - 1 + artwork.length) % artwork.length)} style={styles.navButtonLeft} aria-label="Forrige billede">‹</button>
                <button type="button" onClick={() => setSelectedIndex((c) => c === null ? null : (c + 1) % artwork.length)} style={styles.navButtonRight} aria-label="Næste billede">›</button>
              </div>
              <div className="artwork-modal-description" style={styles.modalDescription}>
                <h2 style={styles.modalTitle}>{selectedItem.title}</h2>
                {selectedItem.description && (
                  <p className="artwork-modal-description-text" style={styles.modalDescriptionText}>{selectedItem.description}</p>
                )}
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
  groupSection: { marginBottom: '56px' },
  groupTitle: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '28px', color: '#1E3D14', margin: '0 0 24px', fontWeight: 600 },
  header: { width: '100%', margin: '0 auto 48px', textAlign: 'center' },
  title: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '38px', color: '#1E3D14', margin: '0 0 16px', fontWeight: 600, letterSpacing: '0.08em' },
  subtitle: { fontSize: '18px', lineHeight: 1.6, color: '#4A6B35', width: '100%', margin: '0 auto' },
  message: { textAlign: 'center', color: '#4A6B35', margin: '0 auto 36px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '32px', alignItems: 'stretch' },
  item: { display: 'block', width: '100%', padding: 0, border: 'none', background: 'none', cursor: 'pointer', overflow: 'hidden', transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)', outline: 'none', boxShadow: 'none' },
  image: { width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', display: 'block', backgroundColor: '#e8dccd' },
  itemText: { padding: '20px 22px 24px' },
  itemTitle: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '21px', color: '#1E3D14', margin: 0, fontWeight: 600 },
  description: { fontSize: '15px', lineHeight: 1.65, color: '#3D5A2C', margin: '10px 0 0' },
  modalBackdrop: { position: 'fixed', inset: 0, zIndex: 1000, backgroundColor: 'rgba(255, 255, 255, 0.98)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 24px 24px', backdropFilter: 'blur(8px)' },
  modalCard: { position: 'relative', width: '100%', maxWidth: '1100px', display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(260px, 0.8fr)', gridTemplateRows: 'minmax(0, 65vh) auto', columnGap: '40px', rowGap: '18px', alignItems: 'center', margin: '0 auto' },
  modalViewport: { gridColumn: '1', gridRow: '1', width: '100%', height: '65vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent', minWidth: 0 },
  modalImage: { display: 'block', width: 'auto', maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', boxShadow: '0 12px 40px rgba(0, 0, 0, 0.08)' },
  controlsRow: { gridColumn: '1', gridRow: '2', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 },
  modalDescription: { gridColumn: '2', gridRow: '1 / span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '24px', color: '#1E3D14', transform: 'translateY(-60px)' },
  modalTitle: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: 'clamp(22px, 2.5vw, 32px)', lineHeight: 1.2, fontWeight: 600, margin: '0 0 18px' },
  modalDescriptionText: { fontSize: '17px', lineHeight: 1.75, color: '#3D5A2C', margin: 0, whiteSpace: 'pre-line' },
  navButtonLeft: { border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none', boxShadow: 'none', userSelect: 'none' },
  navButtonRight: { border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, outline: 'none', boxShadow: 'none', userSelect: 'none' },
  closeButton: { position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'none', color: '#1d1d1f', fontSize: '44px', cursor: 'pointer', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1020, outline: 'none', boxShadow: 'none', userSelect: 'none' }
};
