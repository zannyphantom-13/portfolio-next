import { allProjects } from '../../../lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const isClient = project.type === 'client';

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-light)', marginBottom: '2rem', textDecoration: 'none', fontWeight: 600 }}>
          <i className="fas fa-arrow-left" /> Back to Portfolio
        </Link>
        
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', background: 'linear-gradient(135deg, #fff, var(--primary-light))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {isClient ? project.name : project.title}
        </h1>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          {isClient && <span style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '0.3rem 0.8rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: 'bold' }}>Live Client Project</span>}
          {project.tags && project.tags.map(tag => (
            <span key={tag} style={{ background: 'rgba(124, 58, 237, 0.2)', color: 'var(--text-color)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem' }}>{tag}</span>
          ))}
          {project.category && (
             <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent-color)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.8rem' }}>{project.category}</span>
          )}
        </div>

        {/* Hero Image */}
        <div style={{ width: '100%', aspectRatio: '16/9', background: project.bg || '#1a1a2e', borderRadius: '16px', overflow: 'hidden', marginBottom: '4rem', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={isClient ? project.name : project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            ) : (
                <span style={{ fontSize: '4rem', fontWeight: 'bold', background: project.gradient || 'linear-gradient(135deg,#fff,#aaa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{project.monogram || 'Proj'}</span>
            )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
          
          <section>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>Project Overview</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>{project.overview}</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>The Challenge</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>{project.challenge}</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: '#fff' }}>The Solution</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>{project.solution}</p>
          </section>
        </div>

        {/* Links */}
        <div style={{ marginTop: '4rem', display: 'flex', gap: '1rem' }}>
          {(project.demo || project.url) && (
            <a href={project.demo || project.url} target="_blank" rel="noopener noreferrer" className="btn primary-btn">
              Visit Live Site <i className="fas fa-external-link-alt" />
            </a>
          )}
          {project.code && (
            <a href={project.code} target="_blank" rel="noopener noreferrer" className="btn secondary-btn">
              View Code <i className="fab fa-github" />
            </a>
          )}
        </div>
        
        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem', textAlign: 'center', color: '#fff' }}>Project Gallery</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {project.gallery.map((img, i) => (
                <div key={i} style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--card-border)' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Gallery image ${i+1}`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>
              ))}
              {/* Placeholders if gallery is small */}
              {project.gallery.length < 3 && (
                <div style={{ background: 'var(--card-bg)', borderRadius: '12px', border: '1px dashed var(--card-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', aspectRatio: '16/9', color: 'var(--text-muted)' }}>
                  Screenshot Placeholder
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
