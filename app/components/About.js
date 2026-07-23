'use client';
import { motion } from 'framer-motion';

const skills = [
  { icon: 'fab fa-html5', label: 'HTML5' },
  { icon: 'fab fa-css3-alt', label: 'CSS3' },
  { icon: 'fab fa-js', label: 'JavaScript' },
  { icon: 'fab fa-react', label: 'React' },
  { icon: 'fab fa-node-js', label: 'Node.js' },
  { icon: 'fas fa-database', label: 'Firebase' },
  { icon: 'fas fa-server', label: 'Supabase' },
  { icon: 'fab fa-git-alt', label: 'Git' },
  { icon: 'fas fa-wind', label: 'Tailwind' },
  { icon: 'fas fa-bolt', label: 'Vite' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>
        <div className="about-grid">
          <motion.div 
            className="about-bio"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I&apos;m <span>Zan the dev</span>, a passionate freelance web developer based in Nigeria.
              I care deeply about the end user — my real satisfaction comes from building software
              that feels natural, looks great, and actually works for the people using it.
            </p>
            <p>
              Over the past 2 years I&apos;ve helped <span>7 real businesses</span> go live with
              professional websites — from e-commerce platforms and beauty salons to electronics
              retailers and corporate companies. I handle the full process: design, development,
              and deployment.
            </p>
            <div className="about-highlights">
              {[
                'Full-stack web development (HTML, CSS, JS, React, Node.js)',
                'Firebase, Supabase & backend integrations',
                'Responsive, mobile-first design',
                '7+ live client websites delivered',
              ].map((text) => (
                <div key={text} className="highlight-item">
                  <i className="fas fa-check-circle" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="skills-section-label">Tech Stack</span>
            <div className="skills-grid">
              {skills.map((s) => (
                <motion.div 
                  key={s.label} 
                  className="skill-item"
                  whileHover={{ y: -3, boxShadow: '0 4px 16px rgba(124, 58, 237, 0.4)', borderColor: 'var(--primary-color)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <i className={s.icon} />
                  {s.label}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
