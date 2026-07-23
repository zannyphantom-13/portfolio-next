'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechTicker from './components/TechTicker';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import ClientWork from './components/ClientWork';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function Home() {
  const [adminState, setAdminState] = useState({ isAdmin: false, count: 0 });
  const [panelOpen, setPanelOpen] = useState(false);
  const bellRef = useRef(null);

  // Bell ring effect listener
  useEffect(() => {
    const handler = () => {
      const bell = document.getElementById('admin-bell');
      if (bell) {
        const icon = bell.querySelector('i');
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
      const bell = document.getElementById('admin-bell');
      const panel = document.getElementById('admin-panel');
      if (
        bell && !bell.contains(e.target) &&
        panel && !panel.contains(e.target)
      ) {
        setPanelOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleAdminChange = useCallback((state) => {
    setAdminState((prev) => ({ ...prev, ...state }));
  }, []);

  const adminBellProps = adminState.isAdmin
    ? {
        count: adminState.count,
        onToggle: () => setPanelOpen((p) => !p),
      }
    : null;

  return (
    <>
      <ScrollProgress />
      <Navbar isAdmin={adminState.isAdmin} adminBellProps={adminBellProps} />
      <main>
        <Hero />
        <TechTicker />
        <About />
        <Services />
        <Process />
        <Projects />
        <ClientWork />
        <Testimonials onAdminChange={handleAdminChange} adminPanelOpen={panelOpen} onCloseAdminPanel={() => setPanelOpen(false)} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
