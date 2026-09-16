import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { Styles } from '../css';

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { to: '/behandlinger', label: 'BEHANDLINGER' },
    { to: '/om-mig', label: 'OM MIG' },
    { to: '/booking', label: 'BOOKING' },
    { to: '/kontakt', label: 'KONTAKT' },
  ];

  return (
    <header style={styles.header}>
      <div className="site-header-container" style={styles.container}>
        {/* Brand Logo */}
        <Link to="/" style={styles.brand}>
          <div>
            <div className="site-brand-title" style={styles.brandTitle}>CHRISTINA FLANDING</div>
            <div className="site-brand-subtitle" style={styles.brandSubtitle}>REIKI HEALING</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="site-desktop-nav" style={styles.desktopNav}>
          {links.map(link => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link"
                style={isActive ? { ...styles.navLink, color: '#1E3D14' } : styles.navLink}
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
          style={mobileMenuOpen ? { ...styles.mobileMenuToggle, backgroundColor: 'rgba(255,255,255,0.12)' } : styles.mobileMenuToggle}
          aria-label="Toggle navigation menu"
        >
          <span className="site-menu-toggle-lines" aria-hidden="true">
            <span className={mobileMenuOpen ? 'site-menu-toggle-line site-menu-toggle-line--1 open' : 'site-menu-toggle-line site-menu-toggle-line--1'} />
            <span className={mobileMenuOpen ? 'site-menu-toggle-line site-menu-toggle-line--2 open' : 'site-menu-toggle-line site-menu-toggle-line--2'} />
            <span className={mobileMenuOpen ? 'site-menu-toggle-line site-menu-toggle-line--3 open' : 'site-menu-toggle-line site-menu-toggle-line--3'} />
          </span>
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
    backgroundColor: 'rgba(241, 239, 236, 0.62)',
    borderBottom: '1.5px solid rgba(197, 222, 184, 0.55)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxShadow: '0 2px 10px rgba(45,90,27,0.04)',
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
    textDecoration: 'none',
    color: '#1E3D14',
  },
  brandTitle: {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    fontWeight: 'bold',
    letterSpacing: '0.3px',
    color: '#1E3D14',
    textTransform: 'uppercase',
  },
  brandSubtitle: {
    fontSize: '12px',
    color: '#5A8048',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
    fontWeight: '500',
    float: 'right',
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
    position: 'relative',
    paddingBottom: '6px',
    transition: 'color 0.2s ease',
  },
  navLinkActive: {
    textDecoration: 'none',
    color: '#1E3D14',
    fontSize: '15px',
    fontWeight: '600',
    position: 'relative',
    paddingBottom: '6px',
  },

  mobileMenuToggle: {
    display: 'none',
    background: 'transparent',
    border: 'none',
    width: '42px',
    height: '42px',
    borderRadius: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    cursor: 'pointer',
    color: '#1E3D14',
    transition: 'all 0.2s ease',
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    padding: '18px 24px 22px',
    backgroundColor: 'transparent',
    animation: 'mobileMenuSlide 0.22s ease-out',
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

