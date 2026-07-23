'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { clientsData } from '../../lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function ClientWork() {
  return (
    <section id="client-work" className="client-work">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Real Businesses</span>
          <h2 className="section-title">Client Work</h2>
          <p className="section-subtitle">
            Live websites I&apos;ve built for real clients — from concept to deployment.
          </p>
        </motion.div>
        
        <motion.div 
          className="client-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {clientsData.map((client) => (
            <motion.div 
              key={client.slug} 
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="client-card"
            >
              <Link href={`/projects/${client.slug}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="client-image-wrap"
                  style={{ background: client.bg }}
                >
                  <span
                    className="client-monogram"
                    style={{ background: client.gradient }}
                  >
                    {client.monogram}
                  </span>
                  <div className="client-live-badge">
                    <span className="client-live-dot" />
                    Live
                  </div>
                </div>
                <div className="client-info">
                  <div className="client-category">{client.category}</div>
                  <h3>{client.name}</h3>
                  <p>{client.description}</p>
                  <div className="client-visit-btn" style={{ marginTop: 'auto' }}>
                    View Case Study <i className="fas fa-arrow-right" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
