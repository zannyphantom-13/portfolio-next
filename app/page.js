'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Projects from './components/Projects';
import ClientWork from './components/ClientWork';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  const [adminState, setAdminState] = useState({ isAdmin: false, count: 0 });
  const [panelOpen, setPanelOpen] = useState(false);
  const bellRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Bell ring effect listener
  useEffect(() => {
    const handler = () => {
      if (bellRef.current) {
        const icon = bellRef.current.querySelector('i');
        if (icon) {
          icon.classList.add('bell-ring');
          setTimeout(() => icon.classList.remove('bell-ring'), 600);
        }
      }
    };
    window.addEventListener('bell-ring', handler);
    return () => window.removeEventListener('bell-ring', handler);
  }, []);

  // Close panel on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (bellRef.current && !bellRef.current.contains(e.target)) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleAdminChange = useCallback((state) => {
    setAdminState((prev) => ({ ...prev, ...state }));
  }, []);

  const adminBellProps = adminState.isAdmin
    ? {
        count: adminState.count,
        onToggle: () => setPanelOpen((p) => !p),
        ref: bellRef,
      }
    : null;

  return (
    <>
      <Navbar isAdmin={adminState.isAdmin} adminBellProps={adminBellProps} />
      <main>
        <Hero />
        <TechTicker />
        <About />
        <Projects />
        <ClientWork />
        <Testimonials onAdminChange={handleAdminChange} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
