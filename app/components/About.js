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
        <div className="section-header reveal">
          <span className="section-label">Who I Am</span>
          <h2 className="section-title">About Me</h2>
        </div>
        <div className="about-grid">
          <div className="about-bio reveal">
            <p>
              I&apos;m <span>Hassan</span>, a passionate freelance web developer based in Nigeria.
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
          </div>

          <div className="reveal reveal-delay-2">
            <span className="skills-section-label">Tech Stack</span>
            <div className="skills-grid">
              {skills.map((s) => (
                <div key={s.label} className="skill-item">
                  <i className={s.icon} />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
