'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projectsData } from '../../lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Personal Work</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Side projects I built to sharpen my skills and explore new ideas.</p>
        </motion.div>
        
        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projectsData.map((project) => (
            <motion.article
              key={project.slug}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="project-card"
            >
              <Link href={`/projects/${project.slug}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: 'none', color: 'inherit' }}>
                <div className="project-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="project-overlay">
                    <div className="project-tech-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-links" style={{ marginTop: 'auto' }}>
                    <span className="btn secondary-btn" style={{ pointerEvents: 'none' }}>
                      View Case Study <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
