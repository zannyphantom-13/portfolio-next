'use client';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Discovery & Planning',
    description: 'We start by understanding your goals, target audience, and project requirements. I create a detailed roadmap and architecture plan for your website.',
    icon: 'fas fa-search'
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description: 'I design a visually stunning, user-friendly interface that aligns with your brand identity, ensuring a seamless experience across all devices.',
    icon: 'fas fa-pen-nib'
  },
  {
    number: '03',
    title: 'Development',
    description: 'Using modern tech stacks like Next.js and React, I bring the designs to life with clean, efficient, and scalable code.',
    icon: 'fas fa-laptop-code'
  },
  {
    number: '04',
    title: 'Testing & Launch',
    description: 'Rigorous testing ensures everything works perfectly. Once approved, I deploy your site to production and provide ongoing support if needed.',
    icon: 'fas fa-rocket'
  }
];

export default function Process() {
  return (
    <section id="process" className="process" style={{ padding: '7rem 0', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Workflow</span>
          <h2 className="section-title">My Process</h2>
          <p className="section-subtitle">A proven, step-by-step approach to delivering exceptional web projects.</p>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Vertical Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50px',
            width: '2px',
            background: 'rgba(124, 58, 237, 0.2)',
            zIndex: 0
          }} className="process-line" />

          {steps.map((step, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              style={{
                display: 'flex',
                gap: '2rem',
                marginBottom: index === steps.length - 1 ? 0 : '4rem',
                position: 'relative',
                zIndex: 1
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'var(--bg-color)',
                border: '2px solid var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)',
                position: 'relative',
                marginLeft: '20px' // Align with line
              }}>
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold', fontSize: '1.2rem' }}>{step.number}</span>
              </div>
              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '2rem',
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                flex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <i className={step.icon} style={{ color: 'var(--primary-light)', fontSize: '1.2rem' }} />
                  <h3 style={{ color: '#fff', fontSize: '1.3rem', margin: 0 }}>{step.title}</h3>
                </div>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .process-line { left: 30px !important; }
        }
      `}} />
    </section>
  );
}
