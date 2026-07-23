'use client';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Custom Web Development',
    description: 'I build fast, responsive, and scalable websites tailored to your specific business needs using modern technologies like Next.js and React.',
    icon: 'fas fa-code'
  },
  {
    title: 'E-commerce Solutions',
    description: 'Transform your retail business with powerful online stores. I integrate secure payment gateways, inventory management, and intuitive shopping experiences.',
    icon: 'fas fa-shopping-cart'
  },
  {
    title: 'UI/UX Design Implementation',
    description: 'I take your designs and turn them into pixel-perfect, interactive web experiences with smooth animations and intuitive user flows.',
    icon: 'fas fa-paint-brush'
  },
  {
    title: 'Performance Optimization',
    description: 'Slow websites lose customers. I audit and optimize your existing site for speed, SEO, and accessibility to ensure maximum engagement.',
    icon: 'fas fa-rocket'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function Services() {
  return (
    <section id="services" className="services" style={{ padding: '7rem 0', background: 'var(--bg-secondary)', position: 'relative', zIndex: 1 }}>
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What I Do</span>
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">Comprehensive digital solutions to help your business thrive online.</p>
        </motion.div>

        <motion.div 
          className="services-grid" 
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)', borderColor: 'var(--primary-color)' }}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: '16px',
                padding: '2.5rem 2rem',
                backdropFilter: 'blur(10px)',
                transition: 'border-color 0.3s, box-shadow 0.3s'
              }}
            >
              <div style={{ 
                width: '60px', height: '60px', borderRadius: '12px', 
                background: 'rgba(124, 58, 237, 0.1)', display: 'flex', 
                alignItems: 'center', justifyContent: 'center', 
                marginBottom: '1.5rem', color: 'var(--primary-light)', fontSize: '1.8rem' 
              }}>
                <i className={service.icon} />
              </div>
              <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1rem' }}>{service.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
