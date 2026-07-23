'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar({ isAdmin, adminBellProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prev) => {
      document.body.style.overflow = !prev ? 'hidden' : '';
      return !prev;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMenu();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Client Work', href: '#client-work' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header style={scrolled ? { boxShadow: '0 4px 30px rgba(0,0,0,0.4)' } : {}}>
        <nav className="navbar">
          <div className="logo">Hassan.</div>

          <ul className={`nav-links${menuOpen ? ' active' : ''}`}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a href="#contact" className="nav-hire-btn" onClick={(e) => handleNavClick(e, '#contact')}>
              Hire Me
            </a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>

          {/* Admin Bell */}
          {isAdmin && adminBellProps && (
            <div
              className="admin-bell"
              onClick={adminBellProps.onToggle}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="fas fa-bell" />
              {adminBellProps.count > 0 && (
                <span className="notif-count">{adminBellProps.count}</span>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay${menuOpen ? ' active' : ''}`}
        onClick={closeMenu}
      />
    </>
  );
}
