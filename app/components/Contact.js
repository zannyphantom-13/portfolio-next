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
          <div className="section-header reveal">
            <span className="section-label">Get In Touch</span>
            <h2 className="section-title">Let&apos;s Work Together</h2>
            <p className="section-subtitle">
              Have a project in mind? I&apos;d love to hear about it. Drop me a message and I&apos;ll get back to you.
            </p>
          </div>

          <a
            href="mailto:zannyphanton013@gmail.com"
            className="contact-email-link reveal"
          >
            <i className="fas fa-envelope" /> zannyphanton013@gmail.com
          </a>

          <div className="social-links reveal reveal-delay-2">
            {socials.map((s) => (
              <a
                key={s.title}
                href={s.href}
                className="social-icon"
                title={s.title}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener noreferrer' : undefined}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
