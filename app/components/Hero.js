'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, animate } from 'framer-motion';

function Counter({ from, to, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: 'easeOut',
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = Math.round(value) + '+';
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref}>{from}+</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

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

  // Counters now handled by Framer Motion useInView

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div 
          className="availability-badge"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <span className="availability-dot" />
          Available for freelance work
        </motion.div>
        <motion.h1 
          className="hero-name"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Zan the dev
        </motion.h1>
        <motion.div 
          className="role-wrapper"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <span className="role-prefix">I&apos;m a </span>
          <span className="role-typed" ref={typedRef} />
        </motion.div>
        <motion.p 
          className="hero-text"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          I design and build fast, modern websites for businesses that want to stand out — from
          e-commerce stores to corporate platforms, all crafted with care and precision.
        </motion.p>
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <a href="#client-work" className="btn primary-btn" onClick={(e) => { e.preventDefault(); document.querySelector('#client-work')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <i className="fas fa-briefcase" /> View Client Work
          </a>
          <a href="#projects" className="btn secondary-btn" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            <i className="fas fa-code" /> Personal Projects
          </a>
        </motion.div>
        <motion.div 
          className="hero-stats"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Counter from={0} to={7} label="Client Sites" />
          <Counter from={0} to={12} label="Projects Built" />
          <Counter from={0} to={2} label="Years Experience" />
        </motion.div>
      </div>

      <motion.div 
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.3, type: 'spring' }}
      >
        <div className="glow-circle" />
        <div className="orbit-ring">
          <div className="orbit-dot" />
        </div>
        <div className="profile-placeholder">
          <Image
            src="/profile.png"
            alt="Zan the dev"
            width={280}
            height={280}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            priority
          />
        </div>
      </motion.div>
    </section>
  );
}
