import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Styles } from '../css';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Forside' },
    { to: '/om-mig', label: 'Om mig' },
    { to: '/behandlinger', label: 'Behandlinger' },
    { to: '/booking', label: 'Book session' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <header style={styles.header}>
      <div className="site-header-container" style={styles.container}>
        {/* Brand Logo */}
        <Link to="/" style={styles.brand}>
          <span style={styles.brandIcon}>🌿</span>
          <div>
            <div className="site-brand-title" style={styles.brandTitle}>Christina Flanding</div>
            <div className="site-brand-subtitle" style={styles.brandSubtitle}>Healing & Velvære</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="site-desktop-nav" style={styles.desktopNav}>
          {links.map(link => {
            const isActive = location.pathname === link.to;
            const isBooking = link.to === '/booking';
            if (isBooking) {
              return (
                <Link key={link.to} to={link.to} style={styles.bookingBtn}>
                  {link.label}
                </Link>
              );
            }
            return (
              <Link
                key={link.to}
                to={link.to}
                style={isActive ? styles.navLinkActive : styles.navLink}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="site-menu-toggle"
          style={styles.mobileMenuToggle}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="site-mobile-nav" style={styles.mobileNav}>
          {links.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                style={isActive ? styles.mobileNavLinkActive : styles.mobileNavLink}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

const styles: Styles = {
  header: {
    backgroundColor: '#F5FAF2',
    borderBottom: '1.5px solid #C5DEB8',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 2px 10px rgba(45,90,27,0.06)',
  },
  container: {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '16px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    color: '#1E3D14',
  },
  brandIcon: {
    fontSize: '28px',
  },
  brandTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '0.3px',
    color: '#1E3D14',
  },
  brandSubtitle: {
    fontSize: '12px',
    color: '#5A8048',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  desktopNav: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#3D5A2C',
    fontSize: '15px',
    fontWeight: '600',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    textDecoration: 'none',
    color: '#1E3D14',
    fontSize: '15px',
    fontWeight: 'bold',
    borderBottom: '2px solid #2D5A1B',
    paddingBottom: '4px',
  },
  bookingBtn: {
    textDecoration: 'none',
    backgroundColor: '#2D5A1B',
    color: 'white',
    padding: '9px 18px',
    borderRadius: '20px',
    fontWeight: 'bold',
    fontSize: '14px',
    boxShadow: '0 2px 6px rgba(45,90,27,0.25)',
    transition: 'background-color 0.2s',
  },
  mobileMenuToggle: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#1E3D14',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px 24px',
    backgroundColor: '#EEF6E8',
    borderTop: '1px solid #C5DEB8',
  },
  mobileNavLink: {
    textDecoration: 'none',
    color: '#3D5A2C',
    fontSize: '16px',
    fontWeight: '600',
    padding: '8px 0',
  },
  mobileNavLinkActive: {
    textDecoration: 'none',
    color: '#1E3D14',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '8px 0',
  },
};

