const clients = [
  {
    name: 'Zealmart World',
    category: 'E-Commerce',
    description:
      'A full-featured e-commerce platform for a Nigerian marketplace, with product listings, shopping cart, and order management.',
    url: 'https://www.zealmartworld.com.ng/',
    monogram: 'ZM',
    gradient: 'linear-gradient(135deg,#7c3aed,#06b6d4)',
    bg: 'linear-gradient(135deg,#0f1a2e,#162040)',
  },
  {
    name: 'JD Good Hair',
    category: 'Beauty & Hair',
    description:
      'A stylish salon and hair products website with product showcasing, booking flow, and a premium brand aesthetic for a Nigerian beauty business.',
    url: 'https://jd-goodhair.com.ng/',
    monogram: 'JD',
    gradient: 'linear-gradient(135deg,#c084fc,#f472b6)',
    bg: 'linear-gradient(135deg,#1a0a1e,#2d0f2d)',
  },
  {
    name: 'The Electric Plug',
    category: 'Electronics & Tech',
    description:
      'A modern electronics retail website featuring product catalogues, promotional banners, and easy contact options for a tech-focused brand.',
    url: 'https://www.theelectricplug.com/',
    monogram: 'EP',
    gradient: 'linear-gradient(135deg,#4ade80,#06b6d4)',
    bg: 'linear-gradient(135deg,#0f1f0f,#1a3a1a)',
  },
  {
    name: 'LG Trusted Edge',
    category: 'Electronics Retail',
    description:
      'An authorized LG products distributor website with product displays, trust badges, and a clean, professional layout that builds customer confidence.',
    url: 'https://www.lgtrustedge.com.ng/',
    monogram: 'LG',
    gradient: 'linear-gradient(135deg,#60a5fa,#a78bfa)',
    bg: 'linear-gradient(135deg,#0a0f2e,#1a1f4e)',
  },
  {
    name: 'SkilLift Services',
    category: 'Professional Services',
    description:
      'A bilingual professional services platform with multilingual support, service showcasing, and a clean UI built for an international audience.',
    url: 'https://www.skiliftservices.com/en',
    monogram: 'SL',
    gradient: 'linear-gradient(135deg,#fbbf24,#f97316)',
    bg: 'linear-gradient(135deg,#1a1000,#3a2800)',
  },
  {
    name: 'Mac-Christar Limited',
    category: 'Corporate',
    description:
      'A professional corporate website for an established Nigerian company, featuring service portfolios, company profile, and a strong brand identity online.',
    url: 'https://www.mac-christarlimited.com/',
    monogram: 'MC',
    gradient: 'linear-gradient(135deg,#d97706,#92400e)',
    bg: 'linear-gradient(135deg,#0f0a00,#2a1f00)',
  },
  {
    name: 'Mayjay Electronics',
    category: 'Electronics & Retail',
    description:
      'An electronics retail website for a Nigerian brand, featuring product showcasing, brand-forward design, and intuitive navigation for shoppers.',
    url: 'https://www.mayjay-electronics.com.ng/',
    monogram: 'MJ',
    gradient: 'linear-gradient(135deg,#c084fc,#7c3aed)',
    bg: 'linear-gradient(135deg,#100a1a,#1e1030)',
  },
];

export default function ClientWork() {
  return (
    <section id="client-work" className="client-work">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Real Businesses</span>
          <h2 className="section-title">Client Work</h2>
          <p className="section-subtitle">
            Live websites I&apos;ve built for real clients — from concept to deployment.
          </p>
        </div>
        <div className="client-grid">
          {clients.map((client, i) => {
            const delay = i % 3 === 1 ? ' reveal-delay-1' : i % 3 === 2 ? ' reveal-delay-2' : '';
            return (
              <div key={client.name} className={`client-card reveal${delay}`}>
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
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="client-visit-btn"
                  >
                    Visit site <i className="fas fa-arrow-right" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
