import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Styles } from './css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import BookingPage from './pages/BookingPage';
import Contact from './pages/Contact';

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
    backgroundColor: '#F8FAF6',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1E3D14',
  },
  mainContent: {
    flex: '1 0 auto',
  },
};