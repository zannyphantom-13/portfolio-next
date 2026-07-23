const tickerItems = [
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

// Duplicate for seamless loop
const allItems = [...tickerItems, ...tickerItems];

export default function TechTicker() {
  return (
    <div className="tech-ticker">
      <div className="ticker-inner">
        {allItems.map((item, i) => (
          <span key={i} className="ticker-item">
            <i className={item.icon} />
            {item.label}
            {i < allItems.length - 1 && <span className="ticker-sep" style={{ marginLeft: '1.5rem' }}>·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
