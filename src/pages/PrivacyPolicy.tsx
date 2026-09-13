import type { Styles } from '../css';

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Privatlivspolitik" intro="Her kan du læse, hvordan Christina Flanding behandler personoplysninger.">
      <Section title="1. Dataansvarlig">
        <p>Christina Flanding er dataansvarlig for de personoplysninger, der behandles via denne hjemmeside og bookingsystemet.</p>
        <p>Kontakt: <a href="mailto:kontakt@christinaflanding.dk">kontakt@christinaflanding.dk</a><br />CVR-nummer: [indsæt CVR-nummer før lancering]</p>
      </Section>
      <Section title="2. Hvilke oplysninger indsamler vi?"><p>Ved booking kan vi indsamle navn, e-mailadresse, telefonnummer, ønsket dato og tidspunkt. Vi beder dig om ikke at skrive helbredsoplysninger eller andre følsomme oplysninger i bookingformularen.</p></Section>
      <Section title="3. Formål og behandlingsgrundlag"><p>Oplysningerne bruges til at håndtere din booking, kontakte dig om aftalen og sende praktiske bekræftelser. Behandlingen af almindelige bookingoplysninger sker som udgangspunkt for at kunne håndtere din aftale, jf. GDPR artikel 6, stk. 1, litra b.</p><p>Vi beder ikke om helbredsoplysninger via bookingsystemet. Hvis du frivilligt sender sådanne oplysninger, skal de ikke bruges til andre formål end nødvendigt, og du kan kontakte os for at få dem slettet.</p></Section>
      <Section title="4. Modtagere og leverandører"><p>Oplysninger kan behandles af de leverandører, der driver hjemmesiden, databasen og e-mailtjenesten, herunder Cloudflare og Resend. Leverandørerne må kun behandle oplysninger efter vores instruks og skal være dækket af relevante databehandleraftaler.</p><p>Vi deler ikke dine oplysninger med andre til markedsføring.</p></Section>
      <Section title="5. Opbevaring"><p>Bookingoplysninger slettes som udgangspunkt automatisk 90 dage efter den bookede dato. Oplysninger kan opbevares længere, hvis det er nødvendigt for en igangværende henvendelse eller for at opfylde et lovkrav. Eventuelle oplysninger, der skal gemmes efter bogføringsreglerne, opbevares i den periode, loven kræver.</p></Section>
      <Section title="6. Dine rettigheder"><p>Du kan bede om indsigt i, rettelse eller sletning af dine oplysninger. Du kan også i visse tilfælde gøre indsigelse mod behandlingen eller bede om begrænsning. Skriv til <a href="mailto:kontakt@christinaflanding.dk">kontakt@christinaflanding.dk</a>.</p><p>Du kan klage til Datatilsynet, hvis du mener, at dine oplysninger behandles i strid med reglerne.</p></Section>
      <Section title="7. Cookies og lignende teknologier"><p>Hjemmesiden bruger aktuelt ikke cookies, analyseværktøjer, marketingpixels eller lokal lagring i din browser. Bookingfunktionen bruger kun nødvendige serverkald for at vise ledige tider og modtage din booking.</p><p>Hvis vi senere tager ikke-nødvendige cookies eller analyse- og marketingværktøjer i brug, opdaterer vi denne information og indhenter dit samtykke, før de sættes, hvor det kræves.</p></Section>
      <Section title="8. Opdateringer"><p>Politikken kan blive opdateret, hvis vores behandling eller lovgivningen ændrer sig. Den seneste version fremgår altid af denne side.</p></Section>
    </LegalPage>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <section style={styles.section}><h2 style={styles.sectionTitle}>{title}</h2>{children}</section>;
}

function LegalPage({ title, intro, children }: { title: string; intro: string; children: React.ReactNode }) {
  return <main className="site-content-page" style={styles.page}><article className="site-content-container" style={styles.container}><header style={styles.header}><span style={styles.badge}>🌿 Christina Flanding</span><h1 className="site-page-title" style={styles.title}>{title}</h1><p style={styles.intro}>{intro}</p></header>{children}</article></main>;
}

const styles: Styles = {
  page: { padding: '56px 24px 80px' },
  container: { maxWidth: '800px', margin: '0 auto', backgroundColor: '#F5FAF2', border: '1.5px solid #C5DEB8', borderRadius: '16px', padding: '42px', boxShadow: '0 8px 24px rgba(45,90,27,0.06)' },
  header: { textAlign: 'center', marginBottom: '36px' },
  badge: { display: 'inline-block', padding: '6px 14px', backgroundColor: '#D9EDCC', color: '#1E3D14', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', marginBottom: '14px' },
  title: { fontFamily: 'Georgia, serif', fontSize: '38px', color: '#1E3D14', margin: '0 0 14px' },
  intro: { color: '#4A6B35', fontSize: '17px', lineHeight: '1.6', margin: 0 },
  section: { marginBottom: '28px', color: '#2D5A1B', fontSize: '15px', lineHeight: '1.7' },
  sectionTitle: { fontFamily: 'Georgia, serif', color: '#1E3D14', fontSize: '22px', margin: '0 0 10px' },
};
