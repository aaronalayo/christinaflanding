import type { Styles } from '../css';

export default function Terms() {
  return (
    <main className="site-content-page" style={styles.page}>
      <article className="site-content-container" style={styles.container}>
        <header style={styles.header}><span style={styles.badge}>🌿 Christina Flanding</span><h1 className="site-page-title" style={styles.title}>Vilkår for booking</h1><p style={styles.intro}>Praktiske vilkår for booking af sessioner hos Christina Flanding.</p></header>
        <Section title="Booking"><p>En booking er først endelig, når du har modtaget en bekræftelse. Oplys korrekte kontaktoplysninger, så vi kan kontakte dig om aftalen.</p></Section>
        <Section title="Afbud og ændringer"><p>Hvis du bliver forhindret, bedes du melde afbud eller bede om ændring senest 24 timer før aftalen via telefon eller e-mail. Eventuelle gebyrer for sent afbud eller udeblivelse skal fremgå tydeligt af den konkrete pris- og afbudspolitik.</p></Section>
        <Section title="Betaling"><p>Pris og betalingsmåde oplyses før eller ved booking. Gem din kvittering eller bookingbekræftelse.</p></Section>
        <Section title="Behandlingens karakter"><p>Healing og energiarbejde er velværeydelser og erstatter ikke lægelig, psykologisk eller anden autoriseret behandling. Kontakt læge eller akutberedskab ved sygdom, akutte symptomer eller en nødsituation.</p></Section>
        <Section title="Kontakt"><p>Spørgsmål om booking kan sendes til <a href="mailto:kontakt@christinaflanding.dk">kontakt@christinaflanding.dk</a> eller via telefon 31 33 13 32.</p></Section>
      </article>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section style={styles.section}><h2 style={styles.sectionTitle}>{title}</h2>{children}</section>;
}

const styles: Styles = {
  page: { padding: '56px 24px 80px' },
  container: { maxWidth: '800px', margin: '0 auto', backgroundColor: '#F5FAF2', border: '1.5px solid #C5DEB8', borderRadius: '16px', padding: '42px', boxShadow: '0 8px 24px rgba(45,90,27,0.06)' },
  header: { textAlign: 'center', marginBottom: '36px' },
  badge: { display: 'inline-block', padding: '6px 14px', backgroundColor: '#D9EDCC', color: '#1E3D14', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginBottom: '14px' },
  title: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', fontSize: '38px', color: '#1E3D14', margin: '0 0 14px', fontWeight: 600, letterSpacing: '-0.04em' },
  intro: { color: '#4A6B35', fontSize: '17px', lineHeight: '1.6', margin: 0, fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  section: { marginBottom: '28px', color: '#2D5A1B', fontSize: '15px', lineHeight: '1.7', fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif' },
  sectionTitle: { fontFamily: '"Avenir Next", "Avenir", "Helvetica Neue", "Segoe UI", sans-serif', color: '#1E3D14', fontSize: '22px', margin: '0 0 10px', fontWeight: 600 },
};
