'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';

const roles = ['Full Stack Developer', 'UI/UX Builder', 'Freelance Dev', 'React Specialist'];

export default function Hero() {
  const typedRef = useRef(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    function type() {
      const current = roles[roleIndex];
      if (typedRef.current) {
        if (!isDeleting) {
          typedRef.current.textContent = current.slice(0, charIndex + 1);
          charIndex++;
          if (charIndex === current.length) {
            isDeleting = true;
            timer = setTimeout(type, 1800);
            return;
          }
        } else {
          typedRef.current.textContent = current.slice(0, charIndex - 1);
          charIndex--;
          if (charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
      }
      timer = setTimeout(type, isDeleting ? 60 : 110);
    }

    timer = setTimeout(type, 800);
    return () => clearTimeout(timer);
  }, []);

  // Animated counters
  useEffect(() => {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.count, 10);
          let current = 0;
          const step = Math.ceil(target / 40);
          const interval = setInterval(() => {
            current += step;
            if (current >= target) {
              entry.target.textContent = target + '+';
              clearInterval(interval);
            } else {
              entry.target.textContent = current + '+';
            }
          }, 40);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="availability-badge">
          <span className="availability-dot" />
          Available for freelance work
        </div>
        <h1 className="hero-name">Hassan</h1>
        <div className="role-wrapper">
          <span className="role-prefix">I&apos;m a </span>
          <span className="role-typed" ref={typedRef} />
        </div>
        <p className="hero-text">
          I design and build fast, modern websites for businesses that want to stand out — from
          e-commerce stores to corporate platforms, all crafted with care and precision.
        </p>
        <div className="hero-actions">
          <a href="#client-work" className="btn primary-btn" onClick={(e) => { e.preventDefault(); document.querySelector('#client-work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <i className="fas fa-briefcase" /> View Client Work
          </a>
          <a href="#projects" className="btn secondary-btn" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <i className="fas fa-code" /> Personal Projects
          </a>
        </div>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number" data-count="7">0+</span>
            <span className="stat-label">Client Sites</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-count="12">0+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" data-count="2">0+</span>
            <span className="stat-label">Years Experience</span>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="glow-circle" />
        <div className="orbit-ring">
          <div className="orbit-dot" />
        </div>
        <div className="profile-placeholder">
          <Image
            src="/profile.png"
            alt="Hassan"
            width={280}
            height={280}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </div>
      </div>
    </section>
  );
}
