import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Styles } from './css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookingPage from './pages/BookingPage';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';

export default function App() {
  return (
    <BrowserRouter>
      <div style={styles.appContainer}>
        <Navbar />
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/om-mig" element={<About />} />
            <Route path="/behandlinger" element={<Services />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/privatlivspolitik" element={<PrivacyPolicy />} />
            <Route path="/vilkaar" element={<Terms />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

const styles: Styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #f7f3ee 0%, #f3d7c0 100%)',
    fontFamily: '"Avenir Next", "Avenir", "Montserrat", "Helvetica Neue", "Segoe UI", sans-serif',
    color: '#1d1d1f',
  },
  mainContent: {
    flex: '1 0 auto',
    background: 'linear-gradient(180deg, #f7f3ee 0%, #f3d7c0 100%)',
    paddingTop: '0',
  },
};