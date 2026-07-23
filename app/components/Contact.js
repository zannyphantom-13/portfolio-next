'use client';
import { motion } from 'framer-motion';

export default function Contact() {
  const socials = [
    { href: 'mailto:zannyphanton013@gmail.com', icon: 'fas fa-envelope', title: 'Email' },
    { href: 'https://github.com/zannyphantom-13', icon: 'fab fa-github', title: 'GitHub', external: true },
    { href: '#', icon: 'fab fa-linkedin', title: 'LinkedIn' },
    { href: 'https://x.com/Zannyphantom013', icon: 'fab fa-twitter', title: 'X / Twitter', external: true },
    { href: 'https://wa.me/2349154302052', icon: 'fab fa-whatsapp', title: 'WhatsApp', external: true },
    { href: 'https://www.tiktok.com/@zanthefan', icon: 'fab fa-tiktok', title: 'TikTok', external: true },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-inner">
          <motion.div 
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Let&apos;s Work Together</h2>
            <p className="section-subtitle">
              Have a project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you.
            </p>
          </motion.div>

          <motion.a
            href="mailto:zannyphanton013@gmail.com"
            className="contact-email-link"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(124, 58, 237, 0.4)', borderColor: 'var(--primary-color)' }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <i className="fas fa-envelope" /> zannyphanton013@gmail.com
          </motion.a>

          <motion.div 
            className="social-links"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
            }}
          >
            {socials.map((s) => (
              <motion.a
                key={s.title}
                href={s.href}
                className="social-icon"
                title={s.title}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4, boxShadow: '0 8px 20px rgba(124, 58, 237, 0.4)', borderColor: 'var(--primary-color)', color: '#fff', backgroundColor: 'rgba(124, 58, 237, 0.2)' }}
              >
                <i className={s.icon} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
