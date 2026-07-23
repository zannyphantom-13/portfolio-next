'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ 
      background: 'var(--bg-secondary)', 
      borderTop: '1px solid var(--card-border)',
      padding: '4rem 0 2rem 0',
      marginTop: '4rem'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '3rem',
          marginBottom: '3rem' 
        }}>
          {/* Brand Col */}
          <div>
            <div className="logo" style={{ marginBottom: '1rem' }}>Zan the dev.</div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Building modern web experiences for real businesses. Fast, responsive, and visually stunning.
            </p>
            <a href="mailto:hazytarzan12@gmail.com" style={{ color: 'var(--primary-light)', textDecoration: 'none', fontWeight: 500 }}>
              <i className="fas fa-envelope" style={{ marginRight: '8px' }}/> hazytarzan12@gmail.com
            </a>
          </div>

          {/* Quick Links Col */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link href="/#about" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>About Me</Link></li>
              <li><Link href="/#services" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Services</Link></li>
              <li><Link href="/#projects" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Projects</Link></li>
              <li><Link href="/#client-work" style={{ color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}>Client Work</Link></li>
            </ul>
          </div>

          {/* Socials Col */}
          <div>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '1.5rem' }}>Follow Me</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://github.com/zannyphantom-13" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
                <i className="fab fa-github" />
              </a>
              <a href="https://x.com/Zannyphantom013" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
                <i className="fab fa-twitter" />
              </a>
              <a href="https://wa.me/2349154302052" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
                <i className="fab fa-whatsapp" />
              </a>
              <a href="https://www.tiktok.com/@zanthefan" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-muted)', fontSize: '1.5rem', transition: 'color 0.2s' }}>
                <i className="fab fa-tiktok" />
              </a>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid var(--card-border)', 
          paddingTop: '2rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
            &copy; {year} <span className="accent">Zan the dev</span>. Crafted with <span style={{ color: '#f43f5e' }}>♥</span> in Nigeria.
          </p>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ 
              background: 'rgba(124, 58, 237, 0.1)', 
              color: 'var(--primary-light)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}
          >
            Back to top <i className="fas fa-arrow-up" />
          </button>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        footer a:hover { color: var(--primary-light) !important; }
        footer button:hover { background: rgba(124, 58, 237, 0.2) !important; }
      `}} />
    </footer>
  );
}
