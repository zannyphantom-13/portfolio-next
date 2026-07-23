const projects = [
  {
    title: 'Vista Real Estate',
    description:
      'A premium property listing platform with Firebase authentication, an admin dashboard for verified agents, image uploads, and a dynamic property filtering engine.',
    image: '/vista.png',
    tags: ['Firebase', 'JS', 'HTML/CSS'],
    demo: 'https://vista-real-estate.onrender.com/',
    code: 'https://github.com/zannyphantom-13/Vista-real-estate',
  },
  {
    title: 'Bella Cucina',
    description:
      'An elegant, fully responsive Italian restaurant website with a dynamic menu, vibrant image gallery, and a built-in table reservation system.',
    image: '/bella_cucina.png',
    tags: ['HTML', 'CSS', 'JavaScript'],
    demo: 'https://restaurant-website-kappa-jade.vercel.app/',
    code: 'https://github.com/zannyphantom-13/Restaurant-website',
  },
  {
    title: 'Sharp Edge Barbershop',
    description:
      'An ultra-premium barbershop website with minimalist design, high-end typography, and a seamless live booking system interface.',
    image: '/sharp-edge.png',
    tags: ['HTML', 'CSS', 'JS'],
    demo: 'https://sharp-edge.onrender.com/',
    code: 'https://github.com/zannyphantom-13/barbershop-booking',
  },
  {
    title: 'Common Finds LTS',
    description:
      'A robust local marketplace platform. Users can seamlessly buy, sell, and connect with people in their local neighbourhood with a personalized digital storefront.',
    image: '/common-finds.png',
    tags: ['React', 'Firebase', 'Node.js'],
    demo: 'https://common-find-lts.onrender.com/',
    code: 'https://github.com/zannyphantom-13/common-find-lts',
  },
  {
    title: 'Florida Roof Design',
    description:
      'A professional landing page for a Florida-based roofing company. Highlights specialized services, clear contact information, and an intuitive modern design.',
    image: '/florida-roof.png',
    tags: ['HTML', 'CSS', 'JS'],
    demo: 'https://floridaroofdesign.onrender.com/',
    code: 'https://github.com/zannyphantom-13/floridaroofdesign',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Personal Work</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">Side projects I built to sharpen my skills and explore new ideas.</p>
        </div>
        <div className="projects-grid">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className={`project-card reveal${i % 3 === 1 ? ' reveal-delay-1' : i % 3 === 2 ? ' reveal-delay-2' : ''}`}
            >
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
                <div className="project-links">
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn secondary-btn">
                    Demo <i className="fas fa-external-link-alt" />
                  </a>
                  <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn outline-btn">
                    Code <i className="fab fa-github" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
