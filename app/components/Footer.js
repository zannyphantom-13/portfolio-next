export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>
        &copy; {year} <span className="accent">Zan the dev</span>. Crafted with{' '}
        <span style={{ color: '#f43f5e' }}>♥</span> in Nigeria.
      </p>
    </footer>
  );
}
